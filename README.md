# Wappix

A modern web application for reading and analyzing exported WhatsApp chat files, featuring a clean and intuitive interface that mirrors the WhatsApp experience.

![Wappix]()

## Features

### Chat Interface
- 💬 Clean, WhatsApp-inspired message bubbles
- 👥 Support for both individual and group chats
- 📱 Fully responsive design
- ⚡ Real-time message rendering

### Message Handling
- 📝 Multi-line message support
- 🖼️ Media attachment detection
- ✏️ Edited message indicators
- ❌ Deleted message handling
- 🔍 Full-text search functionality

### Navigation
- ⬆️ Scroll to top button
- 🔎 Message search with highlighting
- ⌨️ Keyboard shortcuts for search

### Chat Analysis
- 📊 Participant statistics
- 📅 Chat timeline view
- 📈 Message count tracking
- 👥 Participant detection

## Technical Details

### Stuff I Used To Build This
- **React 18** 
- **TypeScript** 
- **Tailwind CSS** 
- **Vite** 
- **Lucide React** 

### Project Structure
```
src/
├── components/           # React components
│   ├── ChatHeader.tsx   # Chat info & stats
│   ├── ChatMessage.tsx  # Message bubbles
│   ├── ChatView.tsx     # Main chat display
│   ├── MediaMessage.tsx # Media handling
│   ├── SearchBar.tsx    # Search interface
│   └── ScrollToTop.tsx  # Navigation helper
├── types/               # TypeScript types
│   └── chat.ts         # Chat interfaces
├── utils/              # Utility functions
│   ├── chatParser.ts   # Chat file parsing
│   ├── chatStats.ts    # Statistics
│   ├── constants.ts    # App constants
│   ├── dateUtils.ts    # Date formatting
│   └── messageProcessor.ts # Message processing
└── App.tsx             # Root component
```

### Key Features Implementation

#### Message Processing
- Automatic sender/receiver detection
- Group chat recognition
- System message filtering
- Media attachment parsing
- Message editing detection

#### Search Functionality
- Real-time filtering
- Case-insensitive search
- Sender & content search
- Result highlighting
- Smooth scroll to results

#### UI/UX Features
- Dynamic message alignment
- Responsive bubbles
- Timestamp formatting
- Media icons
- Loading states

## Getting Started

1. Clone the repository:
\`\`\`bash
git clone https://github.com/ni5arga/wappix.git
cd whatsapp-chat-reader
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start development server:
\`\`\`bash
npm run dev
\`\`\`

4. Build for production:
\`\`\`bash
npm run build
\`\`\`

## Usage

1. Export your WhatsApp chat:
   - Open WhatsApp
   - Select chat
   - Menu (⋮) > More > Export chat
   - Choose "Without media" (TODO: add media processing in Wappix)

2. Using the reader:
   - Open the web app
   - Drop your chat file
   - View and search messages
   - Use scroll-to-top for navigation

## License

This project is licensed under the MIT License.

---

