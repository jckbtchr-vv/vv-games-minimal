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

  return (
    <main className={`${gameStarted ? 'h-[calc(100vh-4rem)]' : 'flex items-center justify-center'} bg-white`}>
      {!gameStarted ? (
        /* Game Intro */
        <div className="max-w-2xl w-full p-8 text-center">
          <h1 className="text-4xl font-bold mono mb-6 uppercase">
            DOT COUNTER
          </h1>
          <p className="text-xl mb-6">
            Dots will flash briefly on screen. Count them quickly and enter your answer.
          </p>
          <p className="text-lg text-gray-600 mb-8 uppercase">
            Improves visual processing, attention, and quick counting skills.
            Gets faster as you improve!
          </p>
          <button
            onClick={startNewGame}
            className="brutalist-button text-lg"
          >
            START COUNTING
          </button>
        </div>
      ) : (
        /* Game Spreadsheet Grid */
        <>
          {/* Row 1: Score and Flash Speed */}
          <div className="flex border-b border-gray-300">
            <div className="flex-1 border-r border-gray-300 p-6 text-center">
              <div className="text-2xl font-bold mono">
                {score}/{totalQuestions} ({accuracy}%)
              </div>
            </div>
            <div className="flex-1 p-6 text-center">
              <div className="text-lg font-bold mono uppercase">
                FLASH SPEED<br/>
                {flashDuration}ms
              </div>
            </div>
          </div>

          {/* Row 2: Dot Display Area */}
          <div className="border-b border-gray-300 p-8">
            <div className="relative w-full h-80 border-2 border-black bg-gray-50 mx-auto max-w-lg">
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
                  <div className="text-2xl font-bold mono text-gray-400 uppercase">
                    HOW MANY DOTS DID YOU SEE?
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Row 3: Input Form */}
          {!showDots && !showResult && (
            <div className="border-b border-gray-300 p-6 text-center">
              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  className="text-4xl text-center p-4 border-2 border-black font-mono w-32 mr-4"
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
                  SUBMIT
                </button>
              </form>
            </div>
          )}

          {/* Row 4: Result */}
          {showResult && (
            <>
              <div className="border-b border-gray-300 p-6 text-center min-h-[120px] flex items-center justify-center">
                <div className={`text-4xl font-bold mono uppercase mb-4 ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isCorrect ? '✓ CORRECT!' : '✗ WRONG'}
                </div>
                <div className="text-2xl uppercase">
                  You guessed: <span className="font-bold">{userGuess}</span>
                  <br />
                  Correct answer: <span className="font-bold">{correctAnswer}</span>
                </div>
              </div>
              <div className="p-6 text-center">
                <button
                  onClick={startNewRound}
                  className="brutalist-button text-lg"
                >
                  NEXT ROUND
                </button>
              </div>
            </>
          )}

          {/* Row 5: New Game Button */}
          {!showResult && (
            <div className="p-6 text-center">
              <button
                onClick={startNewGame}
                className="brutalist-button text-lg"
              >
                NEW GAME
              </button>
            </div>
          )}
        </>
      )}
    </main>
  )
}
