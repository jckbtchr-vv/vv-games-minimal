'use client'

import { useState, useEffect, useRef } from 'react'

const LITERATURE_TEXTS = [
  "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity",
  "Call me Ishmael. Some years ago never mind how long precisely having little or no money in my purse, and nothing particular to interest me on shore",
  "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole",
  "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife",
  "All happy families are alike; each unhappy family is unhappy in its own way. Everything was in confusion in the Oblonskys house",
  "To be, or not to be, that is the question: Whether tis nobler in the mind to suffer the slings and arrows of outrageous fortune",
  "When I wrote the following pages, or rather the bulk of them, I lived alone, in the woods, a mile from any neighbor, in a house which I had built myself",
  "In the beginning was the Word, and the Word was with God, and the Word was God. The same was in the beginning with God"
]

export default function TypingGame() {
  const [words, setWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [completedWords, setCompletedWords] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize game
  useEffect(() => {
    startNewGame()
  }, [])

  // Focus input when game starts
  useEffect(() => {
    if (gameStarted && inputRef.current) {
      inputRef.current.focus()
    }
  }, [gameStarted])

  const startNewGame = () => {
    const randomText = LITERATURE_TEXTS[Math.floor(Math.random() * LITERATURE_TEXTS.length)]
    const wordArray = randomText.split(' ')
    
    setWords(wordArray)
    setCurrentWordIndex(0)
    setUserInput('')
    setIsCorrect(null)
    setCompletedWords(0)
    setStartTime(null)
    setEndTime(null)
    setGameStarted(false)
    setGameCompleted(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setUserInput(value)

    // Start timer on first keystroke
    if (!startTime) {
      setStartTime(Date.now())
      setGameStarted(true)
    }

    const currentWord = words[currentWordIndex]
    
    // Check if current input matches the word so far
    if (currentWord.startsWith(value)) {
      setIsCorrect(value.length === 0 ? null : true)
    } else {
      setIsCorrect(false)
    }

    // Check if word is completed exactly
    if (value === currentWord) {
      // Move to next word immediately
      const nextIndex = currentWordIndex + 1
      setCompletedWords(nextIndex)
      
      if (nextIndex >= words.length) {
        // Game completed
        const endTimeNow = Date.now()
        setEndTime(endTimeNow)
        setGameCompleted(true)
        setGameStarted(false)
      } else {
        setCurrentWordIndex(nextIndex)
        setUserInput('')
        setIsCorrect(null)
      }
    }
  }

  const calculateWPM = () => {
    if (!startTime || !endTime) return 0
    const timeInMinutes = (endTime - startTime) / 60000
    return Math.round(completedWords / timeInMinutes)
  }

  const getCurrentWord = () => words[currentWordIndex] || ''

  return (
    <main className="bg-white">
      {/* Game Spreadsheet Grid */}
      <>
        {/* Row 1: Progress */}
        <div className="border-b border-gray-300 p-6 text-center">
          <div className="text-lg text-gray-400 mono uppercase">
            {currentWordIndex + 1} / {words.length}
          </div>
        </div>

        {/* Row 2: Current Word */}
        <div className="border-b border-gray-300 p-8 text-center">
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-5xl md:text-6xl font-bold mono break-all leading-tight text-center max-w-full">
              {getCurrentWord()}
            </div>
          </div>
        </div>

        {/* Row 3: Input Field */}
        <div className="border-b border-gray-300 p-6 text-center">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className={`w-full text-3xl md:text-4xl text-center p-4 border-0 border-b-4 bg-transparent font-mono ${
              isCorrect === null
                ? 'border-gray-300'
                : isCorrect
                ? 'border-green-500'
                : 'border-red-500'
            } focus:outline-none focus:border-black`}
            placeholder="type here"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
        </div>

        {/* Row 4: Game Complete */}
        {gameCompleted && (
          <>
            <div className="border-b border-gray-300 p-8 text-center">
              <div className="text-5xl font-bold mono">
                {calculateWPM()} WPM
              </div>
            </div>
            <div className="p-6 text-center">
              <button
                onClick={startNewGame}
                className="brutalist-button text-lg"
              >
                AGAIN
              </button>
            </div>
          </>
        )}
      </>
    </main>
  )
}
