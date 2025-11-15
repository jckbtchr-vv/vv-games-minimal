'use client'

import { useState, useEffect } from 'react'

export default function MathGridGame() {
  const [gridSize, setGridSize] = useState<number>(0)
  const [question, setQuestion] = useState<string>('')
  const [correctAnswer, setCorrectAnswer] = useState<number>(0)
  const [options, setOptions] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  // Generate random grid size between 2x2 and 12x12
  const generateNewQuestion = () => {
    const size = Math.floor(Math.random() * 11) + 2 // 2-12
    const rows = Math.floor(Math.random() * size) + 1 // 1 to size
    const cols = Math.floor(Math.random() * size) + 1 // 1 to size
    
    const answer = rows * cols
    const questionText = `${rows} × ${cols}`
    
    // Generate wrong options
    const wrongOptions: number[] = []
    while (wrongOptions.length < 3) {
      let wrongAnswer
      if (Math.random() < 0.5) {
        // Close wrong answers (±1 to ±5)
        wrongAnswer = answer + (Math.floor(Math.random() * 10) - 5)
      } else {
        // Random wrong answers
        wrongAnswer = Math.floor(Math.random() * (size * size)) + 1
      }
      
      if (wrongAnswer !== answer && wrongAnswer > 0 && !wrongOptions.includes(wrongAnswer)) {
        wrongOptions.push(wrongAnswer)
      }
    }
    
    // Shuffle options
    const allOptions = [answer, ...wrongOptions].sort(() => Math.random() - 0.5)
    
    setGridSize(size)
    setQuestion(questionText)
    setCorrectAnswer(answer)
    setOptions(allOptions)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setShowResult(false)
  }

  // Start new game
  const startNewGame = () => {
    setScore(0)
    setTotalQuestions(0)
    setGameStarted(true)
    generateNewQuestion()
  }

  // Handle answer selection
  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer)
    const correct = answer === correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      setScore(score + 1)
    }
    setTotalQuestions(totalQuestions + 1)
    
    // Auto-advance to next question after 1.5 seconds
    setTimeout(() => {
      generateNewQuestion()
    }, 1500)
  }

  // Generate visual grid
  const renderGrid = () => {
    if (!question) return null
    
    const [rows, cols] = question.split(' × ').map(Number)
    const cells = []
    
    for (let i = 0; i < rows * cols; i++) {
      cells.push(
        <div
          key={i}
          className="w-4 h-4 md:w-6 md:h-6 bg-black border border-white"
        />
      )
    }
    
    return (
      <div 
        className="inline-grid gap-1 p-4 bg-gray-200 border-2 border-black"
        style={{ 
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
        }}
      >
        {cells}
      </div>
    )
  }

  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0

  if (!gameStarted) {
    return (
      <main className="game-container">
        <div className="game-content">
          <div className="game-section text-center">
            <h1 className="game-title">
              MATH GRID
            </h1>
            <p className="text-xl mb-6">
              Practice times tables with visual grids. See the grid, calculate the total, choose the right answer.
            </p>
            <p className="game-subtitle">
              Random grid sizes from 2×2 to 12×12. Perfect for improving mental math skills passively.
            </p>
            <button
              onClick={startNewGame}
              className="game-button"
            >
              Start Playing
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="game-spreadsheet">
      <div className="game-cell space-y-6">
        {/* Score */}
        <div className="text-center">
          <div className="text-2xl font-bold mono mb-4">
            {score} / {totalQuestions} ({accuracy}%)
          </div>
        </div>

        {/* Question and Grid */}
        <div className="text-center space-y-6">
          <div className="text-4xl md:text-6xl font-bold mono min-h-[60px] flex items-center justify-center">
            {question}
          </div>

          {/* Visual Grid */}
          <div className="flex items-center justify-center min-h-[120px] md:min-h-[160px]">
            {renderGrid()}
          </div>

          <div className="text-lg md:text-xl text-gray-600 mb-6">
            How many cells are in this grid?
          </div>
        </div>

        {/* Multiple Choice Options */}
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={showResult}
              className={`p-4 md:p-6 text-xl md:text-2xl font-bold mono border-2 border-black transition-colors ${
                showResult && option === correctAnswer
                  ? 'bg-green-500 text-white'
                  : showResult && option === selectedAnswer && option !== correctAnswer
                  ? 'bg-red-500 text-white'
                  : showResult
                  ? 'bg-gray-200 text-gray-500'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Result Feedback - Fixed Height */}
        <div className="text-center min-h-[80px] flex flex-col justify-center">
          {showResult && (
            <>
              <div className={`text-2xl font-bold mono uppercase ${
                isCorrect ? 'text-green-600' : 'text-red-600'
              }`}>
                {isCorrect ? '✓ CORRECT!' : '✗ WRONG'}
              </div>
              {!isCorrect && (
                <div className="text-lg text-gray-600 mt-2 uppercase">
                  The answer was {correctAnswer}
                </div>
              )}
            </>
          )}
        </div>

        {/* New Game Button */}
        <div className="text-center">
          <button
            onClick={startNewGame}
            className="brutalist-button text-lg"
          >
            New Game
          </button>
        </div>
      </div>
    </main>
  )
}
