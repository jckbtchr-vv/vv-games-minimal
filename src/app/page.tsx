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
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Typing Game */}
            <a href="/typing" className="border-3 border-black p-8 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-6xl mb-4">⌨️</div>
                <h3 className="text-2xl font-bold mono uppercase mb-4">Literature Typing</h3>
                <p className="text-gray-700 mb-6">
                  Type great works from Dickens, Melville, Tolkien, Austen, Shakespeare, and more.
                  One massive word at a time for pure focus.
                </p>
                <div className="brutalist-button inline-block">
                  Play Typing
                </div>
              </div>
            </a>

            {/* Math Grid Game */}
            <a href="/math" className="border-3 border-black p-8 bg-white hover:bg-gray-50 transition-colors block">
              <div className="text-center">
                <div className="text-6xl mb-4">🔢</div>
                <h3 className="text-2xl font-bold mono uppercase mb-4">Math Grid</h3>
                <p className="text-gray-700 mb-6">
                  Practice times tables with random grid sizes. Multiple choice answers.
                  Passively improve your mental math skills.
                </p>
                <div className="brutalist-button inline-block">
                  Play Math
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
