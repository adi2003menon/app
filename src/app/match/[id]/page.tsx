'use client'

import { useParams } from 'next/navigation'
import { Suspense } from 'react'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'

const MOCK_USERS: Record<string, {
  id: string
  name: string
  age: number
  bio: string
  interests: string[]
  distance: number
  commonInterests: number
  verified: boolean
  joined: string
  location: string
  avatar: string | null
}> = {
  '1': {
    id: '1',
    name: 'Sarah Chen',
    age: 28,
    bio: 'Software developer who loves hiking, photography, and coffee culture. Always up for trying new coffee shops and weekend adventures!',
    interests: ['hiking', 'photography', 'coding', 'coffee', 'travel'],
    distance: 5,
    commonInterests: 3,
    verified: true,
    joined: 'January 2024',
    location: 'San Francisco, CA',
    avatar: null
  },
  '2': {
    id: '2',
    name: 'Mike Rodriguez',
    age: 26,
    bio: 'Designer and musician always looking for new friends and adventures. Love creating art and exploring the city.',
    interests: ['design', 'music', 'travel', 'cooking', 'art'],
    distance: 3,
    commonInterests: 2,
    verified: true,
    joined: 'March 2024',
    location: 'San Francisco, CA',
    avatar: null
  }
}

const FRIEND_REQUEST_STATUS: Record<string, 'none' | 'pending' | 'accepted' | 'rejected'> = {
  '1': 'pending', // Sarah - incoming request
  '2': 'accepted', // Mike - already friends
}

function MatchProfileContent() {
  const params = useParams()
  const { user } = useAuth()
  const matchId = params.id as string
  const match = MOCK_USERS[matchId] || MOCK_USERS['1']

  const requestStatus = FRIEND_REQUEST_STATUS[matchId] || 'none'
  const isFriend = requestStatus === 'accepted'
  const hasIncomingRequest = requestStatus === 'pending'

  const commonInterests = user?.interests?.filter((i) => match.interests.includes(i)) || []

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4">
          <a href="/search" className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </a>
          <h1 className="text-lg font-semibold">Profile</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Profile Card */}
          <div className="space-y-6">
            {/* Avatar & Basic Info */}
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 relative">
                <svg className="w-16 h-16 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-6 6h13a7 7 0 00-6-6z" />
                </svg>
                {match.verified && (
                  <span className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{match.name}, {match.age}</h1>
                <p className="text-muted-foreground">{match.location} · {match.distance} km away</p>
              </div>
              {match.verified && (
                <span className="inline-flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.813 0 3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.813 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.813 0A3.066 3.066 0 0110 3.5a3.066 3.066 0 01-1.745-.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.813 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.813 0A3.066 3.066 0 0110 16.5a3.066 3.066 0 011.745.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.813 0 3.066 3.066 0 001.745.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.813 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.813 0A3.066 3.066 0 0110 16.5a3.066 3.066 0 01-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-2.813 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.813 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.813 0A3.066 3.066 0 0110 16.5a3.066 3.066 0 01-1.745.723 3.066 3.066 0 001.745.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.813 0 3.066 3.066 0 001.745.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.813 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.813 0A3.066 3.066 0 0110 16.5a3.066 3.066 0 01-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-2.813 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.813 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.813 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.813 0A3.066 3.066 0 0110 3.5z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
            </div>

            {/* Interests */}
            <div className="flex flex-wrap justify-center gap-2">
              {match.interests.map((interest) => (
                <span key={interest} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                  commonInterests.includes(interest)
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{match.bio}</p>
          </div>

          {/* Common Interests */}
          {commonInterests.length > 0 && (
            <div className="border-t pt-6 space-y-4">
              <h3 className="text-lg font-semibold">Common Interests ({commonInterests.length})</h3>
              <div className="flex flex-wrap gap-2">
                {commonInterests.map((interest) => (
                  <span key={interest} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20">
                    {interest}
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Match Status & Actions */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Connection</h3>

            {isFriend && (
              <div className="space-y-3">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">You're friends with {match.name}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => window.open(`/chat/${match.id}`, '_self')}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Message
                  </Button>
                  <Button variant="outline" onClick={() => {}}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    Call
                  </Button>
                </div>
              </div>
            )}

            {hasIncomingRequest && (
              <div className="space-y-3">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{match.name} sent you a friend request</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => {}}>
                    Accept
                  </Button>
                  <Button variant="destructive" onClick={() => {}}>
                    Decline
                  </Button>
                </div>
              </div>
            )}

            {!isFriend && !hasIncomingRequest && (
              <div className="space-y-3">
                <p className="text-muted-foreground text-center">
                  Connect with {match.name} to start messaging
                </p>
                <Button className="w-full" onClick={() => {}}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Add Friend
                </Button>
              </div>
            )}
          </div>

          {/* Member Since */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Member since {match.joined}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function MatchProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <MatchProfileContent />
    </Suspense>
  )
}