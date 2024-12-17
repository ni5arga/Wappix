import { ParsedChat, ChatStats } from '../types/chat';

export function generateChatStats(chat: ParsedChat): ChatStats {
  const messagesByParticipant: Record<string, number> = {};
  let mediaCount = 0;

  chat.messages.forEach(message => {
    messagesByParticipant[message.sender] = (messagesByParticipant[message.sender] || 0) + 1;
    if (message.isMedia) mediaCount++;
  });

  return {
    totalMessages: chat.messages.length,
    messagesByParticipant,
    mediaCount,
    dateRange: {
      start: chat.messages[0]?.timestamp || new Date(),
      end: chat.messages[chat.messages.length - 1]?.timestamp || new Date()
    }
  };
}