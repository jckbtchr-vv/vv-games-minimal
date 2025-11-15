'use client'

import { useState, useEffect, useRef } from 'react'

// SVG paths for traceable shapes
const TRACE_SHAPES = [
  {
    name: 'Circle',
    path: 'M 75 25 A 50 50 0 1 1 74.9 25 Z',
    viewBox: '0 0 150 150',
    icon: '⭕'
  },
  {
    name: 'Square',
    path: 'M 25 25 L 125 25 L 125 125 L 25 125 Z',
    viewBox: '0 0 150 150',
    icon: '⬜'
  },
  {
    name: 'Triangle',
    path: 'M 75 25 L 125 125 L 25 125 Z',
    viewBox: '0 0 150 150',
    icon: '🔺'
  },
  {
    name: 'Star',
    path: 'M 75 10 L 90 55 L 135 55 L 105 80 L 115 125 L 75 100 L 35 125 L 45 80 L 15 55 L 60 55 Z',
    viewBox: '0 0 150 150',
    icon: '⭐'
  }
]

export default function TraceGame() {
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0)
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

  const currentShape = TRACE_SHAPES[currentShapeIndex]

  const startNewGame = () => {
    setGameStarted(true)
    setScore(0)
    setTotalAttempts(0)
    setCurrentShapeIndex(0)
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

  const nextShape = () => {
    if (currentShapeIndex < TRACE_SHAPES.length - 1) {
      setCurrentShapeIndex(prev => prev + 1)
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
    const svg = svgRef.current

    // Get mouse position relative to SVG element
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Only track if mouse is within SVG bounds
    if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
      // Convert screen coordinates to SVG viewBox coordinates
      const viewBox = svg.viewBox.baseVal
      const scaleX = viewBox.width / rect.width
      const scaleY = viewBox.height / rect.height

      const svgX = mouseX * scaleX + viewBox.x
      const svgY = mouseY * scaleY + viewBox.y

      setUserPath(prev => [...prev, `${svgX.toFixed(1)},${svgY.toFixed(1)}`])
    }
  }

  const calculateAccuracy = (userPath: string[], targetPath: string) => {
    if (userPath.length < 5) return 0

    // Parse target path into points (simplified - sample key points)
    const targetPoints: number[][] = []
    const pathSegments = targetPath.split(/[ML]/).filter(s => s.trim())

    pathSegments.forEach(segment => {
      const coords = segment.trim().split(' ')
      for (let i = 0; i < coords.length; i += 2) {
        const x = parseFloat(coords[i])
        const y = parseFloat(coords[i + 1])
        if (!isNaN(x) && !isNaN(y)) {
          targetPoints.push([x, y])
        }
      }
    })

    if (targetPoints.length === 0) return 0

    // Parse user path points
    const userPoints = userPath.map(point => {
      const [x, y] = point.split(',').map(Number)
      return [x, y]
    })

    // Calculate average distance from user points to nearest target points
    let totalDistance = 0
    let validPoints = 0

    targetPoints.forEach(targetPoint => {
      let minDistance = Infinity

      userPoints.forEach(userPoint => {
        const distance = Math.sqrt(
          Math.pow(userPoint[0] - targetPoint[0], 2) +
          Math.pow(userPoint[1] - targetPoint[1], 2)
        )
        minDistance = Math.min(minDistance, distance)
      })

      if (minDistance < 50) { // Only count points within reasonable distance
        totalDistance += minDistance
        validPoints++
      }
    })

    if (validPoints === 0) return 0

    const avgDistance = totalDistance / validPoints

    // Convert distance to accuracy (closer = higher accuracy)
    // Max reasonable distance is about 30 units for good tracing
    const accuracy = Math.max(0, Math.min(100, 100 - (avgDistance / 30) * 100))

    return Math.round(accuracy)
  }

  const handleMouseUp = () => {
    if (isTracing && startTime) {
      const endTime = Date.now()
      setEndTime(endTime)
      setTimeTaken((endTime - startTime) / 1000)

      // Calculate accuracy based on path proximity
      const accuracy = calculateAccuracy(userPath, currentShape.path)
      setAccuracy(accuracy)

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
      <main className="flex items-center justify-center bg-white">
        {/* Game Intro */}
        <div className="max-w-2xl w-full p-8 text-center">
          <h1 className="text-4xl font-bold mono mb-6 uppercase">
            SHAPE TRACING
          </h1>
          <p className="text-xl mb-6">
            Trace shapes with speed and accuracy. Follow the dotted path as closely as possible.
          </p>
          <p className="text-lg text-gray-600 mb-8 uppercase">
            Improves fine motor skills, shape recognition, and hand-eye coordination.
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
    <main className={`${gameStarted ? 'min-h-screen' : ''} bg-white`}>
      {/* Game Spreadsheet Grid */}
      <>
        {/* Row 1: Progress and Score */}
        <div className="flex border-b border-gray-300">
          <div className="flex-1 border-r border-gray-300 p-6 text-center">
            <div className="text-2xl font-bold mono">
              SHAPE {currentShapeIndex + 1}/{TRACE_SHAPES.length}
            </div>
          </div>
          <div className="flex-1 p-6 text-center">
            <div className="text-xl font-bold mono uppercase">
              SCORE: {score}
            </div>
          </div>
        </div>

        {/* Row 2: Shape Display */}
        <div className="border-b border-gray-300 p-8">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <div className="text-8xl mb-4">
                {currentShape.icon}
              </div>
              <div className="text-2xl font-bold mono mb-4 uppercase">
                {currentShape.name}
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
              viewBox={currentShape.viewBox}
              className="w-64 h-64 border-2 border-gray-300 bg-white cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Target path */}
              <path
                d={currentShape.path}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="4"
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
            currentShapeIndex < TRACE_SHAPES.length - 1 ? (
              <button
                onClick={nextShape}
                className="brutalist-button text-lg"
              >
                NEXT SHAPE
              </button>
            ) : (
              <div className="text-center">
                <div className="text-4xl font-bold mono mb-4 uppercase">
                  ALL SHAPES COMPLETE!
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
