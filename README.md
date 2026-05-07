# What's This? - AI Object Learning Application

A web-based educational application designed to help children learn about objects through AI-powered image recognition, interactive games, and voice feedback. Built as a semester project for Artificial Intelligence coursework at semester 4.

## Overview

The application allows users to capture or upload images of objects, which are then identified by a Vision Language Model (VLM). The system provides the object name, description, and fun facts in a child-friendly manner. The app includes interactive learning features such as a listen-and-identify game, spelling practice, jigsaw puzzles, and an AI chat assistant. The interface supports English, Indonesian, and Chinese with full internationalization.

## Technology Stack

- **Framework**: Next.js 15+ with TypeScript
- **Styling**: Tailwind CSS 4 with Radix UI components (shadcn/ui)
- **Database**: SQLite with Prisma ORM
- **Authentication**: Cookie-based session management with bcryptjs password hashing (10 salt rounds)
- **AI Integration**: z-ai-web-dev-sdk (GLM models: VLM for vision, glm-4-flash for chat)
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Drag and Drop**: @dnd-kit for puzzle game
- **Internationalization**: Custom i18n system with 90+ translation keys across 3 languages
- **Animations**: Framer Motion
- **Runtime**: Bun

## Features

### Core Features
- Camera capture and image upload for object identification
- AI-powered image recognition using VLM with child-friendly prompts
- Text-to-speech voice feedback with adjustable speed and voice selection
- Listen-and-identify game: listen to the object name and select the correct image
- Spelling practice: type the name of the identified object
- Jigsaw puzzle mini-games built with @dnd-kit drag-and-drop
- AI chat assistant using glm-4-flash with child-friendly system prompts and multi-turn conversation support

### User System
- User registration and login (supports both username and email)
- Session-based authentication with HTTP-only cookies (30-day expiry)
- Guest mode with localStorage persistence for achievements and preferences
- User profiles with customizable display name, avatar, theme, and language preferences
- Pro user upgrade capability

### Themes
Six visual themes available: Default (rainbow), Ocean, Forest, Sunset, Night, and Candy.

### Multi-language Support
- English (en)
- Indonesian / Bahasa Indonesia (id)
- Simplified Chinese (zh)
- Language preference persists in user profile and localStorage (for guests)
- AI identification and chat responses adapt to selected language
- Voice TTS messages are translated
- History items store multi-language options (nameOptions, descriptionOptions, funFactOptions) for seamless language switching

### Gamification
- Achievement system with 9 achievement types:
  - `first_scan` - First object identified
  - `scan_5`, `scan_10`, `scan_20` - Scan milestones (auto-detected)
  - `quiz_perfect` - Perfect quiz score
  - `puzzle_complete` - Puzzle completed
  - `listen_master` - Listen and identify an object correctly
  - `chat_first` - First chat interaction
  - `feedback_given` - User feedback submitted
- Discovery history storing last 50 items with image data
- Quiz score tracking with score and total questions
- Quiz question preloading and caching mechanism for smoother gameplay

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts       # User login (email or username)
│   │   │   ├── register/route.ts    # User registration with bcrypt
│   │   │   ├── logout/route.ts      # Clear session cookie
│   │   │   ├── me/route.ts          # Get current user from session
│   │   │   ├── update/route.ts      # Update profile (displayName, language, theme)
│   │   │   └── upgrade/route.ts     # Upgrade to Pro
│   │   ├── identify/route.ts         # VLM image identification (multilingual)
│   │   ├── chat/route.ts            # AI chat with glm-4-flash (multilingual)
│   │   ├── achievements/route.ts    # List and unlock achievements
│   │   ├── feedback/route.ts        # Submit rating and comment
│   │   ├── history/
│   │   │   ├── route.ts             # GET (last 50) / DELETE (clear all)
│   │   │   └── [id]/route.ts        # Delete individual history item
│   │   ├── quiz/
│   │   │   ├── route.ts             # Save quiz score
│   │   │   └── generate/route.ts    # Generate quiz questions
│   │   └── route.ts                 # Root API route
│   ├── page.tsx                     # Main application (single-page app with tabs)
│   ├── layout.tsx                   # Root layout with metadata
│   └── globals.css                  # Global styles with Tailwind
├── lib/
│   ├── auth.ts                      # Session helpers (getSession, requireAuth, encode/decode)
│   ├── db.ts                        # Prisma client instance
│   ├── i18n.ts                      # i18n system with 90+ keys in 3 languages
│   ├── zai-queue.ts                 # AI SDK queue management
│   ├── retry.ts                     # Retry logic for API calls
│   └── utils.ts                     # Utility functions (cn for class merging)
├── components/
│   └── ui/                          # 30+ reusable UI components (shadcn/ui)
└── hooks/
    ├── use-mobile.ts                 # Mobile device detection
    └── use-toast.ts                  # Toast notification hook
