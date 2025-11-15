'use client'

import { useState, useEffect } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check localStorage and system preference
    const stored = localStorage.getItem('dark-mode')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const shouldBeDark = stored === 'true' || (stored === null && systemPrefersDark)
    setIsDark(shouldBeDark)
    
    // Apply theme to document and html element
    if (shouldBeDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.style.backgroundColor = 'rgb(18, 18, 18)'
    } else {
      document.documentElement.removeAttribute('data-theme')
      document.documentElement.style.backgroundColor = 'rgb(255, 255, 255)'
    }
  }, [])

  const toggleDarkMode = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    // Save to localStorage
    localStorage.setItem('dark-mode', newIsDark.toString())
    
    // Apply to document and html element
    if (newIsDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.style.backgroundColor = 'rgb(18, 18, 18)'
    } else {
      document.documentElement.removeAttribute('data-theme')
      document.documentElement.style.backgroundColor = 'rgb(255, 255, 255)'
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="px-3 py-2 font-bold uppercase tracking-wide text-black hover:bg-gray-100 text-sm border-3 border-black bg-white"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
