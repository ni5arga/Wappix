export interface Message {
  timestamp: Date;
  sender: string;
  content: string;
  isMedia?: boolean;
  mediaType?: 'image' | 'video' | 'audio' | 'document';
  mediaUrl?: string; // media URL support
}

export interface ParsedChat {
  messages: Message[];
  participants: Set<string>;
  sender: string;
  receiver: string;
  startDate?: Date;
  endDate?: Date;
  messageCount: number;
  isGroupChat: boolean;
}

export interface ChatStats {
  totalMessages: number;
  messagesByParticipant: Record<string, number>;
  mediaCount: number;
  dateRange: {
    start: Date;
    end: Date;
  };
}