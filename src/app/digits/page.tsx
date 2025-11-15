'use client'

import { useState, useEffect } from 'react'

export default function DigitSpanGame() {
  const [sequence, setSequence] = useState<number[]>([])
  const [userInput, setUserInput] = useState('')
  const [showingSequence, setShowingSequence] = useState(false)
  const [currentDigit, setCurrentDigit] = useState<number | null>(null)
  const [gamePhase, setGamePhase] = useState<'waiting' | 'showing' | 'input' | 'result'>('waiting')
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(3) // Start with 3 digits
  const [gameStarted, setGameStarted] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [maxLevel, setMaxLevel] = useState(3)


  const startNewGame = () => {
    setScore(0)
    setLevel(3)
    setMaxLevel(3)
    setGameStarted(true)
    startNewRound(3) // Explicitly start with level 3
  }

  const startNewRound = (overrideLevel?: number) => {
    setGamePhase('waiting')
    setIsCorrect(null)

    // Generate sequence for the specified level (or current level)
    const sequenceLength = overrideLevel ?? level
    const newSequence: number[] = []
    for (let i = 0; i < sequenceLength; i++) {
      newSequence.push(Math.floor(Math.random() * 10))
    }
    setSequence(newSequence)
    setUserInput('')

    // Auto-start showing sequence after 1 second
    setTimeout(() => {
      setGamePhase('showing')
      setShowingSequence(true)

      // Show each digit in sequence
      let step = 0
      const showNext = () => {
        if (step < newSequence.length) {
          setCurrentDigit(newSequence[step])
          step++
          setTimeout(() => {
            setCurrentDigit(null)
            setTimeout(showNext, 200) // 200ms gap between digits
          }, 800) // 800ms per digit
        } else {
          setShowingSequence(false)
          setCurrentDigit(null)
          setGamePhase('input')
        }
      }

      setTimeout(showNext, 500) // Initial delay
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (gamePhase !== 'input') return
    
    const userSequence = userInput.split('').map(Number)
    const correct = userSequence.length === sequence.length && 
                   userSequence.every((digit, index) => digit === sequence[index])
    
    setIsCorrect(correct)
    setGamePhase('result')
    
    if (correct) {
      setScore(score + 1)
      const newLevel = level + 1
      setLevel(newLevel)
      setMaxLevel(Math.max(maxLevel, newLevel))
      // Use setTimeout with state updater function to ensure level has updated
      setTimeout(() => {
        const currentLevel = newLevel
        startNewRound(currentLevel)
      }, 2000)
    } else {
      // Reset to previous level or restart
      const newLevel = Math.max(3, level - 1)
      setLevel(newLevel)
      setTimeout(() => {
        const currentLevel = newLevel
        startNewRound(currentLevel)
      }, 3000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '') // Only digits
    if (value.length <= sequence.length) {
      setUserInput(value)
    }
  }

  return (
    <main className={`${gameStarted ? 'h-[calc(100vh-4rem)]' : 'flex items-center justify-center'} bg-white`}>
      {!gameStarted ? (
        /* Game Intro */
        <div className="max-w-2xl w-full p-8 text-center">
          <h1 className="text-4xl font-bold mono mb-6 uppercase">
            DIGIT SPAN
          </h1>
          <p className="text-xl mb-6">
            Watch a sequence of digits appear one by one, then type them back in the same order.
          </p>
          <p className="text-lg text-gray-600 mb-8 uppercase">
            Tests working memory and attention span. Starts with 3 digits,
            increases as you succeed. This is a classic cognitive assessment!
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
                LEVEL {level} • SCORE: {score} • MAX: {maxLevel}
              </div>
            </div>
            <div className="flex-1 p-6 text-center">
              <div className="text-lg font-bold mono uppercase">
                {gamePhase === 'waiting' && 'GET READY TO MEMORIZE...'}
                {gamePhase === 'showing' && 'WATCH THE DIGITS'}
                {gamePhase === 'input' && 'TYPE THE SEQUENCE YOU SAW'}
                {gamePhase === 'result' && (isCorrect ? 'CORRECT! LEVEL UP...' : 'WRONG SEQUENCE. TRY AGAIN...')}
              </div>
            </div>
          </div>

          {/* Row 2: Digit Display */}
          <div className="border-b border-gray-300 p-8 text-center min-h-[160px] flex items-center justify-center">
            {showingSequence && currentDigit !== null && (
              <div className="text-6xl md:text-8xl font-bold mono text-blue-600 animate-pulse">
                {currentDigit}
              </div>
            )}

            {gamePhase === 'input' && (
              <div className="text-6xl font-bold mono text-gray-400">
                ? ? ?
              </div>
            )}

            {gamePhase === 'waiting' && (
              <div className="text-4xl font-bold mono text-gray-400 uppercase">
                {level} DIGITS COMING UP...
              </div>
            )}
          </div>

          {/* Row 3: Input Form */}
          {gamePhase === 'input' && (
            <div className="border-b border-gray-300 p-6 text-center">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  className="text-4xl text-center p-4 border-2 border-black font-mono w-64 mr-4"
                  placeholder="Enter digits..."
                  autoFocus
                  maxLength={sequence.length}
                />
                <button
                  type="submit"
                  className="brutalist-button text-lg"
                  disabled={userInput.length !== sequence.length}
                >
                  SUBMIT
                </button>
                <div className="text-sm text-gray-600 mt-2 uppercase">
                  Enter {sequence.length} digits ({userInput.length}/{sequence.length})
                </div>
              </form>
            </div>
          )}

          {/* Row 4: Result */}
          {gamePhase === 'result' && (
            <div className="border-b border-gray-300 p-6 text-center min-h-[120px] flex items-center justify-center">
              <div className={`text-3xl font-bold mono uppercase mb-4 ${
                isCorrect ? 'text-green-600' : 'text-red-600'
              }`}>
                {isCorrect ? '✓ PERFECT MEMORY!' : '✗ WRONG SEQUENCE'}
              </div>
              <div className="text-xl mb-4 uppercase">
                <div>You entered: <span className="font-bold mono">{userInput || '(nothing)'}</span></div>
                <div>Correct was: <span className="font-bold mono">{sequence.join('')}</span></div>
              </div>
              {isCorrect && (
                <div className="text-lg text-green-600 uppercase">
                  Moving to {level + 1} digits!
                </div>
              )}
            </div>
          )}

          {/* Row 5: Progress Indicator */}
          {gamePhase === 'input' && sequence.length > 0 && (
            <div className="border-b border-gray-300 p-6 text-center">
              <div className="text-sm text-gray-600 mb-2 uppercase">Sequence Progress</div>
              <div className="flex justify-center space-x-1">
                {Array.from({ length: sequence.length }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 border-2 border-black ${
                      index < userInput.length ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Row 6: New Game Button */}
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
