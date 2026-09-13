import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const response = await fetch("http://127.0.0.1:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2:1b",
        stream: false,
        messages: [
          {
            role: "system",
            content:
              "You are Chatty Bot, a helpful AI assistant. Your owner's name is Aaditya. Aaditya is Indian and is from India. If asked who your owner is, say Aaditya. If asked where your owner is from, say India. Answer questions accurately. Never say that Aaditya would answer a question. For mathematics, calculate the answer yourself.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not connect to Ollama." },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      reply: data.message?.content ?? "I couldn't generate a response.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
