import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenRouterClient(): OpenAI {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OpenRouter API key not configured");
  }
  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
  });
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, conversation = [] } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 },
      );
    }

    const openrouter = getOpenRouterClient();

    // Build messages array with system prompt and conversation history
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content:
          "You are a friendly real estate assistant for Dr. Jan Duffy at Siena Las Vegas. You specialize in Siena and Las Vegas 55+ communities (Siena, Sun City, Del Webb, Heritage at Stonebridge, etc.). Be concise, warm, helpful, and professional. Always mention that users can contact Dr. Jan Duffy at (702) 500-1942 for personalized Siena and 55+ community assistance.",
      },
      ...conversation,
      {
        role: "user",
        content: prompt,
      },
    ];

    const response = await openrouter.chat.completions.create({
      model: "anthropic/claude-3.5-haiku",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = response.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("OpenRouter API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 },
    );
  }
}
