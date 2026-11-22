'use client'

import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { CheckIcon } from 'lucide-react'

const MOCK_USERS = [
  { id: '3', name: 'Alex Kim', age: 25, bio: 'Photographer and nature lover', interests: ['photography', 'hiking', 'travel'], distance: 8, verified: true },
  { id: '4', name: 'Jordan Lee', age: 29, bio: 'Software engineer, coffee enthusiast', interests: ['coding', 'coffee', 'gaming'], distance: 12, verified: true },
  { id: '5', name: 'Taylor Swift', age: 27, bio: 'Music lover, concert goer', interests: ['music', 'concerts', 'travel'], distance: 15, verified: true },
  { id: '6', name: 'Casey Jordan', age: 31, bio: 'Chef and food blogger', interests: ['cooking', 'food', 'writing'], distance: 6, verified: false },
  { id: '7', name: 'Riley Chen', age: 24, bio: 'Student, love learning new things', interests: ['reading', 'science', 'coding'], distance: 4, verified: true },
  { id: '8', name: 'Morgan Taylor', age: 28, bio: 'Designer and artist', interests: ['design', 'art', 'illustration'], distance: 10, verified: true },
]

function VerifiedBadge({ verified }: { verified: boolean }) {
  if (!verified) return null
  return (
    <span className="text-green-600 text-xs flex items-center gap-1">
      <CheckIcon className="w-3 h-3" />
      Verified
    </span>
  )
}

function UserCard({ user }: { user: typeof MOCK_USERS[0] }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border-2 border-primary/20">
            <svg className="w-8 h-8 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-6 6h13a7 7 0 00-6-6z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{user.name}, {user.age}</h3>
              <VerifiedBadge verified={user.verified} />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{user.bio}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {user.interests.slice(0, 3).map((interest) => (
                <span key={interest} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {interest}
                </span>
              ))}
              {user.interests.length > 3 && (
                <span className="text-xs text-muted-foreground">+{user.interests.length - 3} more</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <span>{user.distance} km away</span>
              <VerifiedBadge verified={user.verified} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SearchPage() {
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({
    ageMin: 18,
    ageMax: 80,
    maxDistance: 100,
    interests: [] as string[],
  })
  const [showFilters, setShowFilters] = useState(false)
  const [results, setResults] = useState<typeof MOCK_USERS>(MOCK_USERS)
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => {
      let filtered = MOCK_USERS

      if (query) {
        const q = query.toLowerCase()
        filtered = filtered.filter(u =>
          u.name.toLowerCase().includes(q) ||
          u.bio.toLowerCase().includes(q) ||
          u.interests.some(i => i.toLowerCase().includes(q))
        )
      }

      filtered = filtered.filter(u => u.distance <= filters.maxDistance)

      if (filters.interests.length > 0) {
        filtered = filtered.filter(u =>
          filters.interests.some(i => u.interests.includes(i))
        )
      }

      setResults(filtered)
      setLoading(false)
    }, 300)
  }

  const allInterests = Array.from(new Set(MOCK_USERS.flatMap(u => u.interests))).sort()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold">Find Friends</h1>
          <Button variant="ghost" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.293V4z" />
            </svg>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <div className="p-4 border-b sticky top-16 z-40 bg-background/80 backdrop-blur">
          <div className="relative max-w-3xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, interest, bio..."
                  className="pl-10"
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
                />
              </div>
              <Button onClick={handleSearch} disabled={!query.trim() && !showFilters}>
                Search
              </Button>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="p-4 border-b bg-background/50">
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={() => {
                  setFilters({ ageMin: 18, ageMax: 80, maxDistance: 100, interests: [] })
                  setQuery('')
                  setResults(MOCK_USERS)
                }}>
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Max Distance (km)</Label>
                  <Input
                    type="number"
                    value={filters.maxDistance}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxDistance: parseInt(e.target.value) || 100 }))}
                    min={1}
                    max={500}
                  />
                </div>
                <div>
                  <Label>Age Range</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.ageMin}
                      onChange={(e) => setFilters(prev => ({ ...prev, ageMin: parseInt(e.target.value) || 18 }))}
                      min={18}
                      max={80}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.ageMax}
                      onChange={(e) => setFilters(prev => ({ ...prev, ageMax: parseInt(e.target.value) || 80 }))}
                      min={18}
                      max={80}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {allInterests.map((interest) => (
                    <Button
                      key={interest}
                      variant={filters.interests.includes(interest) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        interests: prev.interests.includes(interest)
                          ? prev.interests.filter(i => i !== interest)
                          : [...prev.interests, interest]
                      }))
                    }>
                      {interest}
                    </Button>
                  ))}
                </div>
              </div>

              <Button className="w-full" onClick={handleSearch}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}

        <div className="flex-1 p-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 bg-muted rounded w-3/4 animate-pulse" />
                        <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
              <svg className="w-16 h-16 mb-4 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-semibold">No matches found</h3>
              <p>Try adjusting your search or filters</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setQuery('')
                setFilters({ ageMin: 18, ageMax: 80, maxDistance: 100, interests: [] })
                setResults(MOCK_USERS)
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {results.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}