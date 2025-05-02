"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flower, Sparkles, SunIcon, Droplets } from "lucide-react";

interface WelcomeMessageProps {
  onSampleClick: (message: string) => void;
}

const WelcomeMessage = ({ onSampleClick }: WelcomeMessageProps) => {
  const sampleQuestions = [
    {
      text: "How often should I water my succulents?",
      icon: <Droplets className="w-4 h-4" />,
    },
    {
      text: "What are some low-light indoor plants?",
      icon: <SunIcon className="w-4 h-4" />,
    },
    {
      text: "How do I get rid of fungus gnats?",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      text: "What plants are safe for pets?",
      icon: <Flower className="w-4 h-4" />,
    },
  ];

  return (
    <div className="p-4">
      <motion.div
        className="p-6 bg-green-50 rounded-xl border border-green-100 shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-4xl">🌱</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-green-800 text-center mb-2">
          Welcome to BloomBuddy!
        </h2>

        <p className="text-green-700 text-center mb-6">
          Your personal plant care assistant. Ask me anything about growing,
          caring for, or troubleshooting your plants!
        </p>

        <div className="space-y-3">
          <p className="text-sm text-green-600 font-medium">
            Try asking about:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleQuestions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start text-left border-green-200 text-green-700 hover:bg-green-100/50 hover:text-green-800"
                  onClick={() => onSampleClick(question.text)}
                >
                  <span className="mr-2 text-green-500">{question.icon}</span>
                  {question.text}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeMessage;
