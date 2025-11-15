export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Games Selection */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Typing Game */}
            <a href="/typing" className="border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-3xl mb-2">⌨️</div>
                <h3 className="text-lg font-bold mono uppercase mb-2">Literature Typing</h3>
                <p className="text-gray-700 text-xs mb-3 leading-tight">
                  Type great works one word at a time. Improve focus and reading.
                </p>
                <div className="brutalist-button inline-block text-xs">
                  Play
                </div>
              </div>
            </a>

            {/* Math Grid Game */}
            <a href="/math" className="border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-3xl mb-2">🔢</div>
                <h3 className="text-lg font-bold mono uppercase mb-2">Math Grid</h3>
                <p className="text-gray-700 text-xs mb-3 leading-tight">
                  Visual times tables with random grid sizes. Multiple choice.
                </p>
                <div className="brutalist-button inline-block text-xs">
                  Play
                </div>
              </div>
            </a>

            {/* Dot Counter */}
            <a href="/dots" className="border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-3xl mb-2">⚫</div>
                <h3 className="text-lg font-bold mono uppercase mb-2">Dot Counter</h3>
                <p className="text-gray-700 text-xs mb-3 leading-tight">
                  Count dots that flash briefly. Improves visual processing.
                </p>
                <div className="brutalist-button inline-block text-xs">
                  Play
                </div>
              </div>
            </a>

            {/* Color Stroop */}
            <a href="/stroop" className="border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-3xl mb-2">🎨</div>
                <h3 className="text-lg font-bold mono uppercase mb-2">Color Stroop</h3>
                <p className="text-gray-700 text-xs mb-3 leading-tight">
                  Name the color, not the word. Classic cognitive test.
                </p>
                <div className="brutalist-button inline-block text-xs">
                  Play
                </div>
              </div>
            </a>

            {/* Pattern Memory */}
            <a href="/pattern" className="border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-3xl mb-2">🧩</div>
                <h3 className="text-lg font-bold mono uppercase mb-2">Pattern Memory</h3>
                <p className="text-gray-700 text-xs mb-3 leading-tight">
                  Remember and repeat color sequences. Working memory training.
                </p>
                <div className="brutalist-button inline-block text-xs">
                  Play
                </div>
              </div>
            </a>

            {/* Fraction Visualizer */}
            <a href="/fractions" className="border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-3xl mb-2">🥧</div>
                <h3 className="text-lg font-bold mono uppercase mb-2">Fraction Visualizer</h3>
                <p className="text-gray-700 text-xs mb-3 leading-tight">
                  Identify fractions from pie charts. Visual math learning.
                </p>
                <div className="brutalist-button inline-block text-xs">
                  Play
                </div>
              </div>
            </a>

            {/* Digit Span */}
            <a href="/digits" className="border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-3xl mb-2">🔢</div>
                <h3 className="text-lg font-bold mono uppercase mb-2">Digit Span</h3>
                <p className="text-gray-700 text-xs mb-3 leading-tight">
                  Remember number sequences. Classic memory span test.
                </p>
                <div className="brutalist-button inline-block text-xs">
                  Play
                </div>
              </div>
            </a>

            {/* Lemonade Stand */}
            <a href="/lemonade" className="border-2 border-black p-4 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-3xl mb-2">🍋</div>
                <h3 className="text-lg font-bold mono uppercase mb-2">Lemonade Stand</h3>
                <p className="text-gray-700 text-xs mb-3 leading-tight">
                  Daily business simulator. Recipe ratios, pricing, and profit.
                </p>
                <div className="brutalist-button inline-block text-xs">
                  Play
                </div>
              </div>
            </a>
                      </div>
        </div>
      </section>
    </main>
  )
}
