# 🔍 What's This? - Aplikasi Belajar Anak dengan AI

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)

> **Tugas Mata Kuliah Pemrograman Web Lanjut - Semester 4**
>
> Nama: [Nama Mahasiswa] · NIM: [XXXXXXXXXXXX] · Kelas: [A/B/C]

---

## 📝 Deskripsi Project

Jadi gini, aplikasi ini namanya **"What's This?"** basically aplikasi buat anak-anak umur 3-8 tahun buat belajar mengenali objek di sekitar mereka pake AI. Idenya tuh simpel:

**Anak arahin kamera ke suatu benda → AI kenalin benda nya → App jelasin pake bahasa anak-anak → Ada suara yang bacain → Ada game buat latihan**

Kenapa bikin ini? Karena anak kecil itu suka nanya "ini apa?" terus, tapi buku sama flashcard kan terbatas. Kalau pake AI, mereka bisa belajar dari objek apa aja secara real-time. Jadi lebih interaktif gitu.

### Target User
- Anak-anak umur 3-8 tahun (primary)
- Orang tua / guru yang nyari alat belajar interaktif (secondary)
- Support 3 bahasa: English 🇬🇧, Indonesia 🇮🇩, Mandarin 🇨🇳

---

## ✨ Fitur-Fitur (25 Fitur)

### 🔥 Fitur Utama

**1. AI Object Recognition 📸**
Buat ngenalin objek dari foto. Pake model GLM-4V-Plus dari Z-AI SDK. Jadi nanti AI bakal balikin data objeknya berupa nama, emoji, deskripsi, fakta menarik, dan kategorinya. Responsnya otomatis sesuai bahasa yang dipilih user.

**2. Kamera Real-Time 📷**
Pake WebRTC buat akses kamera device. Bisa pake kamera depan atau belakang. Otomatis detect device yang ada, kalau di HP prioritas kamera belakang soalnya lebih gampang buat foto benda.

**3. Upload Gambar 📤**
Kalau kameranya nggak bisa diakses (misal di laptop yang nggak ada webcam atau di sandbox), user bisa upload gambar dari gallery. App otomatis detect dan kasih opsi upload kalau kamera unavailable.

**4. Ganti Kamera (Depan/Belakang) 🔄**
Tombol buat toggle kamera depan sama belakang. Di backend pake `enumerateDevices()` buat detect semua video device yang available.

**5. Rotate Gambar 🔄**
Pas foto atau upload, gambarnya bisa di-rotate 90 derajat pake canvas transformation. Jadi kalau fotonya miring bisa diperbaiki sebelum dikirim ke AI.

**6. Text-to-Speech 🔊**
Tiap objek yang ke-identifikasi otomatis dibacain pake suara AI. Defaultnya pake suara "chuichui" yang lucu. Bisa di-play ulang, pause, atau stop.

**7. Pilih Suara (5 Voice) 🎙️**
Ada 5 pilihan suara AI yang bisa dipilih di settings:
- 🎈 Chuichui - Lucu dan ceria (default)
- 🌸 Tongtong - Lembut
- 🎩 Jam - Berat dan hangat
- 🎤 Kazi - Energik
- 🍃 Xiaochen - Tenang

**8. Atur Kecepatan Suara ⚡**
Slider buat atur kecepatan TTS dari 0.5x (pelan, buat anak kecil) sampai 1.5x (lebih cepat, buat anak yang udah lebih besar).

**9. Multi-Bahasa (3 Bahasa) 🌐**
UI app dan respons AI bisa diganti ke 3 bahasa:
- English, Bahasa Indonesia, 简体中文
- Total ada 90+ string yang semuanya diterjemahin
- Pake sistem i18n custom yang bikinan sendiri

### 👤 Autentikasi & User

**10. Login & Register 👤**
Sistem autentikasi pake cookie-based session. Password di-hash pake bcrypt. Ada validasi input, session cookie yang persistent 30 hari. Ngga pake JWT karena masih belajar, cookie aja dulu yang penting aman.

