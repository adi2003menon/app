'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function OnboardingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-semibold">Welcome to Kauthuk</h1>
      <p className="text-muted-foreground">Let's set up your profile.</p>
      <Button asChild>
        <Link href="/home">Continue</Link>
      </Button>
    </main>
  )
}