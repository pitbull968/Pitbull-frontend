
import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios'

export default function AIWidget(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const fileRef = useRef()
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

  useEffect(()=>{
    if(open && messages.length===0){
      setTimeout(()=> sendMessage('Hello! I am Pitbull AI Shopkeeper. Try "show steel toe shoes".'), 600)
    }
  },[open])

  async function sendMessage(text, file){
    setMessages(m=>[...m, {id:Date.now(), sender:'user', text}])
    setMessages(m=>[...m, {id:Date.now()+1, sender:'bot', text:'Typing...'}])
    try {
      const form = new FormData()
      if(file) form.append('image', file)
      form.append('text', text || '')
      const res = await axios.post(API_BASE + '/api/ai', form)
      setMessages(m=>m.filter(mm=>mm.text !== 'Typing...'))
      setMessages(m=>[...m, {id:Date.now()+2, sender:'bot', text: res.data.reply || 'No response'}])
    } catch(err){
      setMessages(m=>m.filter(mm=>mm.text !== 'Typing...'))
      setMessages(m=>[...m, {id:Date.now()+2, sender:'bot', text: 'Error contacting AI endpoint.'}])
    }
  }

  function handleSend(){
    if(!input) return
    sendMessage(input)
    setInput('')
  }

  function handleFile(e){
    const file = e.target.files[0]
    if(!file) return
    sendMessage('Uploaded image', file)
  }

  return (
    <div className={`fixed right-6 bottom-6 w-96 bg-black/60 rounded-xl border border-white/5 shadow-xl ${open ? 'p-3' : 'p-2'}`}>
      <div className="flex items-center justify-between">
        <div className="font-semibold">AI Shopkeeper</div>
        <div className="flex gap-2">
          <button onClick={()=> fileRef.current.click()} className="text-sm border px-2 py-1 rounded">📷</button>
          <button onClick={()=> setOpen(o=>!o)} className="text-sm border px-2 py-1 rounded">{open ? 'Close' : 'Open'}</button>
        </div>
      </div>
      {open && (
        <div className="mt-3">
          <div className="h-48 overflow-auto space-y-2 mb-2">
            {messages.map(m=>(
              <div key={m.id} className={m.sender==='user' ? 'text-right' : 'text-left'}>
                <div className={m.sender==='user' ? 'inline-block message-user' : 'inline-block message-bot'}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type a command" className="flex-1 px-3 py-2 rounded bg-transparent border border-white/5" />
            <button onClick={handleSend} className="px-3 py-2 rounded bg-yellow-400 text-black">Send</button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </div>
        </div>
      )}
    </div>
  )
}
