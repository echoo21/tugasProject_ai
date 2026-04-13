<div align="center">

# 🔍 What's This?

### *AI-Powered Object Learning for Kids*

**A fun, interactive educational web application that helps children (ages 3-8) learn about the world through AI-powered image recognition, voice feedback, mini-games, and multilingual support.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Z-AI SDK](https://img.shields.io/badge/Z--AI--SDK-Vision_%2B_TTS-6366F1?style=flat-square)]()

[🚀 Live Demo](#) &nbsp;·&nbsp; [📖 Documentation](#features) &nbsp;·&nbsp; [🛠 Tech Stack](#tech-stack) &nbsp;·&nbsp; [📅 Timeline](#development-timeline)

</div>

---

## 📖 Table of Contents

- [💡 Project Idea](#-project-idea)
- [🎯 Target Audience](#-target-audience)
- [✨ Key Features (20+)](#-key-features)
- [🛠 Tech Stack](#-tech-stack)
- [🏗 Architecture](#-architecture)
- [⚙️ Setup & Installation](#-setup--installation)
- [📂 Project Structure](#-project-structure)
- [📅 Development Timeline](#-development-timeline)
- [📱 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 💡 Project Idea

**"What's This?"** (*"Ini Apa?"* / *"这是什么？"*) is an interactive educational platform designed to transform everyday objects into learning opportunities for young children. The core concept is simple yet powerful:

> **A child points their camera at any object → AI identifies it → The app explains it in a fun, age-appropriate way → Voice reads it aloud → Interactive games reinforce learning.**

### The Problem

Children are naturally curious about the world around them. They constantly ask *"What's this?"* about objects they encounter. Traditional learning methods (books, flashcards) are limited, static, and can't respond to a child's immediate curiosity in real-time.

### The Solution

This app leverages **AI Vision (VLM)** and **Text-to-Speech (TTS)** technology to create an infinite, dynamic learning experience:

1. **Capture** — Children take a photo using the device camera or upload an image
2. **Identify** — AI Vision model (GLM-4V-Plus) analyzes and identifies the object
3. **Explain** — AI generates a child-friendly description with fun facts
4. **Listen** — TTS reads the explanation aloud in a friendly voice
5. **Play** — Mini-games (spelling, quiz, puzzle) reinforce what was learned
6. **Chat** — An AI buddy answers any follow-up questions
7. **Track** — Achievements and history motivate continued exploration

### Design Philosophy

| Principle | Implementation |
|---|---|
| 🧒 **Child-First Design** | Large touch targets, vibrant colors, simple navigation |
| 🌍 **Multilingual** | Full UI & AI response support for 3 languages |
| 🔒 **Safe & Private** | Cookie-based auth, no third-party tracking |
| 🎮 **Gamification** | 9 achievement badges, quiz scores, progress tracking |
| 📱 **Mobile-First** | Responsive design optimized for phones and tablets |
| ♿ **Accessible** | ARIA labels, semantic HTML, keyboard navigation |

---

## 🎯 Target Audience

- **Primary**: Children aged 3–8 years old
- **Secondary**: Parents and educators seeking interactive learning tools
- **Languages**: English, Bahasa Indonesia, 简体中文 (Simplified Chinese)

---

## ✨ Key Features

### 📸 1. AI-Powered Object Recognition
Uses the **GLM-4V-Plus** Vision Language Model via `z-ai-web-dev-sdk` to identify objects in real-time. The AI returns a structured response containing the object's name, an emoji, a child-friendly description, a fun fact, and a category — all generated in the user's selected language.

### 📷 2. Real-Time Camera Integration
Built on **WebRTC** (`navigator.mediaDevices.getUserMedia`), the camera viewfinder supports both front and rear cameras with automatic device detection. On desktop, it defaults to the first available webcam; on mobile, it prioritizes the rear camera for easier object scanning.

### 📤 3. Image Upload Fallback
In sandbox or restricted environments where camera access is unavailable, users can upload images from their device gallery. The app gracefully detects camera unavailability and presents the upload option automatically.

### 🔄 4. Camera Switch (Front/Rear)
A one-tap button to toggle between front-facing and rear-facing cameras, intelligently enumerating available video devices and selecting the appropriate one.

### 🔄 5. Image Rotation Tool
After capturing or uploading an image, users can rotate it in 90° increments using a canvas-based transformation engine, ensuring the AI receives the correctly oriented image for identification.

### 🔊 6. Text-to-Speech Voice Feedback
Powered by **Z-AI TTS API**, identified objects are automatically read aloud using a friendly voice (`chuichui` by default). Users can replay, pause, or stop the audio at any time.

### 🎙️ 7. Voice Customization (5 Voices)
Choose from 5 distinct AI-generated voices:
- 🎈 **Chuichui** — Cute and lively (default)
- 🌸 **Tongtong** — Soft and gentle
- 🎩 **Jam** — Deep and warm
- 🎤 **Kazi** — Energetic
- 🍃 **Xiaochen** — Calm and clear

### ⚡ 8. Speech Speed Control
Adjust TTS playback speed from **0.5x** (slow, for younger kids) to **1.5x** (faster for advanced learners) using an intuitive slider.

### 🌐 9. Multi-Language Support (3 Languages)
Full UI translation and AI response localization for:
- 🇬🇧 **English**
- 🇮🇩 **Bahasa Indonesia**
- 🇨🇳 **简体中文 (Simplified Chinese)**

All 90+ UI strings are translated across all 3 languages with parameter interpolation support.

### 👤 10. User Authentication System
Secure cookie-based session authentication with:
- Email/username + password registration
- Bcrypt password hashing (10 salt rounds)
- Session persistence via `kidlearn_session` cookie (30-day expiry, httpOnly, sameSite lax)

### 🕵️ 11. Guest Mode
Users can explore the app immediately without creating an account. Guest sessions store history locally in React state and automatically prompt registration for persistent data.

### 📜 12. Discovery History Log
Every identified object is saved to the database with its image, name, emoji, description, fun fact, and category. Users can browse their last 50 discoveries and clear history at any time.

### 🏆 13. Achievement System (9 Badges)
Gamified learning with 9 unlockable achievements:

| Badge | Emoji | How to Unlock |
|---|---|---|
| First Discovery! | 🔍 | Identify your first object |
| Explorer | 🧭 | Identify 5 different objects |
| Scientist | 🔬 | Identify 10 different objects |
| Professor | 🎓 | Identify 20 different objects |
| Perfect Score! | 💯 | Get a perfect quiz score |
| Puzzle Master | 🧩 | Complete a puzzle correctly |
| Spelling Bee | 📝 | Spell an object name correctly |
| Chatty Kid | 💬 | Send your first chat message |
| Helper | ⭐ | Submit app feedback |

Achievements use idempotent upsert logic — scanning milestones (5, 10, 20 objects) are automatically checked on each identification.

### 🔤 14. Spelling Challenge
After identifying an object, kids can test their spelling skills by typing the object's name. Features include hint system, real-time TTS feedback for correct/incorrect answers, and automatic achievement unlocking.

### 🧠 15. Quiz Challenge
A multiple-choice quiz that shows the captured image and asks *"What is in this picture?"* with 3 randomized options. Correct answers trigger achievement unlocking and score tracking.

### 🧩 16. Puzzle Game
The captured image is split into a 2×2 grid of shuffled pieces. Kids drag-and-drop pieces into the correct slots. Completion triggers voice feedback and achievement unlocking.

### 💬 17. AI Chat Buddy
A conversational AI assistant powered by **GLM-4-Flash** (fast, cost-effective text model). Features:
- Child-friendly system prompt with age-appropriate tone
- Multi-turn conversation context (last 6 messages)
- Language-aware responses
- Auto-scroll to latest message
- First-message achievement unlocking

### 🎨 18. Theme Customization (6 Themes)
Six visually distinct gradient themes that change the entire app's color scheme:

| Theme | Emoji | Style |
|---|---|---|
| Default | 🌈 | Orange → Yellow → Green |
| Ocean | 🌊 | Blue → Cyan → Teal |
| Forest | 🌲 | Green → Emerald → Lime |
| Sunset | 🌅 | Orange → Rose → Pink |
| Night | 🌙 | Slate → Indigo → Purple |
| Candy | 🍬 | Pink → Fuchsia → Violet |

### 👤 19. Profile Management
Users can view and update their profile settings including display name, preferred theme, and language. All preferences are persisted to the database and restored on login.

### ⭐ 20. User Feedback System
A built-in feedback mechanism where users can rate the app (1-5 stars) and leave a comment. Submitting feedback automatically unlocks the "Helper" achievement.

### 👑 21. Pro Membership Upgrade
A simulated Pro membership upgrade that unlocks additional voices, themes, and features. The upgrade flow includes loading state, user state update, and achievement recognition.

### 📱 22. Responsive Mobile-First Design
Built with a mobile-first approach using Tailwind CSS 4 breakpoints (`sm:`, `md:`, `lg:`, `xl:`). The layout adapts seamlessly from small phones to large desktops with appropriate touch target sizes (minimum 44px).

### 🎭 23. Animated UI (Framer Motion)
Smooth, engaging animations throughout the app:
- Floating mascot animation on auth screen
- Wiggling header logo
- Loading spinners for camera and AI processing
- Fade/slide transitions for auth screens
- Page content transitions via AnimatePresence

### 🔒 24. Safe Content for Kids
All AI responses are generated with strict child-safety guidelines:
- Age-appropriate vocabulary (4-year-old reading level)
- Word count limits (description: 40 words, fun fact: 30 words)
- Warm, encouraging tone
- No harmful or inappropriate content

### 💾 25. Persistent Data Storage
SQLite database managed by Prisma ORM with 5 interconnected models:
- **User** — Accounts, preferences, Pro status
- **HistoryItem** — Discovery records with images
- **Achievement** — Unlocked badges
- **Feedback** — User ratings and comments
- **QuizScore** — Quiz performance records

---

## 🛠 Tech Stack

| Category | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Full-stack React framework |
| **Language** | TypeScript 5 | Type-safe development |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **UI Library** | shadcn/ui (New York) | Pre-built accessible components |
| **Icons** | Lucide React | Consistent icon set |
| **Animation** | Framer Motion | Smooth UI animations |
| **Database** | SQLite (via Prisma ORM) | Persistent data storage |
| **Authentication** | Cookie-based sessions (bcryptjs) | User auth & security |
| **AI Vision** | Z-AI SDK → GLM-4V-Plus | Object identification |
| **AI Text** | Z-AI SDK → GLM-4-Flash | Chat assistant |
| **Text-to-Speech** | Z-AI SDK → TTS API | Voice feedback |
| **State** | React useState/useRef | Client-side state management |
| **Package Manager** | Bun | Fast dependency management |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client (React)                    │
│  ┌─────────┐ ┌──────────┐ ┌────────┐ ┌───────────┐ │
│  │ Camera  │ │ Upload   │ │ Games  │ │   Chat    │ │
│  │ Module  │ │ Module   │ │ Module │ │  Module   │ │
│  └────┬────┘ └────┬─────┘ └───┬────┘ └─────┬─────┘ │
│       │           │           │             │        │
│  ┌────┴───────────┴───────────┴─────────────┴─────┐ │
│  │          API Routes (Next.js App Router)        │ │
│  └────┬────────┬────────┬────────┬───────┬────────┘ │
├───────┼────────┼────────┼────────┼───────┼──────────┤
│       │        │        │        │       │          │
│  ┌────┴───┐ ┌──┴──┐ ┌──┴──┐ ┌──┴───┐ ┌┴────┐    │
│  │/identify│ │/speak│ │/chat│ │/auth │ │/quiz│    │
│  │(VLM API)│ │(TTS) │ │(LLM)│ │(Sess)│ │      │    │
│  └────┬───┘ └──┬──┘ └──┬──┘ └──┬───┘ └──┬───┘    │
│       │        │       │       │        │          │
│  ┌────┴────────┴───────┴───────┴────────┴──────┐  │
│  │         Z-AI Web Dev SDK                    │  │
│  │   (GLM-4V-Plus · GLM-4-Flash · TTS)        │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │         SQLite Database (Prisma)            │  │
│  │  User · HistoryItem · Achievement           │  │
│  │  Feedback · QuizScore                       │  │
│  └─────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## ⚙️ Setup & Installation

### Prerequisites

- **Bun** (v1.0+) — [Install Bun](https://bun.sh/)
- **Node.js** (v18+) — Optional, if not using Bun
- **Z-AI API Key** — Configured in `.z-ai-config`

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/whats-this.git
cd whats-this

# Install dependencies
bun install

# Push database schema
bun run db:push

# Start development server
bun run dev
```

The app will be available at `http://localhost:3000`.

### Environment Variables

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | SQLite connection string | Yes |
| `VISION_MODEL` | VLM model name (default: `glm-4v-plus`) | No |

---

## 📂 Project Structure

```
whats-this/
├── prisma/
│   ├── schema.prisma          # Database schema (5 models)
│   └── dev.db                 # SQLite database file
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main frontend (~1200+ lines)
│   │   ├── layout.tsx         # Root layout & metadata
│   │   └── api/
│   │       ├── identify/route.ts    # VLM image recognition
│   │       ├── speak/route.ts       # TTS voice synthesis
│   │       ├── chat/route.ts        # AI chat assistant
│   │       ├── auth/
│   │       │   ├── register/route.ts # User registration
│   │       │   ├── login/route.ts    # User login
│   │       │   ├── logout/route.ts   # User logout
│   │       │   ├── me/route.ts       # Session check
│   │       │   ├── update/route.ts   # Profile update
│   │       │   └── upgrade/route.ts  # Pro upgrade
│   │       ├── history/route.ts      # Discovery history CRUD
│   │       ├── achievements/route.ts # Achievement system
│   │       ├── feedback/route.ts     # User feedback
│   │       └── quiz/route.ts         # Quiz scoring
│   ├── components/ui/           # shadcn/ui components
│   └── lib/
│       ├── i18n.ts             # i18n system (90+ keys × 3 langs)
│       ├── auth.ts             # Auth helper functions
│       └── db.ts               # Prisma client singleton
├── public/                     # Static assets
├── package.json
├── README.md                   # This file
└── worklog.md                  # Development work log
```

---

## 📅 Development Timeline

### Phase 1: Foundation & Core AI (Week 1)

| # | Feature | Status | Description |
|---|---|:---:|---|
| 1 | **AI Object Recognition** | ✅ Complete | VLM integration with GLM-4V-Plus model, child-friendly prompt engineering, structured JSON response parsing with fallback handling |
| 2 | **Real-Time Camera** | ✅ Complete | WebRTC camera integration with front/rear detection, auto-play, loading states |
| 3 | **Image Upload** | ✅ Complete | File input fallback for sandbox/restricted environments, automatic camera detection |
| 4 | **TTS Voice Feedback** | ✅ Complete | Z-AI TTS API integration, WAV audio streaming, auto-play on identification, play/stop controls |
| 5 | **Responsive UI Layout** | ✅ Complete | Mobile-first responsive design, animated mascot, gradient header, tab navigation |

### Phase 2: Data & Authentication (Week 2)

| # | Feature | Status | Description |
|---|---|:---:|---|
| 6 | **Database Schema** | ✅ Complete | Prisma ORM with 5 models (User, HistoryItem, Achievement, Feedback, QuizScore), SQLite backend |
| 7 | **User Registration** | ✅ Complete | Email + username signup, bcrypt password hashing, input validation, session cookie creation |
| 8 | **User Login** | ✅ Complete | Email or username login, password verification, session restoration, error handling |
| 9 | **Guest Mode** | ✅ Complete | Immediate access without registration, local state history, upgrade prompt |
| 10 | **Profile Management** | ✅ Complete | Display name, theme, and language preference updates with database persistence |

### Phase 3: Learning Features (Week 3)

| # | Feature | Status | Description |
|---|---|:---:|---|
| 11 | **Discovery History** | ✅ Complete | Persistent storage of identified objects with images, 50-item limit, clear all functionality |
| 12 | **Spelling Challenge** | ✅ Complete | Post-identification spelling game, hint system, TTS feedback for correct/incorrect, achievement tracking |
| 13 | **Quiz Challenge** | ✅ Complete | Multiple-choice image quiz with 3 random options, score tracking, achievement unlocking |
| 14 | **AI Chat Buddy** | ✅ Complete | Multi-turn conversational AI with GLM-4-Flash, language-aware responses, auto-scroll |
| 15 | **Achievement System** | ✅ Complete | 9 badge types with idempotent upsert, automatic scan milestone detection (5/10/20), display on profile |

### Phase 4: Polish & Customization (Week 4)

| # | Feature | Status | Description |
|---|---|:---:|---|
| 16 | **Multi-Language i18n** | ✅ Complete | Full translation system with 90+ keys across 3 languages (EN/ID/ZH), parameter interpolation |
| 17 | **Theme System** | ✅ Complete | 6 gradient themes (Default, Ocean, Forest, Sunset, Night, Candy) with persistent selection |
| 18 | **Voice Customization** | ✅ Complete | 5 AI voice options with speed slider (0.5x–1.5x), per-user preference storage |
| 19 | **Camera Switch & Rotation** | ✅ Complete | Front/rear camera toggle, 90° image rotation with canvas transformation |
| 20 | **User Feedback** | ✅ Complete | Star rating (1-5) + optional comment, auto-unlocks Helper achievement |

### Phase 5: Enhancement & Gamification (Week 5)

| # | Feature | Status | Description |
|---|---|:---:|---|
| 21 | **Puzzle Game** | ✅ Complete | 2×2 image splitting, drag-and-drop piece placement, completion detection, TTS feedback |
| 22 | **Pro Membership** | ✅ Complete | Upgrade flow with loading state, badge display, feature unlocking |
| 23 | **UI Animations** | ✅ Complete | Framer Motion animations: floating mascot, wiggling logo, loading spinners, auth transitions |
| 24 | **Safe Content System** | ✅ Complete | Age-appropriate AI prompts (4-year-old level), word count limits, warm/encouraging tone |
| 25 | **Bug Fixes & Optimization** | ✅ Complete | Infinite loop prevention (identifyingRef), safe array extraction, scroll area fixes, API error handling |

---

## 📊 Summary Statistics

| Metric | Value |
|---|---|
| **Total Features** | 25 |
| **API Routes** | 14 |
| **Database Models** | 5 |
| **Supported Languages** | 3 |
| **UI Themes** | 6 |
| **AI Voices** | 5 |
| **Achievement Badges** | 9 |
| **Translation Keys** | 90+ |
| **Frontend Lines** | ~1,200+ |
| **Development Duration** | 5 Weeks |

---

## 📱 Screenshots

> *Screenshots will be added here. The app features:*

- **Auth Screen** — Colorful login/register with animated mascot
- **Camera View** — Live viewfinder with capture button and upload option
- **Identification Result** — Object name, emoji, description, fun fact with voice playback
- **Discovery History** — Scrollable log of all identified objects with thumbnails
- **Spelling Challenge** — Interactive keyboard with hints and TTS feedback
- **Quiz Game** — Multiple-choice with score tracking
- **Puzzle Game** — Drag-and-drop image puzzle
- **AI Chat** — Conversational interface with auto-scroll
- **Achievement Gallery** — Badge collection with unlock dates
- **Settings Panel** — Theme, language, voice, and speed customization

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Use TypeScript strict mode
- Follow existing code style (ESLint + Prettier)
- Test on mobile devices before submitting
- Keep AI prompts child-safe and age-appropriate
- Add translation keys for all new UI text in all 3 languages

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for curious kids everywhere**

Made with Next.js · TypeScript · Tailwind CSS · Z-AI SDK · Framer Motion

</div>
