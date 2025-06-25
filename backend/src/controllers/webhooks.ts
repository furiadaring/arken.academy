import { env } from '@/config/env'
import * as service from '@/services/webhooks'
import { decryptEmail } from '@/utils'
import { Package } from '@prisma/client'
import crypto from 'crypto'
import { Request, Response } from 'express'
import Stripe from 'stripe'

const stripe = new Stripe(env.stripeSecretKey)
const endpointSecret = env.stripeWebhookSecret

export const payportWebhook = async (req: Request, res: Response) => {
  let rawBody: string | Buffer = (req as any).rawBody
  if (!rawBody) {
    rawBody = await new Promise<string>(resolve => {
      let raw = ''
      req.on('data', chunk => (raw += chunk))
      req.on('end', () => resolve(raw))
    })
  } else {
    rawBody = rawBody.toString('utf8')
  }

  console.log('raw payload in payportWebhook:', rawBody)

  try {
    let parsedBody: Record<string, string> = {}
    if (rawBody && rawBody.trim() !== '') {
      const params = new URLSearchParams(rawBody)
      params.forEach((value, key) => {
        parsedBody[key] = value
      })
      console.log('payportWebhook parsed body:', parsedBody)
    }

    const encryptedEmail = req.query.order_id as string
    const email = decryptEmail(encryptedEmail)
    console.log({ email })

    if (parsedBody && parsedBody.merchant_amount) {
      await service.addPayment(Number(parsedBody.merchant_amount), email)
    } else {
      console.log('No amount found in body')
      res.status(400).json({ error: 'No amount found in body' })
    }

    res.status(200).json({ success: true })
  } catch (error) {
    console.error({ error })
    res.status(400).json({ error: 'Bad Request: ' + error })
  }
}

export const stripeWebhook = async (req: Request, res: Response) => {
  try {
    const rawBody = (req as any).rawBody
    if (!rawBody) {
      console.error('Missing raw body')
      res.status(400).send('Missing raw body')
      return
    }

    const sig = req.headers['stripe-signature']

    console.log('Stripe webhook raw body:', { rawBody })
    console.log('Stripe webhook signature:', { sig })
    console.log('Stripe webhook headers:', { headers: req.headers })

    if (!sig) {
      console.log('Missing Stripe signature header')
      res.status(400).send('Missing Stripe signature header')
      return
    }

    const sigString =
      typeof sig === 'string' ? sig : Array.isArray(sig) ? sig[0] : ''
    console.log(
      'Received Stripe webhook with signature:',
      sigString.substring(0, 20) + '...'
    )

    let event
    try {
      event = await stripe.webhooks.constructEventAsync(
        rawBody,
        sigString,
        endpointSecret
      )
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      console.error('Stripe webhook signature verification failed:', err)
      res.status(400).send(`Webhook Error: ${errorMessage}`)
      return
    }
    if (event.type === 'charge.succeeded') {
      const charge = event.data.object
      let email: string | undefined = undefined
      let packageName: Package | undefined = undefined

      if (charge.metadata && charge.metadata.email) {
        email = charge.metadata.email
        packageName = charge.metadata.packageName as Package
        console.log('Email found in charge metadata:', email)
      }
      if (!email) {
        const paymentIntentId = charge.payment_intent
        if (!paymentIntentId) {
          console.log('⚠️PaymentIntent ID is missing')
          res.status(400).send('⚠️PaymentIntent ID is missing')
          return
        }

        try {
          const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId as string
          )
          email = paymentIntent.metadata.email

          packageName = paymentIntent.metadata.packageName as Package
          console.log('Email found in payment intent metadata:', email)
          console.log('Package found in payment intent metadata:', packageName)
        } catch (err) {
          console.error('Error retrieving payment intent:', err)
        }
      }

      console.log({ email, packageName, charge })
      if (!email || !packageName) {
        console.log(
          '⚠️Email or PackageName is missing in both charge and payment intent'
        )
        res.status(400).send('⚠️Email or PackageName is missing')
        return
      }
      const decryptedEmail = await decryptEmail(email)
      await service.stripeWebhook(charge.amount, decryptedEmail, packageName)
      res.status(200).json({ success: true })
    } else {
      res.status(200).send('⚠️Event ignored')
    }
  } catch (error) {
    console.error({ error })
    res.status(400).json({ error: '⚠️Bad Request: ' + error })
  }
}

export const skyphoenixWebhook = async (req: Request, res: Response) => {
  try {
    console.log('skyphoenixWebhook: ', { body: req.body })
    console.log('skyphoenixWebhook: ', { headers: req.headers })

    const { incoming_id, amountOut, status_id, status, message, comment } =
      await req.body
    if (!incoming_id || !amountOut || !status_id || !status) {
      console.log('⚠️Missing required fields')
      res.status(400).send('⚠️Missing required fields')
      return
    }
    const hash = req.headers['X-App-Access-Sig']
    const secret = env.skyphoenixSecret
    if (!hash || !secret) {
      console.log('⚠️Missing hash or secret')
      res.status(400).send('⚠️Missing hash or secret')
      return
    }

    const expectedHash = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(req.body))
      .digest('hex')
    if (hash !== expectedHash) {
      console.log('⚠️Invalid hash')
      res.status(400).send('⚠️Invalid hash')
      return
    }

    const email = decryptEmail(incoming_id)
    console.log({ email })

    if (!email) {
      console.log('⚠️Email is missing')
      res.status(400).send('⚠️Email is missing')
      return
    }
    if (!amountOut) {
      console.log('⚠️Amount is missing')
      res.status(400).send({ status, status_id, comment, message, incoming_id })
      return
    }

    await service.addPayment(amountOut, email)
    res.status(200).json({ success: true })
  } catch (error) {
    console.error({ error })
    res.status(400).json({ error: 'Bad Request: ' + error })
  }
}
