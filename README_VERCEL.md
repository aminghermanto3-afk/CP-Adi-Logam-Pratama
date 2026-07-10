# Panduan Cara Onlinekan Web PT. ADI LOGAM PRATAMA ke Vercel

Halo! File ini berisi panduan lengkap untuk meluncurkan (deploy) aplikasi web profile **PT. ADI LOGAM PRATAMA** ke **Vercel** dengan aman dan lancar, serta cara mengatasi error login Vercel yang Anda alami di browser.

---

## 🛠️ Bagian 1: Solusi Mengatasi Error "Something went wrong" pada Dashboard Vercel

Berdasarkan screenshot Anda (menggunakan Windows 7 / browser tertentu), error tersebut adalah **masalah visual/interaksi pada Dashboard Vercel** itu sendiri, bukan karena kode web Anda. Berikut langkah mengatasinya:

1. **Gunakan Mode Penyamaran (Incognito Mode):**
   * Tekan `Ctrl + Shift + N` di Google Chrome untuk membuka tab Penyamaran.
   * Masuk ke [vercel.com/login](https://vercel.com/login) dan coba login kembali.
   * *Kenapa?* Ini menonaktifkan ekstensi browser (seperti Adblock) dan cookie usang yang sering menyebabkan bentrok halaman di Vercel.

2. **Matikan Ekstensi Ad-Blocker:**
   * Jika Anda menggunakan AdBlock, uBlock Origin, atau sejenisnya, matikan/pause sementara untuk domain `vercel.com`, lalu refresh halaman.

3. **Login Menggunakan Email (Magic Link):**
   * Jika tombol login dengan GitHub/Google error, pilih opsi login menggunakan **Email**.
   * Masukkan email Anda, lalu buka kotak masuk email Anda dan klik tombol verifikasi login yang dikirimkan Vercel.

4. **Update Browser / Coba Browser Lain:**
   * Jika Anda menggunakan Google Chrome versi lama di Windows 7, coba unduh dan gunakan **Firefox** atau browser alternatif yang up-to-date untuk mengakses dashboard Vercel.

---

## 🚀 Bagian 2: Cara Deploy Aplikasi ke Vercel

Kami sudah menyediakan file konfigurasi `vercel.json` di root project Anda agar proses deploy otomatis mengenali aplikasi ini sebagai **Vite SPA** dan mengatur rute (routing) dengan sempurna.

### Metode A: Menggunakan GitHub (Paling Direkomendasikan & Otomatis)

1. **Unduh Project ZIP atau Push ke GitHub:**
   * Anda bisa mengekspor project ini sebagai `.zip` (dari menu Ekspor di pojok kanan atas AI Studio) lalu mengekstraknya di komputer Anda.
   * Buat repositori baru di GitHub Anda (misal: `pt-adi-logam-pratama`).
   * Upload semua file project ini ke repositori tersebut.

2. **Sambungkan ke Vercel:**
   * Masuk ke Dashboard Vercel Anda.
   * Klik tombol **"Add New"** -> **"Project"**.
   * Hubungkan akun GitHub Anda dan pilih repositori `pt-adi-logam-pratama`.

3. **Pengaturan Build (Vercel otomatis mendeteksi):**
   * **Framework Preset:** `Vite` (Otomatis terdeteksi).
   * **Build Command:** `npm run build` (Otomatis).
   * **Output Directory:** `dist` (Otomatis).
   * Klik tombol **"Deploy"**. Selesai! Web Anda akan online dalam waktu kurang dari 1 menit.

---

### Metode B: Menggunakan Vercel CLI (Deploy Langsung dari Command Line komputer Anda)

Jika dashboard web Vercel Anda tetap error, Anda bisa mendeploy langsung menggunakan Terminal/CMD di komputer Anda dengan cara berikut:

1. **Buka Terminal / Command Prompt (CMD)** di folder project Anda yang sudah diekstrak.
2. **Install Vercel CLI secara global:**
   ```bash
   npm install -g vercel
   ```
3. **Login ke akun Vercel Anda melalui terminal:**
   ```bash
   vercel login
   ```
   *(Pilih metode masuk yang diinginkan, proses otentikasi akan berjalan di browser).*
4. **Mulai proses deployment:**
   ```bash
   vercel
   ```
   * Jawab pertanyaan konfigurasi yang muncul (tekan `Enter` untuk mengikuti pengaturan default).
5. **Kirim ke Produksi (Live):**
   ```bash
   vercel --prod
   ```
   Selesai! Terminal akan menampilkan link web Anda yang sudah online (misal: `https://nama-project.vercel.app`).

---

## 📦 Mengenai File `vercel.json` yang Kami Tambahkan
Kami telah membuat file `/vercel.json` dengan konfigurasi berikut:
```json
{
  "version": 2,
  "cleanUrls": true,
  "framework": "vite",
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```
*Fungsi:* Menjamin bahwa jika halaman web di-refresh atau diakses langsung dari URL sub-halaman, Vercel tidak akan menampilkan error *404 Not Found*, melainkan mengarahkannya dengan mulus ke mesin client-side routing Anda.
