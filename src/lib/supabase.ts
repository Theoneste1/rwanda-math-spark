
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Only create Supabase client if both URL and key are provided
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey)
}

// Database types
export interface User {
  id: string
  username: string
  email: string
  profile_image_url?: string
  created_at: string
}

export interface Problem {
  id: string
  title: string
  content: string
  images?: string[]
  topic: 'Combinatorics' | 'Number Theory' | 'Geometry' | 'Other Olympiad'
  difficulty: 'Juniors' | 'Seniors' | 'PAMO' | 'IMO'
  privacy: 'Public' | 'Private'
  suggested_answer?: string
  creator_id: string
  creator?: User
  created_at: string
  updated_at: string
  deleted_at?: string
}

export interface Comment {
  id: string
  problem_id: string
  parent_comment_id?: string
  content: string
  creator_id: string
  creator?: User
  created_at: string
  replies?: Comment[]
}

export interface Answer {
  id: string
  problem_id: string
  content: string
  creator_id: string
  creator?: User
  created_at: string
}

export interface Reaction {
  id: string
  target_type: 'Problem' | 'Comment' | 'Answer'
  target_id: string
  emoji: 'like' | 'love' | 'laugh' | 'smile' | 'upvote' | 'downvote'
  creator_id: string
  created_at: string
}
