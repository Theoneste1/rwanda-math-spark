import React from 'react'
// Import UI components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Props interface for the ProblemFilters component
interface ProblemFiltersProps {
  filters: {
    topic: string      // Current topic filter value
    difficulty: string // Current difficulty filter value
    privacy: string    // Current privacy filter value
    search: string     // Current search query
  }
  onFiltersChange: (filters: any) => void // Callback when filters change
}

// Component for filtering problems list
const ProblemFilters: React.FC<ProblemFiltersProps> = ({ filters, onFiltersChange }) => {
  // Helper function to update a single filter value
  const updateFilter = (key: string, value: string) => {
    // Convert "all" values back to empty strings for the actual filter
    // This is needed because Select component can't have empty string values
    const filterValue = value === 'all' ? '' : value
    onFiltersChange({ ...filters, [key]: filterValue })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search input field */}
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search problems..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
          />
        </div>

        {/* Topic filter dropdown */}
        <div>
          <Label htmlFor="topic">Topic</Label>
          <Select value={filters.topic || 'all'} onValueChange={(value) => updateFilter('topic', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All topics" />
            </SelectTrigger>
            <SelectContent>
              {/* "All" option to clear filter */}
              <SelectItem value="all">All topics</SelectItem>
              {/* Specific topic options */}
              <SelectItem value="Combinatorics">Combinatorics</SelectItem>
              <SelectItem value="Number Theory">Number Theory</SelectItem>
              <SelectItem value="Geometry">Geometry</SelectItem>
              <SelectItem value="Other Olympiad">Other Olympiad</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty filter dropdown */}
        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select value={filters.difficulty || 'all'} onValueChange={(value) => updateFilter('difficulty', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All difficulties" />
            </SelectTrigger>
            <SelectContent>
              {/* "All" option to clear filter */}
              <SelectItem value="all">All difficulties</SelectItem>
              {/* Specific difficulty options */}
              <SelectItem value="Juniors">Juniors</SelectItem>
              <SelectItem value="Seniors">Seniors</SelectItem>
              <SelectItem value="PAMO">PAMO</SelectItem>
              <SelectItem value="IMO">IMO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Privacy filter dropdown */}
        <div>
          <Label htmlFor="privacy">Privacy</Label>
          <Select value={filters.privacy} onValueChange={(value) => updateFilter('privacy', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select privacy" />
            </SelectTrigger>
            <SelectContent>
              {/* Privacy options */}
              <SelectItem value="Public">Public</SelectItem>
              <SelectItem value="Private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProblemFilters
