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

  if (!gameStarted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-bold mono uppercase mb-6">
            DIGIT SPAN
          </h1>
          <p className="text-xl mb-8">
            Watch a sequence of digits appear one by one, then type them back in the same order.
          </p>
          <p className="text-lg text-gray-600 mb-12">
            Tests working memory and attention span. Starts with 3 digits, 
            increases as you succeed. This is a classic cognitive assessment!
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
            Level {level} • Score: {score} • Max: {maxLevel}
          </div>
          <div className="text-lg text-gray-600">
            {gamePhase === 'waiting' && 'Get ready to memorize...'}
            {gamePhase === 'showing' && 'Watch the digits'}
            {gamePhase === 'input' && 'Type the sequence you saw'}
            {gamePhase === 'result' && (isCorrect ? 'Correct! Level up...' : 'Wrong sequence. Try again...')}
          </div>
        </div>

        {/* Digit Display - Fixed Height */}
        <div className="text-center mb-8 min-h-[120px] flex items-center justify-center">
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
            <div className="text-4xl font-bold mono text-gray-400">
              {level} digits coming up...
            </div>
          )}
        </div>

        {/* Input Form - Fixed Height */}
        <div className="text-center mb-6 min-h-[80px] flex items-center justify-center">
          {gamePhase === 'input' && (
            <form onSubmit={handleSubmit} className="text-center">
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
                Submit
              </button>
              <div className="text-sm text-gray-600 mt-2">
                Enter {sequence.length} digits ({userInput.length}/{sequence.length})
              </div>
            </form>
          )}
        </div>

        {/* Result - Fixed Height */}
        <div className="text-center mb-6 min-h-[100px] flex flex-col justify-center">
          {gamePhase === 'result' && (
            <>
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
            </>
          )}
        </div>

        {/* Progress Indicator - Fixed Height */}
        <div className="text-center mb-6 min-h-[40px] flex flex-col justify-center">
          {gamePhase === 'input' && sequence.length > 0 && (
            <>
              <div className="text-sm text-gray-600 mb-2">Sequence Progress</div>
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
            </>
          )}
        </div>

        {/* New Game Button */}
        <div className="text-center">
          <button
            onClick={startNewGame}
            className="border-2 border-black bg-white text-black px-6 py-3 font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors"
          >
            New Game
          </button>
        </div>
      </div>
    </main>
  )
}
