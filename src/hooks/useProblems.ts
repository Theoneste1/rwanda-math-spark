
import { useState, useEffect } from 'react'
// Import React Query hooks for data fetching and caching
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// Import Supabase client
import { supabase } from '@/integrations/supabase/client'
// Import Problem type definition
import { Problem } from '@/lib/supabase'
// Import toast notifications
import { toast } from 'react-hot-toast'

// Interface for filtering problems
interface ProblemFilters {
  topic: string       // Filter by mathematics topic
  difficulty: string  // Filter by difficulty level
  privacy: string     // Filter by public/private status
  search: string      // Text search in title and content
}

// Custom hook for managing problems data and operations
export const useProblems = (filters: ProblemFilters) => {
  // Get query client for cache invalidation
  const queryClient = useQueryClient()

  // Query to fetch problems with filters applied
  const { data: problems = [], isLoading } = useQuery({
    queryKey: ['problems', filters], // Cache key includes filters for proper invalidation
    queryFn: async () => {
      // Return empty array if Supabase is not available
      if (!supabase) return []

      // Start building the query
      let query = supabase
        .from('problems')
        .select(`
          *,
          creator:users(*)
        `) // Select problem data and join with creator user data
        .is('deleted_at', null) // Only get non-deleted problems
        .order('created_at', { ascending: false }) // Newest first

      // Apply topic filter if specified
      if (filters.topic) {
        query = query.eq('topic', filters.topic)
      }
      
      // Apply difficulty filter if specified
      if (filters.difficulty) {
        query = query.eq('difficulty', filters.difficulty)
      }
      
      // Apply privacy filter if specified
      if (filters.privacy) {
        query = query.eq('privacy', filters.privacy)
      }
      
      // Apply text search if specified
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching problems:', error)
        throw error
      }

      return data as Problem[]
    }
  })

  // Mutation for creating new problems
  const createProblemMutation = useMutation({
    mutationFn: async (problemData: Omit<Problem, 'id' | 'created_at' | 'updated_at' | 'creator'>) => {
      if (!supabase) throw new Error('Supabase not initialized')

      const { data, error } = await supabase
        .from('problems')
        .insert(problemData)
        .select('*')
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      // Invalidate and refetch problems list
      queryClient.invalidateQueries({ queryKey: ['problems'] })
      toast.success('Problem created successfully!')
    },
    onError: (error) => {
      console.error('Error creating problem:', error)
      toast.error('Failed to create problem')
    }
  })

  // Mutation for updating existing problems
  const updateProblemMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Problem> & { id: string }) => {
      if (!supabase) throw new Error('Supabase not initialized')

      const { data, error } = await supabase
        .from('problems')
        .update(updates)
        .eq('id', id)
        .select('*')
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      // Invalidate and refetch problems list
      queryClient.invalidateQueries({ queryKey: ['problems'] })
      toast.success('Problem updated successfully!')
    },
    onError: (error) => {
      console.error('Error updating problem:', error)
      toast.error('Failed to update problem')
    }
  })

  // Mutation for soft-deleting problems (sets deleted_at timestamp)
  const deleteProblemMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!supabase) throw new Error('Supabase not initialized')

      const { error } = await supabase
        .from('problems')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      // Invalidate and refetch problems list
      queryClient.invalidateQueries({ queryKey: ['problems'] })
      toast.success('Problem deleted successfully!')
    },
    onError: (error) => {
      console.error('Error deleting problem:', error)
      toast.error('Failed to delete problem')
    }
  })

  // Return all data and functions for use in components
  return {
    problems,                                    // Array of problems
    isLoading,                                  // Loading state for initial fetch
    createProblem: createProblemMutation.mutate, // Function to create new problem
    updateProblem: updateProblemMutation.mutate, // Function to update problem
    deleteProblem: deleteProblemMutation.mutate, // Function to delete problem
    isCreating: createProblemMutation.isPending, // Loading state for create operation
    isUpdating: updateProblemMutation.isPending, // Loading state for update operation
    isDeleting: deleteProblemMutation.isPending  // Loading state for delete operation
  }
}
