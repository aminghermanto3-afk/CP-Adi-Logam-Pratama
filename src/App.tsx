import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const waNumber = "62881024813342";
    const email = "aminghermanto3@gmail.com";
    
    if (!document.getElementById('wa-float-final')) {
      const wa = document.createElement('a');
      wa.id = 'wa-float-final';
      wa.href = `https://wa.me/${waNumber}?text=Halo%20SISTEMIKA%20DIGITAL%20-%20Mau%20Konsultasi`;
      wa.target = '_blank';
      wa.innerHTML = '💬';
      wa.style.cssText = 'position:fixed;bottom:28px;right:28px;z-index:9999999;background:#25D366;width:62px;height:62px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(0,0,0,0.35);text-decoration:none;font-size:32px;';
      document.body.appendChild(wa);
    }
    if (!document.getElementById('email-bar-final')) {
      const div = document.createElement('div');
      div.id = 'email-bar-final';
      div.innerHTML = `<a href="mailto:${email}" style="color:#00D1FF;text-decoration:none;font-weight:700;font-size:13px;">📧 ${email}</a> <span style="color:#475569;margin:0 8px;">|</span> <a href="https://wa.me/${waNumber}" target="_blank" style="color:#25D366;text-decoration:none;font-weight:700;font-size:13px;">💬 WA</a>`;
      div.style.cssText = 'position:fixed;bottom:28px;left:28px;z-index:9999999;background:#0A1931;border:1px solid #00D1FF;padding:11px 16px;border-radius:28px;box-shadow:0 6px 20px rgba(0,0,0,0.35);font-family:Arial,sans-serif;';
      document.body.appendChild(div);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-8 h-8 bg-slate-900 text-white rounded flex items-center justify-center">S</div>
            SISTEMIKA DIGITAL
          </div>
          <a href="https://wa.me/62881024813342?text=Halo%20SISTEMIKA%20DIGITAL" target="_blank" className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm">Hubungi Kami</a>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-cyan-400 text-sm tracking-widest mb-3">FOUNDER & STRATEGIST</p>
          <h1 className="text-5xl font-bold leading-tight mb-4">A Hermanto<br/>Founder • SISTEMIKA DIGITAL</h1>
          <p className="text-slate-400 mb-6">Pengabdian 18 tahun untuk bisnis yang lebih terarah, terintegrasi, adaptif, dan berkelanjutan di era digital.</p>
          <div className="flex gap-3 flex-wrap">
            <a href="https://wa.me/62881024813342?text=Halo%20Pak%20Aming" target="_blank" className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold">Konsultasi Gratis</a>
            <a href="mailto:aminghermanto3@gmail.com" className="border border-slate-700 px-6 py-3 rounded-full">📧 aminghermanto3@gmail.com</a>
          </div>
          <div className="mt-8 p-4 bg-slate-900 rounded-xl border border-slate-800">
            <p className="text-xs text-slate-500">CONTACT</p>
            <p className="text-sm">Email: aminghermanto3@gmail.com</p>
            <p className="text-sm">WA Smartfren API: 0881-02481-3342 (wa.me)</p>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600" alt="A Hermanto" className="rounded-2xl w-full object-cover" />
          <div className="absolute -bottom-4 -left-4 bg-white text-slate-900 p-4 rounded-xl shadow-xl">
            <p className="font-bold">18+ Tahun</p>
            <p className="text-xs">Pengalaman ERP & Sistem</p>
          </div>
        </div>
      </section>

      <section className="bg-white text-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Siap Scale Up Bisnis Bos?</h2>
          <p className="text-slate-600 mb-6">Hubungi langsung via WA Smartfren API yang sudah terintegrasi</p>
          <a href="https://wa.me/62881024813342?text=Halo%20SISTEMIKA%20DIGITAL%20Mau%20Konsultasi%20ERP" target="_blank" className="inline-flex bg-[#25D366] text-white px-8 py-3 rounded-full font-bold text-lg">💬 Chat WA Sekarang</a>
        </div>
      </section>
    </div>
  );
}
