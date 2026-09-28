'use client'

import { useEffect, useState } from 'react'

/**
 * Tiers mirror the real Checks divisor sequence (80, 40, 20, 10, 5, 4, 1, 0).
 * Higher divisor = more common, easier to blend in. Lower divisor = rarer,
 * and here also harder to find. The final tier — 0, the Black Check — has no
 * single answer: every mark looks notable. That's the trick round.
 */
interface Tier {
  label: string
  cols: number
  time: number
  trick?: boolean
}

const TIERS: Tier[] = [
  { label: '80', cols: 3, time: 4000 },
  { label: '40', cols: 4, time: 3600 },
  { label: '20', cols: 5, time: 3200 },
  { label: '10', cols: 6, time: 2800 },
  { label: '5', cols: 7, time: 2400 },
  { label: '4', cols: 8, time: 2000 },
  { label: '1', cols: 9, time: 1800 },
  { label: '0 — BLACK CHECK', cols: 9, time: 3000, trick: true },
]

const MANIFESTO = [
  'if no one is verified, everyone is verified.',
  'if no one is notable, everyone is notable.',
]

function fontSizeForCols(cols: number) {
  if (cols <= 3) return 'text-4xl'
  if (cols <= 4) return 'text-3xl'
  if (cols <= 5) return 'text-2xl'
  if (cols <= 6) return 'text-xl'
  if (cols <= 7) return 'text-lg'
  return 'text-base'
}

type Phase = 'playing' | 'correct' | 'wrong' | 'complete'

export default function ChecksGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [tierIndex, setTierIndex] = useState(0)
  const [notableIndex, setNotableIndex] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(TIERS[0].time)
  const [phase, setPhase] = useState<Phase>('playing')
  const [failReason, setFailReason] = useState('')

  const tier = TIERS[tierIndex]
  const size = tier.cols * tier.cols

  const startRound = (index: number) => {
    const t = TIERS[index]
    setNotableIndex(t.trick ? null : Math.floor(Math.random() * (t.cols * t.cols)))
    setTimeLeft(t.time)
    setPhase('playing')
  }

  const startGame = () => {
    setGameStarted(true)
    setTierIndex(0)
    startRound(0)
  }

  const handleCorrect = () => {
    setPhase('correct')
    window.setTimeout(() => {
      const next = tierIndex + 1
      if (next < TIERS.length) {
        setTierIndex(next)
        startRound(next)
      } else {
        setPhase('complete')
      }
    }, 500)
  }

  const handleWrong = (reason: string) => {
    setFailReason(reason)
    setPhase('wrong')
  }

  const handleCellClick = (index: number) => {
    if (phase !== 'playing') return
    if (tier.trick) {
      handleWrong('You checked one. But when everyone is verified, no one is.')
      return
    }
    if (index === notableIndex) {
      handleCorrect()
    } else {
      handleWrong('Wrong one. It looked the same as everyone else.')
    }
  }

  const handleNoneNotable = () => {
    if (phase !== 'playing' || !tier.trick) return
    handleCorrect()
  }

  // Countdown for the current round.
  useEffect(() => {
    if (!gameStarted || phase !== 'playing') return
    const id = window.setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 100))
    }, 100)
    return () => window.clearInterval(id)
  }, [gameStarted, phase, tierIndex])

  // React to the countdown reaching zero.
  useEffect(() => {
    if (!gameStarted || phase !== 'playing' || timeLeft > 0) return
    handleWrong(
      tier.trick
        ? 'You hesitated. Certainty doesn’t wait either.'
        : 'Too slow. It blended in.'
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft])

  const survived = phase === 'complete' ? TIERS.length : tierIndex

  return (
    <main className={gameStarted ? 'h-[calc(100vh-4rem)] bg-white' : 'flex items-center justify-center bg-white'}>
      {!gameStarted ? (
        <div className="max-w-2xl w-full p-8 text-center">
          <h1 className="text-4xl font-bold mono mb-6 uppercase">Checks</h1>
          <p className="text-xl mb-6">
            One check is notable. The rest are not. Find it before it disappears into the crowd.
          </p>
          <p className="text-lg text-gray-600 mb-8 uppercase">
            Eight tiers, from common to rare. The crowd grows every round —
            and the last round has no answer at all.
          </p>
          <button onClick={startGame} className="brutalist-button text-lg">
            Start Checking
          </button>
        </div>
      ) : (
        <>
          {/* Row 1: Tier and survived count */}
          <div className="flex border-b border-gray-300">
            <div className="flex-1 border-r border-gray-300 p-6 text-center">
              <div className="text-2xl font-bold mono uppercase">Tier {tier.label}</div>
            </div>
            <div className="flex-1 p-6 text-center">
              <div className="text-lg font-bold mono uppercase">
                Survived
                <br />
                {survived}/{TIERS.length}
              </div>
            </div>
          </div>

          {/* Row 2: Countdown bar */}
          <div className="border-b border-gray-300 h-2 bg-gray-100">
            {phase === 'playing' && (
              <div
                className="h-full bg-black"
                style={{ width: `${(timeLeft / tier.time) * 100}%`, transition: 'width 100ms linear' }}
              />
            )}
          </div>

          {/* Row 3: Grid */}
          <div className="border-b border-gray-300 p-8">
            <div className="max-w-lg mx-auto border-2 border-black bg-gray-50 p-3">
              {phase === 'wrong' ? (
                <div className="py-10 text-center">
                  <div className="text-3xl font-bold mono uppercase text-red-600 mb-4">✗ Not Verified</div>
                  <p className="text-lg uppercase mb-2">{failReason}</p>
                  <p className="text-base text-gray-600 uppercase">
                    Reached tier {tier.label} · survived {survived} of {TIERS.length}
                  </p>
                </div>
              ) : phase === 'complete' ? (
                <div className="py-10 text-center">
                  <div className="text-3xl font-bold mono uppercase text-green-600 mb-4">✓ Black Check</div>
                  {MANIFESTO.map((line) => (
                    <p key={line} className="text-lg italic mb-1">
                      {line}
                    </p>
                  ))}
                  <p className="text-sm font-bold mono uppercase mt-6 tracking-wide">Don't trust — check.</p>
                </div>
              ) : (
                <div
                  className="grid gap-1"
                  style={{ gridTemplateColumns: `repeat(${tier.cols}, minmax(0, 1fr))` }}
                >
                  {Array.from({ length: size }, (_, i) => {
                    const isNotable = tier.trick ? true : i === notableIndex
                    return (
                      <button
                        key={i}
                        onClick={() => handleCellClick(i)}
                        className="aspect-square flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-100"
                      >
                        <span
                          className={`${fontSizeForCols(tier.cols)} font-bold ${
                            isNotable
                              ? 'bg-gradient-to-tr from-pink-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent'
                              : 'text-gray-300'
                          }`}
                        >
                          ✓
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Row 4: Actions */}
          <div className="p-6 text-center">
            {phase === 'playing' && tier.trick && (
              <button onClick={handleNoneNotable} className="brutalist-button text-lg mr-4">
                None Are Notable
              </button>
            )}
            {(phase === 'wrong' || phase === 'complete') && (
              <button onClick={startGame} className="brutalist-button text-lg">
                Play Again
              </button>
            )}
          </div>
        </>
      )}
    </main>
  )
}
