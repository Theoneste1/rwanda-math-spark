
import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useProblems } from '@/hooks/useProblems'
import ProblemList from '@/components/competition/ProblemList'
import ProblemFilters from '@/components/competition/ProblemFilters'
import CreateProblemModal from '@/components/competition/CreateProblemModal'
import { Button } from '@/components/ui/button'
import { Plus, Database, LogIn } from 'lucide-react'
import { Link } from 'react-router-dom'

const Competition = () => {
  const { user, isConfigured } = useAuth()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filters, setFilters] = useState({
    topic: '',
    difficulty: '',
    privacy: 'Public',
    search: ''
  })

  const { problems, isLoading, createProblem } = useProblems(filters)

  const handleProblemCreated = () => {
    setShowCreateModal(false)
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center py-12">
            <Database className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Supabase Configuration Required
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
              To use the competition platform, you need to configure your Supabase environment variables.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Mathematics Competition
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
              Solve challenging problems and share your solutions
            </p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {!user && (
              <Link to="/auth" className="flex-1 sm:flex-none">
                <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto text-sm sm:text-base">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
            {user && (
              <Button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 flex-1 sm:flex-none text-sm sm:text-base"
              >
                <Plus className="h-4 w-4" />
                Create Problem
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="lg:col-span-1">
            <ProblemFilters filters={filters} onFiltersChange={setFilters} />
          </div>
          <div className="lg:col-span-3">
            <ProblemList 
              problems={problems} 
              loading={isLoading}
              onProblemUpdate={() => {}}
            />
          </div>
        </div>

        {showCreateModal && (
          <CreateProblemModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onProblemCreated={handleProblemCreated}
            onSubmit={createProblem}
          />
        )}
      </div>
    </div>
  )
}

export default Competition
