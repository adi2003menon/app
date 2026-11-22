'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type User = {
  id: string
  email: string
  name: string
  bio: string
  interests: string[]
  profilePhotoUrl: string
  verified: boolean
  privacyLevel: 'anyone' | 'matches_only' | 'none'
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true)
      const mockUser = localStorage.getItem('mock_user')
      if (mockUser) {
        setUser(JSON.parse(mockUser))
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockUser = {
      id: '1',
      email,
      name: 'Test User',
      bio: '',
      interests: [],
      profilePhotoUrl: '',
      verified: true,
      privacyLevel: 'anyone' as const
    }

    localStorage.setItem('mock_user', JSON.stringify(mockUser))
    setUser(mockUser)
    setLoading(false)
    window.location.href = '/home'
  }

  const register = async (email: string, password: string, name: string) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockUser = {
      id: '1',
      email,
      name,
      bio: '',
      interests: [],
      profilePhotoUrl: '',
      verified: false,
      privacyLevel: 'anyone' as const
    }

    localStorage.setItem('mock_user', JSON.stringify(mockUser))
    setUser(mockUser)
    setLoading(false)
    window.location.href = '/onboarding'
  }

  const logout = () => {
    localStorage.removeItem('mock_user')
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    return {
      user: null,
      loading: false,
      login: async () => {},
      register: async () => {},
      logout: () => {}
    }
  }
  return context
}