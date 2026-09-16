'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, BriefcaseBusiness, Building2, ChevronRight, Headphones, MapPin, MessageCircle, PackageSearch, Send, Sparkles, X } from 'lucide-react'

type Message = { role: 'user' | 'assistant'; content: string }
const suggestions = ['What products does Magigo Hardware sell?', 'What does Magigo Systems offer?', 'Do Seah Farms have eggs and yoghurt?', 'I need a quote']
const companies = [
  ['Magigo Hardware', 'Retail & supplies', 'Computers, accessories, hardware and technology essentials.', Building2],
  ['Magigo Systems', 'Technology services', 'IT support, web development, systems development and data analytics.', BriefcaseBusiness],
  ['Seah Farms', 'Dairy & poultry', 'Fresh dairy products and poultry for homes, businesses and institutions.', PackageSearch],
] as const

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: "Hello. I’m Magigo Assist, here to help you find the right company, service or product across Magigo Trading Company. What can I help you with today?" }])
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, loading, open])

  async function sendMessage(event?: FormEvent, preset?: string) {
    event?.preventDefault()
    const content = (preset ?? input).trim()
    if (!content || loading) return
    const nextMessages = [...messages, { role: 'user' as const, content }]
    setInput(''); setMessages(nextMessages); setLoading(true)
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: nextMessages }) })
      if (!response.ok) throw new Error('Request failed')
      const data = await response.json()
      setMessages((current) => [...current, { role: 'assistant', content: data.text }])
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: 'I’m having trouble connecting right now. Please contact info@magigomw.com and our team will help you.' }])
    } finally { setLoading(false) }
  }

  return <main className="min-h-screen bg-[#f5f6f2] text-[#17221b]">
    <header className="border-b border-[#dce3da] bg-[#f5f6f2]/90 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
      <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#204b35] text-lg font-bold text-[#eef4df]">M</div><div><div className="text-sm font-bold tracking-[0.18em] text-[#204b35]">MAGIGO</div><div className="text-[10px] uppercase tracking-[0.16em] text-[#7b897d]">Trading company</div></div></div>
      <nav className="hidden gap-8 text-sm font-medium text-[#647267] md:flex"><a href="#companies">Our companies</a><a href="#locations">Locations</a><a href="#contact">Contact</a></nav><a href="mailto:info@magigomw.com" className="hidden items-center gap-2 rounded-full border border-[#cbd6ca] px-4 py-2 text-sm font-semibold text-[#204b35] sm:flex">Talk to our team <ArrowUpRight size={15} /></a>
    </div></header>

    <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-14 lg:grid-cols-[1fr_460px] lg:px-10 lg:pb-28 lg:pt-24"><div className="flex flex-col justify-center">
      <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-[#cbd6ca] bg-[#eef4df] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#45634d]"><span className="h-2 w-2 rounded-full bg-[#82a83f]" /> One group. Many possibilities.</div>
      <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#173823] sm:text-7xl">Find your way through <span className="text-[#6d8b36]">Magigo.</span></h1><p className="mt-7 max-w-xl text-lg leading-8 text-[#647267]">Explore our family of businesses across technology, hardware, dairy and poultry. Ask a question and Magigo Assist will point you in the right direction.</p>
      <div className="mt-10 flex flex-wrap gap-3"><a href="#companies" className="rounded-full bg-[#204b35] px-5 py-3 text-sm font-semibold text-white">Explore our companies <ChevronRight className="ml-1 inline" size={16} /></a><a href="#locations" className="rounded-full border border-[#cbd6ca] bg-white/50 px-5 py-3 text-sm font-semibold text-[#204b35]">Find a shop</a></div>
      <div className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-[#dce3da] pt-6"><div><div className="text-2xl font-semibold text-[#204b35]">03</div><div className="mt-1 text-xs text-[#7b897d]">companies</div></div><div><div className="text-2xl font-semibold text-[#204b35]">04</div><div className="mt-1 text-xs text-[#7b897d]">locations</div></div><div><div className="text-2xl font-semibold text-[#204b35]">01</div><div className="mt-1 text-xs text-[#7b897d]">helpful assistant</div></div></div>
    </div>

    <div className="relative"><div className="absolute -inset-4 rounded-[2.5rem] bg-[#e5eadc] blur-2xl" /><div className="relative overflow-hidden rounded-[2rem] border border-[#d5dfd2] bg-white shadow-[0_24px_60px_rgba(35,67,44,0.12)]">
      <div className="flex items-center justify-between border-b border-[#e8ede7] bg-[#fbfcfa] px-5 py-4"><div className="flex items-center gap-3"><div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-[#204b35] text-[#eef4df]"><Sparkles size={18} /><span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#82a83f]" /></div><div><div className="text-sm font-bold text-[#204b35]">Magigo Assist</div><div className="text-xs text-[#829084]">Online · replies in seconds</div></div></div><button aria-label="Toggle assistant" onClick={() => setOpen(!open)} className="rounded-full p-2 text-[#829084]">{open ? <X size={17} /> : <MessageCircle size={18} />}</button></div>
      {open && <><div className="flex h-[370px] flex-col gap-4 overflow-y-auto bg-[#fbfcfa] p-5">{messages.map((message, index) => <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'rounded-br-md bg-[#204b35] text-white' : 'rounded-bl-md border border-[#e1e8de] bg-white text-[#435348]'}`}>{message.content}</div></div>)}{loading && <div className="rounded-2xl rounded-bl-md border border-[#e1e8de] bg-white px-4 py-3 text-sm text-[#829084]">Thinking...</div>}<div ref={messagesEndRef} aria-hidden="true" /></div><div className="border-t border-[#e8ede7] bg-white p-4"><div className="mb-3 flex flex-wrap gap-2">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => sendMessage(undefined, suggestion)} className="rounded-full border border-[#dce5d8] px-3 py-1.5 text-[11px] text-[#607163]">{suggestion}</button>)}</div><form onSubmit={sendMessage} className="flex items-center gap-2 rounded-xl border border-[#d9e2d7] bg-[#fbfcfa] p-1.5"><input aria-label="Ask Magigo Assist" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about Magigo..." className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none" /><button aria-label="Send message" type="submit" disabled={!input.trim() || loading} className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#204b35] text-white disabled:opacity-50"><Send size={16} /></button></form></div></>}
    </div></div></section>

    <section id="companies" className="border-y border-[#dce3da] bg-white/55 px-6 py-16 lg:px-10"><div className="mx-auto max-w-7xl"><div className="mb-8"><div className="text-xs font-bold uppercase tracking-[0.18em] text-[#6d8b36]">The Magigo group</div><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#173823]">Built around what people need.</h2></div><div className="grid gap-4 md:grid-cols-3">{companies.map(([name, tag, copy, Icon]) => <div key={name} className="rounded-2xl border border-[#dce5d8] bg-[#fbfcfa] p-6"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8efdf] text-[#52743e]"><Icon size={21} /></div><div className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-[#78905d]">{tag}</div><h3 className="mt-2 text-xl font-semibold text-[#204b35]">{name}</h3><p className="mt-3 text-sm leading-6 text-[#718073]">{copy}</p></div>)}</div></div></section>
    <section id="locations" className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-10"><div><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6d8b36]"><MapPin size={14} /> Visit Magigo Hardware</div><h2 className="mt-3 text-2xl font-semibold text-[#173823]">Hardware shops across Malawi</h2></div><div className="flex flex-wrap gap-2">{['Green Corner · Blantyre', 'Chileka · Blantyre', 'Airwing · Lilongwe'].map((location) => <span key={location} className="rounded-full border border-[#d5dfd2] bg-white px-4 py-2.5 text-sm text-[#607163]">{location}</span>)}</div></section>
    <footer id="contact" className="border-t border-[#dce3da] bg-[#204b35] px-6 py-10 text-[#eef4df] lg:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="text-sm font-bold tracking-[0.18em]">MAGIGO TRADING COMPANY</div><p className="mt-2 text-sm text-[#b8c9b4]">Technology, trade and agriculture for a better tomorrow.</p></div><div className="flex flex-col gap-2 text-sm text-[#c9d7c3] sm:items-end"><a href="mailto:info@magigomw.com">info@magigomw.com</a><span className="flex items-center gap-2"><Headphones size={14} /> Talk to our team</span></div></div></footer>
  </main>
}
