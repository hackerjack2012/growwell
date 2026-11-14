import React, { useState, useEffect } from 'react';
import { Calendar, Lock, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  newSubmissionsCount: number;
}

export const GrowWellMark: React.FC<{ className?: string }> = ({
  className = 'w-9 h-9',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect width="48" height="48" rx="14" fill="#2E7D6F" />
    <path
      d="M24 36V20"
      stroke="#FAF8F5"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path
      d="M24 26C16.8 26 12.5 21.5 12.5 14.5C19.5 14.5 24 18.8 24 26Z"
      fill="#EDF6F3"
      fillOpacity="0.22"
      stroke="#FAF8F5"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path
      d="M24 23C31.2 23 35.5 18.5 35.5 11.5C28.5 11.5 24 15.8 24 23Z"
      fill="#F4A261"
      fillOpacity="0.88"
      stroke="#FAF8F5"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  </svg>
);

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Our Approach', href: '#about' },
  { label: 'Stories', href: '#stories' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAdmin,
  newSubmissionsCount,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(30,46,59,0.06)] border-b border-[#E6E0D6]'
          : 'bg-[#FAF8F5]/85 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <nav
          className="flex items-center justify-between h-20"
          aria-label="Primary navigation"
        >
          {/* Brand */}
          <a
            href="#top"
            className="flex items-center gap-3 group focus:outline-none rounded-xl"
          >
            <GrowWellMark className="w-10 h-10 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-[#1E2E3B] leading-none tracking-tight">
                Grow Well
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#2E7D6F] mt-1">
                Pediatric Therapy
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[15px] font-medium text-[#3B4C59] hover:text-[#2E7D6F] transition-colors relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#2E7D6F] after:rounded-full after:transition-all hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold text-[#5C6D7A] hover:text-[#1E2E3B] bg-[#F1ECE4] hover:bg-[#E7E0D5] transition-colors cursor-pointer"
              title="Staff Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-[#CF7035]" />
              <span>Admin</span>
              {newSubmissionsCount > 0 && (
                <span className="ml-0.5 inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold rounded-full bg-[#E68A4F] text-white">
                  {newSubmissionsCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-[#2E7D6F] hover:bg-[#236358] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-[0_6px_18px_rgba(46,125,111,0.24)] hover:shadow-[0_10px_24px_rgba(46,125,111,0.32)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="relative p-2.5 rounded-full bg-[#F1ECE4] text-[#4A5B68] hover:text-[#1E2E3B]"
              aria-label="Open Staff Admin Portal"
            >
              <Lock className="w-4 h-4 text-[#CF7035]" />
              {newSubmissionsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full bg-[#E68A4F] text-white flex items-center justify-center">
                  {newSubmissionsCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="p-2.5 rounded-xl text-[#1E2E3B] hover:bg-[#EFEAE2] transition-colors"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-t border-[#E6E0D6] shadow-lg animate-fade-in">
          <div className="max-w-7xl mx-auto px-5 py-5 space-y-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-[#1E2E3B] hover:bg-[#EDF6F3] hover:text-[#2E7D6F] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 mt-3 border-t border-[#E6E0D6] flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenBooking();
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#2E7D6F] hover:bg-[#236358] text-white font-semibold px-5 py-3 rounded-full shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Free Consultation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
