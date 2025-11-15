'use client'

import { useState, useEffect } from 'react'

type Weather = 'sunny' | 'cloudy' | 'rainy' | 'hot'
type GamePhase = 'buying' | 'production' | 'pricing' | 'results'

interface Inventory {
  lemons: number
  sugar: number
  water: number
}

interface DayResult {
  day: number
  weather: Weather
  cupsPlanned: number
  cupsSold: number
  price: number
  revenue: number
  costs: number
  profit: number
  wastedCups: number
}

const WEATHER_ICONS = {
  sunny: '☀️',
  cloudy: '☁️', 
  rainy: '🌧️',
  hot: '🔥'
}

const WEATHER_DEMAND = {
  sunny: 25,
  cloudy: 18,
  rainy: 8,
  hot: 35
}

const INGREDIENT_COSTS = {
  lemons: 0.10,
  sugar: 0.05,
  water: 0.02
}

export default function LemonadeGame() {
  const [currentDay, setCurrentDay] = useState(1)
  const [cash, setCash] = useState(10.00) // Starting cash
  const [weather, setWeather] = useState<Weather>('sunny')
  const [nextWeather, setNextWeather] = useState<Weather>('sunny')
  
  // Game state
  const [gamePhase, setGamePhase] = useState<GamePhase>('buying')
  const [dayResult, setDayResult] = useState<DayResult | null>(null)
  const [gameWon, setGameWon] = useState(false)
  
  // Inventory state
  const [inventory, setInventory] = useState<Inventory>({ lemons: 0, sugar: 0, water: 0 })
  const [buyingCart, setBuyingCart] = useState<Inventory>({ lemons: 0, sugar: 0, water: 0 })
  
  // Production state
  const [cupsToMake, setCupsToMake] = useState(0)
  const [price, setPrice] = useState(0.75)

  // Generate weather for current and next day
  useEffect(() => {
    const weathers: Weather[] = ['sunny', 'cloudy', 'rainy', 'hot']
    setWeather(nextWeather)
    setNextWeather(weathers[Math.floor(Math.random() * weathers.length)])
  }, [currentDay, nextWeather])

  const calculateCartCost = () => {
    return (buyingCart.lemons * INGREDIENT_COSTS.lemons) + 
           (buyingCart.sugar * INGREDIENT_COSTS.sugar) + 
           (buyingCart.water * INGREDIENT_COSTS.water)
  }

  const getMaxCups = () => {
    return Math.min(inventory.lemons, inventory.sugar, inventory.water)
  }

  const buyIngredients = () => {
    const cost = calculateCartCost()
    setCash(prev => prev - cost)
    setInventory(prev => ({
      lemons: prev.lemons + buyingCart.lemons,
      sugar: prev.sugar + buyingCart.sugar,
      water: prev.water + buyingCart.water
    }))
    setBuyingCart({ lemons: 0, sugar: 0, water: 0 })
    setGamePhase('production')
  }

  const startProduction = () => {
    // Use ingredients for cups
    setInventory(prev => ({
      lemons: prev.lemons - cupsToMake,
      sugar: prev.sugar - cupsToMake,
      water: prev.water - cupsToMake
    }))
    setGamePhase('pricing')
  }

  const runDay = () => {
    // Calculate demand based on weather and price
    const baseDemand = WEATHER_DEMAND[weather]
    const priceMultiplier = Math.max(0.2, 1.5 - (price - 0.75))
    const actualDemand = Math.floor(baseDemand * priceMultiplier * (0.8 + Math.random() * 0.4))
    
    const cupsSold = Math.min(cupsToMake, actualDemand)
    const wastedCups = cupsToMake - cupsSold
    
    const revenue = cupsSold * price
    const ingredientCost = cupsToMake * (INGREDIENT_COSTS.lemons + INGREDIENT_COSTS.sugar + INGREDIENT_COSTS.water)
    const profit = revenue - ingredientCost
    
    const result: DayResult = {
      day: currentDay,
      weather,
      cupsPlanned: cupsToMake,
      cupsSold,
      price,
      revenue,
      costs: ingredientCost,
      profit,
      wastedCups
    }
    
    setCash(prev => prev + profit)
    setDayResult(result)
    setGamePhase('results')
    
    // Check win condition
    if (cash + profit >= 50) {
      setGameWon(true)
    }
  }

  const nextDay = () => {
    setCurrentDay(prev => prev + 1)
    setGamePhase('buying')
    setDayResult(null)
    setCupsToMake(0)
  }

  const resetGame = () => {
    setCurrentDay(1)
    setCash(10.00)
    setGamePhase('buying')
    setDayResult(null)
    setGameWon(false)
    setInventory({ lemons: 0, sugar: 0, water: 0 })
    setBuyingCart({ lemons: 0, sugar: 0, water: 0 })
    setCupsToMake(0)
    setPrice(0.75)
  }

  if (gameWon) {
    return (
      <main className="min-h-screen bg-white">
        {/* Game Win Screen */}
        <div className="border-b border-gray-300 p-8 text-center">
          <div className="text-6xl font-bold mono mb-6">
            🍋 SUCCESS! 🍋
          </div>
          <div className="text-3xl font-bold mb-6">
            ${cash.toFixed(2)} CASH
          </div>
          <div className="text-xl text-gray-600 mb-8">
            You built a successful lemonade business in {currentDay} days!
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
    <main className="min-h-screen bg-white">
      {/* Game Spreadsheet Grid */}

        {/* Row 1: Header Info */}
        <div className="flex border-b border-gray-300">
          <div className="flex-1 border-r border-gray-300 p-6 text-center">
            <div className="text-2xl font-bold mono">
              DAY {currentDay} • {WEATHER_ICONS[weather]} {weather.toUpperCase()} • ${cash.toFixed(2)}
            </div>
          </div>
          <div className="flex-1 p-6 text-center">
            <div className="text-lg font-bold mono uppercase">
              GOAL: $50.00<br/>
              TOMORROW: {WEATHER_ICONS[nextWeather]} {nextWeather}
            </div>
          </div>
        </div>

        {/* Row 2: Game Phase Content */}
        <div className="border-b border-gray-300 p-8">
          {/* Buying Phase */}
          {gamePhase === 'buying' && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mono mb-8 uppercase">BUY INGREDIENTS</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Lemons */}
                <div className="text-center">
                  <div className="text-4xl mb-2">🍋</div>
                  <div className="text-xl font-bold mb-4">LEMONS</div>
                  <div className="text-lg mb-4 uppercase">Have: {inventory.lemons} | $0.10 each</div>
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setBuyingCart(prev => ({ ...prev, lemons: Math.max(0, prev.lemons - 1) }))}
                      className="text-2xl font-bold border-2 border-black px-4 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <div className="text-2xl font-bold mono w-12">{buyingCart.lemons}</div>
                    <button
                      onClick={() => setBuyingCart(prev => ({ ...prev, lemons: prev.lemons + 1 }))}
                      className="text-2xl font-bold border-2 border-black px-4 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Sugar */}
                <div className="text-center">
                  <div className="text-4xl mb-2">🍯</div>
                  <div className="text-xl font-bold mb-4">SUGAR</div>
                  <div className="text-lg mb-4 uppercase">Have: {inventory.sugar} | $0.05 each</div>
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setBuyingCart(prev => ({ ...prev, sugar: Math.max(0, prev.sugar - 1) }))}
                      className="text-2xl font-bold border-2 border-black px-4 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <div className="text-2xl font-bold mono w-12">{buyingCart.sugar}</div>
                    <button
                      onClick={() => setBuyingCart(prev => ({ ...prev, sugar: prev.sugar + 1 }))}
                      className="text-2xl font-bold border-2 border-black px-4 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Water */}
                <div className="text-center">
                  <div className="text-4xl mb-2">💧</div>
                  <div className="text-xl font-bold mb-4">WATER</div>
                  <div className="text-lg mb-4 uppercase">Have: {inventory.water} | $0.02 each</div>
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setBuyingCart(prev => ({ ...prev, water: Math.max(0, prev.water - 1) }))}
                      className="text-2xl font-bold border-2 border-black px-4 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <div className="text-2xl font-bold mono w-12">{buyingCart.water}</div>
                    <button
                      onClick={() => setBuyingCart(prev => ({ ...prev, water: prev.water + 1 }))}
                      className="text-2xl font-bold border-2 border-black px-4 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold mb-6 uppercase">
                  Total Cost: ${calculateCartCost().toFixed(2)}
                </div>
              </div>
            </div>
          )}

          {/* Production Phase */}
          {gamePhase === 'production' && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mono mb-8 uppercase">MAKE LEMONADE</h2>

              <div className="text-lg mb-6 uppercase">
                Inventory: {inventory.lemons} 🍋 | {inventory.sugar} 🍯 | {inventory.water} 💧
              </div>
              <div className="text-lg mb-8 uppercase">
                Max cups you can make: <span className="font-bold">{getMaxCups()}</span>
              </div>

              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={() => setCupsToMake(Math.max(0, cupsToMake - 1))}
                  className="text-4xl font-bold border-2 border-black px-6 py-3 hover:bg-gray-100"
                >
                  -
                </button>

                <div className="text-center">
                  <div className="text-6xl font-bold mono">{cupsToMake}</div>
                  <div className="text-lg uppercase">CUPS</div>
                </div>

                <button
                  onClick={() => setCupsToMake(Math.min(getMaxCups(), cupsToMake + 1))}
                  className="text-4xl font-bold border-2 border-black px-6 py-3 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Pricing Phase */}
          {gamePhase === 'pricing' && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mono mb-8 uppercase">SET PRICE</h2>

              <div className="text-lg mb-6 uppercase">
                You made <span className="font-bold">{cupsToMake} cups</span>
              </div>
              <div className="text-lg mb-8 uppercase">
                Weather: {WEATHER_ICONS[weather]} {weather} (Expected demand: ~{WEATHER_DEMAND[weather]} customers)
              </div>

              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={() => setPrice(Math.max(0.25, price - 0.05))}
                  className="text-4xl font-bold border-2 border-black px-6 py-3 hover:bg-gray-100"
                >
                  -
                </button>

                <div className="text-6xl font-bold mono">
                  ${price.toFixed(2)}
                </div>

                <button
                  onClick={() => setPrice(Math.min(2.00, price + 0.05))}
                  className="text-4xl font-bold border-2 border-black px-6 py-3 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Results Phase */}
          {gamePhase === 'results' && dayResult && (
            <div className="text-center">
              <h2 className="text-4xl font-bold mono mb-8 uppercase">DAY {currentDay} RESULTS</h2>

              <div className="grid md:grid-cols-4 gap-4 text-center mb-8">
                <div>
                  <div className="text-3xl font-bold mono">{dayResult.cupsSold}</div>
                  <div className="text-sm uppercase">Sold</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mono">{dayResult.wastedCups}</div>
                  <div className="text-sm uppercase">Wasted</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mono">${dayResult.revenue.toFixed(2)}</div>
                  <div className="text-sm uppercase">Revenue</div>
                </div>
                <div>
                  <div className={`text-3xl font-bold mono ${dayResult.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${dayResult.profit.toFixed(2)}
                  </div>
                  <div className="text-sm uppercase">Profit</div>
                </div>
              </div>

              <div className="text-xl font-bold uppercase">
                Cash: ${cash.toFixed(2)} / $50.00
              </div>
            </div>
          )}
        </div>

        {/* Row 3: Action Buttons */}
        <div className="p-6 text-center">
          {gamePhase === 'buying' && (
            <button
              onClick={buyIngredients}
              disabled={calculateCartCost() > cash || calculateCartCost() === 0}
              className="brutalist-button text-xl disabled:opacity-50"
            >
              BUY INGREDIENTS
            </button>
          )}

          {gamePhase === 'production' && (
            <button
              onClick={startProduction}
              disabled={cupsToMake === 0}
              className="brutalist-button text-xl disabled:opacity-50"
            >
              MAKE {cupsToMake} CUPS
            </button>
          )}

          {gamePhase === 'pricing' && (
            <button
              onClick={runDay}
              className="brutalist-button text-xl"
            >
              OPEN STAND
            </button>
          )}

          {gamePhase === 'results' && (
            <button
              onClick={nextDay}
              className="brutalist-button text-xl"
            >
              NEXT DAY
            </button>
          )}
        </div>

      </div>
    </main>
  )
}