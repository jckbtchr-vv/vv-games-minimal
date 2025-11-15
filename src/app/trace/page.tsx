'use client'

import { useState, useEffect, useRef } from 'react'

// SVG paths for traceable letters (simplified)
const TRACE_LETTERS = [
  {
    letter: 'A',
    path: 'M 50 150 L 75 50 L 100 150 M 62.5 100 L 87.5 100',
    viewBox: '0 0 150 200'
  },
  {
    letter: 'B',
    path: 'M 30 50 L 30 150 M 30 50 Q 80 50 80 75 Q 80 100 30 100 M 30 100 Q 80 100 80 125 Q 80 150 30 150',
    viewBox: '0 0 120 200'
  },
  {
    letter: 'C',
    path: 'M 100 60 Q 40 60 40 100 Q 40 140 100 140',
    viewBox: '0 0 150 200'
  },
  {
    letter: 'D',
    path: 'M 30 50 L 30 150 Q 80 150 80 100 Q 80 50 30 50',
    viewBox: '0 0 120 200'
  }
]

export default function TraceGame() {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [userPath, setUserPath] = useState<string[]>([])
  const [isTracing, setIsTracing] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [accuracy, setAccuracy] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const svgRef = useRef<SVGSVGElement>(null)

  const currentLetter = TRACE_LETTERS[currentLetterIndex]

  const startNewGame = () => {
    setGameStarted(true)
    setScore(0)
    setTotalAttempts(0)
    setCurrentLetterIndex(0)
    resetTrace()
  }

  const resetTrace = () => {
    setUserPath([])
    setIsTracing(false)
    setStartTime(null)
    setEndTime(null)
    setShowResult(false)
    setAccuracy(0)
    setTimeTaken(0)
  }

  const nextLetter = () => {
    if (currentLetterIndex < TRACE_LETTERS.length - 1) {
      setCurrentLetterIndex(prev => prev + 1)
      resetTrace()
    } else {
      // Game complete
      setShowResult(true)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isTracing) {
      setIsTracing(true)
      setStartTime(Date.now())
      setUserPath([])
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isTracing || !svgRef.current) return

    const rect = svgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setUserPath(prev => [...prev, `${x},${y}`])
    }
  }

  const handleMouseUp = () => {
    if (isTracing && startTime) {
      const endTime = Date.now()
      setEndTime(endTime)
      setTimeTaken((endTime - startTime) / 1000)

      // Calculate accuracy (simplified - check if path has reasonable coverage)
      const pathLength = userPath.length
      const accuracy = Math.min(100, Math.max(0, (pathLength / 50) * 100))
      setAccuracy(Math.round(accuracy))

      setIsTracing(false)
      setTotalAttempts(prev => prev + 1)

      // Award points based on accuracy and speed
      const speedBonus = timeTaken < 5 ? 20 : timeTaken < 10 ? 10 : 0
      const points = Math.round(accuracy * 0.5) + speedBonus
      setScore(prev => prev + points)

      setShowResult(true)
    }
  }

  const getAccuracyColor = () => {
    if (accuracy >= 80) return 'text-green-600'
    if (accuracy >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (!gameStarted) {
    return (
      <main className="min-h-screen bg-white">
        {/* Game Intro */}
        <div className="border-b border-gray-300 p-8 text-center">
          <h1 className="text-4xl font-bold mono mb-6 uppercase">
            LETTER TRACING
          </h1>
          <p className="text-xl mb-6">
            Trace letters with speed and accuracy. Follow the dotted path as closely as possible.
          </p>
          <p className="text-lg text-gray-600 mb-8 uppercase">
            Improves fine motor skills, letter recognition, and hand-eye coordination.
            Points awarded for accuracy and speed!
          </p>
          <button
            onClick={startNewGame}
            className="brutalist-button text-lg"
          >
            START TRACING
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Game Spreadsheet Grid */}
      <>
        {/* Row 1: Progress and Score */}
        <div className="flex border-b border-gray-300">
          <div className="flex-1 border-r border-gray-300 p-6 text-center">
            <div className="text-2xl font-bold mono">
              LETTER {currentLetterIndex + 1}/{TRACE_LETTERS.length}
            </div>
          </div>
          <div className="flex-1 p-6 text-center">
            <div className="text-xl font-bold mono uppercase">
              SCORE: {score}
            </div>
          </div>
        </div>

        {/* Row 2: Letter Display */}
        <div className="border-b border-gray-300 p-8">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <div className="text-8xl font-bold mono mb-4 text-gray-300">
                {currentLetter.letter}
              </div>
              <div className="text-lg text-gray-600 uppercase">
                Trace the dotted path below
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Tracing Area */}
        <div className="border-b border-gray-300 p-8">
          <div className="flex items-center justify-center">
            <svg
              ref={svgRef}
              viewBox={currentLetter.viewBox}
              className="w-64 h-48 border-2 border-gray-300 bg-white cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Target path */}
              <path
                d={currentLetter.path}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
                strokeDasharray="5,5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* User's trace */}
              {userPath.length > 1 && (
                <path
                  d={`M ${userPath.join(' L ')}`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>
        </div>

        {/* Row 4: Instructions */}
        <div className="border-b border-gray-300 p-6 text-center">
          <div className="text-lg font-bold mono uppercase">
            {isTracing ? 'TRACING...' : showResult ? 'TRACE COMPLETE!' : 'CLICK AND DRAG TO TRACE'}
          </div>
        </div>

        {/* Row 5: Result */}
        {showResult && (
          <div className="border-b border-gray-300 p-6 text-center min-h-[120px] flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold mono uppercase mb-4 ${getAccuracyColor()}`}>
                {accuracy}% ACCURACY
              </div>
              <div className="text-xl mb-2 uppercase">
                Time: {timeTaken.toFixed(1)}s
              </div>
              <div className="text-lg text-gray-600 uppercase">
                Points earned: {Math.round(accuracy * 0.5) + (timeTaken < 5 ? 20 : timeTaken < 10 ? 10 : 0)}
              </div>
            </div>
          </div>
        )}

        {/* Row 6: Action Button */}
        <div className="p-6 text-center">
          {showResult ? (
            currentLetterIndex < TRACE_LETTERS.length - 1 ? (
              <button
                onClick={nextLetter}
                className="brutalist-button text-lg"
              >
                NEXT LETTER
              </button>
            ) : (
              <div className="text-center">
                <div className="text-4xl font-bold mono mb-4 uppercase">
                  ALL LETTERS COMPLETE!
                </div>
                <div className="text-2xl mb-6 uppercase">
                  Final Score: {score} points
                </div>
                <div className="text-lg text-gray-600 mb-6 uppercase">
                  Average Accuracy: {totalAttempts > 0 ? Math.round((score / totalAttempts) * 2) : 0}%
                </div>
                <button
                  onClick={startNewGame}
                  className="brutalist-button text-lg"
                >
                  PLAY AGAIN
                </button>
              </div>
            )
          ) : (
            <button
              onClick={resetTrace}
              className="brutalist-button text-lg"
            >
              RESET TRACE
            </button>
          )}
        </div>
      </>
    </main>
  )
}
