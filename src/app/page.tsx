export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Games Selection - Spreadsheet Style */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Row 1 */}
          <div className="flex border-b border-gray-300">
            <a href="/typing" className="flex-1 border-r border-gray-300 p-4 hover:bg-gray-50 transition-colors block text-center">
              <div className="text-3xl mb-2">⌨️</div>
              <h3 className="text-lg font-bold mono uppercase mb-2">Literature Typing</h3>
              <p className="text-gray-700 text-xs mb-3 leading-tight">
                Type great works one word at a time. Improve focus and reading.
              </p>
              <div className="brutalist-button inline-block text-xs">
                Play
              </div>
            </a>

            <a href="/math" className="flex-1 border-r border-gray-300 p-4 hover:bg-gray-50 transition-colors block text-center">
              <div className="text-3xl mb-2">🔢</div>
              <h3 className="text-lg font-bold mono uppercase mb-2">Math Grid</h3>
              <p className="text-gray-700 text-xs mb-3 leading-tight">
                Visual times tables with random grid sizes. Multiple choice.
              </p>
              <div className="brutalist-button inline-block text-xs">
                Play
              </div>
            </a>

            <a href="/dots" className="flex-1 p-4 hover:bg-gray-50 transition-colors block text-center">
              <div className="text-3xl mb-2">⚫</div>
              <h3 className="text-lg font-bold mono uppercase mb-2">Dot Counter</h3>
              <p className="text-gray-700 text-xs mb-3 leading-tight">
                Count dots that flash briefly. Improves visual processing.
              </p>
              <div className="brutalist-button inline-block text-xs">
                Play
              </div>
            </a>
          </div>

          {/* Row 2 */}
          <div className="flex border-b border-gray-300">
            <a href="/stroop" className="flex-1 border-r border-gray-300 p-4 hover:bg-gray-50 transition-colors block text-center">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="text-lg font-bold mono uppercase mb-2">Color Stroop</h3>
              <p className="text-gray-700 text-xs mb-3 leading-tight">
                Name the color, not the word. Classic cognitive test.
              </p>
              <div className="brutalist-button inline-block text-xs">
                Play
              </div>
            </a>

            <a href="/pattern" className="flex-1 border-r border-gray-300 p-4 hover:bg-gray-50 transition-colors block text-center">
              <div className="text-3xl mb-2">🧩</div>
              <h3 className="text-lg font-bold mono uppercase mb-2">Pattern Memory</h3>
              <p className="text-gray-700 text-xs mb-3 leading-tight">
                Remember and repeat color sequences. Working memory training.
              </p>
              <div className="brutalist-button inline-block text-xs">
                Play
              </div>
            </a>

            <a href="/fractions" className="flex-1 p-4 hover:bg-gray-50 transition-colors block text-center">
              <div className="text-3xl mb-2">🥧</div>
              <h3 className="text-lg font-bold mono uppercase mb-2">Fraction Visualizer</h3>
              <p className="text-gray-700 text-xs mb-3 leading-tight">
                Identify fractions from pie charts. Visual math learning.
              </p>
              <div className="brutalist-button inline-block text-xs">
                Play
              </div>
            </a>
          </div>

          {/* Row 3 */}
          <div className="flex">
            <a href="/digits" className="flex-1 border-r border-gray-300 p-4 hover:bg-gray-50 transition-colors block text-center">
              <div className="text-3xl mb-2">🔢</div>
              <h3 className="text-lg font-bold mono uppercase mb-2">Digit Span</h3>
              <p className="text-gray-700 text-xs mb-3 leading-tight">
                Remember number sequences. Classic memory span test.
              </p>
              <div className="brutalist-button inline-block text-xs">
                Play
              </div>
            </a>

            <a href="/lemonade" className="flex-1 p-4 hover:bg-gray-50 transition-colors block text-center">
              <div className="text-3xl mb-2">🍋</div>
              <h3 className="text-lg font-bold mono uppercase mb-2">Lemonade Stand</h3>
              <p className="text-gray-700 text-xs mb-3 leading-tight">
                Daily business simulator. Recipe ratios, pricing, and profit.
              </p>
              <div className="brutalist-button inline-block text-xs">
                Play
              </div>
            </a>

            {/* Empty cell for 3-column layout */}
            <div className="flex-1 p-4">
              {/* Empty space */}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
