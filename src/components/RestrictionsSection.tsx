import { AlertTriangle, ArrowLeft, Slash, XOctagon } from 'lucide-react';

interface RestrictionsSectionProps {
  onBack: () => void;
}

export default function RestrictionsSection({ onBack }: RestrictionsSectionProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8" id="restrictions-section">
      
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

      {/* LARANGAN PENGGUNAAN SECTION */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#E11D48] border-[3px] border-neo-border flex items-center justify-center text-white shrink-0">
            <Slash size={22} className="stroke-[4]" />
          </div>
          <h2 className="font-heading font-black text-2xl md:text-4xl uppercase tracking-tight text-neo-text">
            LARANGAN PENGGUNAAN
          </h2>
        </div>

        {/* Warning Alert Highlight */}
        <div className="bg-[#FCD34D] border-[3px] border-neo-border p-5 rounded-[10px] shadow-[4px_4px_0px_0px_var(--neo-border)] mb-8">
          <p className="font-heading font-black text-xs md:text-sm tracking-wide text-black uppercase leading-relaxed flex items-start gap-2">
            <span className="text-xl leading-none">⚡</span>
            <span>
              HORMATI HAK CIPTA DIGITAL. SAVETIK DOWNLOADER CUMA ALAT BANTU — CARA KAMU MAKAI HASILNYA, ITU TANGGUNG JAWAB KAMU SENDIRI.
            </span>
          </p>
        </div>

        {/* List of Restrictions */}
        <div className="space-y-6 mb-8">
          
          {/* Card 1 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#E11D48] flex gap-4 items-start transition-colors">
            <div className="w-10 h-10 bg-[#FFD1D1] dark:bg-[#4A1D1D] border-[3px] border-neo-border flex items-center justify-center text-[#E11D48] shrink-0 font-black">
              🛑
            </div>
            <div>
              <h3 className="font-heading font-black text-sm md:text-base uppercase tracking-wide text-neo-text mb-1">
                DILARANG KOMERSIALISASI TANPA IZIN
              </h3>
              <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
                Konten yang diunduh gak boleh dijual, dimonetisasi, atau dipakai buat kepentingan komersial tanpa izin dari pemilik aslinya.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#E11D48] flex gap-4 items-start transition-colors">
            <div className="w-10 h-10 bg-[#FFD1D1] dark:bg-[#4A1D1D] border-[3px] border-neo-border flex items-center justify-center text-[#E11D48] shrink-0 font-black">
              ❌
            </div>
            <div>
              <h3 className="font-heading font-black text-sm md:text-base uppercase tracking-wide text-neo-text mb-1">
                DILARANG RE-UPLOAD TANPA KREDIT
              </h3>
              <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
                Kalau nge-upload ulang ke platform lain, wajib cantumin kredit/sumber asli. Klaim karya orang lain sebagai milik sendiri itu curang.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-neo-card p-5 border-[3px] border-neo-border rounded-[10px] shadow-[4px_4px_0px_0px_#E11D48] flex gap-4 items-start transition-colors">
            <div className="w-10 h-10 bg-[#FFD1D1] dark:bg-[#4A1D1D] border-[3px] border-neo-border flex items-center justify-center text-[#E11D48] shrink-0 font-black">
              ⚠️
            </div>
            <div>
              <h3 className="font-heading font-black text-sm md:text-base uppercase tracking-wide text-neo-text mb-1">
                TANGGUNG JAWAB HUKUM DI TANGAN KAMU
              </h3>
              <p className="text-xs md:text-sm text-neo-text opacity-70 font-semibold leading-relaxed">
                Segala akibat hukum dari penyalahgunaan hasil unduhan — pelanggaran hak cipta, pencemaran nama baik, dll — sepenuhnya tanggung jawab pengguna, bukan SaveTik Downloader.
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer Note */}
        <div className="text-center font-heading font-black text-xs md:text-sm uppercase tracking-wider text-neo-text opacity-70 py-4 border-t-2 border-dashed border-neo-border">
          DENGAN MAKAI LAYANAN INI, KAMU DIANGGAP SETUJU SAMA 3 POIN DI ATAS. 🤝
        </div>

      </section>

      {/* Huge Back Button at bottom */}
      <div className="mt-12">
        <button
          onClick={onBack}
          className="w-full py-4 bg-neo-border hover:opacity-90 text-neo-bg font-heading font-black text-sm md:text-base uppercase tracking-wider border-[3px] border-neo-border shadow-[4px_4px_0px_0px_#E11D48] hover:shadow-[2px_2px_0px_0px_#E11D48] transition-all cursor-pointer text-center rounded-[8px]"
        >
          ← KEMBALI KE MENU UTAMA
        </button>
      </div>

    </div>
  );
}
