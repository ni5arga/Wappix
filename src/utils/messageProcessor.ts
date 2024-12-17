export function processMessageContent(content: string): {
  content: string;
  isDeleted: boolean;
  isEdited: boolean;
  isMedia: boolean;
  mediaType?: string;
} {
  const isDeleted = content.includes('This message was deleted') || content.includes('You deleted this message');
  const isEdited = content.includes('<This message was edited>') || content.includes('(edited)');
  
  // media detection 
  const mediaPatterns = [
    /<Media omitted>/i,
    /<image omitted>/i,
    /<video omitted>/i,
    /<audio omitted>/i,
    /<document omitted>/i,
    /\(file attached\)/i,
    /\(image attached\)/i,
    /\(video attached\)/i,
    /\(audio attached\)/i,
    /\(document attached\)/i
  ];

  const isMedia = mediaPatterns.some(pattern => pattern.test(content));

  let mediaType: string | undefined;
  const contentLower = content.toLowerCase();
  
  // check for image URLs 
  if (content.match(/https?:\/\/[^\s<>]+\.(jpg|jpeg|png|gif|webp)/i)) {
    mediaType = 'image';
  } else if (isMedia) {
    if (contentLower.includes('image') || contentLower.includes('photo')) {
      mediaType = 'image';
    } else if (contentLower.includes('video')) {
      mediaType = 'video';
    } else if (contentLower.includes('audio') || contentLower.includes('voice')) {
      mediaType = 'audio';
    } else {
      mediaType = 'document';
    }
  }

  let cleanContent = content;
  mediaPatterns.forEach(pattern => {
    cleanContent = cleanContent.replace(pattern, '');
  });
  cleanContent = cleanContent
    .replace('<This message was edited>', '')
    .replace('(edited)', '')
    .trim();

  return {
    content: cleanContent,
    isDeleted,
    isEdited,
    isMedia,
    mediaType,
  };
}