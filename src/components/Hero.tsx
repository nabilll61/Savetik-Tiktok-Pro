import React, { useState, FormEvent, useEffect } from 'react';
import { Download, Clipboard, Link2, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExtract: (url: string) => Promise<void>;
  loading: boolean;
  showToast: (msg: string, type: 'success' | 'warning' | 'error') => void;
}

const PLATFORMS = ['TIKTOK', 'YOUTUBE', 'INSTAGRAM', 'SPOTIFY', 'CAPCUT', 'FACEBOOK'];

export default function Hero({ onExtract, loading, showToast }: HeroProps) {
  const [url, setUrl] = useState('');
  const [displayPlatform, setDisplayPlatform] = useState(PLATFORMS[0]);
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Platform detection logic with simulated delay
  useEffect(() => {
    if (!url) {
      setDetectedPlatform(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const urlLower = url.toLowerCase();
    
    // Simulate a brief "searching" animation
    const searchTimer = setTimeout(() => {
      setIsSearching(false);
      if (urlLower.includes('tiktok.com')) {
        setDetectedPlatform('TIKTOK');
      } else if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
        setDetectedPlatform('YOUTUBE');
      } else if (urlLower.includes('instagram.com')) {
        setDetectedPlatform('INSTAGRAM');
      } else if (urlLower.includes('spotify.com')) {
        setDetectedPlatform('SPOTIFY');
      } else if (urlLower.includes('capcut.com')) {
        setDetectedPlatform('CAPCUT');
      } else if (urlLower.includes('facebook.com') || urlLower.includes('fb.watch')) {
        setDetectedPlatform('FACEBOOK');
      } else {
        setDetectedPlatform('UNKNOWN');
      }
    }, 800); // 800ms of spinning

    return () => clearTimeout(searchTimer);
  }, [url]);

  // Cycling animation logic
  useEffect(() => {
    if (!isSearching) return;

    const interval = setInterval(() => {
      setDisplayPlatform((prev) => {
        const currentIndex = PLATFORMS.indexOf(prev);
        const nextIndex = (currentIndex + 1) % PLATFORMS.length;
        return PLATFORMS[nextIndex];
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isSearching]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      showToast('Masukkan link video YouTube, TikTok, atau Instagram terlebih dahulu!', 'warning');
      return;
    }

    await onExtract(url.trim());
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        showToast('Link berhasil disalin dari clipboard!', 'success');
      } else {
        showToast('Clipboard kosong!', 'warning');
      }
    } catch (err) {
      showToast('Gagal mengakses clipboard. Silakan tempel secara manual.', 'warning');
    }
  };

  return (
    <section className="pt-10 pb-4 md:pt-14 md:pb-6 px-4 md:px-8 max-w-5xl mx-auto text-center">
      {/* Badge Decorative */}
      <div className="inline-flex items-center gap-1.5 bg-[#FEF3C7] dark:bg-[#4A3A25] text-black dark:text-white neo-border-thin px-3 py-1.5 rounded-[30px] text-xs font-black uppercase tracking-wider mb-6 rotate-[-1deg] shadow-xs">
        <Sparkles size={14} className="text-[#FCD34D]" />
        SAVETIK VERSI BETA V1.0
      </div>

      {/* Fluid Main Heading */}
      <h1 className="font-heading font-black tracking-tighter uppercase leading-[0.9] text-neo-text mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        SATU  TAUTAN <br />
        <span className="bg-[#E11D48] text-white px-3 inline-block rotate-[1deg] neo-border my-2">
          SEMUA PLATFORM
        </span>
      </h1>

      <p className="max-w-2xl mx-auto text-neo-text opacity-70 font-medium text-base md:text-lg mb-10 leading-relaxed">
        Ekstrak video TikTok tanpa watermark, konversi video YouTube menjadi MP4/MP3 kualitas tinggi, serta download konten Instagram secara gratis dan instan.
      </p>

      {/* Main Downloader Input Box */}
      <div className="max-w-3xl mx-auto mb-10">
        <form 
          onSubmit={handleSubmit} 
          className="bg-neo-card neo-border p-4 md:p-6 shadow-neo mb-3 flex flex-col md:flex-row gap-4 items-stretch"
        >
          <div className="flex-1 flex flex-col gap-3">
            <div className="relative flex items-center">
              <div className="absolute left-3 text-neo-text opacity-50">
                <Link2 size={20} className="stroke-[3]" />
              </div>
              <input 
                id="downloader-url-input"
                type="url"
                placeholder="Tempel Link Tiktok Ig Yt Video DiSini"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-11 pr-24 py-3.5 neo-border-thin bg-neo-bg text-neo-text focus:bg-neo-card focus:outline-none focus:ring-3 focus:ring-[#6366F1] font-semibold text-sm transition-all"
              />
              {/* Paste button inside input */}
              <button
                id="paste-btn"
                type="button"
                onClick={handlePaste}
                className="absolute right-2 px-3 py-1.5 bg-neo-bg-sec hover:bg-neo-bg text-neo-text text-xs font-black uppercase neo-border-thin flex items-center gap-1 active:translate-y-0.5"
                title="Paste Clipboard Content"
              >
                <Clipboard size={12} className="stroke-[3]" />
                PASTE
              </button>
            </div>

            {/* Platform Status Indicator - Now inside the form, above button on mobile */}
            {url.length > 0 && (
              <div className="flex items-center gap-3 px-1 animate-in fade-in slide-in-from-top-1 duration-300">
                <div className="w-2.5 h-2.5 bg-[#00D1FF] neo-border-thin border-neo-border" />
                <div className="flex items-center gap-2">
                   <div className={`${detectedPlatform && !isSearching ? 'bg-[#84CC16]' : 'bg-gray-400'} p-0.5 rounded-sm transition-colors`}>
                     <CheckCircle2 size={10} className="text-white" />
                   </div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-neo-text flex items-center gap-2">
                    {isSearching ? (
                      <>MENCARI <span className="text-gray-400">·</span> <span className="animate-pulse">{displayPlatform}</span></>
                    ) : detectedPlatform ? (
                      <>TERDETEKSI <span className="text-gray-400">·</span> <span className="text-[#6366F1]">{detectedPlatform}</span></>
                    ) : null}
                  </span>
                </div>
              </div>
            )}
          </div>

          <button 
            id="submit-download-btn"
            type="submit"
            disabled={loading}
            className="bg-[#6366F1] text-white py-3.5 px-8 neo-btn text-base font-black tracking-wide uppercase select-none md:w-auto"
          >
            {loading ? (
              <span className="font-mono text-xs animate-pulse flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                LOADING...
              </span>
            ) : (
              <>
                <Download size={18} className="stroke-[3]" />
                EKSTRAK
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
