export default function HomePage() {
  return (
    <main>
      {/* Games Selection - Spreadsheet Style */}
      <section className="bg-white">
        <div className="grid grid-cols-2 md:grid-cols-3">
          {/* Literature Typing */}
          <a href="/typing" className="border-r border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center">
            <div className="text-2xl mb-3">|</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Literature Typing</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              TYPE GREAT WORKS ONE WORD AT A TIME.<br/>
              IMPROVE FOCUS AND READING.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Math Grid */}
          <a href="/math" className="border-r border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center">
            <div className="text-3xl mb-3">∑</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Math Grid</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              VISUAL TIMES TABLES WITH RANDOM GRID SIZES.<br/>
              MULTIPLE CHOICE.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Dot Counter */}
          <a href="/dots" className="border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center md:border-r">
            <div className="text-3xl mb-3">●</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Dot Counter</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              COUNT DOTS THAT FLASH BRIEFLY.<br/>
              IMPROVES VISUAL PROCESSING.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Color Stroop */}
          <a href="/stroop" className="border-r border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center">
            <div className="text-2xl mb-3">◇</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Color Stroop</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              NAME THE COLOR, NOT THE WORD.<br/>
              CLASSIC COGNITIVE TEST.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Pattern Memory */}
          <a href="/pattern" className="border-r border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center">
            <div className="text-3xl mb-3">⊞</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Pattern Memory</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              REMEMBER AND REPEAT COLOR SEQUENCES.<br/>
              WORKING MEMORY TRAINING.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Fraction Visualizer */}
          <a href="/fractions" className="border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center md:border-r">
            <div className="text-3xl mb-3">○</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Fraction Visualizer</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              IDENTIFY FRACTIONS FROM PIE CHARTS.<br/>
              VISUAL MATH LEARNING.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Digit Span */}
          <a href="/digits" className="border-r border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center">
            <div className="text-3xl mb-3">□</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Digit Span</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              REMEMBER NUMBER SEQUENCES.<br/>
              CLASSIC MEMORY SPAN TEST.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Lemonade Stand */}
          <a href="/lemonade" className="border-r border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center">
            <div className="text-3xl mb-3">⌂</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Lemonade Stand</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              DAILY BUSINESS SIMULATOR.<br/>
              RECIPE RATIOS, PRICING, AND PROFIT.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Shape Tracing */}
          <a href="/trace" className="border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center">
            <div className="text-3xl mb-3">⎓</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Shape Tracing</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              TRACE SHAPES WITH SPEED AND ACCURACY.<br/>
              FINE MOTOR SKILLS TRAINING.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>
        </div>
      </section>
    </main>
  )
}
