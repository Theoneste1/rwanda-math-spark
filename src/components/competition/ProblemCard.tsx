import React from 'react'
import { Link } from 'react-router-dom'
// Import Problem type and UI components
import { Problem } from '@/lib/supabase'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Lock, Globe } from 'lucide-react'

// Props interface for ProblemCard component
interface ProblemCardProps {
  problem: Problem        // Problem data to display
  onUpdate: () => void   // Callback when problem is updated
}

// Component to display a single problem in card format
const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  // Function to get color classes based on difficulty level
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Juniors': return 'bg-green-100 text-green-800'
      case 'Seniors': return 'bg-blue-100 text-blue-800'
      case 'PAMO': return 'bg-orange-100 text-orange-800'
      case 'IMO': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Function to get color classes based on topic
  const getTopicColor = (topic: string) => {
    switch (topic) {
      case 'Combinatorics': return 'bg-purple-100 text-purple-800'
      case 'Number Theory': return 'bg-indigo-100 text-indigo-800'
      case 'Geometry': return 'bg-cyan-100 text-cyan-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          {/* Problem title as clickable link */}
          <Link 
            to={`/competition/problem/${problem.id}`}
            className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            {problem.title}
          </Link>
          
          {/* Privacy indicator icon */}
          <div className="flex items-center gap-2">
            {problem.privacy === 'Private' ? (
              <Lock className="h-4 w-4 text-gray-500" />
            ) : (
              <Globe className="h-4 w-4 text-gray-500" />
            )}
          </div>
        </div>
        
        {/* Badges for difficulty and topic */}
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge className={getDifficultyColor(problem.difficulty)}>
            {problem.difficulty}
          </Badge>
          <Badge className={getTopicColor(problem.topic)}>
            {problem.topic}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Problem content preview (truncated) */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {problem.content.substring(0, 200)}...
        </p>
        
        {/* Problem metadata (creator and date) */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            {/* Creator info */}
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {problem.creator?.username || 'Unknown'}
            </div>
            {/* Creation date */}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(problem.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProblemCard
