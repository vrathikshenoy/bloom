"use client";

import { motion } from "framer-motion";
import ChatContainer from "@/components/ChatContainer";
import Navbar from "@/components/Navbar";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <Navbar title="BloomBuddy Chat" />

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <div className="w-full h-full">
            <ChatContainer />
          </div>
        </motion.div>
      </main>

      <footer className="border-t py-4 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-sm text-green-500 text-center">
            BloomBuddy - Your Personal Plant Care Assistant
          </div>
        </div>
      </footer>
    </div>
  );
}
