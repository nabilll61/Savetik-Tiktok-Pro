import { Trash2, ExternalLink, ArrowLeft, Download } from 'lucide-react';
import { VideoInfo } from '../types';
import { useState, useEffect } from 'react';

interface HistorySectionProps {
  onBack: () => void;
  onSelectVideo: (video: VideoInfo) => void;
  showToast: (message: string, type: 'success' | 'error' | 'warning') => void;
}

export default function HistorySection({ onBack, onSelectVideo, showToast }: HistorySectionProps) {
  const [history, setHistory] = useState<VideoInfo[]>([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('savetik_history') || '[]');
    setHistory(savedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('savetik_history');
    setHistory([]);
    showToast('Riwayat berhasil dikosongkan.', 'success');
  };

  const removeAt = (index: number) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
    localStorage.setItem('savetik_history', JSON.stringify(newHistory));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#6366F1] font-black text-xs uppercase mb-2 hover:underline"
          >
            <ArrowLeft size={14} strokeWidth={3} /> KEMBALI KE DOWNLOADER
          </button>
          <h2 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tighter text-neo-text">
            RIWAYAT <span className="text-[#6366F1]">DOWNLOAD</span>
          </h2>
        </div>

        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            className="bg-[#FFE4E6] dark:bg-[#4A1D1D] text-[#E11D48] dark:text-[#FF4D4D] px-4 py-2 neo-border-thin font-black text-[10px] uppercase hover:opacity-90 transition-colors"
          >
            HAPUS SEMUA
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-neo-card neo-border shadow-neo p-12 text-center transition-colors">
          <div className="w-16 h-16 bg-neo-bg neo-border flex items-center justify-center mx-auto mb-4 text-neo-text opacity-30">
            <Trash2 size={32} />
          </div>
          <h3 className="font-heading font-black text-xl uppercase mb-2 text-neo-text">Riwayat Kosong</h3>
          <p className="text-sm text-neo-text opacity-70 font-semibold mb-6">Kamu belum menyimpan atau mengunduh video apapun.</p>
          <button 
            onClick={onBack}
            className="bg-[#6366F1] text-white px-6 py-3 neo-border shadow-neo-btn font-black text-sm uppercase tracking-wider"
          >
            MULAI DOWNLOAD
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {history.map((video, index) => (
            <div 
              key={`${video.id}-${index}`}
              className="bg-neo-card neo-border shadow-neo overflow-hidden flex flex-col group transition-colors"
            >
              <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=600&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button 
                    onClick={() => onSelectVideo(video)}
                    className="p-3 bg-white text-black neo-border shadow-neo-sm hover:scale-105 active:scale-95 transition-all"
                    title="Lihat Detail"
                  >
                    <ExternalLink size={18} strokeWidth={3} />
                  </button>
                  <button 
                    onClick={() => removeAt(index)}
                    className="p-3 bg-[#FFE4E6] text-[#E11D48] neo-border shadow-neo-sm hover:scale-105 active:scale-95 transition-all"
                    title="Hapus"
                  >
                    <Trash2 size={18} strokeWidth={3} />
                  </button>
                </div>
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white font-black text-[8px] uppercase tracking-widest backdrop-blur-sm neo-border-thin">
                  {video.platform}
                </div>
              </div>

              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-heading font-black text-sm uppercase leading-tight mb-2 line-clamp-2 text-neo-text">
                    {video.title}
                  </h4>
                  <p className="text-[10px] text-neo-text opacity-70 font-bold uppercase truncate mb-4">
                    @{video.authorUniqueId || video.author}
                  </p>
                </div>
                
                <button 
                  onClick={() => onSelectVideo(video)}
                  className="w-full py-2 bg-neo-bg hover:bg-neo-bg-sec text-neo-text font-black text-[10px] neo-border-thin shadow-neo-sm transition-all active:translate-y-0.5 flex items-center justify-center gap-2 uppercase tracking-widest"
                >
                  <Download size={14} strokeWidth={3} /> LIHAT UNDUHAN
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
