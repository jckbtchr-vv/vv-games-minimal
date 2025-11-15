'use client'

import { useState, useEffect } from 'react'

type Weather = 'sunny' | 'cloudy' | 'rainy' | 'hot'

interface DayResult {
  day: number
  weather: Weather
  recipe: { lemon: number; sugar: number; water: number }
  price: number
  customers: number
  satisfaction: number
  profit: number
}

const WEATHER_ICONS = {
  sunny: '☀️',
  cloudy: '☁️', 
  rainy: '🌧️',
  hot: '🔥'
}

const WEATHER_DEMAND = {
  sunny: 1.0,
  cloudy: 0.7,
  rainy: 0.3,
  hot: 1.4
}

export default function LemonadeGame() {
  const [currentDay, setCurrentDay] = useState(1)
  const [totalProfit, setTotalProfit] = useState(0)
  const [weather, setWeather] = useState<Weather>('sunny')
  
  // Recipe state (0-100)
  const [lemon, setLemon] = useState(50)
  const [sugar, setSugar] = useState(50)
  const [water, setWater] = useState(50)
  
  // Pricing state
  const [price, setPrice] = useState(0.50)
  
  // Game state
  const [dayStarted, setDayStarted] = useState(false)
  const [dayResult, setDayResult] = useState<DayResult | null>(null)
  const [gameWon, setGameWon] = useState(false)

  // Generate random weather for the day
  useEffect(() => {
    const weathers: Weather[] = ['sunny', 'cloudy', 'rainy', 'hot']
    setWeather(weathers[Math.floor(Math.random() * weathers.length)])
  }, [currentDay])

  const calculateRecipeSatisfaction = () => {
    // Perfect recipe is around 60% lemon, 40% sugar, 30% water
    const lemonScore = Math.max(0, 100 - Math.abs(lemon - 60))
    const sugarScore = Math.max(0, 100 - Math.abs(sugar - 40))
    const waterScore = Math.max(0, 100 - Math.abs(water - 30))
    
    return (lemonScore + sugarScore + waterScore) / 300
  }

  const runDay = () => {
    setDayStarted(true)
    
    // Calculate base customers based on weather
    const baseCustomers = Math.floor(20 * WEATHER_DEMAND[weather])
    
    // Recipe satisfaction affects repeat customers
    const recipeSatisfaction = calculateRecipeSatisfaction()
    
    // Price affects customer volume (sweet spot around $0.75)
    const priceMultiplier = Math.max(0.1, 2 - Math.abs(price - 0.75) * 2)
    
    // Final customer count
    const customers = Math.floor(baseCustomers * recipeSatisfaction * priceMultiplier)
    
    // Calculate profit
    const revenue = customers * price
    const costs = customers * 0.25 // Fixed cost per cup
    const profit = revenue - costs
    
    const result: DayResult = {
      day: currentDay,
      weather,
      recipe: { lemon, sugar, water },
      price,
      customers,
      satisfaction: recipeSatisfaction,
      profit
    }
    
    setDayResult(result)
    setTotalProfit(prev => prev + profit)
    
    // Check win condition
    if (totalProfit + profit >= 50) {
      setGameWon(true)
    }
  }

  const nextDay = () => {
    setCurrentDay(prev => prev + 1)
    setDayStarted(false)
    setDayResult(null)
  }

  const resetGame = () => {
    setCurrentDay(1)
    setTotalProfit(0)
    setDayStarted(false)
    setDayResult(null)
    setGameWon(false)
    setLemon(50)
    setSugar(50)
    setWater(50)
    setPrice(0.50)
  }

  if (gameWon) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center space-y-8">
          <div className="text-6xl font-bold mono">
            🍋 SUCCESS! 🍋
          </div>
          <div className="text-3xl font-bold">
            ${totalProfit.toFixed(2)} PROFIT
          </div>
          <div className="text-xl text-gray-600">
            You built a successful lemonade empire in {currentDay} days!
          </div>
          <button
            onClick={resetGame}
            className="brutalist-button text-lg"
          >
            PLAY AGAIN
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-4xl font-bold mono mb-4">
            DAY {currentDay} | {WEATHER_ICONS[weather]} {weather.toUpperCase()} | ${totalProfit.toFixed(2)} TOTAL
          </div>
          <div className="text-lg text-gray-600">
            Goal: Reach $50.00 total profit
          </div>
        </div>

        {!dayStarted ? (
          <div className="space-y-12">
            {/* Recipe Section */}
            <div className="border-3 border-black p-8 bg-gray-100">
              <h2 className="text-2xl font-bold mono mb-8 text-center">RECIPE</h2>
              
              <div className="space-y-6">
                {/* Lemon Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold">🍋 LEMON</span>
                    <span className="text-xl font-bold mono">{lemon}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={lemon}
                    onChange={(e) => setLemon(Number(e.target.value))}
                    className="w-full h-4 bg-gray-300 border-2 border-black"
                  />
                </div>

                {/* Sugar Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold">🍯 SUGAR</span>
                    <span className="text-xl font-bold mono">{sugar}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sugar}
                    onChange={(e) => setSugar(Number(e.target.value))}
                    className="w-full h-4 bg-gray-300 border-2 border-black"
                  />
                </div>

                {/* Water Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold">💧 WATER</span>
                    <span className="text-xl font-bold mono">{water}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={water}
                    onChange={(e) => setWater(Number(e.target.value))}
                    className="w-full h-4 bg-gray-300 border-2 border-black"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="border-3 border-black p-8 bg-white">
              <h2 className="text-2xl font-bold mono mb-8 text-center">PRICING</h2>
              
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={() => setPrice(Math.max(0.25, price - 0.05))}
                  className="text-4xl font-bold border-3 border-black px-6 py-3 hover:bg-gray-100"
                >
                  -
                </button>
                
                <div className="text-6xl font-bold mono">
                  ${price.toFixed(2)}
                </div>
                
                <button
                  onClick={() => setPrice(Math.min(2.00, price + 0.05))}
                  className="text-4xl font-bold border-3 border-black px-6 py-3 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Start Day Button */}
            <div className="text-center">
              <button
                onClick={runDay}
                className="brutalist-button text-2xl px-12 py-6"
              >
                START DAY {currentDay}
              </button>
            </div>
          </div>
        ) : dayResult ? (
          /* Day Results */
          <div className="space-y-8">
            <div className="border-3 border-black p-8 bg-gray-100 text-center">
              <h2 className="text-3xl font-bold mono mb-6">DAY {currentDay} RESULTS</h2>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold mono">{dayResult.customers}</div>
                  <div className="text-lg">Customers</div>
                </div>
                
                <div>
                  <div className="text-4xl font-bold mono">{Math.round(dayResult.satisfaction * 100)}%</div>
                  <div className="text-lg">Satisfaction</div>
                </div>
                
                <div>
                  <div className={`text-4xl font-bold mono ${dayResult.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${dayResult.profit.toFixed(2)}
                  </div>
                  <div className="text-lg">Profit</div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="text-2xl font-bold">
                Total Profit: ${totalProfit.toFixed(2)} / $50.00
              </div>
              
              <button
                onClick={nextDay}
                className="brutalist-button text-xl px-8 py-4"
              >
                NEXT DAY
              </button>
            </div>
          </div>
        ) : (
          /* Loading State */
          <div className="text-center">
            <div className="text-2xl font-bold mono">Running Day {currentDay}...</div>
          </div>
        )}
      </div>
    </main>
  )
}
