import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Charlotte <onboarding@resend.dev>",
    to: "crescence.charlotte@gmail.com",
    replyTo: email,
    subject: `Nouveau message de ${name}`,
    text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
