
import React from 'react'
// Import Problem type and ProblemCard component
import { Problem } from '@/lib/supabase'
import ProblemCard from './ProblemCard'

// Props interface for ProblemList component
interface ProblemListProps {
  problems: Problem[]        // Array of problems to display
  loading: boolean          // Loading state indicator
  onProblemUpdate: () => void // Callback when a problem is updated
}

// Component to display a list of problems
const ProblemList: React.FC<ProblemListProps> = ({ problems, loading, onProblemUpdate }) => {
  // Show loading skeleton while data is being fetched
  if (loading) {
    return (
      <div className="space-y-4">
        {/* Create 5 loading skeleton cards */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
            {/* Skeleton for title */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            {/* Skeleton for metadata */}
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            {/* Skeleton for content preview */}
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  // Show empty state when no problems match the current filters
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

  // Render the list of problems
  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <ProblemCard 
          key={problem.id} 
          problem={problem} 
          onUpdate={onProblemUpdate} // Pass update callback to each card
        />
      ))}
    </div>
  )
}

export default ProblemList
