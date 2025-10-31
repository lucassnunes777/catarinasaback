import { cookies } from 'next/headers'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'catarina@sabackimoveis.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Saback#2025!'
const SESSION_COOKIE = 'admin_session'

export async function verifyCredentials(email: string, password: string) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD
}

export function setSession() {
  cookies().set(SESSION_COOKIE, '1', { httpOnly: true, path: '/', sameSite: 'lax' })
}

export function clearSession() {
  cookies().delete(SESSION_COOKIE)
}

export function isAuthenticated() {
  return cookies().get(SESSION_COOKIE)?.value === '1'
}


