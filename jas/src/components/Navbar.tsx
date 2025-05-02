"use client"

import Link from "next/link"
import { ArrowLeft, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface NavbarProps {
  showBackButton?: boolean
  title?: string
}

export default function Navbar({ showBackButton = true, title = "BloomBuddy" }: NavbarProps) {
  return (
    <header className="border-b bg-white py-4 shadow-sm">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button asChild variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50 -ml-2">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Home
                </Link>
              </Button>
            )}
            <div className="h-6 w-px bg-green-200"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🪴</span>
              <h1 className="text-xl font-semibold text-green-800">{title}</h1>
            </div>
          </div>
          <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
            <Leaf className="h-3.5 w-3.5" />
            Plant Care Assistant
          </div>
        </motion.div>
      </div>
    </header>
  )
}
