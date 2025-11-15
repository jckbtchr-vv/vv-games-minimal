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

  return (
    <main className={`${gameStarted ? 'min-h-screen' : 'min-h-screen flex items-center justify-center'} bg-white`}>
      {!gameStarted ? (
        /* Game Intro */
        <div className="max-w-2xl w-full border-b border-gray-300 p-8 text-center">
          <h1 className="text-4xl font-bold mono mb-6 uppercase">
            PATTERN MEMORY
          </h1>
          <p className="text-xl mb-6">
            Watch the sequence of colored squares, then repeat it back in the same order.
          </p>
          <p className="text-lg text-gray-600 mb-8 uppercase">
            Improves working memory, attention, and sequential processing.
            Starts with 3 colors, increases as you succeed!
          </p>
          <button
            onClick={startNewGame}
            className="brutalist-button text-lg"
          >
            START MEMORY TEST
          </button>
        </div>
      ) : (
        /* Game Spreadsheet Grid */
        <>
          {/* Row 1: Level/Score and Game Phase */}
          <div className="flex border-b border-gray-300">
            <div className="flex-1 border-r border-gray-300 p-6 text-center">
              <div className="text-2xl font-bold mono">
                LEVEL {level} • SCORE: {score}
              </div>
            </div>
            <div className="flex-1 p-6 text-center">
              <div className="text-lg font-bold mono uppercase">
                {gamePhase === 'waiting' && 'GET READY...'}
                {gamePhase === 'showing' && 'WATCH THE PATTERN'}
                {gamePhase === 'input' && 'REPEAT THE PATTERN'}
                {gamePhase === 'result' && (isCorrect ? 'CORRECT! NEXT LEVEL...' : 'WRONG PATTERN. TRY AGAIN...')}
              </div>
            </div>
          </div>

          {/* Row 2: Pattern Display */}
          <div className="border-b border-gray-300 p-8">
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {COLORS.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleColorClick(index)}
                  disabled={gamePhase !== 'input'}
                  className={`w-24 h-24 border-2 border-black transition-all duration-200 ${color} ${
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
          </div>

          {/* Row 3: User Progress */}
          {gamePhase === 'input' && (
            <div className="border-b border-gray-300 p-6 text-center">
              <div className="text-lg font-bold mono mb-4 uppercase">
                YOUR PATTERN ({userPattern.length}/{pattern.length})
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

          {/* Row 4: Result */}
          {gamePhase === 'result' && (
            <div className="border-b border-gray-300 p-6 text-center min-h-[140px] flex items-center justify-center">
              <div className={`text-3xl font-bold mono uppercase mb-4 ${
                isCorrect ? 'text-green-600' : 'text-red-600'
              }`}>
                {isCorrect ? '✓ PERFECT!' : '✗ WRONG PATTERN'}
              </div>
              {!isCorrect && (
                <div className="text-lg text-gray-600 uppercase">
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

          {/* Row 5: New Game Button */}
          <div className="p-6 text-center">
            <button
              onClick={startNewGame}
              className="brutalist-button text-lg"
            >
              NEW GAME
            </button>
          </div>
        </>
      )}
    </main>
  )
}
