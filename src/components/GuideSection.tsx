import { BookOpen, HelpCircle, ArrowLeft } from 'lucide-react';

interface GuideSectionProps {
  onBack: () => void;
}

export default function GuideSection({ onBack }: GuideSectionProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
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

      {/* CARA PENGGUNAAN SECTION */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="text-[#6366F1] stroke-[3]" size={28} />
          <h2 className="font-heading font-black text-2xl md:text-4xl uppercase tracking-tight text-neo-text">
            CARA PENGGUNAAN
          </h2>
        </div>
        <p className="font-mono text-xs md:text-sm font-black text-neo-text opacity-60 uppercase tracking-wider mb-8">
          3 LANGKAH DOANG, GAK RIBET 🚀
        </p>

        {/* 3 Steps Cards */}
        <div className="space-y-6">
          
          {/* Step 1 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#F97316] flex gap-4 items-start transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FCD34D] border-[3px] border-neo-border rounded-md flex items-center justify-center font-heading font-black text-lg md:text-xl shrink-0 text-black">
              1
            </div>
            <div>
              <h3 className="font-heading font-black text-sm md:text-base uppercase tracking-wide text-neo-text mb-1 flex items-center gap-1.5">
                📋 SALIN LINK
              </h3>
              <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
                Copy link video/audio dari TikTok, YouTube, Instagram, Douyin, Pinterest, CapCut, atau Spotify.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#F97316] flex gap-4 items-start transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FCD34D] border-[3px] border-neo-border rounded-md flex items-center justify-center font-heading font-black text-lg md:text-xl shrink-0 text-black">
              2
            </div>
            <div>
              <h3 className="font-heading font-black text-sm md:text-base uppercase tracking-wide text-neo-text mb-1 flex items-center gap-1.5">
                📥 TEMPEL & PROSES
              </h3>
              <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
                Paste ke kolom input di halaman utama, lalu pencet tombol <span className="text-[#6366F1] font-black">"EKSTRAK VIDEO"</span> untuk proses analisis secara otomatis.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#F97316] flex gap-4 items-start transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FCD34D] border-[3px] border-neo-border rounded-md flex items-center justify-center font-heading font-black text-lg md:text-xl shrink-0 text-black">
              3
            </div>
            <div>
              <h3 className="font-heading font-black text-sm md:text-base uppercase tracking-wide text-neo-text mb-1 flex items-center gap-1.5">
                ✅ UNDUH MEDIA
              </h3>
              <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
                Tunggu sebentar, pratinjau bakal langsung muncul di bawah kolom input. Tinggal pilih format kualitas terbaik lalu klik tombol unduh.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* TANYA JAWAB LANGSUNG SECTION */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="text-[#E11D48] stroke-[3]" size={28} />
          <h2 className="font-heading font-black text-xl md:text-3xl uppercase tracking-tight text-neo-text">
            TANYA JAWAB LANGSUNG
          </h2>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-5">
          
          {/* FAQ 1 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#F97316] transition-colors">
            <h4 className="font-heading font-black text-sm md:text-base text-[#D97706] mb-2">
              ❓ Ini beneran gratis?
            </h4>
            <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
              📢 Jawab: Iya, 100% gratis, tanpa iklan, tanpa langganan harian. Layanan download video YouTube dan TikTok kami aktif sepenuhnya dan bebas kuota harian.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#F97316] transition-colors">
            <h4 className="font-heading font-black text-sm md:text-base text-[#D97706] mb-2">
              ❓ Kenapa link-nya gagal diproses?
            </h4>
            <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
              📢 Jawab: Biasanya karena akunnya private, link-nya udah dihapus, atau ada typo pas copy-paste. Coba buka link-nya dulu di browser, kalau bisa dibuka publik, harusnya jalan.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#F97316] transition-colors">
            <h4 className="font-heading font-black text-sm md:text-base text-[#D97706] mb-2">
              ❓ Hasil downloadnya ada watermark gak?
            </h4>
            <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
              📢 Jawab: Enggak, semua platform yang didukung diambil tanpa watermark, kecuali kalau upstream-nya emang lagi kena rate-limit dan fallback ke sumber lain.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#F97316] transition-colors">
            <h4 className="font-heading font-black text-sm md:text-base text-[#D97706] mb-2">
              ❓ Bisa dipasang kayak aplikasi di HP?
            </h4>
            <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
              📢 Jawab: Bisa! Buka menu ☰ di pojok kanan atas, cari opsi "Pasang Aplikasi" (kalau browser kamu support PWA).
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#F97316] transition-colors">
            <h4 className="font-heading font-black text-sm md:text-base text-[#D97706] mb-2">
              ❓ Kualitas video maksimal berapa?
            </h4>
            <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
              📢 Jawab: Buat YouTube bisa sampai 1080p Full HD. Platform lain otomatis ngambil kualitas terbaik yang tersedia dari sumbernya.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#F97316] transition-colors">
            <h4 className="font-heading font-black text-sm md:text-base text-[#D97706] mb-2">
              ❓ Apakah bisa download YouTube ke MP3 (Audio saja)?
            </h4>
            <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
              📢 Jawab: Tentu saja! Setelah kamu memasukkan link YouTube, nanti bakal muncul pilihan buat download format video (MP4) atau cuma audionya aja (MP3/M4A) dengan kualitas tinggi.
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#F97316] transition-colors">
            <h4 className="font-heading font-black text-sm md:text-base text-[#D97706] mb-2">
              ❓ Apakah bisa mengunduh Foto Slide / Carousel dari Instagram?
            </h4>
            <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
              📢 Jawab: Bisa banget! Semua foto dalam satu postingan slide carousel Instagram bakal terdeteksi sepenuhnya. Kamu bisa memilih dan mengunduh foto yang kamu inginkan satu per satu dengan resolusi HD terbaik tanpa pecah.
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#F97316] transition-colors">
            <h4 className="font-heading font-black text-sm md:text-base text-[#D97706] mb-2">
              ❓ Bagaimana cara download Instagram Reels atau Kiriman Video?
            </h4>
            <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
              📢 Jawab: Cukup salin tautan (link) dari postingan Reels atau Video Instagram, lalu tempel di kolom input utama SaveTik. Sistem akan secara otomatis mengolah dan memberikan link unduhan format MP4 HD secara instan.
            </p>
          </div>

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
