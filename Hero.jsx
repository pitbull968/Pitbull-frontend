
import React from 'react'

export default function Hero(){
  return (
    <section className="grid md:grid-cols-2 gap-6 items-center">
      <div>
        <h1 className="text-4xl font-extrabold">Rugged. Refined.</h1>
        <p className="mt-3 text-gray-300 max-w-xl">Premium safety footwear — reimagined with smooth motion and an AI shopkeeper to guide every order.</p>
        <div className="mt-6 flex gap-3">
          <a href="#shop" className="px-4 py-2 rounded bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-semibold">Shop Now</a>
          <button id="openAI" className="px-4 py-2 rounded border border-white/10">Ask AI Assistant</button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative w-96 h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-white/3 to-transparent flex items-center justify-center shadow-xl">
          <img src="https://images.unsplash.com/photo-1581089778246-5d4c8e0f6b6b?auto=format&fit=crop&w=900&q=60" alt="shoe" className="w-2/3 transform transition-all rotate-1 animate-slow-rotate" />
          <canvas id="fabricCanvas" className="absolute inset-0 pointer-events-none"></canvas>
        </div>
      </div>
    </section>
  )
}
