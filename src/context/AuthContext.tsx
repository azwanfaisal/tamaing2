'use client'

import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react'

type AuthContextType = {
  isLoggedIn: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkAuth = useCallback(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken')
      return !!token
    }
    return false
  }, [])

  const login = useCallback(async () => {
    // Simulasi proses login
    await new Promise(resolve => setTimeout(resolve, 500))
    localStorage.setItem('authToken', 'dummy-token')
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(async () => {
    // Simulasi proses logout
    await new Promise(resolve => setTimeout(resolve, 200))
    localStorage.removeItem('authToken')
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }, [])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isLoggedIn') {
        setIsLoggedIn(e.newValue === 'true')
      }
    }

    // Cek status login saat pertama kali load
    setIsLoggedIn(checkAuth())

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [checkAuth])

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}