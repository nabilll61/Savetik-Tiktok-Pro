import { Heart, ArrowLeft, MessageSquare, ExternalLink, Coffee, ShoppingBag } from 'lucide-react';
import donationBanner from '../assets/donation_banner.jpg';

interface DonationSectionProps {
  onBack: () => void;
}

export default function DonationSection({ onBack }: DonationSectionProps) {
  
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

        {/* DONATION BANNER IMAGE */}
        <div className="mb-8 max-w-lg mx-auto border-[3px] border-neo-border rounded-[15px] overflow-hidden shadow-[5px_5px_0px_0px_#E11D48]">
          <img 
            src={donationBanner} 
            alt="Donation Banner" 
            referrerPolicy="no-referrer"
            className="w-full h-auto grayscale dark:grayscale-0 contrast-125 dark:contrast-100"
          />
        </div>

        {/* EXTERNAL ACTION LINKS (CONTACT / WEBSITE) */}
        <div className="space-y-4 max-w-lg mx-auto">
          
          {/* Contact Owner Link */}
          <a
            href="https://wa.me/628888573485"
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
            href="https://download.amane-acel.web.id/shop"
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
