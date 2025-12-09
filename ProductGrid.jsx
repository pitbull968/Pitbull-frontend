
import React, {useState} from 'react'

const demoProducts = [
  { id: 'p1', name: 'Pitbull Pro Steel Toe', price: 129, img: 'https://images.unsplash.com/photo-1581089778246-5d4c8e0f6b6b?auto=format&fit=crop&w=900&q=60', tags: ['steel','pro'] },
  { id: 'p2', name: 'Pitbull GripMaster', price: 99, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=60', tags: ['anti-slip'] },
  { id: 'p3', name: 'Pitbull WorkBoot XT', price: 149, img: 'https://images.unsplash.com/photo-1519741492266-08b9b0f9b2da?auto=format&fit=crop&w=900&q=60', tags: ['steel','xt'] },
  { id: 'p4', name: 'Pitbull Lite Safety', price: 89, img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=60', tags: ['light'] }
]

export default function ProductGrid(){
  const [products] = useState(demoProducts)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(p=>(
        <div key={p.id} className="bg-white/3 rounded-lg p-3 flex flex-col transform hover:-translate-y-1 transition">
          <img src={p.img} alt={p.name} className="rounded-md w-full h-44 object-cover transition-transform hover:scale-105" />
          <div className="mt-3 flex justify-between items-start">
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-yellow-400 font-bold">₹{p.price}</div>
            </div>
            <div className="text-sm text-gray-300">★★★★★</div>
          </div>
          <p className="text-gray-400 text-sm mt-2">Industrial grade, tested for comfort.</p>
          <div className="mt-auto flex gap-2">
            <button className="mt-3 bg-yellow-400 text-black px-3 py-2 rounded font-semibold">Add to cart</button>
            <button className="mt-3 border border-white/10 px-3 py-2 rounded">Ask AI</button>
          </div>
        </div>
      ))}
    </div>
  )
}
