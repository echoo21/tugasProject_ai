# 🔍 What's This?

> **Tugas Mata Kuliah Pemrograman Web Lanjut — Semester 4**

---

## 1. Ide Project

**"What's This?"** adalah aplikasi web edukasi interaktif untuk anak usia 3–8 tahun yang memanfaatkan teknologi AI (Computer Vision & Text-to-Speech) untuk membantu anak-anak belajar mengenali objek-objek di sekitar mereka.

### Latar Belakang

Anak kecil secara alami sangat penasaran dengan lingkungan. Mereka selalu bertanya *"ini apa?"* setiap melihat benda baru. Metode belajar konvensional seperti buku gambar dan flashcard memiliki keterbatasan — bersifat statis, jumlahnya terbatas, dan tidak bisa merespons rasa ingin tahu anak secara real-time.

### Solusi

Aplikasi ini mengubah proses belajar menjadi pengalaman yang dinamis dan interaktif:

```
Anak arahkan kamera ke benda → AI mengenali benda tersebut
→ App menjelaskan dengan bahasa anak-anak → Suara AI membacakan penjelasan
→ Mini-game memperkuat pemahaman
```

Dengan pendekatan ini, anak bisa belajar dari **objek apa saja** kapan saja dan di mana saja, tanpa dibatasi oleh konten yang sudah dipublikasikan sebelumnya.

### Teknologi Utama

| Teknologi | Fungsi |
|---|---|
| Next.js 16 + TypeScript | Framework full-stack |
| Z-AI SDK (GLM-4V-Plus) | AI Vision untuk mengenali objek dari gambar |
| Z-AI SDK (GLM-4-Flash) | AI Chat untuk menjawab pertanyaan anak |
| Z-AI SDK (TTS) | Text-to-Speech untuk membacakan penjelasan |
| Tailwind CSS + shadcn/ui | UI/UX responsive dan ramah anak |
| Prisma + SQLite | Penyimpanan data user, riwayat, dan achievement |
| Framer Motion | Animasi agar app terasa hidup |

---

## 2. Fitur-Fitur Penting

### Fitur Inti AI & Kamera

| No | Fitur | Deskripsi |
|---|---|---|
| 1 | **AI Object Recognition** | Menggunakan model GLM-4V-Plus untuk mengenali objek dari foto. AI mengembalikan nama objek, emoji, deskripsi ramah anak, fakta menarik, dan kategori — semua dalam bahasa yang dipilih user. |
| 2 | **Real-Time Camera** | Integrasi kamera device via WebRTC. Mendukung kamera depan dan belakang dengan deteksi perangkat otomatis. Di mobile prioritas kamera belakang karena lebih mudah memotret benda. |
| 3 | **Upload Gambar** | Sebagai alternatif saat kamera tidak tersedia (misalnya di laptop tanpa webcam), user bisa mengunggah gambar dari galeri perangkat. |
| 4 | **Ganti Kamera (Depan/Belakang)** | Tombol toggle untuk berpindah antara kamera depan dan belakang menggunakan `enumerateDevices()` untuk mendeteksi perangkat video yang tersedia. |
| 5 | **Rotasi Gambar** | Gambar yang diambil bisa diputar per 90° menggunakan canvas transformation, sehingga orientasi gambar benar sebelum dikirim ke AI. |
| 6 | **Text-to-Speech** | Setiap objek yang berhasil dikenali otomatis dibacakan oleh suara AI. User bisa memutar ulang, menjeda, atau menghentikan audio kapan saja. |
| 7 | **Pilihan Suara AI (5 Voice)** | Tersedia 5 suara AI yang bisa dipilih di pengaturan: Chuichui 🎈 (default, lucu), Tongtong 🌸 (lembut), Jam 🎩 (berat), Kazi 🎤 (energik), Xiaochen 🍃 (tenang). |
| 8 | **Pengaturan Kecepatan Suara** | Slider untuk mengatur kecepatan TTS dari 0.5× (pelan, untuk anak kecil) hingga 1.5× (lebih cepat, untuk anak yang lebih besar). |

### Fitur Autentikasi & User

