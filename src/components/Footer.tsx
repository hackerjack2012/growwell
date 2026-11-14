import React from 'react';
import {
  Accessibility,
  Calendar,
  Clock,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { CENTER_INFO } from '../data/content';
import { GrowWellMark } from './Navbar';

interface FooterProps {
  onOpenBooking: () => void;
  largeText: boolean;
  onToggleLargeText: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  largeText,
  onToggleLargeText,
}) => {
  return (
    <footer id="contact" className="bg-[#192A33] text-[#D2DFE6]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#top" className="inline-flex items-center gap-3">
              <GrowWellMark className="w-10 h-10" />
              <div>
                <span className="font-display text-2xl font-bold text-white block leading-none">
                  Grow Well
                </span>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[#8ECBC0] font-medium">
                  Therapy Center
                </span>
              </div>
            </a>
            <p className="text-sm text-[#B7C8D2] leading-relaxed max-w-xs">
              Compassionate therapy for specially abled children and their
              families. Dedicated to helping every child flourish in confidence,
              communication, and joyful independence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#services"
                  className="text-[#C1D2DC] hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-[#C1D2DC] hover:text-white transition-colors"
                >
                  Our Approach
                </a>
              </li>
              <li>
                <a
                  href="#stories"
                  className="text-[#C1D2DC] hover:text-white transition-colors"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="text-[#C1D2DC] hover:text-white transition-colors"
                >
                  Location
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-[#C1D2DC]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8ECBC0] shrink-0 mt-0.5" />
                <span>
                  Radha Swami Road, Opp. USPC Jain Public School,
                  Ludhiana-141015
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8ECBC0] shrink-0" />
                <a
                  href={CENTER_INFO.phoneHref}
                  className="hover:text-white transition-colors"
                >
                  {CENTER_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8ECBC0] shrink-0" />
                <a
                  href={`mailto:${CENTER_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CENTER_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#F4A261] shrink-0" />
                <span>Mon–Sat, 9 AM – 6 PM</span>
              </li>
            </ul>
          </div>

          {/* Get Started */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              Get Started
            </h3>
            <p className="text-sm text-[#B7C8D2] mb-4 leading-relaxed">
              Begin with a friendly, free consultation to explore the right
              personalized support plan for your child.
            </p>
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#4A9B8E] hover:bg-[#3A8478] text-white font-semibold text-sm px-5 py-3 rounded-full transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Consultation</span>
            </button>
            <p className="mt-3 text-xs text-[#9BB0BC]">
              Flexible care plans &amp; guidance available for families.
            </p>
          </div>
        </div>

        {/* Bottom Accessibility & Copyright Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#9FB3BF]">
          <div className="text-center md:text-left space-y-1">
            <p>
              We are committed to accessibility. This website follows WCAG
              guidelines.
            </p>
            <p>&copy; 2026 Grow Well Therapy Center. All Rights Reserved.</p>
          </div>

          <button
            type="button"
            onClick={onToggleLargeText}
            aria-pressed={largeText}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-[#E5EFF4] border border-white/15 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Accessibility className="w-4 h-4 text-[#8ECBC0]" />
            <span>
              Text Comfort: {largeText ? 'Larger (Active)' : 'Standard'}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
