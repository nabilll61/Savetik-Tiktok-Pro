import React, { useRef, useEffect, useState } from 'react';
import { Heart, ArrowLeft, MessageSquare, ExternalLink, ShoppingBag, Download, AlertCircle } from 'lucide-react';

const donationBanner = "/src/assets/donation_banner.jpg";

interface DonationSectionProps {
  onBack: () => void;
  showToast?: (message: string, type: 'success' | 'warning' | 'error') => void;
}

export default function DonationSection({ onBack, showToast }: DonationSectionProps) {
  const timerRef = useRef<any>(null);
  const isLongPressActive = useRef(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const triggerDownload = async () => {
    if (imageError) {
      if (showToast) {
        showToast('Gambar QR Code tidak tersedia. Silakan gunakan link kontak di bawah.', 'warning');
      }
      return;
    }

    if (showToast) {
      showToast('Mengunduh gambar QR Code Donasi...', 'success');
    }
    
    try {
      // Fetch the image file and convert to blob to ensure it downloads as binary, even inside an iframe
      const response = await fetch(donationBanner);
      if (!response.ok) throw new Error('File not found');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'savetik_donation_qr.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Revoke the object URL to release memory
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (err) {
      console.error('Error downloading image:', err);
      if (showToast) {
        showToast('Gagal mengunduh otomatis, silakan hubungi owner di bawah.', 'warning');
      }
    }
  };

  const handlePressStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (imageError) return;
    
    isLongPressActive.current = false;
    timerRef.current = setTimeout(() => {
      isLongPressActive.current = true;
      triggerDownload();
    }, 600); // 600ms long-press threshold
  };

  const handlePressEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (isLongPressActive.current) {
      e.preventDefault();
    }
  };

  const handlePressLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleSaveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerDownload();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8" id="donation-section">
      
      {/* Back to main menu button (top) */}
      <div className="mb-6 flex justify-start">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-neo-card hover:bg-neo-bg-sec text-neo-text font-heading font-black text-xs md:text-sm uppercase tracking-wider border-[3px] border-neo-border shadow-[3px_3px_0px_0px_var(--neo-border)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_var(--neo-border)] transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={14} className="stroke-[3]" />
          MENU UTAMA
        </button>
      </div>

      {/* SUPPORT / DONASI SECTION */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="text-[#E11D48] fill-[#E11D48] stroke-[3]" size={28} />
          <h2 className="font-heading font-black text-2xl md:text-4xl uppercase tracking-tight text-neo-text">
            SUPPORT / DONASI
          </h2>
        </div>

        <p className="text-xs md:text-sm font-semibold text-neo-text opacity-70 leading-relaxed mb-8">
          SaveTik Downloader gratis dan gak pakai iklan. Kalau layanan ini bermanfaat, dukungan kamu bantu banget buat biaya server & pengembangan fitur baru.
        </p>

        {/* DONATION BANNER IMAGE & ACTIONS CONTAINER */}
        <div className="mb-8 max-w-[280px] sm:max-w-[320px] mx-auto flex flex-col gap-3">
          <div 
            className="relative border-[3px] border-neo-border rounded-[15px] overflow-hidden shadow-[5px_5px_0px_0px_#E11D48] bg-neo-card select-none active:scale-[0.98] transition-transform"
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressLeave}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            title={imageError ? "QR Code belum diunggah" : "Tekan lama untuk mengunduh"}
          >
            {!imageError ? (
              <>
                <img 
                  src={donationBanner} 
                  alt="Donation Banner" 
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-auto pointer-events-auto block"
                />
                {/* Long Press Help Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-black/75 py-1.5 text-center text-[10px] text-white font-mono font-bold opacity-0 hover:opacity-100 transition-opacity">
                  TEKAN LAMA UNTUK UNDUH
                </div>
              </>
            ) : (
              <div className="p-6 text-center space-y-3 min-h-[220px] flex flex-col justify-center items-center bg-[#FEF2F2] dark:bg-[#451A1A]">
                <AlertCircle className="text-[#E11D48] animate-bounce" size={40} />
                <h4 className="font-heading font-black text-sm text-[#991B1B] dark:text-[#FCA5A5] uppercase">
                  QR CODE BELUM AKTIF
                </h4>
                <p className="text-[11px] font-semibold text-[#7F1D1D] dark:text-[#FECACA] opacity-90 leading-relaxed">
                  Gambar QR Code donasi belum diupload ke server. Tenang! Kamu bisa donasi langsung lewat tombol kontak di bawah.
                </p>
              </div>
            )}
          </div>

          {/* SIMPAN GAMBAR BUTTON */}
          <button
            onClick={handleSaveImage}
            disabled={imageError}
            className={`w-full py-3 font-heading font-black text-xs md:text-sm uppercase tracking-wider border-[3px] border-neo-border rounded-[8px] transition-all flex items-center justify-center gap-2 select-none ${
              imageError 
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed border-dashed opacity-50' 
                : 'bg-[#10B981] hover:bg-[#059669] text-white shadow-[4px_4px_0px_0px_var(--neo-border)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_var(--neo-border)] cursor-pointer'
            }`}
          >
            <Download size={16} className="stroke-[3]" />
            SIMPAN GAMBAR
          </button>
        </div>

        {/* EXTERNAL ACTION LINKS (CONTACT / WEBSITE) */}
        <div className="space-y-4 max-w-lg mx-auto">
          
          {/* Contact Owner Link */}
          <a
            href="https://wa.me/6289677157146"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-neo-card hover:bg-neo-bg-sec text-neo-text font-heading font-black text-xs md:text-sm uppercase tracking-wider border-[3px] border-neo-border shadow-[4px_4px_0px_0px_var(--neo-border)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_var(--neo-border)] transition-all flex items-center justify-between px-5 cursor-pointer rounded-[8px]"
          >
            <span className="flex items-center gap-2">
              <MessageSquare size={16} className="text-[#10B981] stroke-[3]" />
              CONTACT OWNER
            </span>
            <ExternalLink size={14} className="stroke-[3] text-neo-text opacity-50" />
          </a>

          {/* Website Buy Otomatis Link */}
          <a
            href="https://nabil-official.web.id"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-neo-card hover:bg-neo-bg-sec text-neo-text font-heading font-black text-xs md:text-sm uppercase tracking-wider border-[3px] border-neo-border shadow-[4px_4px_0px_0px_var(--neo-border)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_var(--neo-border)] transition-all flex items-center justify-between px-5 cursor-pointer rounded-[8px]"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag size={16} className="text-[#6366F1] stroke-[3]" />
              WEBSITE BUY OTOMATIS
            </span>
            <ExternalLink size={14} className="stroke-[3] text-neo-text opacity-50" />
          </a>

        </div>

      </section>

      {/* Huge Back Button at bottom */}
      <div className="mt-12">
        <button
          onClick={onBack}
          className="w-full py-4 bg-neo-border hover:opacity-90 text-neo-bg font-heading font-black text-sm md:text-base uppercase tracking-wider border-[3px] border-neo-border shadow-[4px_4px_0px_0px_#F97316] hover:shadow-[2px_2px_0px_0px_#F97316] transition-all cursor-pointer text-center rounded-[8px]"
        >
          ← KEMBALI KE MENU UTAMA
        </button>
      </div>

    </div>
  );
}
