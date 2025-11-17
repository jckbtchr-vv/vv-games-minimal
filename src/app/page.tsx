export default function HomePage() {
  return (
    <main>
      {/* Games Selection - Spreadsheet Style */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Literature Typing */}
          <a href="/typing" className="border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center md:border-r">
            <div className="text-2xl mb-3">|</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Type</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              TYPE GREAT WORKS ONE WORD AT A TIME.<br/>
              IMPROVE FOCUS AND READING.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Math Grid */}
          <a href="/math" className="border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center md:border-r">
            <div className="text-3xl mb-3">∑</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Multiply</h3>
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
            <h3 className="text-lg font-bold mono uppercase mb-3">Count</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              COUNT DOTS THAT FLASH BRIEFLY.<br/>
              IMPROVES VISUAL PROCESSING.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Color Stroop */}
          <a href="/stroop" className="border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center md:border-r">
            <div className="text-2xl mb-3">◇</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Read</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              NAME THE COLOR, NOT THE WORD.<br/>
              CLASSIC COGNITIVE TEST.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Pattern Memory */}
          <a href="/pattern" className="border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center md:border-r">
            <div className="text-3xl mb-3">⊞</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Remember</h3>
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
            <h3 className="text-lg font-bold mono uppercase mb-3">Visualize</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              IDENTIFY FRACTIONS FROM PIE CHARTS.<br/>
              VISUAL MATH LEARNING.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Digit Span */}
          <a href="/digits" className="border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center md:border-r">
            <div className="text-3xl mb-3">□</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Recall</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              REMEMBER NUMBER SEQUENCES.<br/>
              CLASSIC MEMORY SPAN TEST.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Lemonade Stand */}
          <a href="/lemonade" className="border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center md:border-r">
            <div className="text-3xl mb-3">⌂</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Manage</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              DAILY BUSINESS SIMULATOR.<br/>
              RECIPE RATIOS, PRICING, AND PROFIT.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Shape Tracing */}
          <a href="/trace" className="border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center md:border-r">
            <div className="text-3xl mb-3">⎓</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Trace</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              TRACE SHAPES WITH SPEED AND ACCURACY.<br/>
              FINE MOTOR SKILLS TRAINING.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Checks */}
          <a href="/checks" className="border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center md:border-r">
            <div className="text-3xl mb-3">✓</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Checks</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              EXPLORE THE VALUE OF VERIFICATION.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Opepen */}
          <a href="/opepen" className="border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center md:border-r">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Opepen</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              CONSENSUS IS TEMPORARY.
            </p>
            <div className="brutalist-button inline-block text-xs">
              Play
            </div>
          </a>

          {/* Gas Wars */}
          <a href="/gas-wars" className="border-b border-gray-300 py-6 px-4 hover:bg-gray-50 transition-colors block text-center">
            <div className="text-3xl mb-3">🔥</div>
            <h3 className="text-lg font-bold mono uppercase mb-3">Gas Wars</h3>
            <p className="text-gray-700 text-xs mb-4 leading-relaxed uppercase">
              DESTRUCTION CONTAINS MORE INFORMATION THAN SURVIVAL.
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
