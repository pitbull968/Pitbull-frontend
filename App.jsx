
import React from 'react'
import Hero from './Hero'
import ProductGrid from './ProductGrid'
import AIWidget from './components/AIWidget'
import CheckoutModal from './CheckoutModal'

export default function App(){
  return (
    <div className="min-h-screen text-gray-100">
      <header className="sticky top-0 backdrop-blur bg-black/25 border-b border-white/5 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-bold text-lg">PITBULL <span style={{color:'#ffcc00'}}>SAFETY</span></div>
          <nav className="flex gap-4 text-sm text-gray-300 items-center">
            <a href="#shop">Shop</a>
            <a href="#collections">Collections</a>
            <a href="#ai">AI Assistant</a>
            <a href="/admin" className="ml-4">Admin</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Hero />
        <section id="shop" className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Featured Safety Shoes</h2>
          <ProductGrid />
        </section>

        <section id="ai" className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">AI Shopkeeper</h2>
          <p className="text-gray-400">Talk, upload a photo, or type — the assistant will act like a live shopkeeper and take your order.</p>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-400">
        <div className="flex justify-between">
          <div>
            <strong>PITBULL SAFETY</strong><br/>Premium safety footwear
          </div>
          <div>
            Contact → <a className="text-yellow-400" href="mailto:hello@pitbullsafety.com">hello@pitbullsafety.com</a>
          </div>
        </div>
      </footer>

      <AIWidget />
      <CheckoutModal />
    </div>
  )
}
