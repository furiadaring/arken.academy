import { NextResponse } from 'next/server'

export async function GET() {
  const pdfRes = await fetch('https://arkenacademy.com/backend-api/v1/book')
  const blob = await pdfRes.blob()
  return new NextResponse(blob, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=\"arken_edu_book.pdf\"',
    },
  })
}
