import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Folder, 
  FileCode, 
  Globe, 
  Play, 
  Check, 
  Copy, 
  Download, 
  RefreshCw, 
  BookOpen, 
  Sparkles, 
  Plus, 
  Trash, 
  Database, 
  Mail, 
  FileSpreadsheet, 
  Code, 
  ExternalLink, 
  Layers, 
  Info, 
  HelpCircle,
  CheckCircle2,
  Settings,
  ChevronRight,
  Eye
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface GasFile {
  name: string;
  type: 'gs' | 'html';
  content: string;
}

interface Template {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'Spreadsheet' | 'Web App' | 'Gmail' | 'Utility';
  files: GasFile[];
  initialSpreadsheetData?: Array<Record<string, any>>;
  spreadsheetColumns?: string[];
}

// ==========================================
// GOOGLE APPS SCRIPT TEMPLATES
// ==========================================
const TEMPLATES: Template[] = [
  {
    id: 'form-sheets',
    title: 'Web App Registrasi & Spreadsheet',
    category: 'Spreadsheet',
    description: 'Aplikasi pendaftaran web app yang otomatis menyimpan entri formulir ke dalam baris Google Sheets dan mendeteksi email pengguna.',
    icon: <FileSpreadsheet className="w-5 h-5 text-emerald-500" />,
    spreadsheetColumns: ['Waktu (Timestamp)', 'Nama Lengkap', 'Instansi', 'Tujuan Kunjungan', 'Email Pengguna'],
    initialSpreadsheetData: [
      {
        'Waktu (Timestamp)': '2026-07-09 10:05:22',
        'Nama Lengkap': 'Ahmad Hermanto',
        'Instansi': 'CV Teknologi Maju',
        'Tujuan Kunjungan': 'Konsultasi Layanan Cloud',
        'Email Pengguna': 'aminghermanto3@gmail.com'
      },
      {
        'Waktu (Timestamp)': '2026-07-09 11:24:15',
        'Nama Lengkap': 'Siti Rahmawati',
        'Instansi': 'Universitas Indonesia',
        'Tujuan Kunjungan': 'Penelitian Google Workspace SDK',
        'Email Pengguna': 'siti.rahma@ui.ac.id'
      }
    ],
    files: [
      {
        name: 'code.gs',
        type: 'gs',
        content: `function doGet(e) {
  // Melayani file index.html ke publik
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Web App Registrasi Pengunjung')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Mendapatkan email dari akun Google yang sedang aktif
 * @return {string} Alamat email pengguna
 */
function getActiveUserEmail() {
  try {
    return Session.getActiveUser().getEmail() || "pengguna.demo@gmail.com";
  } catch (err) {
    return "Demo Mode: aminghermanto3@gmail.com";
  }
}

/**
 * Menyimpan formulir pendaftaran ke Google Sheets
 * @param {Object} formData Data dari formulir HTML
 * @return {string} Pesan status sukses
 */
function appendToSheet(formData) {
  try {
    // Membuka spreadsheet aktif (spreadsheet tempat skrip ini terikat)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var timestamp = new Date();
    
    // Ambil data dari parameter objek
    var nama = formData.nama;
    var instansi = formData.instansi;
    var tujuan = formData.tujuan;
    var email = getActiveUserEmail();
    
    // Tambahkan baris baru ke Google Sheet
    sheet.appendRow([timestamp, nama, instansi, tujuan, email]);
    
    return "Pendaftaran Sukses! Data Anda berhasil dicatat di baris " + sheet.getLastRow();
  } catch (err) {
    return "Gagal menyimpan data: " + err.message;
  }
}`
      },
      {
        name: 'index.html',
        type: 'html',
        content: `<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Formulir Pengunjung</title>
    <!-- Tailwind CSS untuk tampilan modern -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { font-family: 'Segoe UI', system-ui, sans-serif; }
    </style>
  </head>
  <body class="bg-slate-50 min-h-screen flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full p-8 transition-all hover:shadow-2xl">
      
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-slate-800">Registrasi Kunjungan</h2>
        <p class="text-slate-500 text-sm mt-1">Simpan data otomatis ke Google Sheets</p>
      </div>

      <!-- Info User Email -->
      <div class="mb-6 bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3">
        <div class="bg-blue-100 text-blue-600 rounded-lg p-2 text-xs font-semibold">User</div>
        <div>
          <p class="text-xs text-slate-400 font-medium">Email Google Aktif</p>
          <p id="user-email" class="text-sm font-semibold text-slate-700">Memuat email...</p>
        </div>
      </div>

      <!-- Form -->
      <form id="regForm" onsubmit="submitForm(event)" class="space-y-5">
        <div>
          <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
          <input type="text" id="nama" name="nama" required placeholder="Masukkan nama Anda" 
            class="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Instansi / Organisasi</label>
          <input type="text" id="instansi" name="instansi" required placeholder="Nama instansi Anda" 
            class="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tujuan Kunjungan</label>
          <select id="tujuan" name="tujuan" required
            class="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
            <option value="Konsultasi Teknis">Konsultasi Teknis</option>
            <option value="Kunjungan Industri">Kunjungan Industri</option>
            <option value="Ujian / Sertifikasi">Ujian / Sertifikasi</option>
            <option value="Keperluan Lainnya">Keperluan Lainnya</option>
          </select>
        </div>

        <button type="submit" id="btnSubmit" 
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
          Kirim Data ke Sheet
        </button>
      </form>

      <!-- Status Notifikasi -->
      <div id="statusBox" class="mt-6 p-4 rounded-xl hidden text-sm font-medium transition-all duration-300"></div>

    </div>

    <!-- Integrasi dengan Google Apps Script Api -->
    <script>
      // Load email otomatis saat halaman dibuka
      window.addEventListener('load', function() {
        google.script.run
          .withSuccessHandler(function(email) {
            document.getElementById('user-email').innerText = email;
          })
          .withFailureHandler(function(err) {
            document.getElementById('user-email').innerText = "Gagal mengambil email: " + err.message;
          })
          .getActiveUserEmail();
      });

      function submitForm(e) {
        e.preventDefault();
        
        var btn = document.getElementById('btnSubmit');
        var statusBox = document.getElementById('statusBox');
        
        btn.disabled = true;
        btn.innerText = "Mengirim...";
        
        // Buat objek payload formulir
        var formData = {
          nama: document.getElementById('nama').value,
          instansi: document.getElementById('instansi').value,
          tujuan: document.getElementById('tujuan').value
        };

        // Panggil fungsi Apps Script
        google.script.run
          .withSuccessHandler(function(result) {
            btn.disabled = false;
            btn.innerText = "Kirim Data ke Sheet";
            
            statusBox.className = "mt-6 p-4 rounded-xl text-sm font-medium bg-emerald-50 text-emerald-800 border border-emerald-100 block";
            statusBox.innerText = result;
            
            // Reset Form
            document.getElementById('regForm').reset();
          })
          .withFailureHandler(function(err) {
            btn.disabled = false;
            btn.innerText = "Kirim Data ke Sheet";
            
            statusBox.className = "mt-6 p-4 rounded-xl text-sm font-medium bg-rose-50 text-rose-800 border border-rose-100 block";
            statusBox.innerText = "Error: " + err.message;
          })
          .appendToSheet(formData);
      }
    </script>
  </body>
</html>`
      }
    ]
  },
  {
    id: 'attendance-dashboard',
    title: 'Dashboard Kehadiran Realtime',
    category: 'Web App',
    description: 'Dashboard interaktif lengkap yang membaca data kehadiran dari Google Sheets, menyajikan statistik visual, dan menyediakan tombol absen cepat.',
    icon: <Layers className="w-5 h-5 text-blue-500" />,
    spreadsheetColumns: ['Waktu Absen', 'Nama', 'Status Kehadiran'],
    initialSpreadsheetData: [
      { 'Waktu Absen': '2026-07-09 07:45:00', 'Nama': 'Budi Santoso', 'Status Kehadiran': 'Hadir' },
      { 'Waktu Absen': '2026-07-09 07:55:00', 'Nama': 'Ahmad Hermanto', 'Status Kehadiran': 'Hadir' },
      { 'Waktu Absen': '2026-07-09 08:02:11', 'Nama': 'Riana Putri', 'Status Kehadiran': 'Terlambat' },
      { 'Waktu Absen': '2026-07-09 08:30:00', 'Nama': 'Siti Rahma', 'Status Kehadiran': 'Sakit' },
      { 'Waktu Absen': '2026-07-09 09:12:00', 'Nama': 'Diana Lestari', 'Status Kehadiran': 'Izin' }
    ],
    files: [
      {
        name: 'code.gs',
        type: 'gs',
        content: `function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Dashboard Absensi Karyawan')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Membaca data absensi dari Google Sheets untuk disajikan ke Dashboard
 * @return {Array<Object>} Daftar riwayat absen
 */
function getAttendanceData() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    // Jika sheet kosong, beri data demo
    if (data.length <= 1) {
      return [
        { "timestamp": "Demo 07:45", "nama": "Budi Santoso", "status": "Hadir" },
        { "timestamp": "Demo 08:02", "nama": "Riana Putri", "status": "Terlambat" }
      ];
    }
    
    var formattedData = [];
    // Mulai dari baris index 1 (melewati header baris 0)
    for (var i = 1; i < data.length; i++) {
      formattedData.push({
        timestamp: Utilities.formatDate(new Date(data[i][0]), "GMT+7", "yyyy-MM-dd HH:mm"),
        nama: data[i][1],
        status: data[i][2]
      });
    }
    return formattedData;
  } catch (err) {
    // Kembalikan data fallback jika belum di-bind ke spreadsheet asli
    return [
      { "timestamp": "07:45 WIB", "nama": "Budi Santoso", "status": "Hadir" },
      { "timestamp": "07:55 WIB", "nama": "Ahmad Hermanto", "status": "Hadir" },
      { "timestamp": "08:02 WIB", "nama": "Riana Putri", "status": "Terlambat" },
      { "timestamp": "08:15 WIB", "nama": "Siti Rahma", "status": "Sakit" },
      { "timestamp": "09:12 WIB", "nama": "Diana Lestari", "status": "Izin" }
    ];
  }
}

/**
 * Menyimpan data absensi baru
 * @param {string} nama Nama pegawai
 * @param {string} status Pilihan status (Hadir/Sakit/Izin/Terlambat)
 * @return {Object} Status kembalian sukses
 */
function submitPresence(nama, status) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var timestamp = new Date();
    sheet.appendRow([timestamp, nama, status]);
    return { success: true, message: "Absen berhasil dicatat!" };
  } catch (err) {
    return { success: false, message: err.message };
  }
}`
      },
      {
        name: 'index.html',
        type: 'html',
        content: `<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard Kehadiran</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-slate-900 text-slate-100 min-h-screen p-6">
    <div class="max-w-4xl mx-auto space-y-6">
      
      <!-- Top Bar -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
        <div>
          <h1 class="text-2xl font-bold text-blue-400">Dashboard Absensi Pegawai</h1>
          <p class="text-slate-400 text-sm">Update Real-Time Terkoneksi Google Sheets</p>
        </div>
        <button onclick="refreshData()" class="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" /></svg>
          Segarkan Data
        </button>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="bg-slate-800 p-5 rounded-2xl border border-slate-700 text-center">
          <p class="text-xs text-slate-400 font-medium">Hadir</p>
          <p id="stat-hadir" class="text-3xl font-extrabold text-emerald-400 mt-1">0</p>
        </div>
        <div class="bg-slate-800 p-5 rounded-2xl border border-slate-700 text-center">
          <p class="text-xs text-slate-400 font-medium">Sakit</p>
          <p id="stat-sakit" class="text-3xl font-extrabold text-amber-400 mt-1">0</p>
        </div>
        <div class="bg-slate-800 p-5 rounded-2xl border border-slate-700 text-center">
          <p class="text-xs text-slate-400 font-medium">Izin</p>
          <p id="stat-izin" class="text-3xl font-extrabold text-blue-400 mt-1">0</p>
        </div>
        <div class="bg-slate-800 p-5 rounded-2xl border border-slate-700 text-center">
          <p class="text-xs text-slate-400 font-medium">Terlambat</p>
          <p id="stat-terlambat" class="text-3xl font-extrabold text-rose-400 mt-1">0</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Form Absen Cepat -->
        <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4 shadow-lg h-fit">
          <h3 class="text-lg font-bold text-slate-200">Absen Cepat Baru</h3>
          <div class="space-y-3">
            <div>
              <label class="text-xs text-slate-400 block mb-1">Nama Pegawai</label>
              <input type="text" id="absen-nama" placeholder="Tulis nama pegawai" 
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="text-xs text-slate-400 block mb-1">Status Kehadiran</label>
              <select id="absen-status" 
                class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
                <option value="Hadir">Hadir</option>
                <option value="Sakit">Sakit</option>
                <option value="Izin">Izin</option>
                <option value="Terlambat">Terlambat</option>
              </select>
            </div>
            <button onclick="submitNewAbsen()" id="btnAbsen" class="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-all">
              Catat Kehadiran
            </button>
          </div>
        </div>

        <!-- Tabel Riwayat Kehadiran -->
        <div class="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg md:col-span-2 space-y-4">
          <h3 class="text-lg font-bold text-slate-200">Riwayat Presensi Hari Ini</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-400">
              <thead class="text-xs text-slate-400 uppercase bg-slate-900 border-b border-slate-700">
                <tr>
                  <th class="py-3 px-4">Nama</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4">Waktu</th>
                </tr>
              </thead>
              <tbody id="attendance-rows" class="divide-y divide-slate-700/50">
                <!-- Data dimasukkan via JS -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>

    <script>
      window.addEventListener('load', refreshData);

      function refreshData() {
        var rows = document.getElementById('attendance-rows');
        rows.innerHTML = '<tr><td colspan="3" class="text-center py-4 text-slate-500">Menghubungkan ke Sheets...</td></tr>';
        
        google.script.run
          .withSuccessHandler(function(data) {
            renderData(data);
          })
          .withFailureHandler(function(err) {
            rows.innerHTML = '<tr><td colspan="3" class="text-center py-4 text-rose-400">Gagal memuat data: ' + err.message + '</td></tr>';
          })
          .getAttendanceData();
      }

      function renderData(data) {
        var rows = document.getElementById('attendance-rows');
        rows.innerHTML = '';
        
        var counts = { Hadir: 0, Sakit: 0, Izin: 0, Terlambat: 0 };
        
        data.forEach(function(row) {
          // Hitung Statistik
          if (counts[row.status] !== undefined) {
            counts[row.status]++;
          }
          
          var badgeClass = "bg-slate-700 text-slate-300";
          if (row.status === "Hadir") badgeClass = "bg-emerald-950 text-emerald-400 border border-emerald-800/50";
          else if (row.status === "Sakit") badgeClass = "bg-amber-950 text-amber-400 border border-amber-800/50";
          else if (row.status === "Izin") badgeClass = "bg-blue-950 text-blue-400 border border-blue-800/50";
          else if (row.status === "Terlambat") badgeClass = "bg-rose-950 text-rose-400 border border-rose-800/50";
          
          var tr = document.createElement('tr');
          tr.className = "hover:bg-slate-700/20";
          tr.innerHTML = '<td class="py-3 px-4 font-semibold text-slate-200">' + row.nama + '</td>' +
                         '<td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full text-xs font-medium ' + badgeClass + '">' + row.status + '</span></td>' +
                         '<td class="py-3 px-4 text-xs font-mono text-slate-500">' + row.timestamp + '</td>';
          rows.appendChild(tr);
        });
        
        // Update Stats UI
        document.getElementById('stat-hadir').innerText = counts.Hadir;
        document.getElementById('stat-sakit').innerText = counts.Sakit;
        document.getElementById('stat-izin').innerText = counts.Izin;
        document.getElementById('stat-terlambat').innerText = counts.Terlambat;
      }

      function submitNewAbsen() {
        var nama = document.getElementById('absen-nama').value;
        var status = document.getElementById('absen-status').value;
        var btn = document.getElementById('btnAbsen');
        
        if (!nama) {
          alert('Nama tidak boleh kosong!');
          return;
        }
        
        btn.disabled = true;
        btn.innerText = "Mencatat...";
        
        google.script.run
          .withSuccessHandler(function(res) {
            btn.disabled = false;
            btn.innerText = "Catat Kehadiran";
            document.getElementById('absen-nama').value = '';
            refreshData();
          })
          .withFailureHandler(function(err) {
            btn.disabled = false;
            btn.innerText = "Catat Kehadiran";
            alert("Error: " + err.message);
          })
          .submitPresence(nama, status);
      }
    </script>
  </body>
</html>`
      }
    ]
  },
  {
    id: 'gmail-responder',
    title: 'Gmail Auto-Responder Bot',
    category: 'Gmail',
    description: 'Skrip pemicu waktu (Time-driven trigger) Google Apps Script untuk otomatis memeriksa email masuk dan mengirim balasan template.',
    icon: <Mail className="w-5 h-5 text-red-500" />,
    spreadsheetColumns: ['Waktu Pemicu', 'Email Pengirim', 'Status Respons', 'Pesan Pengirim'],
    initialSpreadsheetData: [
      { 'Waktu Pemicu': '2026-07-09 15:30:10', 'Email Pengirim': 'client@example.com', 'Status Respons': 'Terkirim', 'Pesan Pengirim': 'TanyaApp: Tanya cara pendaftaran' },
      { 'Waktu Pemicu': '2026-07-09 16:45:22', 'Email Pengirim': 'test-user@domain.com', 'Status Respons': 'Terkirim', 'Pesan Pengirim': 'TanyaApp: Bagaimana cara integrasi?' }
    ],
    files: [
      {
        name: 'code.gs',
        type: 'gs',
        content: `/**
 * Skrip Utama - Jadwalkan pemicu waktu (Time-driven trigger) 
 * misalnya setiap 10 menit sekali untuk memeriksa inbox otomatis.
 */
function autoReplyInbox() {
  var triggerKeyword = "TanyaApp"; // Kata kunci di subjek email
  var labelName = "Auto-Replied";
  
  // Mencari label di Gmail, jika tidak ada maka buat baru
  var label = GmailApp.getUserLabelByName(labelName);
  if (!label) {
    label = GmailApp.createLabel(labelName);
  }
  
  // Cari utas (threads) email yang belum dibaca dan mengandung kata kunci di subjek
  var searchQuery = "is:unread subject:" + triggerKeyword;
  var threads = GmailApp.search(searchQuery);
  
  // Membuka log sheet untuk dokumentasi (opsional)
  var sheet;
  try {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  } catch (e) {
    Logger.log("Tidak terikat ke spreadsheet, melewati logging.");
  }
  
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    var lastMessage = messages[messages.length - 1];
    var sender = lastMessage.getFrom();
    var subject = lastMessage.getSubject();
    var body = lastMessage.getPlainBody();
    
    // Tulis template balasan otomatis Anda
    var replyBody = "Halo,\\n\\n" +
                     "Terima kasih telah menghubungi kami mengenai '" + subject + "'.\\n" +
                     "Ini adalah balasan otomatis. Tim kami sedang meninjau pesan Anda dan akan merespons dalam waktu 1-2 hari kerja.\\n\\n" +
                     "Salam hangat,\\n" +
                     "Bot Otomatis Layanan Pelanggan";
    
    // Kirim Balasan
    lastMessage.reply(replyBody);
    
    // Tandai utas sebagai telah dibaca agar tidak dibalas berulang kali
    threads[i].markRead();
    
    // Beri label pada utas agar rapi
    threads[i].addLabel(label);
    
    // Log hasil pencatatan ke Google Sheets jika tersedia
    if (sheet) {
      sheet.appendRow([new Date(), sender, "Auto-Replied Sukses", subject]);
    }
    
    Logger.log("Berhasil membalas email dari: " + sender);
  }
}

/**
 * Fungsi pembantu untuk membuat pemicu (trigger) waktu otomatis via kode
 */
function createTimeTrigger() {
  // Hapus pemicu lama yang ada untuk menghindari duplikasi
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "autoReplyInbox") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  // Buat pemicu baru setiap 10 menit
  ScriptApp.newTrigger("autoReplyInbox")
    .timeBased()
    .everyMinutes(10)
    .create();
}`
      },
      {
        name: 'index.html',
        type: 'html',
        content: `<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <meta charset="utf-8">
    <title>Gmail Auto-Responder Config</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-slate-50 min-h-screen p-6">
    <div class="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-6">
      
      <!-- Header -->
      <div class="border-b border-slate-100 pb-4">
        <h1 class="text-xl font-bold text-slate-800">Gmail Responder Bot</h1>
        <p class="text-xs text-slate-400 mt-1">Gunakan tab pemicu Apps Script untuk menjadwalkan otomatisasi ini.</p>
      </div>

      <!-- Config Form -->
      <div class="space-y-4">
        <div>
          <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Kata Kunci Filter Subjek</label>
          <input type="text" value="TanyaApp" disabled class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-500 font-mono">
        </div>

        <div>
          <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Label Gmail Hasil Reply</label>
          <input type="text" value="Auto-Replied" disabled class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-500 font-mono">
        </div>

        <div>
          <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Isi Template Balasan (Preview)</label>
          <div class="bg-slate-50 p-4 border border-slate-200 rounded-lg text-xs text-slate-600 font-sans whitespace-pre-line leading-relaxed">
            Halo,

            Terima kasih telah menghubungi kami mengenai '[Subjek_Email]'.
            Ini adalah balasan otomatis. Tim kami sedang meninjau pesan Anda dan akan merespons dalam waktu 1-2 hari kerja.

            Salam hangat,
            Bot Otomatis Layanan Pelanggan
          </div>
        </div>

        <button onclick="simulasikanTrigger()" class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-red-100 text-sm transition-all flex items-center justify-center gap-2">
          <svg class="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg>
          Uji Coba Jalankan Trigger Sekarang
        </button>
      </div>

      <div id="log-box" class="hidden bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-xs space-y-1">
        <p class="text-blue-400">[INFO] Memulai autoReplyInbox()...</p>
      </div>

    </div>

    <script>
      function simulasikanTrigger() {
        var logBox = document.getElementById('log-box');
        logBox.classList.remove('hidden');
        logBox.innerHTML = '<p class="text-blue-400">[INFO] Memulai autoReplyInbox()...</p>';
        
        setTimeout(function() {
          logBox.innerHTML += '<p class="text-slate-400">[SEARCH] Mencari query: "is:unread subject:TanyaApp"...</p>';
        }, 1000);

        setTimeout(function() {
          logBox.innerHTML += '<p class="text-emerald-400">[MATCH] Menemukan 1 email baru dari "client@example.com"!</p>';
        }, 2000);

        setTimeout(function() {
          logBox.innerHTML += '<p class="text-slate-400">[ACTION] Mengirim balasan otomatis ke client@example.com...</p>';
        }, 3000);

        setTimeout(function() {
          logBox.innerHTML += '<p class="text-emerald-400">[SUCCESS] Email dibalas dan diberi label "Auto-Replied"!</p>';
          
          // Beritahu simulator utama untuk menambah baris spreadsheet demo
          google.script.run.autoReplyInbox();
        }, 4000);
      }
    </script>
  </body>
</html>`
      }
    ]
  }
];

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  // --- Workspace File States ---
  const [files, setFiles] = useState<GasFile[]>([]);
  const [activeFileName, setActiveFileName] = useState<string>('code.gs');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('form-sheets');
  const [editorValue, setEditorValue] = useState<string>('');
  
  // --- Virtual Database States (Google Sheets simulation) ---
  const [spreadsheetData, setSpreadsheetData] = useState<Array<Record<string, any>>>([]);
  const [spreadsheetColumns, setSpreadsheetColumns] = useState<string[]>([]);
  
  // --- Utility States ---
  const [saveIndicator, setSaveIndicator] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [copyIndicator, setCopyIndicator] = useState<boolean>(false);
  const [sidebarTab, setSidebarTab] = useState<'files' | 'templates' | 'guide'>('files');
  const [newFileName, setNewFileName] = useState<string>('');
  const [newFileType, setNewFileType] = useState<'gs' | 'html'>('gs');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>(["[Simulator] Konsol Apps Script diinisialisasi."]);

  // Iframe reference for simulator reload
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Initialize workspace with local storage or default template
  useEffect(() => {
    const savedFiles = localStorage.getItem('gas_files');
    const savedTemplateId = localStorage.getItem('gas_template_id') || 'form-sheets';
    const savedSheetData = localStorage.getItem('gas_sheet_data');

    const activeTemplate = TEMPLATES.find(t => t.id === savedTemplateId) || TEMPLATES[0];

    if (savedFiles) {
      try {
        const parsedFiles = JSON.parse(savedFiles);
        setFiles(parsedFiles);
        const codeGs = parsedFiles.find((f: GasFile) => f.name === 'code.gs');
        if (codeGs) setEditorValue(codeGs.content);
      } catch (e) {
        setFiles(activeTemplate.files);
        setEditorValue(activeTemplate.files[0].content);
      }
    } else {
      setFiles(activeTemplate.files);
      setEditorValue(activeTemplate.files[0].content);
    }

    if (savedSheetData) {
      try {
        setSpreadsheetData(JSON.parse(savedSheetData));
      } catch (e) {
        setSpreadsheetData(activeTemplate.initialSpreadsheetData || []);
      }
    } else {
      setSpreadsheetData(activeTemplate.initialSpreadsheetData || []);
    }

    setSpreadsheetColumns(activeTemplate.spreadsheetColumns || []);
    setSelectedTemplateId(activeTemplate.id);
  }, []);

  // Sync editorValue when active file changes
  useEffect(() => {
    const currentFile = files.find(f => f.name === activeFileName);
    if (currentFile) {
      setEditorValue(currentFile.content);
    }
  }, [activeFileName, files]);

  // Save current files state to local storage
  const saveFilesToLocalStorage = (currentFiles: GasFile[]) => {
    localStorage.setItem('gas_files', JSON.stringify(currentFiles));
  };

  // Update active file content
  const handleEditorChange = (val: string) => {
    setEditorValue(val);
    const updated = files.map(f => {
      if (f.name === activeFileName) {
        return { ...f, content: val };
      }
      return f;
    });
    setFiles(updated);
    saveFilesToLocalStorage(updated);
  };

  // Apply template
  const applyTemplate = (template: Template) => {
    setSelectedTemplateId(template.id);
    setFiles(template.files);
    setSpreadsheetColumns(template.spreadsheetColumns || []);
    setSpreadsheetData(template.initialSpreadsheetData || []);
    setActiveFileName('code.gs');
    setEditorValue(template.files[0].content);
    localStorage.setItem('gas_template_id', template.id);
    localStorage.setItem('gas_files', JSON.stringify(template.files));
    localStorage.setItem('gas_sheet_data', JSON.stringify(template.initialSpreadsheetData || []));
    
    // Reset logs
    setLogs([`[Simulator] Template "${template.title}" dimuat.`, "[Simulator] Google Sheets virtual diatur ulang."]);
    
    // Reset simulator iframe if it exists
    if (iframeRef.current) {
      iframeRef.current.srcdoc = iframeRef.current.srcdoc;
    }
  };

  // Save changes button action
  const handleSaveBtn = () => {
    setSaveIndicator('saving');
    setTimeout(() => {
      setSaveIndicator('saved');
      setLogs(prev => [...prev, `[Sistem] File "${activeFileName}" berhasil disimpan.`]);
      setTimeout(() => setSaveIndicator('idle'), 2000);
    }, 800);
  };

  // Copy to clipboard action
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(editorValue);
    setCopyIndicator(true);
    setLogs(prev => [...prev, `[Salin] Kode dari "${activeFileName}" disalin ke clipboard.`]);
    setTimeout(() => setCopyIndicator(false), 2000);
  };

  // Download individual file
  const handleDownloadSingle = () => {
    const element = document.createElement("a");
    const fileBlob = new Blob([editorValue], {type: 'text/plain'});
    element.href = URL.createObjectURL(fileBlob);
    element.download = activeFileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setLogs(prev => [...prev, `[Unduh] File "${activeFileName}" berhasil diunduh.`]);
  };

  // Download all files as a list of text guides
  const handleDownloadAll = () => {
    files.forEach(f => {
      const element = document.createElement("a");
      const fileBlob = new Blob([f.content], {type: 'text/plain'});
      element.href = URL.createObjectURL(fileBlob);
      element.download = f.name;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
    setLogs(prev => [...prev, `[Unduh] Berhasil mengunduh semua file (${files.length} file).`]);
  };

  // Add new file inside virtual workspace
  const handleAddNewFile = () => {
    if (!newFileName.trim()) return;
    
    // Ensure clean extension
    let cleanName = newFileName.trim().replace(/\s+/g, '_');
    if (!cleanName.endsWith(`.${newFileType}`)) {
      cleanName = `${cleanName}.${newFileType}`;
    }

    if (files.some(f => f.name.toLowerCase() === cleanName.toLowerCase())) {
      alert("File dengan nama tersebut sudah ada!");
      return;
    }

    const newFileObj: GasFile = {
      name: cleanName,
      type: newFileType,
      content: newFileType === 'gs' 
        ? `function ${cleanName.replace('.gs', '')}() {\n  // Tulis fungsi Apps Script baru Anda di sini\n}` 
        : `<!DOCTYPE html>\n<html>\n  <head>\n    <base target="_top">\n  </head>\n  <body>\n    <h1>Halaman ${cleanName.replace('.html', '')}</h1>\n  </body>\n</html>`
    };

    const updated = [...files, newFileObj];
    setFiles(updated);
    setActiveFileName(cleanName);
    saveFilesToLocalStorage(updated);
    
    setNewFileName('');
    setShowAddModal(false);
    setLogs(prev => [...prev, `[Sistem] File baru "${cleanName}" ditambahkan.`]);
  };

  // Delete file inside virtual workspace
  const handleDeleteFile = (name: string) => {
    if (name === 'code.gs' || name === 'index.html') {
      alert("File inti 'code.gs' dan 'index.html' tidak boleh dihapus.");
      return;
    }
    if (confirm(`Apakah Anda yakin ingin menghapus file "${name}"?`)) {
      const updated = files.filter(f => f.name !== name);
      setFiles(updated);
      saveFilesToLocalStorage(updated);
      if (activeFileName === name) {
        setActiveFileName('code.gs');
      }
      setLogs(prev => [...prev, `[Sistem] File "${name}" telah dihapus.`]);
    }
  };

  // --- INTERACTIVE SIMULATOR COMMUNICATION ---
  // Listen to postMessage from the iframe simulator
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;

      if (data.type === 'GAS_RUN_REQ') {
        const { requestId, functionName, args } = data;
        setLogs(prev => [...prev, `[GAS Run] Memanggil fungsi: ${functionName}()`]);

        // Simulasikan logic Apps Script berdasarkan fungsi yang dipanggil
        setTimeout(() => {
          let result: any = null;
          let error: string | null = null;

          if (functionName === 'getActiveUserEmail') {
            result = "aminghermanto3@gmail.com";
          } else if (functionName === 'appendToSheet') {
            const formData = args[0] || {};
            const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
            
            const newRow: Record<string, any> = {};
            if (selectedTemplateId === 'form-sheets') {
              newRow['Waktu (Timestamp)'] = timestamp;
              newRow['Nama Lengkap'] = formData.nama || 'Anonim';
              newRow['Instansi'] = formData.instansi || '-';
              newRow['Tujuan Kunjungan'] = formData.tujuan || 'Konsultasi Teknis';
              newRow['Email Pengguna'] = 'aminghermanto3@gmail.com';
            } else if (selectedTemplateId === 'attendance-dashboard') {
              newRow['Waktu Absen'] = timestamp;
              newRow['Nama'] = formData.nama || 'Pegawai';
              newRow['Status Kehadiran'] = formData.status || 'Hadir';
            } else {
              newRow['Waktu'] = timestamp;
              newRow['Data'] = JSON.stringify(formData);
            }

            // Append row to virtual Spreadsheet
            const newSheetData = [newRow, ...spreadsheetData];
            setSpreadsheetData(newSheetData);
            localStorage.setItem('gas_sheet_data', JSON.stringify(newSheetData));

            result = `Pendaftaran Sukses! Data Anda berhasil dicatat di baris ke-${newSheetData.length + 1}`;
            setLogs(prev => [...prev, `[Spreadsheet] Baris baru ditambahkan oleh ${formData.nama || 'Pengguna'}.`]);
          } else if (functionName === 'getAttendanceData') {
            // Map our virtual spreadsheetData state to output format
            result = spreadsheetData.map(row => ({
              timestamp: row['Waktu Absen'] || row['Waktu (Timestamp)'] || '08:00',
              nama: row['Nama'] || row['Nama Lengkap'] || 'Tanpa Nama',
              status: row['Status Kehadiran'] || 'Hadir'
            }));
          } else if (functionName === 'submitPresence') {
            const nama = args[0];
            const status = args[1];
            const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

            const newRow = {
              'Waktu Absen': timestamp,
              'Nama': nama,
              'Status Kehadiran': status
            };

            const newSheetData = [newRow, ...spreadsheetData];
            setSpreadsheetData(newSheetData);
            localStorage.setItem('gas_sheet_data', JSON.stringify(newSheetData));

            result = { success: true, message: "Absen berhasil dicatat!" };
            setLogs(prev => [...prev, `[Spreadsheet] Absensi dicatat: ${nama} (${status})`]);
          } else if (functionName === 'autoReplyInbox') {
            // Simulated Gmail Auto-Responder logs row to spreadsheet
            const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
            const newRow = {
              'Waktu Pemicu': timestamp,
              'Email Pengirim': 'client@example.com',
              'Status Respons': 'Terkirim',
              'Pesan Pengirim': 'TanyaApp: Tanya cara pendaftaran'
            };
            const newSheetData = [newRow, ...spreadsheetData];
            setSpreadsheetData(newSheetData);
            localStorage.setItem('gas_sheet_data', JSON.stringify(newSheetData));
            result = true;
          } else {
            // Fallback default function simulation
            result = "Fungsi berhasil dieksekusi di Server Google (Simulasi)";
          }

          // Kirim respons balik ke iframe
          if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
              type: 'GAS_RUN_RES',
              requestId: requestId,
              result: result,
              error: error
            }, '*');
          }
        }, 500); // delay 500ms to simulate network latency beautifully!
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [spreadsheetData, selectedTemplateId]);

  // Inject proxy and active index.html into srcDoc
  const getIframeSrcDoc = () => {
    const indexHtmlFile = files.find(f => f.name === 'index.html');
    if (!indexHtmlFile) return '';

    // Standard script injector that creates google.script.run Proxy
    const proxyScript = `
      <script>
        (function() {
          let successCallback = null;
          let failureCallback = null;
          
          const functionRunner = new Proxy({}, {
            get(target, prop) {
              return function(...args) {
                const requestId = Math.random().toString(36).substring(2);
                window.parent.postMessage({
                  type: 'GAS_RUN_REQ',
                  requestId: requestId,
                  functionName: prop,
                  args: args
                }, '*');
                
                const currentSuccess = successCallback;
                const currentFailure = failureCallback;
                
                successCallback = null;
                failureCallback = null;
                
                const handler = function(event) {
                  if (event.data && event.data.type === 'GAS_RUN_RES' && event.data.requestId === requestId) {
                    window.removeEventListener('message', handler);
                    if (event.data.error) {
                      if (currentFailure) currentFailure(new Error(event.data.error));
                    } else {
                      if (currentSuccess) currentSuccess(event.data.result);
                    }
                  }
                };
                window.addEventListener('message', handler);
              };
            }
          });

          window.google = {
            script: {
              run: new Proxy({}, {
                get(target, prop) {
                  if (prop === 'withSuccessHandler') {
                    return function(callback) {
                      successCallback = callback;
                      return window.google.script.run;
                    };
                  }
                  if (prop === 'withFailureHandler') {
                    return function(callback) {
                      failureCallback = callback;
                      return window.google.script.run;
                    };
                  }
                  return functionRunner[prop];
                }
              })
            }
          };
        })();
      </script>
    `;

    // Inject our custom script tag right after <head> or at the top of <html>
    const originalHtml = indexHtmlFile.content;
    let injectedHtml = originalHtml;
    
    if (originalHtml.includes('<head>')) {
      injectedHtml = originalHtml.replace('<head>', `<head>${proxyScript}`);
    } else {
      injectedHtml = proxyScript + originalHtml;
    }

    return injectedHtml;
  };

  // Deployment Steps list
  const deploySteps = [
    {
      title: "Buka Google Apps Script Console",
      desc: "Kunjungi script.google.com dengan Akun Google Anda dan buat Project Baru.",
      action: "https://script.google.com"
    },
    {
      title: "Salin Kode Utama (code.gs)",
      desc: "Hapus seluruh kode bawaan di file 'Kode.gs' Apps Script, lalu salin seluruh isi file 'code.gs' dari tab editor sebelah kiri.",
    },
    {
      title: "Buat File HTML 'index'",
      desc: "Klik tanda tambah (+) di panel kiri Apps Script, pilih 'HTML', beri nama file tersebut 'index' (case-sensitive, tanpa menulis ekstensi .html).",
    },
    {
      title: "Salin Tampilan (index.html)",
      desc: "Hapus seluruh kode default di file 'index.html' Apps Script baru tersebut, lalu salin dan tempel seluruh isi file 'index.html' dari editor ini.",
    },
    {
      title: "Simpan & Terapkan Deployment Baru",
      desc: "Klik ikon Simpan (disket) di atas. Klik 'Terapkan' (Deploy) -> 'Deployment baru'. Pilih jenis gerigi konfigurasi 'Aplikasi Web' (Web App).",
    },
    {
      title: "Atur Hak Akses Publik",
      desc: "Setel konfigurasi: Jalankan sebagai 'Saya' (Me), dan Siapa yang memiliki akses ke: 'Siapa saja' (Anyone). Klik tombol Terapkan.",
    },
    {
      title: "Beri Izin Akses Akun",
      desc: "Klik 'Izinkan Akses' (Authorize Access), pilih akun Google Anda, klik 'Advanced' -> 'Go to Untitled Project (unsafe)', lalu klik 'Allow'. Salin URL Aplikasi Web Anda!",
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d0e12] text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white" id="main_app_layout">
      
      {/* ==========================================
          HEADER UTAMA
          ========================================== */}
      <header className="border-b border-slate-800 bg-[#12131a] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm z-10" id="header_section">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/30">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg tracking-tight text-white">Google Apps Script</h1>
              <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/20">
                Workspace Organizer
              </span>
            </div>
            <p className="text-xs text-slate-400">Kelola, Edit & Simulasikan File template code.gs & index.html</p>
          </div>
        </div>

        {/* Action button bar */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button 
            onClick={handleDownloadAll}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-sm font-semibold rounded-xl transition-all border border-slate-700/60"
            title="Unduh Semua file"
            id="btn_download_all"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Semua</span>
          </button>
          
          <a 
            href="https://script.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-blue-950/40"
            id="btn_open_gas"
          >
            <span>Buka Google Script</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* ==========================================
          WORKSPACE LAYOUT
          ========================================== */}
      <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-5 p-5 bg-[#090a0f] overflow-x-hidden" id="workspace_main">
        
        {/* PANEL KIRI (Files, Templates, Guide) - xl:col-span-3 */}
        <section className="xl:col-span-3 flex flex-col bg-[#12131a] rounded-2xl border border-slate-800/80 shadow-md overflow-hidden h-[calc(100vh-140px)] min-h-[500px]" id="left_panel">
          {/* Navigation Tab */}
          <div className="flex border-b border-slate-800 bg-[#15161f] p-1 gap-1">
            <button
              onClick={() => setSidebarTab('files')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
                sidebarTab === 'files' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              id="tab_sidebar_files"
            >
              <Folder className="w-3.5 h-3.5" />
              <span>File Saya</span>
            </button>
            <button
              onClick={() => setSidebarTab('templates')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
                sidebarTab === 'templates' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              id="tab_sidebar_templates"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Template</span>
            </button>
            <button
              onClick={() => setSidebarTab('guide')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
                sidebarTab === 'guide' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              id="tab_sidebar_guide"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Panduan</span>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4" id="left_panel_content">
            <AnimatePresence mode="wait">
              {/* TAB 1: FILE SAYA */}
              {sidebarTab === 'files' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4 h-full flex flex-col"
                  key="files-tab"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Folder: google.apps.script
                    </span>
                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-400 transition-colors"
                      title="Tambah File Baru"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Files List */}
                  <div className="space-y-1 flex-1 overflow-y-auto">
                    {files.map((file) => {
                      const isSelected = activeFileName === file.name;
                      return (
                        <div
                          key={file.name}
                          onClick={() => setActiveFileName(file.name)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer group transition-all duration-150 ${
                            isSelected 
                              ? 'bg-blue-600/15 border border-blue-500/30 text-blue-300' 
                              : 'hover:bg-slate-800/40 border border-transparent text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 truncate">
                            {file.type === 'gs' ? (
                              <FileCode className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-amber-500'}`} />
                            ) : (
                              <Globe className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-blue-500'}`} />
                            )}
                            <span className="text-sm font-medium truncate">{file.name}</span>
                          </div>

                          {/* Delete button (only show on custom files) */}
                          {file.name !== 'code.gs' && file.name !== 'index.html' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFile(file.name);
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 rounded-md transition-all"
                              title="Hapus file"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Local Storage Indicator Banner */}
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Perubahan yang Anda ketik disimpan secara otomatis di memori lokal peramban.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: TEMPLATE LIBRARY */}
              {sidebarTab === 'templates' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                  key="templates-tab"
                >
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Template Berfungsi Penuh
                  </p>

                  <div className="space-y-3">
                    {TEMPLATES.map((tmpl) => {
                      const isActive = selectedTemplateId === tmpl.id;
                      return (
                        <div
                          key={tmpl.id}
                          onClick={() => applyTemplate(tmpl)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isActive 
                              ? 'bg-blue-600/10 border-blue-500/50 hover:border-blue-500' 
                              : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/40 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              {tmpl.icon}
                              <h4 className="text-sm font-semibold text-slate-200">{tmpl.title}</h4>
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                              {tmpl.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {tmpl.description}
                          </p>
                          {isActive && (
                            <div className="mt-3 flex items-center justify-end text-[11px] text-blue-400 font-medium">
                              <span className="bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">Sedang Aktif</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: PANDUAN DEPLOY */}
              {sidebarTab === 'guide' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-3"
                  key="guide-tab"
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Langkah Deployment Web App
                    </span>
                    <span className="text-xs font-bold text-amber-400">
                      Step {activeStep + 1}/7
                    </span>
                  </div>

                  {/* Interactive Steps Accordion */}
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {deploySteps.map((step, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          activeStep === idx 
                            ? 'bg-amber-500/10 border-amber-500/40' 
                            : 'bg-slate-900/20 border-slate-800/80 hover:bg-slate-800/20'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 mb-1">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            activeStep === idx ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {idx + 1}
                          </div>
                          <h4 className="text-xs font-bold text-slate-200">{step.title}</h4>
                        </div>
                        {activeStep === idx && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-[11px] text-slate-400 leading-relaxed pl-7 mt-1.5"
                          >
                            {step.desc}
                            {step.action && (
                              <a 
                                href={step.action} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="inline-flex items-center gap-1 text-blue-400 hover:underline mt-2 font-semibold block"
                              >
                                Buka Link Resmi <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </motion.p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 gap-2">
                    <button
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep(prev => prev - 1)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-semibold rounded-lg text-slate-300 transition-all"
                    >
                      Sebelumnya
                    </button>
                    <button
                      disabled={activeStep === deploySteps.length - 1}
                      onClick={() => setActiveStep(prev => prev + 1)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-xs font-bold rounded-lg transition-all"
                    >
                      Lanjut
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* PANEL TENGAH (Interactive Code Editor) - xl:col-span-5 */}
        <section className="xl:col-span-5 flex flex-col bg-[#12131a] rounded-2xl border border-slate-800/80 shadow-md overflow-hidden h-[calc(100vh-140px)] min-h-[500px]" id="editor_panel">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#15161f]" id="editor_header">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                {activeFileName}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleSaveBtn}
                disabled={saveIndicator === 'saving'}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-semibold rounded-lg text-slate-200 transition-all border border-slate-700 flex items-center gap-1"
                title="Simpan file"
                id="btn_save_file"
              >
                {saveIndicator === 'saving' ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                    <span className="text-[10px]">Menyimpan...</span>
                  </>
                ) : saveIndicator === 'saved' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] text-emerald-400">Tersimpan</span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px]">Simpan File</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyToClipboard}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
                title="Salin Kode"
                id="btn_copy_code"
              >
                {copyIndicator ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                onClick={handleDownloadSingle}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
                title="Unduh File Ini"
                id="btn_download_file"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Code Textarea with line numbers */}
          <div className="flex-1 flex overflow-hidden bg-[#181923] relative font-mono text-sm" id="editor_body">
            
            {/* Custom Line Numbers Column */}
            <div className="bg-[#14151e] text-slate-600 px-3.5 py-4 text-right select-none border-r border-slate-800 flex flex-col items-end min-w-[42px] font-mono leading-6">
              {editorValue.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Main Interactive TextArea */}
            <textarea
              value={editorValue}
              onChange={(e) => handleEditorChange(e.target.value)}
              spellCheck={false}
              className="flex-1 bg-transparent text-slate-200 p-4 font-mono text-xs leading-6 resize-none focus:outline-none overflow-y-auto whitespace-pre code-editor"
              id="code_textarea_editor"
              placeholder="// Tulis kode Apps Script di sini"
            />
          </div>

          {/* Quick instructions indicator */}
          <div className="px-4 py-2 bg-[#12131a] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Baris: {editorValue.split('\n').length} | Karakter: {editorValue.length}</span>
            <span className="text-blue-400/70">Mendukung JavaScript & HTML</span>
          </div>
        </section>

        {/* PANEL KANAN (Spreadsheet + Web App Simulator) - xl:col-span-4 */}
        <section className="xl:col-span-4 flex flex-col gap-5 h-[calc(100vh-140px)] min-h-[500px]" id="right_panel_section">
          
          {/* PANEL KANAN ATAS: LIVE WEB APP SIMULATOR */}
          <div className="flex-1 flex flex-col bg-[#12131a] rounded-2xl border border-slate-800/80 shadow-md overflow-hidden" id="simulator_container">
            {/* Simulator Title bar */}
            <div className="px-4 py-2.5 border-b border-slate-800 bg-[#15161f] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Simulasi Live Web App</span>
              </div>
              <button 
                onClick={() => {
                  if (iframeRef.current) {
                    // Quick iframe reload
                    iframeRef.current.srcdoc = getIframeSrcDoc();
                    setLogs(prev => [...prev, "[Simulator] Memuat ulang tampilan Web App."]);
                  }
                }}
                className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
                title="Segarkan Simulator"
                id="btn_refresh_simulator"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Interactive Sandbox Simulator Frame */}
            <div className="flex-1 bg-[#f8f9fa] border-b border-slate-800 relative flex items-center justify-center p-0" id="iframe_wrapper">
              <iframe
                ref={iframeRef}
                title="GAS Web App Preview"
                srcDoc={getIframeSrcDoc()}
                className="w-full h-full bg-transparent border-none"
                sandbox="allow-scripts allow-modals allow-same-origin allow-forms"
              />
            </div>
            
            {/* Live simulator logger status line */}
            <div className="bg-[#111218] p-3 text-xs font-mono border-t border-slate-800/80 h-28 overflow-y-auto space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Konsol Logger Real-Time:</div>
              {logs.slice(-5).map((log, index) => (
                <div key={index} className="text-slate-400 flex items-start gap-1">
                  <span className="text-slate-600 font-bold shrink-0">&gt;</span>
                  <span className="leading-normal">{log}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PANEL KANAN BAWAH: VIRTUAL GOOGLE SHEETS */}
          <div className="h-[220px] bg-[#12131a] rounded-2xl border border-slate-800/80 shadow-md overflow-hidden flex flex-col" id="spreadsheet_container">
            <div className="px-4 py-2.5 border-b border-slate-800 bg-[#15161f] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Simulasi Google Sheet</span>
              </div>
              <button 
                onClick={() => {
                  const tmpl = TEMPLATES.find(t => t.id === selectedTemplateId);
                  if (tmpl) {
                    setSpreadsheetData(tmpl.initialSpreadsheetData || []);
                    localStorage.setItem('gas_sheet_data', JSON.stringify(tmpl.initialSpreadsheetData || []));
                    setLogs(prev => [...prev, "[Spreadsheet] Simulasi Sheet diatur ulang ke bawaan."]);
                  }
                }}
                className="text-[10px] font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                title="Reset Database"
              >
                Reset Sheet
              </button>
            </div>

            {/* Virtual Spreadsheet Table */}
            <div className="flex-1 overflow-auto bg-[#161722]" id="spreadsheet_table_wrapper">
              {spreadsheetData.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                  <Database className="w-8 h-8 text-slate-700 mb-2" />
                  <p className="text-xs text-slate-500 font-medium">Belum ada baris data.</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">Kirim data dari formulir di atas untuk mengisi baris spreadsheet ini.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#13141d] border-b border-slate-800 sticky top-0">
                      {spreadsheetColumns.map((col) => (
                        <th key={col} className="py-2.5 px-3 font-semibold text-slate-400 border-r border-slate-800 uppercase tracking-wider text-[10px]">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {spreadsheetData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                        {spreadsheetColumns.map((col) => (
                          <td key={col} className="py-2 px-3 text-slate-300 truncate max-w-[150px] font-mono text-[11px] border-r border-slate-800/40">
                            {row[col] !== undefined ? String(row[col]) : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            {/* Spreadsheet footer */}
            <div className="bg-[#13141f] border-t border-slate-800 p-2 text-center text-[10px] text-slate-500 font-mono">
              Total Baris: {spreadsheetData.length} | Terikat ke Project Script Aktif
            </div>
          </div>

        </section>

      </main>

      {/* ==========================================
          MODAL: ADD NEW FILE
          ========================================== */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="modal_add_file_overlay">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#12131a] rounded-2xl border border-slate-800 p-6 w-full max-w-sm shadow-2xl"
          >
            <h3 className="text-md font-bold text-white mb-4">Buat File Baru</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5">Nama File</label>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="Misal: utils, style, service"
                  className="w-full bg-[#181923] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5">Jenis File</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewFileType('gs')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                      newFileType === 'gs'
                        ? 'bg-amber-500/10 border-amber-500/50 text-amber-400'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Google Script (.gs)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewFileType('html')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                      newFileType === 'html'
                        ? 'bg-blue-500/10 border-blue-500/50 text-blue-400'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    HTML (.html)
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-400 transition-all"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleAddNewFile}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-blue-950/40"
                >
                  Tambah File
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