**11. Guest Mode 🕵️**
User bisa langsung explore app tanpa register. History disimpan lokal di React state doang. Kalau mau persisten data, diminta register dulu.

**12. Profil Management 👤**
User bisa ganti nama tampilan, tema, dan bahasa. Semua preferensi disimpan ke database dan auto-load pas login.

### 📚 Fitur Belajar

**13. Riwayat Discovery 📜**
Semua objek yang pernah di-scan tersimpan di database. Ada gambarnya, nama, emoji, deskripsi, dll. Bisa di-scroll sampai 50 item terakhir dan ada tombol "Hapus Semua".

**14. Spelling Challenge 🔤**
Game ejaan! Setelah scan objek, anak disuruh ngetik nama objeknya. Ada hint system, feedback suara kalau bener/salah, dan otomatis unlock achievement "Spelling Bee".

**15. Quiz Challenge 🧠**
Kuis pilihan ganda. Gambar objek ditampilin terus ditanya "Apa ini?" dengan 3 opsi jawaban yang di-random. Jawaban bener bakal unlock achievement dan disimpan skornya.

**16. Puzzle Game 🧩**
Gambar yang di-scan di-split jadi 2x2 potongan puzzle yang di-shuffle. Anak tinggal drag-and-drop ke slot yang bener. Kalau selesai ada feedback suara dan unlock achievement.

**17. AI Chat Buddy 💬**
Chatbot AI buat anak-anak. Pake model GLM-4-Flash yang lebih cepat dan murah. Bisa multi-turn conversation (ingat 6 pesan terakhir). Bahasa responsnya ngikutin bahasa yang dipilih di settings.

**18. Achievement System 🏆**
Ada 9 badge yang bisa di-unlock:

| Badge | Emoji | Cara Dapetnya |
|---|---|---|
| First Discovery | 🔍 | Scan objek pertama |
| Explorer | 🧭 | Scan 5 objek berbeda |
| Scientist | 🔬 | Scan 10 objek berbeda |
| Professor | 🎓 | Scan 20 objek berbeda |
| Perfect Score | 💯 | Nilai sempurna di kuis |
| Puzzle Master | 🧩 | Selesain puzzle dengan bener |
| Spelling Bee | 📝 | Eja nama objek dengan bener |
| Chatty Kid | 💬 | Kirim pesan chat pertama |
| Helper | ⭐ | Kasih feedback ke app |

Milestone scan (5, 10, 20) itu otomatis di-check tiap kali user scan objek baru.

### 🎨 Kustomisasi

**19. Theme System (6 Tema) 🎨**
Ada 6 tema warna gradient yang bisa dipilih:
- 🌈 Default (oranye-kuning-hijau)
- 🌊 Ocean (biru)
- 🌲 Forest (hijau)
- 🌅 Sunset (oranye-merah muda)
- 🌙 Night (gelap-ungu)
- 🍬 Candy (pink-ungu)

**20. User Feedback ⭐**
User bisa kasih rating bintang 1-5 sama komentar. Otomatis unlock achievement "Helper" pas submit.

**21. Pro Membership 👑**
Fitur upgrade ke Pro (simulated). Ada loading state, badge display, dan unlock fitur tambahan. Ini masih simulated ya, belum integration payment gateway karena belum sampe materinya 😅

### 📱 UI & UX

**22. Responsive Design 📱**
Mobile-first design pake Tailwind CSS 4. Layout auto adapt dari HP ke desktop. Touch target minimum 44px biar gampang buat anak-anak.

**23. Animasi (Framer Motion) 🎭**
Ada beberapa animasi biar app keliatan lebih hidup:
- Maskot melayang di halaman login
- Logo bergoyang di header
- Loading spinner pas proses kamera dan AI
- Transisi slide di halaman auth

**24. Safe Content 🔒**
Semua respons AI diatur supaya aman buat anak:
- Kosakata level anak 4 tahun
- Batas kata: deskripsi max 40 kata, fakta menarik max 30 kata
- Nada hangat dan encouraging
- Prompt diatur strict supaya nggak ada konten yang nggak pantas

