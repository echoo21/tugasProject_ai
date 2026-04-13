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

> **Start Date: 5 April 2026 · Final Release: 6 June 2026**
> Total development span: **5 April 2026 — 6 June 2026** (63 hari)

### 📊 Gantt Chart Overview

```
Feature                                       Apr 2026                 May 2026                 Jun 2026
                                              W1 W2 W3 W4               W1 W2 W3 W4               W1
─────────────────────────────────────────────────────────────────────────────────────────────────────
 Phase 1: Foundation & Core AI
  1. AI Object Recognition                 ██
  2. Real-Time Camera                       ██
  3. Image Upload                             ██
  4. TTS Voice Feedback                       ██
  5. Responsive UI Layout                   ██████

 Phase 2: Data & Authentication
  6. Database Schema                         ██
  7. User Registration                         ██
  8. User Login                                ██
  9. Guest Mode                                  ██
 10. Profile Management                            ██

 Phase 3: Learning Features
 11. Discovery History                                ██
 12. Spelling Challenge                                 ██
 13. Quiz Challenge                                      ██
 14. AI Chat Buddy                                         ██
 15. Achievement System                                     ██

 Phase 4: Polish & Customization
 16. Multi-Language i18n                                      ██
 17. Theme System                                                ██
 18. Voice Customization                                           ██
 19. Camera Switch & Rotation                                       ██
 20. User Feedback                                                    ██

 Phase 5: Enhancement & Gamification
 21. Puzzle Game                                                       ██
 22. Pro Membership                                                      ██
 23. UI Animations                                                         ██
 24. Safe Content System                                                    ██
 25. Bug Fixes & Optimization                                               ██
─────────────────────────────────────────────────────────────────────────────────────────────────────
                                              ↑                                                               ↑
                                         5 Apr 2026                                                      6 Jun 2026
```

---

### 🏗️ Phase 1: Foundation & Core AI
**5 Apr 2026 — 18 Apr 2026** (14 hari) · Backend & Core Infrastructure

| # | Feature | Start | End | Durasi | Status | Deskripsi |
|---|---|:---:|:---:|:---:|:---:|---|
| 1 | **AI Object Recognition** | 5 Apr | 10 Apr | 6 hari | ✅ Selesai | Integrasi VLM dengan model GLM-4V-Plus, prompt engineering ramah anak, parsing respons JSON terstruktur dengan fallback |
| 2 | **Real-Time Camera** | 7 Apr | 12 Apr | 6 hari | ✅ Selesai | Integrasi kamera WebRTC dengan deteksi kamera depan/belakang, auto-play, loading states |
| 3 | **Image Upload** | 11 Apr | 14 Apr | 4 hari | ✅ Selesai | File input fallback untuk environment sandbox/terbatas, deteksi kamera otomatis |
| 4 | **TTS Voice Feedback** | 12 Apr | 16 Apr | 5 hari | ✅ Selesai | Integrasi Z-AI TTS API, streaming audio WAV, auto-play saat identifikasi, kontrol play/stop |
| 5 | **Responsive UI Layout** | 5 Apr | 18 Apr | 14 hari | ✅ Selesai | Desain responsive mobile-first, maskot animasi, header gradient, navigasi tab |

**Milestone 1** 🎯: Core AI pipeline berfungsi end-to-end *(Kamera → VLM → TTS → UI)* — **18 Apr 2026**

---

### 🗄️ Phase 2: Data & Authentication
**12 Apr 2026 — 2 Mei 2026** (21 hari) · Database & User Management

| # | Feature | Start | End | Durasi | Status | Deskripsi |
|---|---|:---:|:---:|:---:|:---:|---|
| 6 | **Database Schema** | 12 Apr | 18 Apr | 7 hari | ✅ Selesai | Skema Prisma ORM dengan 5 model (User, HistoryItem, Achievement, Feedback, QuizScore), backend SQLite |
| 7 | **User Registration** | 19 Apr | 25 Apr | 7 hari | ✅ Selesai | Pendaftaran email + username, hashing password bcrypt, validasi input, pembuatan session cookie |
| 8 | **User Login** | 22 Apr | 27 Apr | 6 hari | ✅ Selesai | Login email atau username, verifikasi password, restorasi session, penanganan error |
| 9 | **Guest Mode** | 26 Apr | 30 Apr | 5 hari | ✅ Selesai | Akses langsung tanpa registrasi, history state lokal, prompt upgrade ke akun |
| 10 | **Profile Management** | 29 Apr | 2 Mei | 4 hari | ✅ Selesai | Update nama tampilan, tema, dan preferensi bahasa dengan persistensi database |

**Milestone 2** 🎯: Sistem autentikasi & database berfungsi penuh — **2 Mei 2026**

---

### 📚 Phase 3: Learning Features
**2 Mei 2026 — 16 Mei 2026** (15 hari) · Fitur Belajar Interaktif

| # | Feature | Start | End | Durasi | Status | Deskripsi |
|---|---|:---:|:---:|:---:|:---:|---|
| 11 | **Discovery History** | 2 Mei | 6 Mei | 5 hari | ✅ Selesai | Penyimpanan persisten objek teridentifikasi beserta gambar, batas 50 item, fungsi hapus semua |
| 12 | **Spelling Challenge** | 5 Mei | 9 Mei | 5 hari | ✅ Selesai | Game ejaan pasca-identifikasi, sistem petunjuk, feedback TTS untuk benar/salah, tracking pencapaian |
| 13 | **Quiz Challenge** | 8 Mei | 13 Mei | 6 hari | ✅ Selesai | Kuis pilihan ganda bergambar dengan 3 opsi acak, tracking skor, unlock pencapaian |
| 14 | **AI Chat Buddy** | 10 Mei | 16 Mei | 7 hari | ✅ Selesai | AI percakapan multi-turn dengan GLM-4-Flash, respons bahasa-aware, auto-scroll |
| 15 | **Achievement System** | 13 Mei | 16 Mei | 4 hari | ✅ Selesai | 9 jenis badge dengan upsert idempoten, deteksi milestone scan otomatis (5/10/20), tampilan profil |

