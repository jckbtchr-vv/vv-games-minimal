'use client'

import { useState, useEffect } from 'react'

interface Fraction {
  numerator: number
  denominator: number
}

export default function FractionVisualizerGame() {
  const [currentFraction, setCurrentFraction] = useState<Fraction>({ numerator: 1, denominator: 2 })
  const [options, setOptions] = useState<Fraction[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<Fraction | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const generateFraction = (): Fraction => {
    const denominators = [2, 3, 4, 5, 6, 8, 10, 12]
    const denominator = denominators[Math.floor(Math.random() * denominators.length)]
    const numerator = Math.floor(Math.random() * denominator) + 1
    return { numerator, denominator }
  }

  const generateQuestion = () => {
    const fraction = generateFraction()
    setCurrentFraction(fraction)
    
    // Generate 3 wrong options
    const wrongOptions: Fraction[] = []
    while (wrongOptions.length < 3) {
      const wrongFraction = generateFraction()
      // Make sure it's different from the correct answer and not already in options
      if (
        !(wrongFraction.numerator === fraction.numerator && wrongFraction.denominator === fraction.denominator) &&
        !wrongOptions.some(opt => opt.numerator === wrongFraction.numerator && opt.denominator === wrongFraction.denominator)
      ) {
        wrongOptions.push(wrongFraction)
      }
    }
    
    // Shuffle all options
    const allOptions = [fraction, ...wrongOptions].sort(() => Math.random() - 0.5)
    setOptions(allOptions)
    
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(null)
  }

  const startNewGame = () => {
    setScore(0)
    setTotalQuestions(0)
    setGameStarted(true)
    generateQuestion()
  }

  const handleAnswerSelect = (answer: Fraction) => {
    setSelectedAnswer(answer)
    const correct = answer.numerator === currentFraction.numerator && answer.denominator === currentFraction.denominator
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      setScore(score + 1)
    }
    setTotalQuestions(totalQuestions + 1)
    
    // Auto-advance after 2 seconds
    setTimeout(() => {
      generateQuestion()
    }, 2000)
  }

  const renderPieChart = (fraction: Fraction, size: number = 200) => {
    const { numerator, denominator } = fraction
    const angle = (numerator / denominator) * 360
    
    // Create pie slices
    const slices = []
    const sliceAngle = 360 / denominator
    
    for (let i = 0; i < denominator; i++) {
      const startAngle = i * sliceAngle - 90 // Start from top
      const endAngle = (i + 1) * sliceAngle - 90
      const filled = i < numerator
      
      // Calculate path for each slice
      const startAngleRad = (startAngle * Math.PI) / 180
      const endAngleRad = (endAngle * Math.PI) / 180
      const radius = size / 2 - 10
      const centerX = size / 2
      const centerY = size / 2
      
      const x1 = centerX + radius * Math.cos(startAngleRad)
      const y1 = centerY + radius * Math.sin(startAngleRad)
      const x2 = centerX + radius * Math.cos(endAngleRad)
      const y2 = centerY + radius * Math.sin(endAngleRad)
      
      const largeArcFlag = sliceAngle > 180 ? 1 : 0
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ')
      
      slices.push(
        <path
          key={i}
          d={pathData}
          fill={filled ? '#3B82F6' : '#E5E7EB'}
          stroke="#000"
          strokeWidth="2"
        />
      )
    }
    
    return (
      <svg width={size} height={size} className="mx-auto">
        {slices}
      </svg>
    )
  }

  const formatFraction = (fraction: Fraction) => {
    return `${fraction.numerator}/${fraction.denominator}`
  }

  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0

  return (
    <main className={`${gameStarted ? 'min-h-screen' : ''} bg-white`}>
      {!gameStarted ? (
        /* Game Intro */
        <div className="border-b border-gray-300 p-8 text-center">
          <h1 className="text-4xl font-bold mono mb-6 uppercase">
            FRACTION VISUALIZER
          </h1>
          <p className="text-xl mb-6">
            Look at the pie chart and identify what fraction is shaded.
            Blue sections represent the numerator.
          </p>
          <p className="text-lg text-gray-600 mb-8 uppercase">
            Improves fraction understanding, visual-spatial skills, and mathematical reasoning.
          </p>
          <button
            onClick={startNewGame}
            className="brutalist-button text-lg"
          >
            START VISUALIZING
          </button>
        </div>
      ) : (
        /* Game Spreadsheet Grid */
        <>
          {/* Row 1: Score */}
          <div className="border-b border-gray-300 p-6 text-center">
            <div className="text-2xl font-bold mono">
              {score}/{totalQuestions} ({accuracy}%)
            </div>
          </div>

          {/* Row 2: Question */}
          <div className="border-b border-gray-300 p-6 text-center">
            <div className="text-2xl font-bold mono uppercase">
              WHAT FRACTION IS SHADED?
            </div>
          </div>

          {/* Row 3: Pie Chart */}
          <div className="border-b border-gray-300 p-8 text-center">
            {renderPieChart(currentFraction, 300)}
          </div>

          {/* Row 4: Multiple Choice Options */}
          <div className="flex border-b border-gray-300">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={`flex-1 border-r border-gray-300 p-6 text-2xl font-bold mono transition-colors ${
                  index < 3 ? 'border-r border-gray-300' : ''
                } ${
                  showResult && option.numerator === currentFraction.numerator && option.denominator === currentFraction.denominator
                    ? 'bg-green-500 text-white'
                    : showResult && selectedAnswer && option.numerator === selectedAnswer.numerator && option.denominator === selectedAnswer.denominator && !(option.numerator === currentFraction.numerator && option.denominator === currentFraction.denominator)
                    ? 'bg-red-500 text-white'
                    : showResult
                    ? 'bg-gray-200 text-gray-500'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {formatFraction(option)}
              </button>
            ))}
          </div>

          {/* Row 5: Result Feedback */}
          <div className="border-b border-gray-300 p-6 text-center min-h-[100px] flex items-center justify-center">
            {showResult && (
              <>
                <div className={`text-2xl font-bold mono uppercase ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isCorrect ? '✓ CORRECT!' : '✗ WRONG'}
                </div>
                {!isCorrect && (
                  <div className="text-lg text-gray-600 mt-2 uppercase">
                    The answer was {formatFraction(currentFraction)}
                  </div>
                )}
              </>
            )}
          </div>

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
