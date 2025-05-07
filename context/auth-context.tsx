"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../utils/supabase/client'

export type UserRole = 'client' | 'pizzeria' | 'livreur' | 'admin'
interface AuthContextType {
  user: any
  role: UserRole | null
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  register: (userData: any, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUser(user)
        // Fetch additional user data (including role) from your profiles table
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        if (profile && !error) {
          setRole(profile.role)
        }
      }
      setIsLoading(false)
    }

    fetchUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        // Fetch role again when auth state changes
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        if (profile) {
          setRole(profile.role)
        }
      } else {
        setUser(null)
        setRole(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Verify user role matches the selected role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()

        if (profile?.role !== role) {
          await supabase.auth.signOut()
          return false
        }

        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const register = async (userData: any, password: string): Promise<boolean> => {
    try {
      // First sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password,
      })

      if (authError) throw authError

      if (authData.user) {
        // Then create the profile in your profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            name: userData.name,
            email: userData.email,
            role: 'client', // Default role for registration
            address: userData.address,
            phone: userData.phone,
            created_at: new Date().toISOString(),
          })

        if (profileError) throw profileError

        return true
      }
      return false
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/connexion')
  }

  return (
    <AuthContext.Provider value={{ user, role, login, register, logout, isLoading }}>
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