**Milestone 3** 🎯: Semua fitur belajar interaktif berfungsi *(History, Spelling, Quiz, Chat, Achievements)* — **16 Mei 2026**

---

### 🎨 Phase 4: Polish & Customization
**16 Mei 2026 — 30 Mei 2026** (15 hari) · Kustomisasi & Pelokalan

| # | Feature | Start | End | Durasi | Status | Deskripsi |
|---|---|:---:|:---:|:---:|:---:|---|
| 16 | **Multi-Language i18n** | 16 Mei | 20 Mei | 5 hari | ✅ Selesai | Sistem terjemahan lengkap dengan 90+ key dalam 3 bahasa (EN/ID/ZH), interpolasi parameter |
| 17 | **Theme System** | 18 Mei | 23 Mei | 6 hari | ✅ Selesai | 6 tema gradient (Default, Ocean, Forest, Sunset, Night, Candy) dengan seleksi persisten |
| 18 | **Voice Customization** | 20 Mei | 25 Mei | 6 hari | ✅ Selesai | 5 opsi suara AI dengan slider kecepatan (0.5x–1.5x), penyimpanan preferensi per pengguna |
| 19 | **Camera Switch & Rotation** | 23 Mei | 27 Mei | 5 hari | ✅ Selesai | Toggle kamera depan/belakang, rotasi gambar 90° dengan transformasi canvas |
| 20 | **User Feedback** | 25 Mei | 30 Mei | 6 hari | ✅ Selesai | Rating bintang (1-5) + komentar opsional, auto-unlock pencapaian Helper |

**Milestone 4** 🎯: Aplikasi sudah fully-localized & customizable — **30 Mei 2026**

---

### 🚀 Phase 5: Enhancement & Gamification
**23 Mei 2026 — 6 Jun 2026** (14 hari) · Finalisasi & Peluncuran

| # | Feature | Start | End | Durasi | Status | Deskripsi |
|---|---|:---:|:---:|:---:|:---:|---|
| 21 | **Puzzle Game** | 27 Mei | 31 Mei | 5 hari | ✅ Selesai | Pemotongan gambar 2×2, drag-and-drop penempatan potongan, deteksi penyelesaian, feedback TTS |
| 22 | **Pro Membership** | 30 Mei | 2 Jun | 4 hari | ✅ Selesai | Alur upgrade dengan loading state, tampilan badge, unlock fitur tambahan |
| 23 | **UI Animations** | 1 Jun | 3 Jun | 3 hari | ✅ Selesai | Animasi Framer Motion: maskot melayang, logo bergoyang, loading spinner, transisi auth |
| 24 | **Safe Content System** | 2 Jun | 4 Jun | 3 hari | ✅ Selesai | Prompt AI ramah anak (level 4 tahun), batas kata, nada hangat/mendorong |
| 25 | **Bug Fixes & Optimization** | 3 Jun | 6 Jun | 4 hari | ✅ Selesai | Pencegahan infinite loop (identifyingRef), ekstraksi array aman, perbaikan scroll area, error handling API |

**Milestone 5** 🎯 **FINAL RELEASE** — Semua 25 fitur selesai & siap peluncuran — **6 Jun 2026** 🎉

---

### 📈 Timeline Summary

```
  Apr 2026           May 2026                       Jun 2026
  ┌───────┐    ┌──────────────────────────┐     ┌───────┐
  │  P1   │    │    P2    │    P3    │ P4  │     │  P5   │
  │ █████ │    │ ████████ │ ████████ │ ██  │     │ █████ │
  └───────┘    └──────────────────────────┘     └───────┘
  5 Apr        12 Apr    2 May    16 May  30 May       6 Jun
    │             │         │         │       │           │
    ▼             ▼         ▼         ▼       ▼           ▼
  [Start]     [DB+Auth] [Learn]   [i18n] [Polish]   [RELEASE]
```

| Fase | Periode | Durasi | Fitur | Milestone |
|---|---|:---:|:---:|---|
| **Phase 1** | 5 Apr — 18 Apr 2026 | 14 hari | 5 fitur | Core AI pipeline berfungsi |
| **Phase 2** | 12 Apr — 2 Mei 2026 | 21 hari | 5 fitur | Autentikasi & database siap |
| **Phase 3** | 2 Mei — 16 Mei 2026 | 15 hari | 5 fitur | Fitur belajar interaktif lengkap |
| **Phase 4** | 16 Mei — 30 Mei 2026 | 15 hari | 5 fitur | Pelokalan & kustomisasi selesai |
| **Phase 5** | 23 Mei — 6 Jun 2026 | 14 hari | 5 fitur | **🚀 FINAL RELEASE** |
| **Total** | **5 Apr — 6 Jun 2026** | **63 hari** | **25 fitur** | **5 milestone** |

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
| **Development Start** | 5 April 2026 |
| **Development End** | 6 June 2026 |
| **Total Duration** | 63 hari (~9 minggu) |
| **Development Phases** | 5 |
| **Milestones** | 5 |

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
