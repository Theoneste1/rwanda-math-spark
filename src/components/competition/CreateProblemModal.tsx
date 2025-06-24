
import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'react-hot-toast'

interface CreateProblemModalProps {
  isOpen: boolean
  onClose: () => void
  onProblemCreated: () => void
}

const CreateProblemModal: React.FC<CreateProblemModalProps> = ({
  isOpen,
  onClose,
  onProblemCreated
}) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    topic: '',
    difficulty: '',
    privacy: 'Public',
    suggested_answer: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('problems')
        .insert({
          ...formData,
          creator_id: user.id
        })

      if (error) throw error

      toast.success('Problem created successfully!')
      onProblemCreated()
      onClose()
      setFormData({
        title: '',
        content: '',
        topic: '',
        difficulty: '',
        privacy: 'Public',
        suggested_answer: ''
      })
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Problem</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              placeholder="Enter problem title"
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Problem Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => updateFormData('content', e.target.value)}
              placeholder="Enter problem content (LaTeX supported)"
              rows={6}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="topic">Topic</Label>
              <Select value={formData.topic} onValueChange={(value) => updateFormData('topic', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
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
              <Select value={formData.difficulty} onValueChange={(value) => updateFormData('difficulty', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
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
            <Select value={formData.privacy} onValueChange={(value) => updateFormData('privacy', value)}>
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
            <Label htmlFor="suggested_answer">Suggested Answer (Optional)</Label>
            <Textarea
              id="suggested_answer"
              value={formData.suggested_answer}
              onChange={(e) => updateFormData('suggested_answer', e.target.value)}
              placeholder="Enter suggested answer"
              rows={3}
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
