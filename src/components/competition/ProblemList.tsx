
import React from 'react'
import { Problem } from '@/lib/supabase'
import ProblemCard from './ProblemCard'

interface ProblemListProps {
  problems: Problem[]
  loading: boolean
  onProblemUpdate: () => void
}

const ProblemList: React.FC<ProblemListProps> = ({ problems, loading, onProblemUpdate }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  if (problems.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No problems found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters or create a new problem.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <ProblemCard 
          key={problem.id} 
          problem={problem} 
          onUpdate={onProblemUpdate}
        />
      ))}
    </div>
  )
}

export default ProblemList
