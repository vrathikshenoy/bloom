"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Flower,
  AlertCircle,
} from "lucide-react";

interface ResultDisplayProps {
  prediction: {
    prediction: string;
    confidence: number;
    allPredictions: Record<string, number>;
    geminiAnalysis: {
      isJasmine: string;
      plantType: string;
      disease: string;
      healthCondition: string;
      confidenceLevel: number;
    };
  };
}

export default function ResultDisplay({ prediction }: ResultDisplayProps) {
  // Sort predictions by confidence (descending)
  const sortedPredictions = Object.entries(prediction.allPredictions).sort(
    (a, b) => b[1] - a[1],
  );

  // Function to get appropriate color based on the prediction
  const getPredictionColor = (className: string): string => {
    if (className.toLowerCase().includes("healthy")) {
      return "text-green-600";
    } else {
      return "text-red-600";
    }
  };

  // Function to get appropriate icon based on the prediction
  const getPredictionIcon = (className: string) => {
    if (className.toLowerCase().includes("healthy")) {
      return <CheckCircle className="h-6 w-6 text-green-600" />;
    } else {
      return <AlertTriangle className="h-6 w-6 text-red-600" />;
    }
  };

  // Function to calculate width for progress bar
  const getWidth = (confidence: number): string => {
    return `${Math.min(confidence, 100)}%`;
  };

  // Function to determine if the image is a jasmine leaf based on Gemini analysis
  const isJasmineLeaf = (): boolean => {
    return prediction.geminiAnalysis.isJasmine.toLowerCase() === "yes";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gemini Plant Identification Result */}
      <motion.div
        className="mb-6 p-5 rounded-lg"
        style={{
          backgroundColor: isJasmineLeaf()
            ? "rgba(219, 234, 254, 0.5)" // Blue for plant identification
            : "rgba(254, 240, 138, 0.5)", // Yellow for non-jasmine
        }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-start gap-3">
          <Flower className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="text-lg font-medium mb-1">Plant Identification</h3>
            <div>
              <p className="text-lg font-semibold text-blue-700">
                {prediction.geminiAnalysis.plantType || "Unknown Plant Type"}
              </p>
              <p className="text-sm text-blue-600 mt-1">
                {isJasmineLeaf()
                  ? "This appears to be a jasmine leaf."
                  : prediction.geminiAnalysis.isJasmine === "Unsure"
                    ? "Unable to confirm if this is a jasmine leaf."
                    : "This does not appear to be a jasmine leaf."}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gemini Disease Analysis */}
      <motion.div
        className="mb-6 p-5 rounded-lg"
        style={{
          backgroundColor: prediction.geminiAnalysis.healthCondition
            .toLowerCase()
            .includes("healthy")
            ? "rgba(220, 252, 231, 0.5)" // Green for healthy
            : "rgba(254, 226, 226, 0.5)", // Red for disease
        }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-amber-600" />
          <div>
            <h3 className="text-lg font-medium mb-1">Gemini AI Analysis</h3>
            <div>
              <p className="text-lg font-semibold text-amber-700">
                {prediction.geminiAnalysis.disease === "Unknown"
                  ? "No specific disease detected"
                  : prediction.geminiAnalysis.disease}
              </p>
              <p className="text-sm text-amber-600 mt-1">
                Health: {prediction.geminiAnalysis.healthCondition || "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CNN Model Prediction */}
      <motion.div
        className="mb-6 p-5 rounded-lg"
        style={{
          backgroundColor: prediction.prediction
            .toLowerCase()
            .includes("healthy")
            ? "rgba(220, 252, 231, 0.5)"
            : "rgba(254, 226, 226, 0.5)",
        }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="flex items-start gap-3">
          {getPredictionIcon(prediction.prediction)}
          <div>
            <h3 className="text-lg font-medium mb-1">CNN Model Prediction</h3>
            <div className="flex items-baseline flex-wrap">
              <p
                className={`text-2xl font-bold ${getPredictionColor(prediction.prediction)}`}
              >
                {prediction.prediction}
              </p>
              <p className="ml-3 text-gray-600">
                {prediction.confidence.toFixed(2)}% confidence
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CNN Classification Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-lg font-medium mb-3 text-green-800 flex items-center gap-2">
          <Info className="h-4 w-4 text-green-600" />
          CNN Classifications
        </h3>
        <div className="space-y-3">
          {sortedPredictions.map(([className, confidence], index) => (
            <motion.div
              key={className}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            >
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-green-700">
                  {className}
                </span>
                <span className="text-sm text-green-500">
                  {confidence.toFixed(2)}%
                </span>
              </div>
              <div className="w-full bg-green-100 rounded-full h-2.5">
                <motion.div
                  className={`h-2.5 rounded-full ${
                    className.toLowerCase().includes("healthy")
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: "0%" }}
                  animate={{ width: getWidth(confidence) }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Summary and Recommendations */}
      <motion.div
        className="mt-6 pt-4 border-t border-green-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-lg font-medium mb-2 text-green-800">
          Analysis Summary
        </h3>
        <p className="text-sm text-green-600">
          This analysis combines two AI approaches:
          <span className="block mt-2 font-medium">
            1. Google Gemini Vision:{" "}
            {isJasmineLeaf()
              ? "Identified as jasmine leaf."
              : "Plant identification and general health assessment."}
          </span>
          <span className="block mt-1 font-medium">
            2. Custom CNN Model: Detailed classification of leaf health
            conditions.
          </span>
          {!isJasmineLeaf() && (
            <span className="block mt-2 text-amber-600 font-medium">
              Note: This application is optimized for jasmine leaves. Results
              for other plants may be less accurate.
            </span>
          )}
          {prediction.geminiAnalysis.healthCondition
            .toLowerCase()
            .includes("healthy") &&
          prediction.prediction.toLowerCase().includes("healthy") ? (
            <span className="block mt-2 text-green-600 font-medium">
              Both AI systems indicate your plant appears healthy. Continue with
              your current care routine.
            </span>
          ) : (
            <span className="block mt-2 text-amber-600 font-medium">
              One or both AI systems detected potential issues. Consider
              consulting a plant specialist for confirmation and treatment
              options.
            </span>
          )}
        </p>
      </motion.div>
    </motion.div>
  );
}
