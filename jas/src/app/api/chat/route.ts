import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Garden Assistant system prompt
const GARDEN_SYSTEM_PROMPT = `You are BloomBuddy, a helpful gardening assistant specializing in personalized plant care advice.
Your goals are to:
1. Help users identify plants and diagnose plant issues from descriptions
2. Provide tailored advice for plant care based on species, growing conditions, and user's experience level
3. Suggest sustainable gardening practices and organic solutions when possible
4. Offer seasonal gardening tips and planting schedules
5. Be encouraging and supportive to gardeners of all skill levels

Always ask clarifying questions when needed about plant appearance, growing conditions, watering habits, 
light exposure, soil type, and location/climate to provide the most accurate advice.`

interface Message {
  content: string
  isUser: boolean
}

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Create a model instance - using gemini-flash (Gemini 2.0 Flash)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-04-17",
    })

    // Start a chat session
    const chat = model.startChat({
      history: formatChatHistory(history),
      generationConfig: {
        temperature: 0.6,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1200,
      },
    })

    // Send system prompt first if this is the first message
    if (!history || history.length === 0) {
      // Add system prompt as the first message
      await chat.sendMessage(GARDEN_SYSTEM_PROMPT)
    }

    // Send the user's message and get a response
    const result = await chat.sendMessage(message)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Error processing chat:", error)

    // Handle specific Gemini API errors
    if (error.message?.includes("not found for API version")) {
      return NextResponse.json(
        {
          error: "BloomBuddy is currently using an outdated garden catalog. Please check API configuration.",
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        error: "BloomBuddy couldn't understand your gardening question. Please try again.",
      },
      { status: 500 },
    )
  }
}

// Format chat history for Gemini API
function formatChatHistory(history: Message[] = []) {
  return history.map((msg) => ({
    role: msg.isUser ? "user" : "model",
    parts: [{ text: msg.content }],
  }))
}