**25. Database SQLite 💾**
Pake Prisma ORM dengan SQLite. Ada 5 model yang saling relate: User, HistoryItem, Achievement, Feedback, QuizScore. Dipilih SQLite karena nggak perlu setup server database terpisah, jadi lebih gampang buat development dan demo.

---

## 🛠 Tech Stack

Ini tech stack yang dipake di project ini:

| Tech | Buat Apa |
|---|---|
| **Next.js 16** (App Router) | Framework utama, full-stack React |
| **TypeScript 5** | Biar strict, nggak banyak bug di runtime |
| **Tailwind CSS 4** | Styling, utility-first CSS |
| **shadcn/ui** | Komponen UI yang udah jadi (button, card, dialog, dll) |
| **Framer Motion** | Animasi |
| **Prisma ORM** | Database management |
| **SQLite** | Database lokal (nggak perlu server terpisah) |
| **bcryptjs** | Hashing password |
| **Z-AI SDK** | AI Vision (GLM-4V-Plus), AI Chat (GLM-4-Flash), TTS |
| **Lucide React** | Icons |
| **Bun** | Package manager (lebih cepat dari npm) |

---

## 🏗 Arsitektur (Gambaran Besar)

```
┌─────────────────────────────────────────────┐
│              Frontend (React)                │
│                                              │
│  Kamera ──┐                                  │
│  Upload ──┤──→ API Routes ──→ Z-AI SDK      │
│  Games  ──┤      (Next.js)    (GLM-4V-Plus) │
│  Chat   ──┘         │            (GLM-4-Flash)│
│                     │              (TTS)      │
│                     ▼                         │
│              SQLite (Prisma)                 │
│         User, History, Achievement, etc      │
└─────────────────────────────────────────────┘
```

Jadi alurnya gini:
1. User buka app → frontend render
2. User foto/upload gambar → kirim ke `/api/identify`
3. API panggil Z-AI SDK (GLM-4V-Plus) buat ngenali objek
4. Hasilnya dikirim balik ke frontend, ditampilin di UI
5. Auto-panggil `/api/speak` buat TTS, suara di-play
6. Kalau user login, hasilnya disimpan ke database via `/api/history`

---

## ⚙️ Cara Install & Jalankan