| No | Fitur | Deskripsi |
|---|---|---|
| 9 | **Register & Login** | Sistem autentikasi berbasis cookie session. Password di-hash menggunakan bcrypt. Session bertahan 30 hari. User bisa login pakai email atau username. |
| 10 | **Guest Mode** | User bisa langsung menggunakan aplikasi tanpa mendaftar. Riwayat disimpan lokal sementara, dan user diprompt untuk mendaftar agar data tersimpan permanen. |
| 11 | **Profil Pengguna** | User dapat mengubah nama tampilan, tema warna, dan bahasa. Semua preferensi tersimpan di database dan otomatis dimuat saat login kembali. |

### Fitur Belajar & Game

| No | Fitur | Deskripsi |
|---|---|---|
| 12 | **Riwayat Discovery** | Setiap objek yang berhasil dikenali beserta gambarnya, nama, deskripsi, dan fakta menarik tersimpan di database. User bisa melihat hingga 50 penemuan terakhir dan menghapus semua riwayat. |
| 13 | **Spelling Challenge** | Setelah memindai objek, anak ditantang untuk mengetik nama objek tersebut. Tersedia fitur hint dan feedback suara (TTS) untuk jawaban benar maupun salah. |
| 14 | **Quiz Challenge** | Kuis pilihan ganda yang menampilkan gambar objek dan 3 opsi jawaban acak. Skor disimpan di database dan jawaban benar membuka achievement. |
| 15 | **Puzzle Game** | Gambar yang dipindai dipotong menjadi potongan 2×2 yang diacak. Anak menyusun potongan kembali ke posisi yang benar. Selesai dengan benar memicu feedback suara dan achievement. |
| 16 | **AI Chat Buddy** | Chatbot AI untuk anak-anak yang didukung model GLM-4-Flash. Mendukung percakapan multi-turn (mengingat 6 pesan terakhir) dan merespons sesuai bahasa yang dipilih. |

### Fitur Gamifikasi & Kustomisasi

| No | Fitur | Deskripsi |
|---|---|---|
| 17 | **Achievement System (9 Badge)** | Sistem pencapaian dengan 9 badge: First Discovery 🔍, Explorer 🧭, Scientist 🔬, Professor 🎓, Perfect Score 💯, Puzzle Master 🧩, Spelling Bee 📝, Chatty Kid 💬, dan Helper ⭐. Milestone scan (5, 10, 20 objek) dicek otomatis. |
| 18 | **Multi-Bahasa (3 Bahasa)** | Seluruh UI dan respons AI tersedia dalam 3 bahasa: English 🇬🇧, Bahasa Indonesia 🇮🇩, dan 简体中文 🇨🇳. Terdapat 90+ string yang diterjemahkan secara manual. |
| 19 | **6 Tema Warna** | Tersedia 6 tema gradient: Default 🌈, Ocean 🌊, Forest 🌲, Sunset 🌅, Night 🌙, dan Candy 🍬. Pilihan tema tersimpan per pengguna. |
| 20 | **User Feedback** | User dapat memberikan rating bintang 1–5 beserta komentar opsional. Mengirim feedback otomatis membuka achievement "Helper". |
| 21 | **Pro Membership** | Simulasi upgrade ke akun Pro yang membuka fitur tambahan. Termasuk loading state, badge display, dan update status user. |
| 22 | **Responsive Mobile-First** | Desain dibangun dengan pendekatan mobile-first menggunakan Tailwind CSS 4. Layout menyesuaikan dari HP ke desktop dengan ukuran touch target minimum 44px. |

---

## 3. Timeline Pengembangan

> **Mulai: 5 April 2026 · Selesai: 6 Juni 2026 · Total: 63 hari**

### Phase 1: Foundation & Core AI
**5 April — 18 April 2026 (14 hari)**

| No | Fitur | Mulai | Selesai | Durasi | Status |
|----|------|-------|---------|--------|--------|
| 1 | AI Object Recognition | 5 Apr | 10 Apr | 6 hari | ✅ |
| 2 | Real-Time Camera | 7 Apr | 12 Apr | 6 hari | ✅ |
| 3 | Upload Gambar | 11 Apr | 14 Apr | 4 hari | ✅ |
| 4 | Text-to-Speech | 12 Apr | 16 Apr | 5 hari | ✅ |
| 5 | Rotasi Gambar | 14 Apr | 16 Apr | 3 hari | ✅ |

