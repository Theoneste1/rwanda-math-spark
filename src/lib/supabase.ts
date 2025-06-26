
// Import Supabase client creation function
import { createClient } from '@supabase/supabase-js'

// Supabase project configuration
const supabaseUrl = 'https://kbohoyihfkdrhjckuosv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtib2hveWloZmtkcmhqY2t1b3N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MDEwMDIsImV4cCI6MjA2NjM3NzAwMn0.AbKeDOr4Gf4LD-ds9MrGqj66FG9gdbUu4ztMCoXOlTQ'

// Create and configure Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Use localStorage for session persistence (only in browser environment)
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,        // Keep user logged in across browser sessions
    autoRefreshToken: true,      // Automatically refresh expired tokens
  }
})

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey)
}

// ========== DATABASE TYPE DEFINITIONS ==========

// User table type definition
export interface User {
  id: string                    // Unique user identifier (UUID)
  username: string             // User's display name
  email: string               // User's email address
  profile_image_url?: string  // Optional profile picture URL
  created_at: string          // Account creation timestamp
}

// Problem table type definition
export interface Problem {
  id: string                   // Unique problem identifier (UUID)
  title: string               // Problem title
  content: string             // Problem description/statement
  images?: string[]           // Optional array of image URLs
  topic: 'Combinatorics' | 'Number Theory' | 'Geometry' | 'Other Olympiad' // Mathematics topic
  difficulty: 'Juniors' | 'Seniors' | 'PAMO' | 'IMO'                      // Competition level
  privacy: 'Public' | 'Private'                                            // Visibility setting
  suggested_answer?: string    // Optional suggested solution
  creator_id: string          // ID of user who created the problem
  creator?: User              // Populated creator user data (from join)
  created_at: string          // Problem creation timestamp
  updated_at: string          // Last modification timestamp
  deleted_at?: string         // Soft delete timestamp (null if not deleted)
}

// Comment table type definition
export interface Comment {
  id: string                  // Unique comment identifier (UUID)
  problem_id: string         // ID of problem this comment belongs to
  parent_comment_id?: string // ID of parent comment (for nested replies)
  content: string            // Comment text content
  creator_id: string         // ID of user who wrote the comment
  creator?: User             // Populated creator user data (from join)
  created_at: string         // Comment creation timestamp
  replies?: Comment[]        // Nested reply comments
}

// Answer table type definition
export interface Answer {
  id: string           // Unique answer identifier (UUID)
  problem_id: string   // ID of problem this answer belongs to
  content: string      // Answer content/solution
  creator_id: string   // ID of user who submitted the answer
  creator?: User       // Populated creator user data (from join)
  created_at: string   // Answer submission timestamp
}

// Reaction table type definition (for likes, votes, etc.)
export interface Reaction {
  id: string                                           // Unique reaction identifier (UUID)
  target_type: 'Problem' | 'Comment' | 'Answer'      // What type of content is being reacted to
  target_id: string                                   // ID of the target content
  emoji: 'like' | 'love' | 'laugh' | 'smile' | 'upvote' | 'downvote' // Reaction type
  creator_id: string                                  // ID of user who made the reaction
  created_at: string                                  // Reaction timestamp
}
