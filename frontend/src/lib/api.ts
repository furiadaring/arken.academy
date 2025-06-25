import axios from 'redaxios'

const baseURL = process.env.NEXT_PUBLIC_API_URL || '/backend-api/v1'
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This enables sending cookies with cross-origin requests
})

/**
 * Creates an API client with authorization headers
 * @param token The access token to include in the Authorization header
 * @returns A configured axios instance
 */
export const createAuthApi = (token?: string) => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      // 'X-Client-Source': 'next-admin-panel',
    },
    withCredentials: true,
  })
}
