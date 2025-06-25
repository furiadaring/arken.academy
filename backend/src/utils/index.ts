import { env } from '@/config/env'
import crypto from 'crypto'

export const decryptEmail = (encryptedData: string): string => {
  try {
    const secretKey = env.encryptionSecretKey
    const ivHex = env.encryptionIV

    if (!secretKey || !ivHex) {
      throw new Error('Encryption environment variables not set')
    }

    // Create 16-byte key for AES-128
    const key = crypto
      .createHash('sha256')
      .update(secretKey)
      .digest()
      .slice(0, 16)

    // Convert hex IV to Buffer (must be 16 bytes for AES)
    const iv = Buffer.from(ivHex, 'hex').slice(0, 16)

    // Add padding characters if needed
    let paddedData = encryptedData
    while (paddedData.length % 4 !== 0) {
      paddedData += '='
    }

    // Replace URL-safe characters with standard base64
    paddedData = paddedData.replace(/-/g, '+').replace(/_/g, '/')

    // Create decipher with matching parameters
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)

    try {
      // Decrypt data
      let decrypted = decipher.update(paddedData, 'base64', 'utf8')
      decrypted += decipher.final('utf8')

      return decrypted
    } catch (error) {
      console.error('Error in decipher process:', error)
      return encryptedData // Return original data if decryption fails
    }
  } catch (error) {
    console.error('Error decrypting email:', error)
    return encryptedData // Return original data in case of error
  }
}
