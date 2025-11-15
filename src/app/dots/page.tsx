'use client'

import { useState, useEffect } from 'react'

interface Dot {
  id: number
  x: number
  y: number
}

export default function DotCounterGame() {
  const [dots, setDots] = useState<Dot[]>([])
  const [showDots, setShowDots] = useState(false)
  const [userGuess, setUserGuess] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [flashDuration, setFlashDuration] = useState(1000) // Start with 1 second

  const generateDots = () => {
    const numDots = Math.floor(Math.random() * 15) + 3 // 3-17 dots
    const newDots: Dot[] = []
    
    for (let i = 0; i < numDots; i++) {
      // Generate random positions, ensuring dots don't overlap too much
      let attempts = 0
      let validPosition = false
      let x, y
      
      while (!validPosition && attempts < 50) {
        x = Math.random() * 80 + 10 // 10-90% of container width
        y = Math.random() * 80 + 10 // 10-90% of container height
        
        // Check if position is far enough from existing dots
        validPosition = newDots.every(dot => {
          const distance = Math.sqrt(Math.pow(dot.x - x!, 2) + Math.pow(dot.y - y!, 2))
          return distance > 8 // Minimum distance between dots
        })
        
        attempts++
      }
      
      newDots.push({
        id: i,
        x: x || Math.random() * 80 + 10,
        y: y || Math.random() * 80 + 10
      })
    }
    
    setDots(newDots)
    setCorrectAnswer(numDots)
  }

  const startNewRound = () => {
    generateDots()
    setUserGuess('')
    setShowResult(false)
    setIsCorrect(null)
    
    // Show dots for the flash duration
    setShowDots(true)
    setTimeout(() => {
      setShowDots(false)
    }, flashDuration)
  }

  const startNewGame = () => {
    setScore(0)
    setTotalQuestions(0)
    setGameStarted(true)
    setFlashDuration(1000) // Reset to 1 second
    startNewRound()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const guess = parseInt(userGuess)
    const correct = guess === correctAnswer
    
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      setScore(score + 1)
      // Decrease flash duration slightly to increase difficulty
      setFlashDuration(Math.max(300, flashDuration - 50))
    }
    setTotalQuestions(totalQuestions + 1)
  }

  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0

  if (!gameStarted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-bold mono uppercase mb-6">
            DOT COUNTER
          </h1>
          <p className="text-xl mb-8">
            Dots will flash briefly on screen. Count them quickly and enter your answer.
          </p>
          <p className="text-lg text-gray-600 mb-12">
            Improves visual processing, attention, and quick counting skills. 
            Gets faster as you improve!
          </p>
          <button
            onClick={startNewGame}
            className="brutalist-button text-lg"
          >
            Start Counting
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-4xl">
        {/* Score */}
        <div className="text-center mb-8">
          <div className="text-2xl font-bold mono">
            {score} / {totalQuestions} ({accuracy}%)
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Flash speed: {flashDuration}ms
          </div>
        </div>

        {/* Dot Display Area */}
        <div className="relative w-full h-96 border-3 border-black bg-gray-50 mb-8">
          {showDots && dots.map(dot => (
            <div
              key={dot.id}
              className="absolute w-4 h-4 bg-black rounded-full"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
          
          {!showDots && !showResult && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl font-bold mono text-gray-400">
                How many dots did you see?
              </div>
            </div>
          )}
        </div>

        {/* Input/Result Area - Fixed Height */}
        <div className="h-48 flex items-center justify-center">
          {/* Input Form */}
          {!showDots && !showResult && (
            <form onSubmit={handleSubmit} className="text-center">
              <input
                type="number"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                className="text-4xl text-center p-4 border-3 border-black font-mono w-32 mr-4"
                placeholder="?"
                autoFocus
                min="0"
                max="50"
              />
              <button
                type="submit"
                className="brutalist-button text-lg"
                disabled={!userGuess}
              >
                Submit
              </button>
            </form>
          )}

          {/* Result */}
          {showResult && (
            <div className="text-center">
              <div className={`text-4xl font-bold mono mb-4 ${
                isCorrect ? 'text-green-600' : 'text-red-600'
              }`}>
                {isCorrect ? '✓ Correct!' : '✗ Wrong'}
              </div>
              <div className="text-2xl mb-6">
                You guessed: <span className="font-bold">{userGuess}</span>
                <br />
                Correct answer: <span className="font-bold">{correctAnswer}</span>
              </div>
              <button
                onClick={startNewRound}
                className="brutalist-button text-lg"
              >
                Next Round
              </button>
            </div>
          )}
        </div>

        {/* New Game Button */}
        <div className="text-center mt-12">
          <button
            onClick={startNewGame}
            className="border-3 border-black bg-white text-black px-6 py-3 font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors"
          >
            New Game
          </button>
        </div>
      </div>
    </main>
  )
}
