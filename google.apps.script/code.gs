/**
 * PT. ADI LOGAM PRATAMA - Google Apps Script Web App Server-Side Code
 * 
 * Petunjuk Instalasi:
 * 1. Buka Google Drive, buat "Google Apps Script" baru.
 * 2. Hapus semua kode default di Code.gs, lalu paste kode ini.
 * 3. Buat file baru berformat HTML dengan nama "index.html" (tanpa ekstensi .html). Paste kode index.html di file tersebut.
 * 4. Klik tombol "Deploy" (Terapkan) -> "New deployment" (Penerapan baru).
 * 5. Pilih jenis deployment: "Web app" (Aplikasi web).
 * 6. Atur: 
 *    - Execute as: "Me" (Saya / pemilik email).
 *    - Who has access: "Anyone" (Siapa saja, termasuk anonim).
 * 7. Klik "Deploy" dan salin link URL aplikasi web yang dihasilkan.
 */

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('PT. ADI LOGAM PRATAMA - Company Profile')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Menerima data pengiriman formulir kustom dari halaman klien.
 * Fungsi ini mengotomatiskan penyimpanan data ke Google Sheet atau mengirim email notifikasi.
 * 
 * @param {Object} data - Objek penawaran yang dikirim dari browser klien.
 * @return {Object} Status respon sukses/gagal.
 */
function submitQuotation(data) {
  try {
    // 1. CATAT KE GOOGLE SHEETS
    // Membuka spreadsheet aktif atau membuat baru jika belum ada
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet;
    if (doc) {
      sheet = doc.getSheets()[0];
    } else {
      var newDoc = SpreadsheetApp.create("Database_Penawaran_PT_ALP");
      sheet = newDoc.getSheets()[0];
      sheet.appendRow(["Tanggal", "Nama Pelanggan", "Perusahaan", "WhatsApp", "Email", "Jumlah (Pcs)", "Lampiran File", "Spesifikasi Tambahan"]);
    }
    var attachments = [];
    var customFileLink = "-";

    if (data.fileData && data.fileName) {
      try {
        var base64Part = data.fileData.split(',')[1] || data.fileData;
        var fileBlob = Utilities.newBlob(Utilities.base64Decode(base64Part), data.fileType || 'application/octet-stream', data.fileName);
        attachments.push(fileBlob);
        
        // Coba simpan ke Google Drive agar admin punya cadangan link
        try {
          var file = DriveApp.createFile(fileBlob);
          customFileLink = file.getUrl();
        } catch (driveError) {
          customFileLink = "Lampiran Terlampir di Email (Gagal backup Drive)";
        }
      } catch (fileError) {
        customFileLink = "Gagal memproses file: " + fileError.toString();
      }
    }
    
    sheet.appendRow([
      new Date(),
      data.name,
      data.company,
      "'" + data.phone, // Menjaga format teks nomor telepon
      data.email,
      data.quantity,
      customFileLink,
      data.notes || "-"
    ]);

    // 2. KIRIM NOTIFIKASI EMAIL KE ADMIN DENGAN LAMPIRAN FISIK
    var emailOptions = {
      to: "adilogampratama@yahoo.com", // Diarahkan langsung ke adilogampratama@yahoo.com
      subject: "PENAWARAN BARU: " + data.company + " - " + data.name,
      body: "Halo Tim Admin PT. ALP,\n\nAda permintaan penawaran baru masuk dari aplikasi web:\n\n" +
            "Nama: " + data.name + "\n" +
            "Perusahaan: " + data.company + "\n" +
            "WhatsApp: " + data.phone + "\n" +
            "Email: " + data.email + "\n" +
            "Jumlah Kebutuhan: " + data.quantity + " Pcs\n" +
            "File Lampiran: " + (uploadedFileName(data) || "-") + "\n" +
            "Link File di Drive (Cadangan): " + customFileLink + "\n" +
            "Spesifikasi Tambahan:\n" + (data.notes || "-") + "\n\n" +
            "Harap segera ditindaklanjuti.\n\nSalam,\nSistem Web PT. ALP"
    };

    if (attachments.length > 0) {
      emailOptions.attachments = attachments;
    }

    MailApp.sendEmail(emailOptions);

    return {
      success: true,
      message: "Permintaan penawaran dari " + data.name + " (" + data.company + ") berhasil direkam di server Google Apps Script!"
    };
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Helper function to return file name
function uploadedFileName(data) {
  return data.fileName || "";
}
