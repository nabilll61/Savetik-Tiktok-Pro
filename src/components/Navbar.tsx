import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeView: 'downloader' | 'guide' | 'restrictions' | 'donation' | 'history';
  onViewChange: (view: 'downloader' | 'guide' | 'restrictions' | 'donation' | 'history') => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export default function Navbar({ 
  activeView,
  onViewChange,
  theme,
  onThemeToggle
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-20 bg-neo-card border-b-[4px] border-neo-border z-40 px-4 md:px-8 flex items-center justify-between transition-colors">
        
        {/* Left Side: Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu Icon (Mobile) */}
          <button 
            id="mobile-menu-toggle"
            onClick={toggleMenu}
            className="p-2 lg:hidden neo-border bg-neo-bg text-neo-text active:translate-y-0.5 transition-all"
            aria-label="Toggle menu"
          >
            <Menu size={20} className="stroke-[3]" />
          </button>
          
          <a href="/" className="flex items-center gap-2">
            <span className="font-heading font-black text-2xl md:text-3xl tracking-tight uppercase text-neo-text">
              Save<span className="text-[#6366F1]">Tik</span>
            </span>
          </a>
        </div>

        {/* Right Side: Desktop Items & Theme Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => {
                onViewChange('downloader');
              }}
              className={`font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeView === 'downloader'
                  ? 'text-[#6366F1] underline underline-offset-4 decoration-[3px]'
                  : 'text-neo-text hover:text-[#6366F1]'
              }`}
            >
              🏠 BERANDA
            </button>
            
            <button
              onClick={() => {
                onViewChange('guide');
              }}
              className={`font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeView === 'guide'
                  ? 'text-[#6366F1] underline underline-offset-4 decoration-[3px]'
                  : 'text-neo-text hover:text-[#6366F1]'
              }`}
            >
              📖 CARA PENGGUNAAN
            </button>

            <button
              onClick={() => {
                onViewChange('restrictions');
              }}
              className={`font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeView === 'restrictions'
                  ? 'text-[#6366F1] underline underline-offset-4 decoration-[3px]'
                  : 'text-neo-text hover:text-[#6366F1]'
              }`}
            >
              🚫 LARANGAN
            </button>

            <button
              onClick={() => {
                onViewChange('donation');
              }}
              className={`font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeView === 'donation'
                  ? 'text-[#6366F1] underline underline-offset-4 decoration-[3px]'
                  : 'text-neo-text hover:text-[#6366F1]'
              }`}
            >
              💛 DONASI
            </button>

            <div className="bg-[#E2F7F2] dark:bg-[#1A3D35] neo-border-thin px-4 py-2 font-mono text-xs flex items-center gap-2 font-black text-[#14B8A6] transition-colors">
              ✓ STATUS: AKTIF
            </div>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onThemeToggle}
            className="p-2 neo-border bg-neo-bg text-neo-text hover:bg-neo-bg-sec active:translate-y-0.5 transition-all shadow-neo-btn-press"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} className="stroke-[3]" /> : <Sun size={20} className="stroke-[3]" />}
          </button>
        </div>

        {/* Hamburger Drawer Slide-From-Left (Mobile & Tablet) */}
        <div 
          className={`fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 z-50 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleMenu}
        >
          <div 
            className={`w-[280px] max-w-full h-full bg-neo-bg border-r-[4px] border-neo-border p-6 flex flex-col justify-between transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-neo-border">
                <span className="font-heading font-black text-xl tracking-tight uppercase text-neo-text">
                  MENU SAVE<span className="text-[#6366F1]">TIK</span>
                </span>
                <button 
                  id="drawer-close"
                  onClick={toggleMenu}
                  className="p-1 neo-border bg-neo-card text-neo-text"
                >
                  <X size={18} className="stroke-[3]" />
                </button>
              </div>

              {/* Navigation links in drawer */}
              <div className="space-y-4">
                <button
                  onClick={() => {
                    onViewChange('downloader');
                    toggleMenu();
                  }}
                  className={`w-full text-left block py-3 px-4 font-black text-xs neo-border shadow-neo-btn transition-all active:translate-y-0.5 cursor-pointer uppercase tracking-wider ${
                    activeView === 'downloader' ? 'bg-neo-bg-sec text-[#6366F1]' : 'bg-neo-card text-neo-text'
                  }`}
                >
                  🏠 BERANDA
                </button>
                <button
                  onClick={() => {
                    onViewChange('guide');
                    toggleMenu();
                  }}
                  className={`w-full text-left block py-3 px-4 font-black text-xs neo-border shadow-neo-btn transition-all active:translate-y-0.5 cursor-pointer uppercase tracking-wider ${
                    activeView === 'guide' ? 'bg-neo-bg-sec text-[#6366F1]' : 'bg-neo-card text-neo-text'
                  }`}
                >
                  📖 CARA PENGGUNAAN
                </button>
                <button
                  onClick={() => {
                    onViewChange('restrictions');
                    toggleMenu();
                  }}
                  className={`w-full text-left block py-3 px-4 font-black text-xs neo-border shadow-neo-btn transition-all active:translate-y-0.5 cursor-pointer uppercase tracking-wider ${
                    activeView === 'restrictions' ? 'bg-neo-bg-sec text-[#6366F1]' : 'bg-neo-card text-neo-text'
                  }`}
                >
                  🚫 LARANGAN PENGGUNAAN
                </button>
                <button
                  onClick={() => {
                    onViewChange('history');
                    toggleMenu();
                  }}
                  className={`w-full text-left block py-3 px-4 font-black text-xs neo-border shadow-neo-btn transition-all active:translate-y-0.5 cursor-pointer uppercase tracking-wider ${
                    activeView === 'history' ? 'bg-neo-bg-sec text-[#6366F1]' : 'bg-neo-card text-neo-text'
                  }`}
                >
                  ⏳ RIWAYAT DOWNLOAD
                </button>
                <button
                  onClick={() => {
                    onViewChange('donation');
                    toggleMenu();
                  }}
                  className={`w-full text-left block py-3 px-4 font-black text-xs neo-border shadow-neo-btn transition-all active:translate-y-0.5 cursor-pointer uppercase tracking-wider ${
                    activeView === 'donation' ? 'bg-neo-bg-sec text-[#6366F1]' : 'bg-neo-card text-neo-text'
                  }`}
                >
                  💛 SUPPORT / DONASI
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Pad fixed top bar */}
      <div className="h-20" />
    </>
  );
}
