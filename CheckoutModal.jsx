
import React, {useState} from 'react'
import axios from 'axios'

export default function CheckoutModal(){
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({name:'', address:'', phone:'', payment:'cod'})
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

  async function placeOrder(){
    if(!form.name||!form.address||!form.phone){ alert('Fill required fields'); return }
    try {
      const res = await axios.post(API_BASE + '/api/order', { name: form.name, address: form.address, phone: form.phone, items: [] })
      alert('Order placed: ' + res.data.orderId)
      setOpen(false)
    } catch(err){
      alert('Order failed')
    }
  }

  return (
    <>
      <button onClick={()=> setOpen(true)} className="fixed left-6 bottom-6 bg-yellow-400 text-black px-3 py-2 rounded">Checkout</button>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white/3 p-6 rounded-lg w-96">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Checkout</h3>
              <button onClick={()=> setOpen(false)}>✕</button>
            </div>
            <div className="mt-4 space-y-3">
              <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} placeholder="Full name" className="w-full p-2 rounded bg-transparent border border-white/5" />
              <input value={form.address} onChange={(e)=>setForm({...form, address:e.target.value})} placeholder="Address" className="w-full p-2 rounded bg-transparent border border-white/5" />
              <input value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} placeholder="Phone" className="w-full p-2 rounded bg-transparent border border-white/5" />
              <select value={form.payment} onChange={(e)=>setForm({...form, payment:e.target.value})} className="w-full p-2 rounded bg-transparent border border-white/5">
                <option value="cod">Cash on delivery</option>
                <option value="online">Online payment</option>
              </select>
              <div className="flex justify-end gap-2">
                <button onClick={placeOrder} className="px-4 py-2 bg-yellow-400 text-black rounded">Place Order</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
