import { ParsedChat, Message } from '../types/chat';
import { SYSTEM_MESSAGE_PATTERNS } from './constants';
import { processMessageContent } from './messageProcessor';

function extractParticipantName(fullName: string): string {
  return fullName.replace(/\s*\([^)]*\)/g, '').trim();
}

function isSystemMessage(sender: string, content: string): boolean {
  return SYSTEM_MESSAGE_PATTERNS.some(pattern => 
    sender.includes(pattern) || content.includes(pattern)
  );
}

function parseMessageDate(date: string, time: string): Date {
  const [day, month, year] = date.split('/');
  const fullYear = year.length === 2 ? '20' + year : year;
  const dateStr = `${month}/${day}/${fullYear} ${time}`;
  return new Date(dateStr);
}

export function parseWhatsAppChat(text: string): ParsedChat {
  const lines = text.split('\n');
  const messages: Message[] = [];
  const participants = new Set<string>();
  const messageRegex = /(\d{1,2}\/\d{1,2}\/\d{2,4}),\s*(\d{1,2}:\d{2}\s*(?:am|pm))\s*-\s*([^:]+):\s*(.*)/i;
  
  let currentMessage: string | null = null;
  let currentSender: string | null = null;
  let firstSender: string | null = null;
  
  lines.forEach(line => {
    const match = line.match(messageRegex);
    
    if (match) {
      if (currentMessage && currentSender) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.sender === currentSender) {
          lastMessage.content = currentMessage;
          // Process media for multi-line messages
          const { isMedia, mediaType } = processMessageContent(currentMessage);
          lastMessage.isMedia = isMedia;
          lastMessage.mediaType = mediaType;
        }
      }
      
      const [, date, time, sender, content] = match;
      const cleanSender = extractParticipantName(sender.trim());
      const parsedDate = parseMessageDate(date, time);
      currentSender = cleanSender;
      currentMessage = content.trim();
      
      if (!isNaN(parsedDate.getTime()) && !isSystemMessage(cleanSender, content)) {
        if (!firstSender) {
          firstSender = cleanSender;
        }
        
        participants.add(cleanSender);
        
        // Process media when creating new message
        const { isMedia, mediaType } = processMessageContent(content);
        
        messages.push({
          timestamp: parsedDate,
          sender: cleanSender,
          content: content.trim(),
          isMedia,
          mediaType
        });
      }
    } else if (messages.length > 0) {
      currentMessage = (currentMessage || '') + '\n' + line;
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && currentSender === lastMessage.sender) {
        lastMessage.content = currentMessage.trim();
        // Process media for appended content
        const { isMedia, mediaType } = processMessageContent(currentMessage);
        lastMessage.isMedia = isMedia;
        lastMessage.mediaType = mediaType;
      }
    }
  });

  
  if (currentMessage && currentSender && messages.length > 0) {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === currentSender) {
      lastMessage.content = currentMessage.trim();
      const { isMedia, mediaType } = processMessageContent(currentMessage);
      lastMessage.isMedia = isMedia;
      lastMessage.mediaType = mediaType;
    }
  }

  const participantsArray = Array.from(participants);
  const sender = firstSender || participantsArray[0];
  const receiver = participantsArray.find(p => p !== sender) || 'Group Chat';

  return {
    messages,
    participants,
    sender,
    receiver,
    messageCount: messages.length,
    startDate: messages[0]?.timestamp,
    endDate: messages[messages.length - 1]?.timestamp,
    isGroupChat: participants.size > 2
  };
}