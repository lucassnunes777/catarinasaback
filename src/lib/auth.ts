import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { db } from './db'

const SESSION_COOKIE = 'admin_session'

export async function verifyCredentials(email: string, password: string) {
  try {
    const user = await db.user.findUnique({ where: { email } })
    if (!user) return false
    return await bcrypt.compare(password, user.password)
  } catch (error) {
    console.error('Error verifying credentials:', error)
    return false
  }
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


