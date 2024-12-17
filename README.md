# Wappix

A modern web application for reading and analyzing exported WhatsApp chat files, featuring a clean and intuitive interface that mirrors the WhatsApp experience. Try it out at https://wappix.vercel.app/ :)


This web app can handle both user to user DM exports & group chat exports.

## Screenshots

![Screenshot 1](https://i.imgur.com/CjDpR6c.png)

---

![Screenshot 2](https://i.imgur.com/SxWM18U.png)


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

## Usage

1. Export your WhatsApp chat:
   - Open WhatsApp
   - Select chat
   - Menu (⋮) > More > Export chat
   - Choose "Without media" (TODO: add media processing)

2. Using the reader:
   - Open the web app
   - Drop your chat file
   - View and search messages
   - Use scroll-to-top for navigation

## License

This project is licensed under the MIT License.

---

