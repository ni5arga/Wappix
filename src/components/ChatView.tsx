import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { SearchBar } from './SearchBar';
import { ScrollToTop } from './ScrollToTop';
import { ParsedChat, Message } from '../types/chat';

interface ChatViewProps {
  chat: ParsedChat;
}

export function ChatView({ chat }: ChatViewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState<Message[]>(chat.messages);
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);

  useEffect(() => {
    setFilteredMessages(chat.messages);
  }, [chat.messages]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredMessages(chat.messages);
      setHighlightedMessageId(null);
      return;
    }

    const filtered = chat.messages.filter(message =>
      message.content.toLowerCase().includes(query.toLowerCase()) ||
      message.sender.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMessages(filtered);

    if (filtered.length > 0) {
      setHighlightedMessageId(`${filtered[0].timestamp.getTime()}`);
      const element = document.getElementById(`msg-${filtered[0].timestamp.getTime()}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-white">
      <SearchBar onSearch={handleSearch} />
      <div className="max-w-3xl mx-auto space-y-4">
        {filteredMessages.map((message, index) => (
          <div
            key={`${message.timestamp.getTime()}-${index}`}
            id={`msg-${message.timestamp.getTime()}`}
          >
            <ChatMessage
              message={message}
              isCurrentUser={message.sender === chat.sender}
              highlight={highlightedMessageId === `${message.timestamp.getTime()}`}
              isGroupChat={chat.isGroupChat}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ScrollToTop />
    </div>
  );
}