// Extract date formatting logic to a separate utility
export function formatMessageTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function formatMessageDate(date: Date): string {
  return date.toLocaleDateString([], {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit'
  });
}