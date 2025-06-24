
import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Problem } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

interface CreateProblemModalProps {
  isOpen: boolean
  onClose: () => void
  onProblemCreated: () => void
  onSubmit: (problemData: Omit<Problem, 'id' | 'created_at' | 'updated_at' | 'creator'>) => void
}

const CreateProblemModal: React.FC<CreateProblemModalProps> = ({
  isOpen,
  onClose,
  onProblemCreated,
  onSubmit
}) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    topic: 'Combinatorics' as Problem['topic'],
    difficulty: 'Juniors' as Problem['difficulty'],
    privacy: 'Public' as Problem['privacy'],
    suggested_answer: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error('You must be logged in to create a problem')
      return
    }

    if (!formData.title || !formData.content) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      await onSubmit({
        ...formData,
        creator_id: user.id,
        images: [],
        deleted_at: undefined
      })
      
      setFormData({
        title: '',
        content: '',
        topic: 'Combinatorics',
        difficulty: 'Juniors',
        privacy: 'Public',
        suggested_answer: ''
      })
      onProblemCreated()
    } catch (error) {
      console.error('Error creating problem:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Problem</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter problem title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="topic">Topic</Label>
              <Select 
                value={formData.topic} 
                onValueChange={(value: Problem['topic']) => setFormData({ ...formData, topic: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Combinatorics">Combinatorics</SelectItem>
                  <SelectItem value="Number Theory">Number Theory</SelectItem>
                  <SelectItem value="Geometry">Geometry</SelectItem>
                  <SelectItem value="Other Olympiad">Other Olympiad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select 
                value={formData.difficulty} 
                onValueChange={(value: Problem['difficulty']) => setFormData({ ...formData, difficulty: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Juniors">Juniors</SelectItem>
                  <SelectItem value="Seniors">Seniors</SelectItem>
                  <SelectItem value="PAMO">PAMO</SelectItem>
                  <SelectItem value="IMO">IMO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="privacy">Privacy</Label>
            <Select 
              value={formData.privacy} 
              onValueChange={(value: Problem['privacy']) => setFormData({ ...formData, privacy: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Public">Public</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="content">Problem Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Enter the problem statement..."
              rows={6}
              required
            />
          </div>

          <div>
            <Label htmlFor="suggested_answer">Suggested Answer (Optional)</Label>
            <Textarea
              id="suggested_answer"
              value={formData.suggested_answer}
              onChange={(e) => setFormData({ ...formData, suggested_answer: e.target.value })}
              placeholder="Enter your suggested solution..."
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Problem'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProblemModal
