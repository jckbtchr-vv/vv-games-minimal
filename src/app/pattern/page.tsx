'use client'

import { useState, useEffect } from 'react'

const COLORS = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-orange-500']

export default function PatternMemoryGame() {
  const [pattern, setPattern] = useState<number[]>([])
  const [userPattern, setUserPattern] = useState<number[]>([])
  const [showingPattern, setShowingPattern] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [gamePhase, setGamePhase] = useState<'waiting' | 'showing' | 'input' | 'result'>('waiting')
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(3) // Start with 3 squares
  const [gameStarted, setGameStarted] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const generatePattern = () => {
    const newPattern: number[] = []
    for (let i = 0; i < level; i++) {
      newPattern.push(Math.floor(Math.random() * 6)) // 0-5 for 6 colors
    }
    setPattern(newPattern)
    setUserPattern([])
    setCurrentStep(0)
  }

  const showPattern = () => {
    setGamePhase('showing')
    setShowingPattern(true)
    
    // Show each color in sequence
    let step = 0
    const showNext = () => {
      if (step < pattern.length) {
        setCurrentStep(step)
        step++
        setTimeout(showNext, 800) // 800ms per color
      } else {
        setShowingPattern(false)
        setCurrentStep(-1)
        setGamePhase('input')
      }
    }
    
    setTimeout(showNext, 500) // Initial delay
  }

  const startNewGame = () => {
    setScore(0)
    setLevel(3)
    setGameStarted(true)
    startNewRound()
  }

  const startNewRound = () => {
    generatePattern()
    setGamePhase('waiting')
    setIsCorrect(null)
    
    // Auto-start showing pattern after 1 second
    setTimeout(() => {
      showPattern()
    }, 1000)
  }

  const handleColorClick = (colorIndex: number) => {
    if (gamePhase !== 'input') return
    
    const newUserPattern = [...userPattern, colorIndex]
    setUserPattern(newUserPattern)
    
    // Check if pattern is complete
    if (newUserPattern.length === pattern.length) {
      // Check if correct
      const correct = newUserPattern.every((color, index) => color === pattern[index])
      setIsCorrect(correct)
      setGamePhase('result')
      
      if (correct) {
        setScore(score + 1)
        setLevel(Math.min(12, level + 1)) // Max 12 colors
        setTimeout(() => {
          startNewRound()
        }, 2000)
      } else {
        // Game over or retry
        setTimeout(() => {
          startNewRound()
        }, 3000)
      }
    }
  }

  if (!gameStarted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-bold mono uppercase mb-6">
            PATTERN MEMORY
          </h1>
          <p className="text-xl mb-8">
            Watch the sequence of colored squares, then repeat it back in the same order.
          </p>
          <p className="text-lg text-gray-600 mb-12">
            Improves working memory, attention, and sequential processing. 
            Starts with 3 colors, increases as you succeed!
          </p>
          <button
            onClick={startNewGame}
            className="brutalist-button text-lg"
          >
            Start Memory Test
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-4xl">
        {/* Score and Level */}
        <div className="text-center mb-8">
          <div className="text-2xl font-bold mono mb-2">
            Level {level} • Score: {score}
          </div>
          <div className="text-lg text-gray-600">
            {gamePhase === 'waiting' && 'Get ready...'}
            {gamePhase === 'showing' && 'Watch the pattern'}
            {gamePhase === 'input' && 'Repeat the pattern'}
            {gamePhase === 'result' && (isCorrect ? 'Correct! Next level...' : 'Wrong pattern. Try again...')}
          </div>
        </div>

        {/* Pattern Display */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12">
          {COLORS.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorClick(index)}
              disabled={gamePhase !== 'input'}
              className={`w-24 h-24 border-3 border-black transition-all duration-200 ${color} ${
                showingPattern && currentStep < pattern.length && pattern[currentStep] === index
                  ? 'scale-110 shadow-lg'
                  : showingPattern
                  ? 'opacity-50'
                  : gamePhase === 'input'
                  ? 'hover:scale-105 cursor-pointer'
                  : 'opacity-75'
              }`}
            />
          ))}
        </div>

        {/* User Progress */}
        {gamePhase === 'input' && (
          <div className="text-center mb-8">
            <div className="text-lg font-bold mono mb-4">
              Your Pattern ({userPattern.length}/{pattern.length})
            </div>
            <div className="flex justify-center space-x-2">
              {userPattern.map((colorIndex, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 border-2 border-black ${COLORS[colorIndex]}`}
                />
              ))}
              {/* Show remaining slots */}
              {Array.from({ length: pattern.length - userPattern.length }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="w-8 h-8 border-2 border-gray-300 bg-gray-100"
                />
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {gamePhase === 'result' && (
          <div className="text-center mb-8">
            <div className={`text-3xl font-bold mono mb-4 ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            }`}>
              {isCorrect ? '✓ Perfect!' : '✗ Wrong Pattern'}
            </div>
            {!isCorrect && (
              <div className="text-lg text-gray-600">
                <div className="mb-2">Correct pattern was:</div>
                <div className="flex justify-center space-x-2">
                  {pattern.map((colorIndex, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 border-2 border-black ${COLORS[colorIndex]}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* New Game Button */}
        <div className="text-center">
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
