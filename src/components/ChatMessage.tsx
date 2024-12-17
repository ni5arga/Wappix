import React from 'react';
import { Message } from '../types/chat';
import { formatMessageTime, formatMessageDate } from '../utils/dateUtils';
import { processMessageContent } from '../utils/messageProcessor';
import { MediaMessage } from './MediaMessage';

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
  highlight?: boolean;
  isGroupChat?: boolean;
}

export function ChatMessage({ message, isCurrentUser, highlight, isGroupChat }: ChatMessageProps) {
  const formattedTime = formatMessageTime(message.timestamp);
  const formattedDate = formatMessageDate(message.timestamp);
  
  const {
    content,
    isDeleted,
    isEdited,
    isMedia,
    mediaType
  } = processMessageContent(message.content);

  // for group chats, all messages align to the left
  const alignment = isGroupChat ? 'justify-start' : (isCurrentUser ? 'justify-end' : 'justify-start');
  const bubbleStyle = isGroupChat ? 'bg-gray-100 rounded-bl-none' : 
    (isCurrentUser ? 'bg-green-500 text-white rounded-br-none' : 'bg-gray-100 rounded-bl-none');
  const textStyle = isGroupChat ? 'text-gray-900' : 
    (isCurrentUser ? 'text-white' : 'text-gray-900');

  return (
    <div className={`flex ${alignment} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${bubbleStyle} ${highlight ? 'ring-2 ring-yellow-400' : ''}`}
      >
        <div className={`text-sm font-semibold mb-1 ${textStyle}`}>
          {message.sender}
        </div>
        <div className="flex items-start gap-2">
          {isMedia ? (
            <MediaMessage
              type={mediaType || 'document'}
              content={content}
              isCurrentUser={!isGroupChat && isCurrentUser}
            />
          ) : (
            <p className={`text-sm whitespace-pre-wrap ${
              isCurrentUser && !isGroupChat ? 'text-white' : 'text-gray-800'
            } ${isDeleted ? 'italic text-opacity-75' : ''}`}>
              {content}
            </p>
          )}
        </div>
        <div className={`text-xs mt-1 flex items-center gap-2 ${
          isCurrentUser && !isGroupChat ? 'text-gray-100' : 'text-gray-500'
        }`}>
          <span>{formattedTime}</span>
          {isEdited && <span className="italic">edited</span>}
        </div>
      </div>
    </div>
  );
}