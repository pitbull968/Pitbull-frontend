
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Admin(){
  const [pin, setPin] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [orders, setOrders] = useState([])
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'
  const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || '4444'

  useEffect(()=>{
    if(authenticated) fetchOrders()
  },[authenticated])

  async function fetchOrders(){
    try{
      const res = await axios.get(`${API_BASE}/api/orders?pin=${ADMIN_PIN}`)
      setOrders(res.data.orders || [])
    }catch(e){
      alert('Failed to fetch orders: ' + (e.response?.data?.error || e.message))
    }
  }

  function handleLogin(e){
    e.preventDefault()
    if(pin === ADMIN_PIN){
      setAuthenticated(true)
      setPin('')
    } else {
      alert('Wrong PIN')
    }
  }

  async function markStatus(id, status){
    try{
      await axios.post(`${API_BASE}/api/orders/${id}/status?pin=${ADMIN_PIN}`, { status })
      fetchOrders()
    }catch(e){ alert('Failed') }
  }

  async function delOrder(id){
    if(!window.confirm('Delete order?')) return;
    try{
      await axios.delete(`${API_BASE}/api/orders/${id}?pin=${ADMIN_PIN}`)
      fetchOrders()
    }catch(e){ alert('Failed') }
  }

  if(!authenticated){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white/4 p-6 rounded-lg w-80">
          <h3 className="text-lg font-bold mb-3">Admin Login</h3>
          <input value={pin} onChange={(e)=>setPin(e.target.value)} placeholder="Enter 4-digit PIN" className="w-full p-2 rounded mb-3 bg-transparent border border-white/5" />
          <button className="w-full bg-yellow-400 text-black p-2 rounded">Enter</button>
          <div className="text-gray-400 text-sm mt-3">PIN is set by site owner.</div>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.length===0 && <div className="text-gray-400">No orders yet</div>}
      <div className="space-y-4">
        {orders.map(o=>(
          <div key={o.id} className="bg-white/4 p-4 rounded flex justify-between items-start">
            <div>
              <div className="font-semibold">{o.name} — <span className="text-yellow-400">{o.id}</span></div>
              <div className="text-sm text-gray-300">{o.address}</div>
              <div className="text-sm text-gray-300">Phone: {o.phone}</div>
              <div className="text-sm text-gray-300">Items: {o.items.length}</div>
              <div className="text-xs text-gray-400">Placed at: {new Date(o.createdAt).toLocaleString()}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={()=>markStatus(o.id,'completed')} className="px-3 py-1 bg-green-500 text-black rounded">Mark Completed</button>
              <button onClick={()=>markStatus(o.id,'shipped')} className="px-3 py-1 bg-blue-500 text-black rounded">Mark Shipped</button>
              <button onClick={()=>delOrder(o.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
