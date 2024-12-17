import React, { useState } from 'react';
import { Image, Video, File, Mic, X } from 'lucide-react';

interface MediaMessageProps {
  type: string;
  content: string;
  isCurrentUser: boolean;
}

export function MediaMessage({ type, content, isCurrentUser }: MediaMessageProps) {
  const [showFullImage, setShowFullImage] = useState(false);
  const [imageError, setImageError] = useState(false);

  // try to extract image URLs
  const imageMatch = content.match(/https?:\/\/[^\s<>]+\.(jpg|jpeg|png|gif|webp)/i);
  const imageUrl = imageMatch ? imageMatch[0] : null;

  const getMediaIcon = () => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Mic className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  if (type === 'image' && imageUrl && !imageError) {
    return (
      <>
        <div className="relative group">
          <img
            src={imageUrl}
            alt="Shared media"
            className="max-w-[300px] rounded-lg object-cover cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => setShowFullImage(true)}
            onError={() => setImageError(true)}
          />
        </div>
        
        {showFullImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={() => setShowFullImage(false)}>
            <button className="absolute top-4 right-4 text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full">
              <X className="w-6 h-6" />
            </button>
            <img
              src={imageUrl}
              alt="Full size media"
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      {getMediaIcon()}
      <span className={isCurrentUser ? 'text-white' : 'text-gray-800'}>
        {type === 'image' ? 'Photo' : type.charAt(0).toUpperCase() + type.slice(1)} attachment
      </span>
    </div>
  );
}