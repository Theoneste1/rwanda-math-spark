
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Problem } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

interface ProblemFilters {
  topic: string
  difficulty: string
  privacy: string
  search: string
}

export const useProblems = (filters: ProblemFilters) => {
  const queryClient = useQueryClient()

  const { data: problems = [], isLoading } = useQuery({
    queryKey: ['problems', filters],
    queryFn: async () => {
      if (!supabase) return []

      let query = supabase
        .from('problems')
        .select(`
          *,
          creator:users(*)
        `)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })

      // Apply filters
      if (filters.topic) {
        query = query.eq('topic', filters.topic)
      }
      
      if (filters.difficulty) {
        query = query.eq('difficulty', filters.difficulty)
      }
      
      if (filters.privacy) {
        query = query.eq('privacy', filters.privacy)
      }
      
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
      queryClient.invalidateQueries({ queryKey: ['problems'] })
      toast.success('Problem created successfully!')
    },
    onError: (error) => {
      console.error('Error creating problem:', error)
      toast.error('Failed to create problem')
    }
  })

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
      queryClient.invalidateQueries({ queryKey: ['problems'] })
      toast.success('Problem updated successfully!')
    },
    onError: (error) => {
      console.error('Error updating problem:', error)
      toast.error('Failed to update problem')
    }
  })

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
      queryClient.invalidateQueries({ queryKey: ['problems'] })
      toast.success('Problem deleted successfully!')
    },
    onError: (error) => {
      console.error('Error deleting problem:', error)
      toast.error('Failed to delete problem')
    }
  })

  return {
    problems,
    isLoading,
    createProblem: createProblemMutation.mutate,
    updateProblem: updateProblemMutation.mutate,
    deleteProblem: deleteProblemMutation.mutate,
    isCreating: createProblemMutation.isPending,
    isUpdating: updateProblemMutation.isPending,
    isDeleting: deleteProblemMutation.isPending
  }
}
