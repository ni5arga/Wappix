// Extract constants to a separate file
export const FILE_TYPES = {
  TEXT: '.txt',
  ZIP: '.zip'
} as const;

export const SYSTEM_MESSAGE_PATTERNS = [
  'Messages and calls',
  'message timer',
  'end-to-end encrypted'
] as const;