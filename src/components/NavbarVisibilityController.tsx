'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from './Navbar'

export default function NavbarVisibilityController() {
  const router = useRouter()
  const pathname = usePathname()
  const { isLoggedIn, checkAuth } = useAuth()

  // Cek status auth setiap kali path berubah
  useEffect(() => {
    const isAuthenticated = checkAuth()
    if (!isAuthenticated && pathname.startsWith('/dashboard')) {
      router.push('/auth/login')
    }
  }, [pathname, checkAuth, router])

  // Route yang tidak menampilkan navbar
  const noNavbarPaths = [
    '/',
    '/auth/login',
    '/auth/register'
  ]

  if (!isLoggedIn && noNavbarPaths.includes(pathname)) {
    return null
  }

  return <Navbar />
}