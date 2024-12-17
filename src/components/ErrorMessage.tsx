import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
      <AlertCircle className="w-5 h-5" />
      <span>{message}</span>
      <button
        onClick={onDismiss}
        className="ml-4 text-red-700 hover:text-red-900"
      >
        ×
      </button>
    </div>
  );
}