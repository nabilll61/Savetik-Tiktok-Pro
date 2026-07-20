import { useState, useRef } from 'react';
import { X, Video, Headphones, ArrowRight, Eye, Heart, Share2, Copy, Bookmark } from 'lucide-react';
import { VideoInfo } from '../types';
import VideoPlayer from './VideoPlayer';

interface DownloadResultProps {
  videoInfo: VideoInfo | null;
  onClear: () => void;
  showToast: (msg: string, type: 'success' | 'warning' | 'error') => void;
}

const getYoutubeId = (url: string) => {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i);
  return match ? match[1] : null;
};

const formatNumber = (num?: number) => {
  if (!num) return '0';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString('id-ID');
};

export default function DownloadResult({ videoInfo, onClear, showToast }: DownloadResultProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  if (!videoInfo) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Check if content is likely vertical (TikTok or YT Shorts)
  const isVertical = videoInfo.platform === 'tiktok' || videoInfo.url.includes('/shorts/');

  const [showAudioPreview, setShowAudioPreview] = useState(false);

  // Find the first MP4 format for inline video player preview
  const videoFormat = videoInfo.formats.find(f => f.format === 'mp4' && !f.quality.toLowerCase().includes('foto'));
  
  // Prefer directUrl for preview to ensure streaming works
  const previewUrl = videoFormat?.directUrl || videoFormat?.downloadUrl || '';
  
  // Find if there are photo slides
  const photoSlides = videoInfo.formats.filter(f => 
    f.quality.toLowerCase().includes('foto') || 
    f.quality.toLowerCase().includes('photo') ||
    f.quality.toLowerCase().includes('slide')
  );

  // Use first slide as preview if no video and it's a TikTok post
  const firstSlideUrl = photoSlides.length > 0 ? (photoSlides[0].directUrl || photoSlides[0].downloadUrl) : '';
  const displayPreviewUrl = previewUrl || firstSlideUrl || videoInfo.thumbnail;
  
  const audioFormat = videoInfo.formats.find(f => f.format === 'mp3');

  const handleDownloadClick = (formatName: string, downloadUrl: string) => {
    showToast(`Memulai unduhan format: ${formatName}...`, 'success');
    
    // For relative API URLs, we can use window.location.href to trigger download 
    // without opening new tabs which often leads to 403 in restricted environments
    if (downloadUrl.startsWith('/api/')) {
      const absoluteUrl = new URL(downloadUrl, window.location.origin).href;
      window.location.href = absoluteUrl;
    } else {
      // For external URLs, opening in new tab is safest
      window.open(downloadUrl, '_blank');
    }
  };

  return (
    <div id="download-result-section" className="pt-2 pb-6 px-4 md:px-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="bg-neo-card neo-border shadow-neo p-5 md:p-8 relative transition-colors">
        
        {/* Dismiss Button */}
        <button 
          id="clear-result-btn"
          onClick={onClear}
          className="absolute -top-3 -right-3 bg-[#E11D48] text-white w-9 h-9 neo-border flex items-center justify-center hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all cursor-pointer"
          title="Clear Result"
        >
          <X size={18} className="stroke-[3]" />
        </button>

        {/* Header Indicator */}
        <div className="flex items-center gap-2 mb-6">
          <span className={`px-3 py-1 text-xs font-black uppercase neo-border-thin rounded-[4px] ${
            videoInfo.platform === 'youtube' ? 'bg-[#E11D48] text-white' : 'bg-neo-border text-neo-bg'
          }`}>
            {videoInfo.platform}
          </span>
          <span className="text-xs font-black uppercase text-neo-text opacity-70 flex items-center gap-1">
            <ArrowRight size={12} className="stroke-[3]" />
            HASIL EKSTRAKSI VIDEO BERHASIL
          </span>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                   {/* Left Column: Video Preview & Actions */}
          <div className="md:col-span-5 space-y-4">
            {/* Real Video Player Component */}
            <div className={`relative ${isVertical ? 'aspect-[9/16] max-h-[650px]' : 'aspect-video'} bg-[#2D2331] neo-border shadow-neo-btn overflow-hidden flex items-center justify-center group mx-auto w-full`}>
              {previewUrl ? (
                <VideoPlayer 
                  src={previewUrl} 
                  poster={videoInfo.thumbnail} 
                />
              ) : (
                <div 
                  className="relative w-full h-full bg-white flex items-center justify-center cursor-pointer group"
                  onClick={() => audioFormat && setShowAudioPreview(!showAudioPreview)}
                >
                  <img 
                    src={displayPreviewUrl} 
                    alt={videoInfo.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                    referrerPolicy="no-referrer"
                    onContextMenu={(e) => e.preventDefault()}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop';
                    }}
                  />
                  
                  {/* Photo Slides Count */}
                  {photoSlides.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 text-[10px] font-black neo-border-thin">
                      1 / {photoSlides.length}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Photo Slides Grid - Only show if > 1 photo */}
            {photoSlides.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {photoSlides.slice(0, 8).map((slide, idx) => (
                  <div key={idx} className="aspect-square bg-white neo-border-thin relative overflow-hidden group">
                    <img 
                      src={slide.directUrl || slide.downloadUrl} 
                      alt={`Slide ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <button 
                         onClick={() => handleDownloadClick(slide.quality, slide.downloadUrl)}
                         className="bg-[#6366F1] text-white p-1 neo-border-thin"
                         title="Download Foto"
                       >
                         <ArrowRight size={12} className="rotate-90" />
                       </button>
                    </div>
                  </div>
                ))}
                {photoSlides.length > 8 && (
                  <div className="aspect-square bg-[#F5F3ED] neo-border-thin flex items-center justify-center text-[10px] font-black text-[#5C5764]">
                    +{photoSlides.length - 8}
                  </div>
                )}
              </div>
            )}

            {/* Audio Preview Section - Moved to above profile */}
            {showAudioPreview && audioFormat && (
              <div className="bg-white text-[#2D2331] neo-border-thin p-4 space-y-3 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center">
                      <Headphones size={16} className="text-[#6366F1]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-[#6366F1] leading-none">Preview Audio</p>
                      <p className="text-xs font-black text-[#2D2331] mt-1">Pratinjau Suara</p>
                    </div>
                  </div>
                  <button onClick={() => setShowAudioPreview(false)} className="text-[#5C5764] hover:text-[#2D2331] transition-colors">
                    <X size={16} />
                  </button>
                </div>
                
                <div className="space-y-2">
                  <audio 
                    src={audioFormat.directUrl || audioFormat.downloadUrl} 
                    autoPlay 
                    controls 
                    controlsList="nodownload noplaybackrate"
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-10"
                  />
                  <div className="flex items-center justify-between text-[9px] font-mono font-black text-[#5C5764] uppercase">
                    <span>Background Music</span>
                    <span>TikTok Audio</span>
                  </div>
                </div>
              </div>
            )}

            {/* Creator Profile - Specific for TikTok */}
            {videoInfo.platform === 'tiktok' && (videoInfo.author || videoInfo.authorAvatar) && (
              <div className="bg-[#F5F3ED] neo-border-thin p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full neo-border-thin overflow-hidden bg-white flex-shrink-0">
                    <img 
                      src={videoInfo.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(videoInfo.author || 'T')}&background=6366F1&color=fff`} 
                      alt={videoInfo.author} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-[#5C5764] font-black uppercase leading-none mb-1">Creator</p>
                    <p className="text-sm font-black truncate text-[#2D2331]">
                      {videoInfo.author}
                      {videoInfo.authorUniqueId && (
                        <span className="text-[10px] text-[#6366F1] block mt-0.5">@{videoInfo.authorUniqueId}</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a 
                    href={`https://www.tiktok.com/@${videoInfo.authorUniqueId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 bg-[#2D2331] text-white text-[9px] font-black uppercase neo-border-thin hover:bg-black transition-colors"
                  >
                    Profil
                  </a>
                </div>
              </div>
            )}

            {/* Stats - Specific for TikTok */}
            {videoInfo.platform === 'tiktok' && videoInfo.statistics && (
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-neo-card neo-border-thin p-2 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 text-[#E11D48]">
                    <Heart size={12} className="fill-current" />
                    <span className="text-[10px] font-black">{formatNumber(videoInfo.statistics.likes)}</span>
                  </div>
                  <span className="text-[8px] text-neo-text opacity-60 font-black uppercase">Likes</span>
                </div>
                <div className="bg-neo-card neo-border-thin p-2 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 text-[#14B8A6]">
                    <Share2 size={12} />
                    <span className="text-[10px] font-black">{formatNumber(videoInfo.statistics.shares)}</span>
                  </div>
                  <span className="text-[8px] text-neo-text opacity-60 font-black uppercase">Shares</span>
                </div>
                <div className="bg-neo-card neo-border-thin p-2 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 text-[#6366F1]">
                    <Eye size={12} />
                    <span className="text-[10px] font-black">{formatNumber(videoInfo.statistics.plays)}</span>
                  </div>
                  <span className="text-[8px] text-neo-text opacity-60 font-black uppercase">Views</span>
                </div>
              </div>
            )}

            {/* Caption & Copy Button - Only for TikTok */}
            {videoInfo.caption && videoInfo.platform === 'tiktok' && (
              <div className="bg-neo-card text-neo-text neo-border-thin p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase text-neo-text opacity-60">Caption Video</p>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(videoInfo.caption || '');
                      showToast('Caption berhasil disalin!', 'success');
                    }}
                    className="flex items-center gap-1 bg-[#6366F1] text-white px-2 py-0.5 rounded-[4px] text-[9px] font-black hover:bg-[#4F46E5] transition-colors"
                  >
                    <Copy size={10} />
                    SALIN
                  </button>
                </div>
                <p className="text-xs font-medium line-clamp-3 leading-relaxed text-neo-text opacity-90 italic">
                  "{videoInfo.caption}"
                </p>
              </div>
            )}

            {/* Bookmark / Save Button */}
            <button 
              onClick={() => {
                const history = JSON.parse(localStorage.getItem('savetik_history') || '[]');
                if (!history.some((item: any) => item.id === videoInfo.id)) {
                  localStorage.setItem('savetik_history', JSON.stringify([videoInfo, ...history].slice(0, 50)));
                  showToast('Video berhasil disimpan ke riwayat!', 'success');
                } else {
                  showToast('Video sudah ada di riwayat.', 'warning');
                }
              }}
              className="w-full py-3.5 bg-neo-card hover:bg-neo-bg-sec text-neo-text font-black text-xs neo-border shadow-neo-btn transition-all active:translate-y-1 flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <Bookmark size={16} className="stroke-[3]" />
              SIMPAN KE BOOKMARK
            </button>
          </div>

          {/* Right Column: Download formats & Actions */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl font-black uppercase leading-tight tracking-tight text-neo-text">
                PILIH FORMAT UNDUHAN
              </h2>
              <div className="h-1 w-20 bg-[#6366F1] neo-border-thin" />
              <p className="text-xs text-neo-text opacity-70 font-medium">
                Pilih format yang Anda inginkan di bawah ini. Semua unduhan diproses secara aman, bebas virus, dan langsung tersimpan ke perangkat Anda.
              </p>
            </div>

            {/* List of Formats with bold different colored buttons */}
            <div className="space-y-3.5 mt-6">
              {videoInfo.formats.map((fmt, index) => {
                // Different styling for audio vs video
                const isAudio = fmt.format === 'mp3' || fmt.quality.toLowerCase().includes('audio');
                const btnColor = isAudio 
                  ? 'bg-[#14B8A6] hover:bg-[#0EA886] text-white' 
                  : index === 0 
                    ? 'bg-[#6366F1] hover:bg-[#4F46E5] text-white' 
                    : 'bg-[#FCD34D] hover:bg-[#F59E0B] text-[#2D2331]';

                return (
                  <div 
                    key={index} 
                    className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3 bg-neo-bg hover:bg-neo-bg-sec neo-border-thin gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-neo-text">
                      <div className={`w-8 h-8 rounded-full neo-border-thin flex items-center justify-center text-white ${
                        isAudio ? 'bg-[#14B8A6]' : 'bg-[#6366F1]'
                      }`}>
                        {isAudio ? <Headphones size={14} className="stroke-[3]" /> : <Video size={14} className="stroke-[3]" />}
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-tight">{fmt.quality}</p>
                        <p className="text-[10px] text-neo-text opacity-50 font-mono uppercase font-black">
                          Format: {fmt.format} {fmt.size ? `• Ukuran: ${fmt.size}` : ''}
                        </p>
                      </div>
                    </div>

                    <button
                      id={`dl-fmt-btn-${index}`}
                      onClick={() => handleDownloadClick(fmt.quality, fmt.downloadUrl)}
                      className={`py-2 px-5 neo-btn text-xs uppercase font-black select-none ${btnColor}`}
                    >
                      DOWNLOAD
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Info tips */}
            <p className="text-[10px] text-neo-text opacity-50 font-semibold mt-4 text-center md:text-left">
              * Jika unduhan tidak berjalan otomatis saat klik Download, tekan lama tombol lalu pilih "Salin Link" dan buka di tab baru.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
