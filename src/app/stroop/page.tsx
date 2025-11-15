'use client'

import { useState, useEffect } from 'react'

const COLORS = [
  { name: 'RED', value: 'text-red-500' },
  { name: 'BLUE', value: 'text-blue-500' },
  { name: 'GREEN', value: 'text-green-500' },
  { name: 'YELLOW', value: 'text-yellow-500' },
  { name: 'PURPLE', value: 'text-purple-500' },
  { name: 'ORANGE', value: 'text-orange-500' }
]

export default function ColorStroopGame() {
  const [wordText, setWordText] = useState('')
  const [wordColor, setWordColor] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [optionColors, setOptionColors] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [timeLimit, setTimeLimit] = useState(3000) // 3 seconds initially
  const [timeLeft, setTimeLeft] = useState(0)
  const [timerActive, setTimerActive] = useState(false)

  const generateQuestion = () => {
    // Pick random word and random color (often different to create conflict)
    const wordIndex = Math.floor(Math.random() * COLORS.length)
    const colorIndex = Math.floor(Math.random() * COLORS.length)
    
    const word = COLORS[wordIndex].name
    const color = COLORS[colorIndex]
    
    setWordText(word)
    setWordColor(color.value)
    setCorrectAnswer(color.name) // Answer is the COLOR, not the word
    
    // Generate 4 random options including the correct answer
    const shuffledColors = [...COLORS].sort(() => Math.random() - 0.5)
    const optionSet = new Set([color.name])
    
    // Add 3 more random options
    for (const c of shuffledColors) {
      if (optionSet.size >= 4) break
      optionSet.add(c.name)
    }
    
    const finalOptions = Array.from(optionSet).sort(() => Math.random() - 0.5)
    setOptions(finalOptions)
    
    // Assign random colors to each option button (different from the option text)
    const buttonColors = finalOptions.map(option => {
      // Get all colors except the one that matches the option name
      const availableColors = COLORS.filter(c => c.name !== option)
      const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)]
      return randomColor.value
    })
    setOptionColors(buttonColors)
    
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(null)
    
    // Start timer
    setTimeLeft(timeLimit)
    setTimerActive(true)
  }

  // Timer effect
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 100)
    }, 100)
    
    if (timeLeft <= 0) {
      handleTimeout()
    }
    
    return () => clearTimeout(timer)
  }, [timeLeft, timerActive])

  const handleTimeout = () => {
    setTimerActive(false)
    setIsCorrect(false)
    setShowResult(true)
    setTotalQuestions(totalQuestions + 1)
    
    setTimeout(() => {
      generateQuestion()
    }, 2000)
  }

  const startNewGame = () => {
    setScore(0)
    setTotalQuestions(0)
    setGameStarted(true)
    setTimeLimit(3000) // Reset to 3 seconds
    generateQuestion()
  }

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return
    
    setTimerActive(false)
    setSelectedAnswer(answer)
    const correct = answer === correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      setScore(score + 1)
      // Decrease time limit slightly to increase difficulty
      setTimeLimit(Math.max(1500, timeLimit - 100))
    }
    setTotalQuestions(totalQuestions + 1)
    
    // Auto-advance after 2 seconds
    setTimeout(() => {
      generateQuestion()
    }, 2000)
  }

  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0
  const timeProgress = timeLimit > 0 ? (timeLeft / timeLimit) * 100 : 0

  if (!gameStarted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-bold mono uppercase mb-6">
            COLOR STROOP
          </h1>
          <p className="text-xl mb-8">
            Read the COLOR of the word, not the word itself. 
            For example, if you see <span className="text-red-500 font-bold">BLUE</span>, 
            the answer is RED. The answer buttons are also colored to add extra challenge!
          </p>
          <p className="text-lg text-gray-600 mb-12">
            This classic cognitive test improves focus, attention, and mental flexibility. 
            Gets faster as you improve!
          </p>
          <button
            onClick={startNewGame}
            className="brutalist-button text-lg"
          >
            Start Test
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Game Spreadsheet Grid */}

        {/* Row 1: Score and Time Limit */}
        <div className="flex border-b border-gray-300">
          <div className="flex-1 border-r border-gray-300 p-6 text-center">
            <div className="text-2xl font-bold mono">
              {score}/{totalQuestions} ({accuracy}%)
            </div>
          </div>
          <div className="flex-1 p-6 text-center">
            <div className="text-lg font-bold mono uppercase">
              TIME LIMIT<br/>
              {timeLimit}ms
            </div>
          </div>
        </div>

        {/* Row 2: Timer Bar */}
        <div className="border-b border-gray-300 p-6">
          <div className="w-full h-6 border-2 border-black bg-gray-200">
            <div
              className={`h-full transition-all duration-100 ${
                timeProgress > 50 ? 'bg-green-500' :
                timeProgress > 25 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.max(0, timeProgress)}%` }}
            />
          </div>
        </div>

        {/* Row 3: Question */}
        <div className="border-b border-gray-300 p-6 text-center">
          <div className="text-lg font-bold mono uppercase mb-4">
            WHAT COLOR IS THIS WORD?
          </div>
        </div>

        {/* Row 4: Colored Word */}
        <div className="border-b border-gray-300 p-8 text-center">
          <div className={`text-8xl md:text-9xl font-bold mono ${wordColor}`}>
            {wordText}
          </div>
        </div>

        {/* Row 5: Color Options (4 cells) */}
        <div className="flex border-b border-gray-300">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={showResult}
              className={`flex-1 border-r border-gray-300 p-6 text-xl font-bold mono transition-colors ${
                index < 3 ? 'border-r border-gray-300' : ''
              } ${
                showResult && option === correctAnswer
                  ? 'bg-green-500 text-white'
                  : showResult && option === selectedAnswer && option !== correctAnswer
                  ? 'bg-red-500 text-white'
                  : showResult
                  ? 'bg-gray-200 text-gray-500'
                  : 'bg-white hover:bg-gray-100'
              } ${!showResult ? optionColors[index] : ''}`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Row 6: Result Feedback */}
        <div className="border-b border-gray-300 p-6 text-center min-h-[100px] flex items-center justify-center">
          {showResult && (
            <div className={`text-2xl font-bold mono uppercase ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            }`}>
              {isCorrect ? '✓ CORRECT!' : selectedAnswer ? '✗ WRONG' : '⏰ TIME UP!'}
              {!isCorrect && (
                <div className="text-lg text-gray-600 mt-2 uppercase">
                  The color was {correctAnswer}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Row 7: New Game Button */}
        <div className="p-6 text-center">
          <button
            onClick={startNewGame}
            className="brutalist-button text-lg"
          >
            NEW GAME
          </button>
        </div>

      </div>
    </main>
  )
}
