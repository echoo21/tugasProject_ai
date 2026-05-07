# What's This? - AI Object Learning Application

A web-based educational application designed to help children learn about objects through AI-powered image recognition, interactive quizzes, and voice feedback. Built as a semester project for Artificial Intelligence coursework.

## Overview

The application allows users to capture or upload images of objects, which are then identified by a Vision Language Model (VLM). The system provides the object name, description, and fun facts in a child-friendly manner. Additional features include spelling practice, puzzle games, an AI chat assistant, and a multi-language interface supporting English, Indonesian, and Chinese.

## Technology Stack

- **Framework**: Next.js 15+ with TypeScript
- **Styling**: Tailwind CSS with Radix UI components (shadcn/ui)
- **Database**: SQLite with Prisma ORM
- **Authentication**: Cookie-based session management with bcryptjs password hashing
- **AI Integration**: z-ai-web-dev-sdk (GLM models for vision and text)
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Internationalization**: Custom i18n system with 90+ translation keys across 3 languages
- **Runtime**: Bun

## Features

### Core Features
- Camera and image upload for object identification
- AI-powered image recognition using VLM
- Text-to-speech voice feedback with adjustable speed and voice selection
- Interactive spelling practice and quiz games
- Jigsaw puzzle mini-games
- AI chat assistant with child-friendly prompts

### User System
- User registration and login (username or email)
- Session-based authentication with HTTP-only cookies
- User profiles with customizable display name, theme, and language preferences
- Pro user upgrade capability

### Multi-language Support
- English (en)
- Indonesian / Bahasa Indonesia (id)
- Simplified Chinese (zh)
- Language preference persists in user profile
- AI responses adapt to selected language

### Gamification
- Achievement system with 9 achievement types:
  - `first_scan` - First object identified
  - `scan_5`, `scan_10`, `scan_20` - Scan milestones
  - `quiz_perfect` - Perfect quiz score
  - `puzzle_complete` - Puzzle completed
  - `spell_master` - Spelling mastery
  - `chat_first` - First chat interaction
  - `feedback_given` - User feedback submitted
- Discovery history with last 50 items
- Quiz score tracking

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/           # Authentication routes (register, login, logout, me, update)
│   │   ├── identify/       # VLM image identification endpoint
│   │   ├── speak/          # Text-to-speech endpoint
│   │   ├── chat/           # AI chat endpoint (glm-4-flash)
│   │   ├── achievements/   # Achievement CRUD
│   │   ├── feedback/       # User feedback submission
│   │   ├── history/        # Discovery history (GET/DELETE)
│   │   └── quiz/           # Quiz score saving
│   ├── page.tsx            # Main application page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── lib/
│   ├── auth.ts             # Authentication helpers
│   ├── db.ts               # Database connection
│   ├── i18n.ts             # Internationalization system
│   ├── zai-queue.ts        # AI SDK queue management
│   └── utils.ts            # Utility functions
├── components/
│   └── ui/                 # Reusable UI components (shadcn/ui)
└── hooks/                  # Custom React hooks
```

## Database Schema

The application uses Prisma with SQLite. The schema includes five models:

- **User**: Stores user credentials, preferences (theme, language), and profile data
- **HistoryItem**: Records each object identification with name, description, fun fact, category, and image data
- **Achievement**: Tracks user achievements with type, title, and unlock timestamp
- **Feedback**: Stores user ratings and comments
- **QuizScore**: Records quiz performance (score and total questions)

## API Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | User registration | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/update` | Update user profile | Yes |
| POST | `/api/identify` | Identify object from image | Yes |
| POST | `/api/speak` | Convert text to speech | Yes |
| POST | `/api/chat` | AI chat conversation | Yes |
| GET/POST | `/api/achievements` | List/Unlock achievements | Yes |
| POST | `/api/feedback` | Submit feedback | Yes |
| GET/DELETE | `/api/history` | View/Clear history | Yes |
| POST | `/api/quiz` | Save quiz score | Yes |

## Setup and Installation

### Prerequisites
- Node.js 18+ or Bun runtime
- SQLite (included via Prisma)

### Installation Steps

1. Install dependencies:
```bash
bun install
# or
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory with the following:
```
DATABASE_URL="file:./dev.db"
Z_AI_API_KEY="your_api_key_here"
```

3. Push the database schema:
```bash
bun run db:push
# or
npx prisma db push
```

4. Run the development server:
```bash
bun run dev
# or
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production Build

```bash
bun run build
bun run start
```

## Scripts

- `dev` - Start development server on port 3000
- `build` - Build the application for production
- `start` - Start the production server
- `lint` - Run ESLint
- `db:push` - Push Prisma schema to database
- `db:generate` - Generate Prisma client
- `db:migrate` - Run database migrations
- `db:reset` - Reset the database

## Academic Context

This project is developed as part of the Artificial Intelligence coursework for the 4th semester. The project demonstrates practical application of:
- Vision Language Models for image recognition
- Large Language Models for conversational AI
- Text-to-Speech synthesis for accessibility
- Full-stack web development with modern frameworks
- Database design and ORM usage
- User authentication and session management
- Internationalization in web applications

## License

This project is developed for academic purposes.

## Authors

Semester 4 AI Course - tugasProject_ai
