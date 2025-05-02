"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import WelcomeMessage from "./WelcomeMessage";

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  interface Message {
    content: string;
    isUser: boolean;
    id: string;
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Small delay to ensure DOM is updated before scrolling
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  const handleSendMessage = async (messageContent: string) => {
    if (messageContent.trim() === "") return;

    if (showWelcome) {
      setShowWelcome(false);
    }

    // Add user message with unique ID
    const userMessage = {
      content: messageContent,
      isUser: true,
      id: `user-${Date.now()}`,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Set loading state
    setIsLoading(true);

    try {
      // Get response from API
      const conversationHistory = messages.slice(-10); // Use last 10 messages for context

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageContent,
          history: conversationHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response from API");
      }

      // Add bot message with unique ID
      const botMessage = {
        content: data.text,
        isUser: false,
        id: `bot-${Date.now()}`,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        content:
          "Sorry, I'm having trouble connecting. Please try again later.",
        isUser: false,
        id: `error-${Date.now()}`,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col h-[80vh] rounded-xl overflow-hidden shadow-lg bg-white border border-green-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 border-b bg-green-50/50 flex items-center justify-between">
        <h1 className="text-xl font-semibold flex items-center gap-2 text-green-800">
          <span className="text-green-600">🌱</span> BloomBuddy Chat
        </h1>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
          Ask me anything about plants
        </span>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent"
        style={{
          backgroundImage: 'url("/assets/leafy-bg-light.png")',
          backgroundSize: "300px",
          backgroundOpacity: 0.1,
          height: "calc(80vh - 130px)", // Fixed height calculation (80vh minus header and input heights)
        }}
      >
        <AnimatePresence mode="wait">
          {showWelcome ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <WelcomeMessage onSampleClick={handleSendMessage} />
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col gap-6"
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChatBubble
                      message={message.content}
                      isUser={message.isUser}
                    />
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </motion.div>
  );
};

export default ChatContainer;
