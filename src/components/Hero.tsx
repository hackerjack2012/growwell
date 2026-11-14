import React from 'react';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';
import { TRUST_METRICS } from '../data/content';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 sm:pt-12 sm:pb-24"
    >
      {/* Subtle organic botanical warm glows in background */}
      <div
        className="pointer-events-none absolute -top-28 -right-24 w-[520px] h-[520px] rounded-full bg-[#EDF6F3] blur-3xl opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-44 -left-32 w-[420px] h-[420px] rounded-full bg-[#FDF2E9] blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDF6F3] border border-[#D4E9E2] text-[#236358] text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-[#E68A4F] shrink-0" />
              <span>Compassionate Pediatric Therapy Center · Ludhiana</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.45rem] font-semibold text-[#1E2E3B] leading-[1.12]">
              Helping Every Child Grow in Their{' '}
              <span className="italic font-medium text-[#2E7D6F]">
                Own Beautiful Way
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#4A5B68] leading-relaxed max-w-xl">
              Grow Well is a compassionate therapy center dedicated to supporting
              specially abled children and their families. Through personalized,
              evidence-based therapies, we help children develop skills, build
              confidence, and reach their fullest potential.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 bg-[#2E7D6F] hover:bg-[#236358] text-white font-semibold text-base px-7 py-4 rounded-full shadow-[0_10px_28px_rgba(46,125,111,0.28)] hover:shadow-[0_14px_32px_rgba(46,125,111,0.36)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Free Consultation</span>
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#EDF6F3] text-[#1E2E3B] border border-[#D9D2C7] hover:border-[#2E7D6F]/40 font-semibold text-base px-7 py-4 rounded-full transition-all duration-200"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-[#2E7D6F]" />
              </a>
            </div>

            {/* Quiet parent reassurance strip */}
            <div className="pt-3 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-[#546573]">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D6F]" />
                Free initial consultation
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D6F]" />
                1-on-1 play-based sessions
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D6F]" />
                Mon–Sat · 9 AM – 6 PM
              </span>
            </div>
          </div>

          {/* Right Sunlit Sanctuary Photography Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Soft organic decorative frame behind photo */}
              <div
                className="absolute -inset-3 sm:-inset-4 rounded-[2rem] bg-gradient-to-br from-[#D7ECE5]/70 via-[#FAF8F5] to-[#F9DFC8]/60 -z-10 rotate-1"
                aria-hidden="true"
              />

              <div className="relative rounded-[1.75rem] overflow-hidden shadow-[0_22px_55px_rgba(30,46,59,0.12)] border border-white/80 bg-[#F3EFE9]">
                <img
                  src="/images/hero-therapy.jpg"
                  alt="Smiling Indian pediatric therapist guiding a joyful young child stacking wooden Montessori blocks in a sunlit therapy room"
                  className="w-full aspect-[4/3] object-cover object-center"
                />
              </div>

              {/* Quiet floating sanctuary note */}
              <div className="sm:absolute sm:-bottom-6 sm:left-6 sm:right-6 lg:right-auto lg:max-w-sm mt-4 sm:mt-0 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_14px_36px_rgba(30,46,59,0.10)] border border-[#EAE4DB] flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#FDF2E9] text-[#CF7035] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1E2E3B]">
                    Gentle, Individualized Care
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#566775] leading-relaxed mt-0.5">
                    Warm, sensory-friendly rooms designed so every child feels
                    safe, joyful, and proud of every milestone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Trust & Boutique Care Strip */}
        <div className="mt-16 sm:mt-20 bg-white rounded-3xl border border-[#EAE4DB] shadow-[0_10px_35px_rgba(30,46,59,0.05)] p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y-0 lg:divide-x lg:divide-[#EFEAE2]">
            {TRUST_METRICS.map((metric, idx) => (
              <div
                key={metric.label}
                className={`flex flex-col items-center lg:items-start text-center lg:text-left ${
                  idx > 0 ? 'lg:pl-8' : ''
                }`}
              >
                <span className="font-display text-3xl sm:text-4xl font-bold text-[#2E7D6F]">
                  {metric.value}
                </span>
                <span className="text-sm sm:text-base font-semibold text-[#1E2E3B] mt-1">
                  {metric.label}
                </span>
                <span className="text-xs sm:text-[13px] text-[#5E707E] mt-0.5">
                  {metric.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
