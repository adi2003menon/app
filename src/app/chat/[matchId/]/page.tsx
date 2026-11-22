'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

const MOCK_MESSAGES = [
  { id: '1', senderId: '2', content: "Hey! How's it going?", timestamp: '2024-01-15T10:30:00Z', type: 'text' },
  { id: '2', senderId: '1', content: 'Pretty good! Just finished a project.', timestamp: '2024-01-15T10:32:00Z', type: 'text' },
  { id: '3', senderId: '2', content: "That's awesome! What kind of project?", timestamp: '2024-01-15T10:33:00Z', type: 'text' },
  { id: '4', senderId: '1', content: 'A new mobile app for habit tracking.', timestamp: '2024-01-15T10:35:00Z', type: 'text' },
  { id: '5', senderId: '2', content: "Nice! I've been wanting to build something like that.", timestamp: '2024-01-15T10:36:00Z', type: 'text' },
]

const MATCH_USERS: Record<string, { id: string; name: string; avatar: string | null }> = {
  '1': { id: '1', name: 'Sarah Chen', avatar: null },
  '2': { id: '2', name: 'Mike Rodriguez', avatar: null },
}

export default function ChatPage() {
  const params = useParams()
  const { user } = useAuth()
  const router = useRouter()
  const matchId = params.matchId as string
  const matchName = MATCH_USERS[matchId]?.name || 'User'

  const [messages, setMessages] = useState<typeof MOCK_MESSAGES>(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const currentUserId = user?.id || '1'

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isLoading) return

    const newMsg = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      type: 'text' as const
    }

    setMessages(prev => [...prev, newMsg])
    setNewMessage('')
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 2000)
    }, 500)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const isOwnMessage = (senderId: string) => senderId === currentUserId

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/home" className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-6 6h13a7 7 0 00-6-6z" />
              </svg>
            </div>
            <div className="hidden sm:block text-left">
              <p className="font-medium truncate">{matchName}</p>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="max-w-2xl mx-auto w-full space-y-4" ref={messagesEndRef}>
            {messages.map((message) => {
              const own = isOwnMessage(message.senderId)
              return (
                <div key={message.id} className={`flex ${own ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] ${own ? 'text-right' : 'text-left'}`}>
                    {!own && (
                      <div className="flex items-end gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-6 6h13a7 7 0 00-6-6z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className={`inline-block max-w-[80%] px-4 py-2 rounded-2xl ${own
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-muted text-muted-foreground rounded-tl-sm'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs opacity-60">
                        <span>{formatTime(message.timestamp)}</span>
                        {own && <span>✓✓</span>}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {isTyping && (
          <div className="px-4 py-2 text-center text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="ml-1">typing...</span>
            </span>
          </div>
        )}

        <div className="border-t p-4 bg-background">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message..."
                className="pr-12"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e as unknown as React.FormEvent)
                  }
                }}
              />
              {newMessage && (
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  disabled={isLoading}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}