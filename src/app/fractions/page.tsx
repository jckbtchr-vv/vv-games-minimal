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

  if (!gameStarted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-bold mono uppercase mb-6">
            FRACTION VISUALIZER
          </h1>
          <p className="text-xl mb-8">
            Look at the pie chart and identify what fraction is shaded. 
            Blue sections represent the numerator.
          </p>
          <p className="text-lg text-gray-600 mb-12">
            Improves fraction understanding, visual-spatial skills, and mathematical reasoning.
          </p>
          <button
            onClick={startNewGame}
            className="brutalist-button text-lg"
          >
            Start Visualizing
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
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <div className="text-2xl font-bold mono mb-8">
            What fraction is shaded?
          </div>
          
          {/* Pie Chart */}
          <div className="mb-8">
            {renderPieChart(currentFraction, 300)}
          </div>
        </div>

        {/* Multiple Choice Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={showResult}
              className={`p-6 text-2xl font-bold mono border-3 border-black transition-colors ${
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

        {/* Result Feedback */}
        {showResult && (
          <div className="text-center mt-8">
            <div className={`text-2xl font-bold mono ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            }`}>
              {isCorrect ? '✓ Correct!' : '✗ Wrong'}
            </div>
            {!isCorrect && (
              <div className="text-lg text-gray-600 mt-2">
                The answer was {formatFraction(currentFraction)}
              </div>
            )}
          </div>
        )}

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
