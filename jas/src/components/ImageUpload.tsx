"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Upload, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function ImageUpload({
  onImageSelected,
  onSubmit,
  isLoading,
}: ImageUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onImageSelected(file);
      }
    },
    [onImageSelected],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  });

  return (
    <div>
      <motion.div
        {...getRootProps()}
        className={`dropzone border-2 border-dashed rounded-xl p-6 transition-colors cursor-pointer flex flex-col items-center justify-center ${
          isDragActive
            ? "border-garden-500 bg-garden-50"
            : "border-garden-200 hover:border-garden-400"
        }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-garden-50 flex items-center justify-center mb-4">
            {isDragActive ? (
              <Upload className="h-8 w-8 text-green-600" />
            ) : (
              <ImageIcon className="h-8 w-8 text-green-600" />
            )}
          </div>
          <p className="text-green-700 font-medium mb-1">
            {isDragActive
              ? "Drop your image here"
              : "Drag & drop an image here"}
          </p>
          <p className="text-sm text-green-500 mb-2">
            or click to browse files
          </p>
          <p className="text-xs text-green-400">
            Supported formats: JPG, JPEG, PNG
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full mt-4 bg-green-600 hover:bg-garden-700 text-white disabled:opacity-50 disabled:cursor-not-allowed h-12"
        >
          {isLoading ? "Analyzing..." : "Analyze Image"}
        </Button>
      </motion.div>
    </div>
  );
}