### Prerequisites
- Bun (atau Node.js) - [install Bun di sini](https://bun.sh/)
- Z-AI API Key (udah dikonfigurasi di `.z-ai-config`)

### Langkah-langkah

```bash
# 1. Clone repository
git clone https://github.com/username/whats-this.git

# 2. Masuk ke folder project
cd whats-this

# 3. Install dependencies
bun install

# 4. Setup database
bun run db:push

# 5. Jalankan development server
bun run dev
```

Buka `http://localhost:3000` di browser.

### Environment Variables

| Variable | Keterangan | Wajib? |
|---|---|---|
| `DATABASE_URL` | Koneksi SQLite | Ya |
| `VISION_MODEL` | Model VLM (default: glm-4v-plus) | Nggak |

---

## 📂 Struktur Folder

```
whats-this/
├── prisma/
│   ├── schema.prisma       ← Schema database (5 model)
│   └── dev.db              ← File database SQLite
├── src/
│   ├── app/
│   │   ├── page.tsx        ← Frontend utama (~1200 baris)
│   │   ├── layout.tsx      ← Root layout + metadata
│   │   └── api/
│   │       ├── identify/   ← API buat ngenali objek (VLM)
│   │       ├── speak/      ← API buat text-to-speech
│   │       ├── chat/       ← API buat AI chat
│   │       ├── auth/       ← Login, register, logout, dll
│   │       ├── history/    ← CRUD riwayat discovery
│   │       ├── achievements/ ← Sistem achievement
│   │       ├── feedback/   ← Feedback user
│   │       └── quiz/       ← Skor kuis
│   ├── components/ui/      ← Komponen shadcn/ui
│   └── lib/
│       ├── i18n.ts         ← Sistem multi-bahasa
│       ├── auth.ts         ← Helper autentikasi
│       └── db.ts           ← Koneksi Prisma
├── package.json
└── README.md               ← Ini file yang lagi kamu baca :)
```

---

## 📅 Timeline Pengembangan

> **Mulai: 5 April 2026 · Selesai: 6 Juni 2026**
> Total: 63 hari (±9 minggu)

### Phase 1: Foundation & Core AI (5 Apr - 18 Apr 2026)
*Backend & infrastruktur dasar - minggu pertama paling berat karena harus setup semuanya dari nol*

| # | Fitur | Mulai | Selesai | Durasi | Status |
|---|---|:---:|:---:|:---:|:---:|
| 1 | AI Object Recognition | 5 Apr | 10 Apr | 6 hari | ✅ |
| 2 | Real-Time Camera | 7 Apr | 12 Apr | 6 hari | ✅ |
| 3 | Image Upload | 11 Apr | 14 Apr | 4 hari | ✅ |
| 4 | TTS Voice Feedback | 12 Apr | 16 Apr | 5 hari | ✅ |
| 5 | Responsive UI Layout | 5 Apr | 18 Apr | 14 hari | ✅ |

🎯 **Milestone:** Pipeline AI sudah jalan end-to-end (Kamera → AI → Suara → UI)

### Phase 2: Database & Autentikasi (12 Apr - 2 Mei 2026)
*Minggu ini fokus ke backend, setup database dan bikin sistem login*

| # | Fitur | Mulai | Selesai | Durasi | Status |
|---|---|:---:|:---:|:---:|:---:|
| 6 | Database Schema (Prisma) | 12 Apr | 18 Apr | 7 hari | ✅ |
| 7 | Register | 19 Apr | 25 Apr | 7 hari | ✅ |
| 8 | Login | 22 Apr | 27 Apr | 6 hari | ✅ |
| 9 | Guest Mode | 26 Apr | 30 Apr | 5 hari | ✅ |
| 10 | Profile Management | 29 Apr | 2 Mei | 4 hari | ✅ |

🎯 **Milestone:** Database dan auth berfungsi, user bisa daftar-login

### Phase 3: Fitur Belajar Interaktif (2 Mei - 16 Mei 2026)
*Bagian paling seru! Bikin game-game belajar dan AI chat*

| # | Fitur | Mulai | Selesai | Durasi | Status |
|---|---|:---:|:---:|:---:|:---:|
| 11 | Riwayat Discovery | 2 Mei | 6 Mei | 5 hari | ✅ |
| 12 | Spelling Challenge | 5 Mei | 9 Mei | 5 hari | ✅ |
| 13 | Quiz Challenge | 8 Mei | 13 Mei | 6 hari | ✅ |
| 14 | AI Chat Buddy | 10 Mei | 16 Mei | 7 hari | ✅ |
| 15 | Achievement System | 13 Mei | 16 Mei | 4 hari | ✅ |

🎯 **Milestone:** Semua fitur belajar udah bisa dipake

### Phase 4: Polish & Kustomisasi (16 Mei - 30 Mei 2026)
*Week ini lebih ke beautification, bikin app keliatan lebih profesional*

| # | Fitur | Mulai | Selesai | Durasi | Status |
|---|---|:---:|:---:|:---:|:---:|
| 16 | Multi-Bahasa (i18n) | 16 Mei | 20 Mei | 5 hari | ✅ |
| 17 | Theme System (6 tema) | 18 Mei | 23 Mei | 6 hari | ✅ |
| 18 | Voice Customization | 20 Mei | 25 Mei | 6 hari | ✅ |
| 19 | Camera Switch & Rotate | 23 Mei | 27 Mei | 5 hari | ✅ |
| 20 | User Feedback | 25 Mei | 30 Mei | 6 hari | ✅ |

🎯 **Milestone:** App sudah multi-bahasa dan customizable

### Phase 5: Finalisasi (23 Mei - 6 Jun 2026)
*Bug fixing, optimasi, dan persiapan submit*

| # | Fitur | Mulai | Selesai | Durasi | Status |
|---|---|:---:|:---:|:---:|:---:|
| 21 | Puzzle Game | 27 Mei | 31 Mei | 5 hari | ✅ |
| 22 | Pro Membership | 30 Mei | 2 Jun | 4 hari | ✅ |
| 23 | UI Animations | 1 Jun | 3 Jun | 3 hari | ✅ |
| 24 | Safe Content System | 2 Jun | 4 Jun | 3 hari | ✅ |
| 25 | Bug Fixes & QA | 3 Jun | 6 Jun | 4 hari | ✅ |

🎯 **FINAL RELEASE** - Semua fitur selesai! 🎉

### Ringkasan Timeline

| Fase | Periode | Durasi | Fitur |
|---|---|:---:|:---:|
| Phase 1: Core AI | 5 Apr - 18 Apr | 14 hari | 5 fitur |
| Phase 2: Auth & DB | 12 Apr - 2 Mei | 21 hari | 5 fitur |
| Phase 3: Learning | 2 Mei - 16 Mei | 15 hari | 5 fitur |
| Phase 4: Polish | 16 Mei - 30 Mei | 15 hari | 5 fitur |
| Phase 5: Finalisasi | 23 Mei - 6 Jun | 14 hari | 5 fitur |
| **Total** | **5 Apr - 6 Jun** | **63 hari** | **25 fitur** |

---

## 📊 Statistik Project

| | |
|---|---|
| Total fitur | 25 |
| API routes | 14 |
| Database models | 5 |
| Bahasa yang didukung | 3 |
| Tema UI | 6 |
| Suara AI | 5 |
| Achievement badge | 9 |
| Translation keys | 90+ |
| Baris kode frontend | ~1200+ |

---

## 📱 Screenshots

> *Screenshots akan ditambahkan nanti ya, sementara ini dulu list fitur yang ada di app:*

- Halaman Login/Register - warna-warni, ada animasi maskot
- Kamera View - live viewfinder dengan tombol capture
- Hasil Identifikasi - nama objek, emoji, deskripsi, fakta menarik + suara
- Riwayat Discovery - scroll list semua objek yang pernah discan
- Spelling Challenge - ketik nama objek, ada hint
- Quiz Game - pilihan ganda dengan skor
- Puzzle Game - drag-and-drop potongan gambar
- AI Chat - chatbot buat tanya-jawab
- Achievement Gallery - koleksi badge
- Settings - tema, bahasa, suara, kecepatan

---

## ⚠️ Kendala Selama Development

Ini beberapa kendala yang aku alami selama bikin project ini (buat bahan eval ya dosen 😄):

1. **Z-AI SDK masih baru** - Dokumentasinya belum lengkap, jadi sering trial error. Ternyata untuk VLM harus pake `createVision()` bukan `create()`, dan TTS nggak butuh field `model`.

2. **Camera di sandbox** - Kamera nggak bisa diakses di beberapa environment, jadi harus bikin fallback ke upload gambar.

3. **Infinite loop** - Pernah ada bug dimana identification berjalan terus tanpa henti. Fixed pake `useRef` sebagai guard.

4. **API response format** - API kadang return object `{ key: [...] }` bukan array langsung, jadi harus handle dengan `Array.isArray()` check.

5. **Multi-bahasa dari nol** - Bikin sistem i18n sendiri tanpa library external. 90+ key diterjemahin manual ke 3 bahasa. Lumayan capek tapi worth it.

---

## 🤝 Cara Kontribusi

Kalau mau bantu develop atau nemu bug:

1. Fork repo ini
2. Buat branch baru: `git checkout -b fitur-baru`
3. Commit perubahan: `git commit -m 'Tambah fitur baru'`
4. Push: `git push origin fitur-baru`
5. Buat Pull Request

---

## 📄 Lisensi

Project ini dilisensikan under [MIT License](LICENSE).

---

<div align="center">

**Dibuat buat tugas kuliah semester 4** 😅

Tapi seriusan, ini project yang cukup challenging dan banyak belajar dari sini.
Terutama soal AI integration, camera API, dan multi-language support.

Made with Next.js · TypeScript · Tailwind CSS · Z-AI SDK · Prisma

</div>
