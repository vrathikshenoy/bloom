"use client";

import { cn } from "@/lib/utils";
import { Leaf, User } from "lucide-react";
import { motion } from "framer-motion";
import MarkdownRenderer from "@/components/markdown-renderer";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

const ChatBubble = ({ message, isUser }: ChatBubbleProps) => {
  return (
    <div
      className={cn("flex items-start gap-3", isUser ? "flex-row-reverse" : "")}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm",
          isUser ? "bg-green-600" : "bg-green-100",
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Leaf className="w-5 h-5 text-green-600" />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isUser ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "max-w-[85%] rounded-2xl p-4 shadow-sm overflow-hidden",
          isUser
            ? "bg-green-600 text-white rounded-tr-none"
            : "bg-green-50 text-green-800 rounded-tl-none border border-green-100",
        )}
      >
        {isUser ? (
          <div className="prose prose-sm max-w-none text-white break-words">
            {message}
          </div>
        ) : (
          <MarkdownRenderer
            content={message}
            className={cn("prose-green", "break-words")}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ChatBubble;
