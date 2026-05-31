import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