**Milestone:** Pipeline AI berfungsi end-to-end (Kamera → AI → Suara → UI)

<br/>

### Phase 2: Autentikasi & Database
**12 April — 2 Mei 2026 (21 hari)**

| No | Fitur | Mulai | Selesai | Durasi | Status |
|----|------|-------|---------|--------|--------|
| 6 | Ganti Kamera (Depan/Belakang) | 12 Apr | 15 Apr | 4 hari | ✅ |
| 7 | Pilihan Suara AI | 14 Apr | 18 Apr | 5 hari | ✅ |
| 8 | Pengaturan Kecepatan Suara | 16 Apr | 19 Apr | 4 hari | ❌ |
| 9 | Register & Login | 19 Apr | 27 Apr | 9 hari | ❌ |
| 10 | Guest Mode | 27 Apr | 30 Apr | 4 hari | ❌ |
| 11 | Profil Pengguna | 29 Apr | 2 Mei | 4 hari | ❌ |

**Milestone:** Database dan autentikasi berfungsi, user bisa daftar dan login

<br/>

### Phase 3: Fitur Belajar Interaktif
**2 Mei — 16 Mei 2026 (15 hari)**

| No | Fitur | Mulai | Selesai | Durasi | Status |
|----|------|-------|---------|--------|--------|
| 12 | Riwayat Discovery | 2 Mei | 6 Mei | 5 hari | ❌ |
| 13 | Spelling Challenge | 5 Mei | 10 Mei | 6 hari | ❌ |
| 14 | Quiz Challenge | 8 Mei | 13 Mei | 6 hari | ❌ |
| 15 | Puzzle Game | 10 Mei | 15 Mei | 6 hari | ❌ |
| 16 | AI Chat Buddy | 11 Mei | 16 Mei | 6 hari | ❌ |

**Milestone:** Semua fitur belajar dan game interaktif berfungsi

<br/>

### Phase 4: Gamifikasi & Kustomisasi
**16 Mei — 30 Mei 2026 (15 hari)**

| No | Fitur | Mulai | Selesai | Durasi | Status |
|----|------|-------|---------|--------|--------|
| 17 | Achievement System | 16 Mei | 21 Mei | 6 hari | ❌ |
| 18 | Multi-Bahasa | 19 Mei | 24 Mei | 6 hari | ❌ |
| 19 | 6 Tema Warna | 22 Mei | 26 Mei | 5 hari | ❌ |
| 20 | User Feedback | 25 Mei | 29 Mei | 5 hari | ❌ |

**Milestone:** Aplikasi sudah mendukung multi-bahasa dan dapat dikustomisasi

<br/>

### Phase 5: Finalisasi
**30 Mei — 6 Juni 2026 (8 hari)**

| No | Fitur | Mulai | Selesai | Durasi | Status |
|----|------|-------|---------|--------|--------|
| 21 | Pro Membership | 30 Mei | 2 Jun | 4 hari | ❌ |
| 22 | Responsive Mobile-First | 1 Jun | 4 Jun | 4 hari | ❌ |
| 23 | Bug Fixes & Optimasi | 3 Jun | 6 Jun | 4 hari | ❌ |

**Milestone:** 🎉 FINAL RELEASE — Semua 22 fitur selesai dan siap digunakan

<br/>

### Ringkasan

| Fase | Periode | Durasi | Jumlah Fitur |
|------|---------|--------|--------------|
| Phase 1 — Core AI & Kamera | 5 Apr – 18 Apr 2026 | 14 hari | 5 |
| Phase 2 — Auth & Database | 12 Apr – 2 Mei 2026 | 21 hari | 6 |
| Phase 3 — Fitur Belajar | 2 Mei – 16 Mei 2026 | 15 hari | 5 |
| Phase 4 — Gamifikasi | 16 Mei – 30 Mei 2026 | 15 hari | 4 |
| Phase 5 — Finalisasi | 30 Mei – 6 Jun 2026 | 8 hari | 3 |
| **Total** | **5 Apr – 6 Jun 2026** | **63 hari** | **23** |

---

<div align="center">

*Dibuat menggunakan Next.js · TypeScript · Tailwind CSS · Z-AI SDK · Prisma*

</div>
