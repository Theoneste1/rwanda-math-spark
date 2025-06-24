
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ProblemFiltersProps {
  filters: {
    topic: string
    difficulty: string
    privacy: string
    search: string
  }
  onFiltersChange: (filters: any) => void
}

const ProblemFilters: React.FC<ProblemFiltersProps> = ({ filters, onFiltersChange }) => {
  const updateFilter = (key: string, value: string) => {
    // Convert "all" values back to empty strings for the actual filter
    const filterValue = value === 'all' ? '' : value
    onFiltersChange({ ...filters, [key]: filterValue })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <div>
          <Label htmlFor="topic">Topic</Label>
          <Select value={filters.topic || 'all'} onValueChange={(value) => updateFilter('topic', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All topics" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All topics</SelectItem>
              <SelectItem value="Combinatorics">Combinatorics</SelectItem>
              <SelectItem value="Number Theory">Number Theory</SelectItem>
              <SelectItem value="Geometry">Geometry</SelectItem>
              <SelectItem value="Other Olympiad">Other Olympiad</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select value={filters.difficulty || 'all'} onValueChange={(value) => updateFilter('difficulty', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All difficulties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All difficulties</SelectItem>
              <SelectItem value="Juniors">Juniors</SelectItem>
              <SelectItem value="Seniors">Seniors</SelectItem>
              <SelectItem value="PAMO">PAMO</SelectItem>
              <SelectItem value="IMO">IMO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="privacy">Privacy</Label>
          <Select value={filters.privacy} onValueChange={(value) => updateFilter('privacy', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select privacy" />
            </SelectTrigger>
            <SelectContent>
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
