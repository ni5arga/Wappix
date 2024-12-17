import React from 'react';
import { MessageSquare, Users, Calendar, Image } from 'lucide-react';
import { ChatStats } from '../types/chat';

interface ChatHeaderProps {
  stats: ChatStats;
  sender: string;
  receiver: string;
  onClose: () => void;
}

export function ChatHeader({ stats, sender, receiver, onClose }: ChatHeaderProps) {
  return (
    <div className="bg-green-500 p-4 rounded-t-lg text-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Chat Overview</h2>
          <div className="text-sm mt-1">
            <span className="font-semibold">{sender}</span>
            <span className="mx-2">→</span>
            <span className="font-semibold">{receiver}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-white text-green-500 rounded-lg hover:bg-gray-100 transition-colors"
        >
          New Chat
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          <span>{stats.totalMessages} messages</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <span>{Object.keys(stats.messagesByParticipant).length} participants</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <span>{stats.dateRange.start.toLocaleDateString()} - {stats.dateRange.end.toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Image className="w-5 h-5" />
          <span>{stats.mediaCount} media files</span>
        </div>
      </div>
    </div>
  );
}