```

## Database Schema

The application uses Prisma with SQLite. The schema includes five models:

- **User**: id, username (unique), email (unique), password (hashed), displayName, avatar, isPro, theme, language, timestamps, and relations to all child models
- **HistoryItem**: Records each object identification with name, emoji, description, funFact, category, imageData, and multilingual options (nameOptions, descriptionOptions, funFactOptions as JSON), linked to user with cascade delete
- **Achievement**: Tracks user achievements with type, title, emoji, and unlock timestamp; unique constraint on (userId, type)
- **Feedback**: Stores user ratings (1-5) and optional comments
- **QuizScore**: Records quiz performance (score and total questions)

## API Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | User registration with validation | No |
| POST | `/api/auth/login` | User login by email or username | No |
| POST | `/api/auth/logout` | Clear session cookie | No |
| GET | `/api/auth/me` | Get current user from session | No* |
| PUT | `/api/auth/update` | Update displayName, language, theme | Yes |
| POST | `/api/auth/upgrade` | Upgrade account to Pro | Yes |
| POST | `/api/identify` | Identify object from image (supports language param) | Yes |
| POST | `/api/chat` | AI chat conversation with history support (multilingual) | Yes |
| GET/POST | `/api/achievements` | List achievements / Unlock new achievement with milestone detection | Yes |
| POST | `/api/feedback` | Submit feedback (auto-unlocks feedback_given achievement) | Yes |
| GET/DELETE | `/api/history` | View last 50 items / Clear all history | Yes |
| DELETE | `/api/history/[id]` | Delete individual history item | Yes |
| POST | `/api/quiz` | Save quiz score (auto-unlocks quiz_perfect on perfect score) | Yes |
| POST | `/api/quiz/generate` | Generate quiz questions from history | Yes |

*Returns 401 if not authenticated.

## Setup and Installation

### Prerequisites
- Bun runtime (recommended) or Node.js 18+
- SQLite (included via Prisma)

### Installation Steps

1. Install dependencies:
```bash
bun install
```

2. Configure environment variables:
Create a `.env` file in the root directory:
```
DATABASE_URL="file:./dev.db"
Z_AI_API_KEY="your_api_key_here"
```

3. Push the database schema:
```bash
bun run db:push
```

4. Run the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

### Production Build

```bash
bun run build
bun run start
```

## Scripts

- `dev` - Start development server on port 3000
- `build` - Build the application for production with standalone output
- `start` - Start the production server (standalone mode with logging)
- `lint` - Run ESLint
- `db:push` - Push Prisma schema to database
- `db:generate` - Generate Prisma client
- `db:migrate` - Run database migrations
- `db:reset` - Reset the database

## Academic Context

This project is developed as part of the Artificial Intelligence coursework for the 4th semester. The project demonstrates the integration of multiple AI technologies into a cohesive full-stack web application:

- Vision Language Model (VLM) integration for real-time object recognition from camera captures and image uploads
- Large Language Model (glm-4-flash) for conversational AI with context-aware multi-turn chat
- Multilingual AI responses where the VLM and LLM adapt their output based on user language selection
- Full-stack development with Next.js App Router, TypeScript, and component-based UI architecture
- Relational database design with Prisma ORM and SQLite, including cascade deletes and unique constraints
- Cookie-based authentication system with password hashing and session management
- Custom internationalization system supporting dynamic language switching across UI, AI responses, and stored data
- Gamification mechanics with event-driven achievement unlocking and milestone auto-detection
- Drag-and-drop interactions using @dnd-kit for educational puzzle games
- Guest mode with client-side persistence enabling core features without account registration

## License

This project is developed for academic purposes as part of semester 4 Artificial Intelligence coursework.

## Authors

Semester 4 AI Course - tugasProject_ai
