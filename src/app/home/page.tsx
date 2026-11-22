'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock matches data
const mockMatches = [
  {
    id: '1',
    name: 'Sarah Chen',
    bio: 'Software developer who loves hiking and photography',
    interests: ['hiking', 'photography', 'coding', 'coffee'],
    profilePhoto: '/placeholder.svg',
    age: 28,
    distance: 5,
    commonInterests: 3
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    bio: 'Designer and musician, always looking for new friends',
    interests: ['design', 'music', 'travel', 'cooking'],
    profilePhoto: '/placeholder.svg',
    age: 26,
    distance: 3,
    commonInterests: 2
  }
]

export default function HomePage() {
  const { user, logout } = useAuth()
  const [matches] = useState(mockMatches)
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* App Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-lg font-semibold">Kauthuk</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              🔍
            </Button>
            <Button variant="ghost" size="sm">
              ⚙️
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          Suggested for You
        </h2>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                      <div className="h-3 bg-muted rounded w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No matches yet. Start exploring to find friends!
            </p>
            <Button>Find Friends</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <Card key={match.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded-full bg-muted flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">
                        {match.name}, {match.age}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {match.bio}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {match.interests.slice(0, 3).map((interest) => (
                          <span
                            key={interest}
                            className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {match.distance} km away · {match.commonInterests} common interests
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button className="flex-1" asChild>
                      <Link href={`/match/${match.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
