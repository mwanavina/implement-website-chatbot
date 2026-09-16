import { gateway, generateText, type ModelMessage } from 'ai'
import { NextResponse } from 'next/server'

const companyContext = `
You are Magigo Assist, the helpful website assistant for Magigo Trading Company in Malawi. Answer only using the company information below. If the answer is not in the information, say you do not have that detail and offer to connect the visitor with the team at info@magigomw.com. Never invent prices, stock, opening hours, guarantees, addresses, or policies.

Magigo Trading Company has three companies:
1. Magigo Hardware: retail hardware, computers, accessories, building materials, and technology essentials. Product categories include cement and related building supplies, hardware tools, electrical and plumbing items, computers, accessories, and general technology essentials. Shops are at Green Corner in Blantyre, Chileka in Blantyre, and Airwing in Lilongwe.
2. Magigo Systems: IT support, web development, systems development, data analytics, computer sales, and related technology services.
3. Seah Farms: dairy and poultry products. Products include local chickens, broilers, eggs, yoghurt, and other dairy products. Exact stock, pack sizes, breeds, prices, and availability must be confirmed by the team.

Group contact: info@magigomw.com. Use this email for quotes, orders, product availability, support enquiries, and contact handoff. Do not invent separate phone numbers or emails that are not provided.

Be warm, concise, and practical. Help users choose the right company. For quotes, orders, live availability, or prices, collect what they need and direct them to contact the team rather than making up details. For a contact handoff, include info@magigomw.com. You may mention that users can ask about products, services, locations, or getting a quote.
`

export async function POST(request: Request) {
  let messages: ModelMessage[] = []

  try {
    const body = await request.json()
    messages = Array.isArray(body?.messages)
      ? body.messages
          .slice(-12)
          .filter(
            (message: unknown): message is { role: 'user' | 'assistant'; content: unknown } =>
              typeof message === 'object' &&
              message !== null &&
              ('role' in message) &&
              (message.role === 'user' || message.role === 'assistant'),
          )
          .map((message: { role: 'user' | 'assistant'; content: unknown }): ModelMessage => ({
            role: message.role,
            content: typeof message.content === 'string' ? message.content : JSON.stringify(message.content),
          }))
      : []
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
