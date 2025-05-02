"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Leaf, Upload, TreesIcon as Plant } from "lucide-react"
import Navbar from "@/components/Navbar"
import ImageUpload from "@/components/ImageUpload"
import ResultDisplay from "@/components/ResultDisplay"

export default function JasminePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelected = (file: File) => {
    setSelectedImage(file)
    setPreview(URL.createObjectURL(file))
    setPrediction(null)
    setError(null)
  }

  const handleSubmit = async () => {
    if (!selectedImage) return

    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("image", selectedImage)

    try {
      const response = await fetch(`http://localhost:5000/api/predict`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setPrediction(data)
    } catch (err: any) {
      console.error("Error submitting image:", err)
      setError(err.message || "Failed to process image")
      setPrediction(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar title="Plant Health Checker" />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Plant size={14} className="text-green-600" />
            <span>Plant Health Checker</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">Jasmine Leaf Disease Classifier</h1>
          <p className="text-green-600 max-w-2xl mx-auto">
            Upload a jasmine leaf image to identify potential diseases and get treatment recommendations
          </p>
        </motion.header>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="card bg-white p-6 rounded-xl border border-green-100 shadow-sm relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Decorative leaf patterns */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-green-800">
                  <path
                    fill="currentColor"
                    d="M30,10 Q50,0 70,10 Q90,20 90,40 Q90,60 70,70 Q50,80 30,70 Q10,60 10,40 Q10,20 30,10 Z"
                  />
                </svg>
              </div>

              <h2 className="text-xl font-semibold mb-4 text-green-800 flex items-center gap-2">
                <Upload className="h-5 w-5 text-green-600" />
                Upload Image
              </h2>
              <ImageUpload onImageSelected={handleImageSelected} onSubmit={handleSubmit} isLoading={isLoading} />

              {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">{error}</div>}

              {preview && (
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-medium mb-2 text-green-700">Selected Image</h3>
                  <div className="relative h-64 w-full rounded-lg overflow-hidden border border-green-100">
                    <Image
                      src={preview || "/placeholder.svg"}
                      alt="Selected jasmine leaf image"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="card bg-white p-6 rounded-xl border border-green-100 shadow-sm relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Decorative leaf patterns */}
              <div className="absolute bottom-0 left-0 w-32 h-32 opacity-5">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-green-800">
                  <path
                    fill="currentColor"
                    d="M70,90 Q50,100 30,90 Q10,80 10,60 Q10,40 30,30 Q50,20 70,30 Q90,40 90,60 Q90,80 70,90 Z"
                  />
                </svg>
              </div>

              <h2 className="text-xl font-semibold mb-4 text-green-800 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                Results
              </h2>
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                </div>
              ) : prediction ? (
                <ResultDisplay prediction={prediction} />
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-green-500 bg-green-50/50 rounded-lg border border-dashed border-green-200">
                  <Upload className="h-12 w-12 mb-4 text-green-300" />
                  <p>Upload and analyze an image to see results</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
