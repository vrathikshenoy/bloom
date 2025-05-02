"use client"

import { useState, useEffect } from "react"
import { Key } from "lucide-react"

interface ApiKeyFormProps {
  onSaved: () => void
}

const ApiKeyForm = ({ onSaved }: ApiKeyFormProps) => {
  const [apiKeyExists, setApiKeyExists] = useState(false)

  // Check if an API key exists on mount
  useEffect(() => {
    // In Next.js, we'll check if the API responds correctly
    const checkApiKey = async () => {
      try {
        const response = await fetch("/api/chat/check-key")
        const data = await response.json()
        setApiKeyExists(data.hasKey)
      } catch (error) {
        setApiKeyExists(false)
      }
    }

    checkApiKey()
  }, [])

  return (
    <div className="bg-white rounded-xl border p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Key className="w-5 h-5 text-green-600" />
        <h2 className="font-semibold text-lg">{apiKeyExists ? "API Key Configured" : "API Key Required"}</h2>
      </div>

      {apiKeyExists ? (
        <div>
          <p className="text-sm text-muted-foreground mb-3">
            Your Gemini API key is configured via environment variables. You can use the chat now.
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-muted-foreground mb-3">
            To use BloomBuddy with the Gemini API, you need to add a{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-xs">GEMINI_API_KEY</code> to your environment variables.
            Get an API key from{" "}
            <a
              href="https://makersuite.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-green-600 hover:underline"
            >
              Google AI Studio
            </a>
            .
          </p>
        </div>
      )}
    </div>
  )
}

export default ApiKeyForm
