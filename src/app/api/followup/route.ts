import { NextRequest, NextResponse } from "next/server";

const isDev = process.env.NODE_ENV === "development";

export async function POST(req: NextRequest) {
  const { prompt, userApiKey } = await req.json();

  // DEV: use Ollama
  if (isDev) {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      body: JSON.stringify({
        model: "llama3.2:latest", // or whatever model you have locally
        prompt,
        stream: false,
      }),
    });

    const data = await res.json();
    return NextResponse.json({ text: data.response.trim() });
  }

  // PROD: use OpenAI (with user key)
  if (!userApiKey) {
    return NextResponse.json(
      { error: "No API key provided." },
      { status: 401 }
    );
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: "You write brief, professional job search follow-up emails.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await response.json();

  if (data.error) {
    return NextResponse.json({ error: data.error.message }, { status: 500 });
  }

  return NextResponse.json({ text: data.choices[0].message.content.trim() });
}
