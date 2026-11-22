import type { ReactNode } from 'react'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

export const metadata = {
  title: 'Kauthuk',
  description: 'Join Kauthuk for 100% Real Friendships. Private and Secure Online Calls',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
