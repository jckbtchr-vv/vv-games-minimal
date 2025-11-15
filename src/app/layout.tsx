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
        <nav className="bg-white border-b-3 border-black sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center">
                <span className="text-2xl font-bold mono uppercase tracking-wider">
                  INFINITE GAMES
                </span>
              </a>
              <div className="flex items-center space-x-4">
                <a href="/" className="px-4 py-2 font-bold uppercase tracking-wide text-black hover:bg-gray-100">
                  Games
                </a>
                <a href="/typing" className="px-4 py-2 font-bold uppercase tracking-wide text-black hover:bg-gray-100">
                  Typing
                </a>
                <a href="/math" className="px-4 py-2 font-bold uppercase tracking-wide text-black hover:bg-gray-100">
                  Math
                </a>
              </div>
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
