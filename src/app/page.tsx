export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mono uppercase mb-6">
            INFINITE GAMES
          </h1>
          <p className="text-2xl md:text-3xl font-bold mb-8">
            Minimal. Focused. Infinite.
          </p>
          <p className="text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            An infinite collection of minimal games designed for focus and learning. 
            No distractions, just pure gameplay.
          </p>
        </div>
      </section>

      {/* Games Selection */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mono uppercase text-center mb-12">
            Choose Your Game
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Typing Game */}
            <a href="/typing" className="border-3 border-black p-6 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-4xl mb-3">⌨️</div>
                <h3 className="text-xl font-bold mono uppercase mb-3">Literature Typing</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Type great works one word at a time. Improve focus and reading.
                </p>
                <div className="brutalist-button inline-block text-sm">
                  Play
                </div>
              </div>
            </a>

            {/* Math Grid Game */}
            <a href="/math" className="border-3 border-black p-6 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-4xl mb-3">🔢</div>
                <h3 className="text-xl font-bold mono uppercase mb-3">Math Grid</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Visual times tables with random grid sizes. Multiple choice.
                </p>
                <div className="brutalist-button inline-block text-sm">
                  Play
                </div>
              </div>
            </a>

            {/* Dot Counter */}
            <a href="/dots" className="border-3 border-black p-6 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-4xl mb-3">⚫</div>
                <h3 className="text-xl font-bold mono uppercase mb-3">Dot Counter</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Count dots that flash briefly. Improves visual processing.
                </p>
                <div className="brutalist-button inline-block text-sm">
                  Play
                </div>
              </div>
            </a>

            {/* Color Stroop */}
            <a href="/stroop" className="border-3 border-black p-6 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-xl font-bold mono uppercase mb-3">Color Stroop</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Name the color, not the word. Classic cognitive test.
                </p>
                <div className="brutalist-button inline-block text-sm">
                  Play
                </div>
              </div>
            </a>

            {/* Pattern Memory */}
            <a href="/pattern" className="border-3 border-black p-6 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-4xl mb-3">🧩</div>
                <h3 className="text-xl font-bold mono uppercase mb-3">Pattern Memory</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Remember and repeat color sequences. Working memory training.
                </p>
                <div className="brutalist-button inline-block text-sm">
                  Play
                </div>
              </div>
            </a>

            {/* Fraction Visualizer */}
            <a href="/fractions" className="border-3 border-black p-6 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-4xl mb-3">🥧</div>
                <h3 className="text-xl font-bold mono uppercase mb-3">Fraction Visualizer</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Identify fractions from pie charts. Visual math learning.
                </p>
                <div className="brutalist-button inline-block text-sm">
                  Play
                </div>
              </div>
            </a>

                        {/* Digit Span */}
                        <a href="/digits" className="border-3 border-black p-6 bg-white hover:bg-gray-50 transition-colors block">
                          <div className="text-center">
                            <div className="text-4xl mb-3">🔢</div>
                            <h3 className="text-xl font-bold mono uppercase mb-3">Digit Span</h3>
                            <p className="text-gray-700 text-sm mb-4">
                              Remember number sequences. Classic memory span test.
                            </p>
                            <div className="brutalist-button inline-block text-sm">
                              Play
                            </div>
                          </div>
                        </a>

                        {/* Lemonade Stand */}
                        <a href="/lemonade" className="border-3 border-black p-6 bg-white hover:bg-gray-50 transition-colors block">
                          <div className="text-center">
                            <div className="text-4xl mb-3">🍋</div>
                            <h3 className="text-xl font-bold mono uppercase mb-3">Lemonade Stand</h3>
                            <p className="text-gray-700 text-sm mb-4">
                              Daily business simulator. Recipe ratios, pricing, and profit.
                            </p>
                            <div className="brutalist-button inline-block text-sm">
                              Play
                            </div>
                          </div>
                        </a>
                      </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mono uppercase mb-6">
            More Games Coming Soon
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Memory games, word puzzles, logic challenges, and more minimal games for focused learning.
          </p>
          <div className="text-4xl">∞</div>
        </div>
      </section>
    </main>
  )
}
