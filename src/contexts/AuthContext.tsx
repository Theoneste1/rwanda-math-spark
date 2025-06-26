
import React, { createContext, useContext, useEffect, useState } from 'react'
// Import Supabase user type
import { User } from '@supabase/supabase-js'
// Import Supabase client and configuration check
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
// Import toast notifications
import { toast } from 'react-hot-toast'

// Define the shape of our authentication context
interface AuthContextType {
  user: User | null                    // Current authenticated user
  profile: any | null                  // User profile data from database
  loading: boolean                     // Loading state for auth operations
  signUp: (email: string, password: string, username: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: any) => Promise<void>
  isConfigured: boolean               // Whether Supabase is properly configured
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Authentication provider component that wraps the entire app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for current user
  const [user, setUser] = useState<User | null>(null)
  // State for user profile data
  const [profile, setProfile] = useState<any | null>(null)
  // State for loading indicator
  const [loading, setLoading] = useState(true)
  // Check if Supabase is properly configured
  const isConfigured = isSupabaseConfigured()

  // Effect to set up authentication state listener
  useEffect(() => {
    // If Supabase is not configured, stop loading
    if (!isConfigured || !supabase) {
      setLoading(false)
      return
    }

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Update user state based on session
      setUser(session?.user ?? null)
      if (session?.user) {
        // Fetch user profile if user is logged in
        // Use setTimeout to avoid potential deadlocks
        setTimeout(() => {
          fetchProfile(session.user.id)
        }, 0)
      } else {
        // Clear profile if user is not logged in
        setProfile(null)
      }
      setLoading(false)
    })

    // Function to get initial session on component mount
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user.id)
      }
      setLoading(false)
    }

    getInitialSession()

    // Cleanup subscription on component unmount
    return () => subscription.unsubscribe()
  }, [isConfigured])

  // Function to fetch user profile from database
  const fetchProfile = async (userId: string) => {
    if (!supabase) return
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      // PGRST116 means no rows found, which is okay for new users
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
        return
      }
      
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  // Function to handle user registration
  const signUp = async (email: string, password: string, username: string) => {
    if (!supabase) {
      toast.error('Supabase is not configured')
      return
    }

    try {
      // Set redirect URL for email confirmation
      const redirectUrl = `${window.location.origin}/competition`
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username // Store username in user metadata
          }
        }
      })

      if (error) throw error

      // Show appropriate success message based on email confirmation status
      if (data.user && !data.user.email_confirmed_at) {
        toast.success('Please check your email to confirm your account!')
      } else {
        toast.success('Account created successfully!')
      }
    } catch (error: any) {
      // Handle specific error cases
      if (error.message.includes('already registered')) {
        toast.error('An account with this email already exists')
      } else {
        toast.error(error.message)
      }
      throw error
    }
  }

  // Function to handle user sign in
  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      toast.error('Supabase is not configured')
      return
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      toast.success('Signed in successfully!')
    } catch (error: any) {
      // Handle specific error cases
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Invalid email or password')
      } else {
        toast.error(error.message)
      }
      throw error
    }
  }

  // Function to handle user sign out
  const signOut = async () => {
    if (!supabase) {
      toast.error('Supabase is not configured')
      return
    }

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Signed out successfully!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  // Function to update user profile
  const updateProfile = async (updates: any) => {
    if (!supabase) {
      toast.error('Supabase is not configured')
      return
    }

    try {
      if (!user) throw new Error('No user logged in')

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)

      if (error) throw error
      // Refresh profile data after update
      await fetchProfile(user.id)
      toast.success('Profile updated successfully!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  // Create context value object
  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isConfigured,
  }

  // Provide context to all child components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
