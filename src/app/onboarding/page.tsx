'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const INTERESTS = [
  'coding', 'music', 'travel', 'cooking', 'gaming', 'reading',
  'photography', 'hiking', 'fitness', 'movies', 'art', 'food',
  'science', 'history', 'fashion', 'sports', 'dancing', 'writing'
]

export default function OnboardingPage() {
  const { register, user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: '',
    interests: [] as string[],
  })
  const [newInterest, setNewInterest] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const addInterest = () => {
    const interest = newInterest.trim().toLowerCase()
    if (interest && !formData.interests.includes(interest) && formData.interests.length < 5) {
      setFormData(prev => ({ ...prev, interests: [...prev.interests, interest] }))
      setNewInterest('')
    }
  }

  const removeInterest = (interest: string) => {
    setFormData(prev => ({ ...prev, interests: prev.interests.filter(i => i !== interest) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Update user profile (mock)
    const updatedUser = {
      ...formData,
      profilePhotoUrl: '',
      verified: true,
      privacyLevel: 'anyone'
    }

    localStorage.setItem('mock_user', JSON.stringify({
      ...JSON.parse(localStorage.getItem('mock_user') || '{}'),
      ...updatedUser
    }))

    setIsLoading(false)
    router.push('/home')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newInterest.trim()) {
      e.preventDefault()
      addInterest()
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4">
          <span className="text-2xl font-bold text-primary">Kauthuk</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Complete Your Profile</h1>
            <p className="text-sm text-muted-foreground">
              Help others get to know you better
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <label className="cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20">
                  <svg className="w-8 h-8 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h12z" />
                  </svg>
                </div>
                <input type="file" accept="image/*" className="hidden" />
              </label>
              <p className="text-sm text-muted-foreground">Add a photo (optional)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">{formData.bio.length}/200</p>
            </div>

            <div className="space-y-2">
              <Label>Interests (max 5)</Label>
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest, index) => (
                  <span key={index} className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {interest}
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add interest (press Enter)"
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={addInterest} disabled={!newInterest.trim() || formData.interests.length >= 5}>
                  Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {formData.interests.length}/5 interests
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Complete Profile'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            You can update this later in Settings
          </p>
        </div>
      </main>
    </div>
  )
}