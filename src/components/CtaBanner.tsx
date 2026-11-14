import React from 'react';
import { Calendar, Phone } from 'lucide-react';
import { CENTER_INFO } from '../data/content';

interface CtaBannerProps {
  onOpenBooking: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-[#25675B] px-7 py-14 sm:px-14 sm:py-20 text-center shadow-[0_24px_60px_rgba(37,103,91,0.22)]">
          {/* Subtle organic decorative circles */}
          <div
            className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#3A8B7D]/45 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#F4A261]/20 blur-2xl"
            aria-hidden="true"
          />

          <div className="relative max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#D7ECE5] bg-white/10 border border-white/15 px-4 py-1.5 rounded-full mb-5">
              Take the First Gentle Step
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.8rem] font-semibold text-white leading-tight">
              Ready to Help Your Child Grow?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#E6F3EF] leading-relaxed">
              Schedule a free, no-obligation consultation today. Our
              compassionate team is here to listen and guide you.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FAF8F5] hover:bg-white text-[#236358] font-bold text-base px-8 py-4 rounded-full shadow-[0_12px_28px_rgba(18,44,39,0.25)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation Now</span>
              </button>

              <a
                href={CENTER_INFO.phoneHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-base px-7 py-4 rounded-full transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call {CENTER_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
