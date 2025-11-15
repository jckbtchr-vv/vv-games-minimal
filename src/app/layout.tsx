import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Infinite Games - Minimal Games for Focus & Learning',
  description: 'Infinite collection of minimal games. Literature typing, math grids, and more. Pure focus, zero distractions.',
  keywords: ['games', 'minimal', 'focus', 'learning', 'math', 'typing', 'literature'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
          <nav className="bg-black sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center">
                <span className="text-lg font-bold mono uppercase text-white">
                  INFINITE GAMES
                </span>
              </a>
            </div>
          </div>
        </nav>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
