import React, { useCallback } from 'react';
import { Upload, FileText, Archive } from 'lucide-react';
import { handleFile } from '../utils/fileHandlers';

interface FileUploadProps {
  onFileSelect: (content: string) => void;
  onError: (error: string) => void;
}

export function FileUpload({ onFileSelect, onError }: FileUploadProps) {
  const processFile = useCallback(async (file: File) => {
    try {
      const content = await handleFile(file);
      onFileSelect(content);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to process file');
    }
  }, [onFileSelect, onError]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  return (
    <div className="w-full max-w-xl mx-auto p-6">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative border-2 border-green-300 border-dashed rounded-xl p-8 bg-green-50 hover:bg-green-100 transition-colors"
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".txt,.zip"
          onChange={handleFileChange}
        />
        
        <div className="flex flex-col items-center text-center">
          <Upload className="w-12 h-12 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Drop your chat file here
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            or click to select a file
          </p>
          
          <div className="flex gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>.txt files</span>
            </div>
            <div className="flex items-center gap-2">
              <Archive className="w-4 h-4" />
              <span>.zip archives</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}