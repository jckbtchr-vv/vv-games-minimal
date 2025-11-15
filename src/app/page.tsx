export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mono uppercase mb-6">
            VV GAMES
          </h1>
          <p className="text-2xl md:text-3xl font-bold mb-8">
            Simple. Clean. Fun.
          </p>
          <p className="text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Hyper-minimal typing game featuring great works of literature. 
            Type one word at a time with pure focus.
          </p>
          
          <a 
            href="/typing" 
            className="brutalist-button inline-block text-lg"
          >
            Play Typing Game
          </a>
        </div>
      </section>

      {/* Game Preview */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="border-3 border-black p-8 bg-white text-center">
            <div className="text-6xl mb-4">⌨️</div>
            <h3 className="text-2xl font-bold mono uppercase mb-4">Literature Typing</h3>
            <p className="text-gray-700 mb-6">
              Type great works from Dickens, Melville, Tolkien, Austen, Shakespeare, and more.
              One massive word at a time for pure focus.
            </p>
            <a href="/typing" className="brutalist-button">
              Start Playing
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
