'use client'

import Link from 'next/link'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type Match = {
  id: string
  name: string
  bio: string
  interests: string[]
  age: number
  distance: number
  commonInterests: number
}

// Mock matches data
const mockMatches: Match[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    bio: 'Software developer who loves hiking and photography',
    interests: ['hiking', 'photography', 'coding', 'coffee'],
    age: 28,
    distance: 5,
    commonInterests: 3,
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    bio: 'Designer and musician, always looking for new friends',
    interests: ['design', 'music', 'travel', 'cooking'],
    age: 26,
    distance: 3,
    commonInterests: 2,
  },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function MatchCard({ match }: { match: Match }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-semibold">
            {getInitials(match.name)}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold">
              {match.name}, {match.age}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {match.bio}
            </p>

            <div className="mt-2 flex flex-wrap gap-1">
              {match.interests.slice(0, 3).map((interest) => (
                <span
                  key={interest}
                  className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent"
                >
                  {interest}
                </span>
              ))}
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
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
  )
}

function LoadingCards() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-16 w-16 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function HomePage() {
  const { user, logout } = useAuth()
  const matches = mockMatches
  const loading = false

  let content

  if (loading) {
    content = <LoadingCards />
  } else if (matches.length === 0) {
    content = (
      <div className="py-12 text-center">
        <p className="mb-4 text-muted-foreground">
          No matches yet. Start exploring to find friends!
        </p>
        <Button>Find Friends</Button>
      </div>
    )
  } else {
    content = (
      <div className="space-y-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    )
  }

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
            {user && (
              <Button variant="outline" size="sm" onClick={() => logout()}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <h2 className="mb-4 text-xl font-semibold">Suggested for You</h2>
        {content}
      </main>
    </div>
  )
}