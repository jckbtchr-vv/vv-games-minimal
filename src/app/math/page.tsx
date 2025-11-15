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
      resetSelection()
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

  return (
    <main className={`${gameStarted ? 'h-[calc(100vh-4rem)]' : 'flex items-center justify-center'} bg-white`}>
      {!gameStarted ? (
        /* Game Intro */
        <div className="max-w-2xl w-full p-8 text-center">
          <h1 className="text-4xl font-bold mono mb-6 uppercase">
            MATH GRID
          </h1>
          <p className="text-xl mb-6">
            Practice times tables with visual grids. See the grid, calculate the total, choose the right answer.
          </p>
          <p className="text-lg text-gray-600 mb-8 uppercase">
            Random grid sizes from 2×2 to 12×12. Perfect for improving mental math skills passively.
          </p>
          <button
            onClick={startNewGame}
            className="brutalist-button text-lg"
          >
            START PLAYING
          </button>
        </div>
      ) : (
        /* Game Spreadsheet Grid */
        <>
          {/* Row 1: Score and Grid Size */}
          <div className="flex border-b border-gray-300">
            <div className="flex-1 border-r border-gray-300 p-6 text-center">
              <div className="text-2xl font-bold mono">
                {score}/{totalQuestions} ({accuracy}%)
              </div>
            </div>
            <div className="flex-1 p-6 text-center">
              <div className="text-xl font-bold mono uppercase">
                GRID SIZE<br/>
                UP TO {gridSize}×{gridSize}
              </div>
            </div>
          </div>

          {/* Row 2: Question */}
          <div className="border-b border-gray-300 p-6 text-center">
            <div className="text-4xl md:text-6xl font-bold mono">
              {question}
            </div>
          </div>

          {/* Row 3: Visual Grid */}
          <div className="border-b border-gray-300 p-8 text-center">
            <div className="flex items-center justify-center min-h-[160px]">
              {renderGrid()}
            </div>
          </div>

          {/* Row 4: Instructions */}
          <div className="border-b border-gray-300 p-6 text-center">
            <div className="text-lg md:text-xl text-gray-600 uppercase">
              HOW MANY CELLS ARE IN THIS GRID?
            </div>
          </div>

          {/* Row 5: Multiple Choice Options (2x2 grid) */}
          <div className="flex border-b border-gray-300">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={`flex-1 border-r border-gray-300 p-4 md:p-6 text-xl md:text-2xl font-bold mono transition-colors ${
                  index < 3 ? 'border-r border-gray-300' : ''
                } ${
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

          {/* Row 6: Result Feedback */}
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
                    The answer was {correctAnswer}
                  </div>
                )}
              </>
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
        </>
      )}
    </main>
  )
}
