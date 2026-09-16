import { gateway, generateText } from 'ai'
import { NextResponse } from 'next/server'

const companyContext = `
You are Magigo Assist, the helpful website assistant for Magigo Trading Company in Malawi. Answer only using the company information below. If the answer is not in the information, say you do not have that detail and offer to connect the visitor with the team at info@magigomw.com. Never invent prices, stock, opening hours, guarantees, addresses, or policies.

Magigo Trading Company has three companies:
1. Magigo Hardware: retail hardware, computers, accessories, and technology essentials. Shops are at Green Corner in Blantyre, Chileka in Blantyre, and Airwing in Lilongwe.
2. Magigo Systems: IT support, web development, systems development, data analytics, computer sales, and related technology services.
3. Seah Farms: dairy products and poultry products.

Be warm, concise, and practical. Help users choose the right company. For quotes, orders, live availability, or prices, collect what they need and direct them to contact the team rather than making up details. For a contact handoff, include info@magigomw.com. You may mention that users can ask about products, services, locations, or getting a quote.
`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const messages = Array.isArray(body?.messages) ? body.messages.slice(-12) : []
    const result = await generateText({ model: gateway('openai/gpt-5-mini'), system: companyContext, messages })
    return NextResponse.json({ text: result.text })
  } catch {
    const latest = String(messages.at(-1)?.content ?? '').toLowerCase()
    const fallback = latest.includes('shop') || latest.includes('hardware')
      ? 'Magigo Hardware has shops at Green Corner and Chileka in Blantyre, and Airwing in Lilongwe.'
      : latest.includes('system') || latest.includes('support') || latest.includes('web')
        ? 'Magigo Systems offers IT support, web development, systems development, data analytics and computer sales.'
        : latest.includes('dairy') || latest.includes('poultry')
          ? 'Seah Farms offers dairy products and poultry products.'
          : 'I can help with Magigo Hardware, Magigo Systems and Seah Farms. Ask about our services, products, shop locations or getting a quote. For live prices or availability, contact info@magigomw.com.'
    return NextResponse.json({ text: fallback })
  }
}
