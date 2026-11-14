import React, { useState } from 'react';
import {
  Check,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { CENTER_INFO } from '../data/content';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CENTER_INFO.fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback ignored silently if clipboard is unavailable
    }
  };

  return (
    <section
      id="location"
      className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#EFEAE2]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#2E7D6F] bg-[#EDF6F3] px-3.5 py-1.5 rounded-full mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Visit Us Today
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#1E2E3B] leading-tight">
            A Warm, Welcoming Space in Ludhiana
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5B68]">
            Come visit our sensory-friendly therapy studio, meet our therapists,
            and explore the space together with your child.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Clinic Information Card */}
          <div className="lg:col-span-5 bg-white rounded-[2rem] p-7 sm:p-9 border border-[#EAE4DB] shadow-[0_10px_32px_rgba(30,46,59,0.05)] flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl font-semibold text-[#1E2E3B]">
                {CENTER_INFO.fullName}
              </h3>
              <p className="text-sm text-[#2E7D6F] font-medium mt-1">
                Easy landmark access · Family-friendly parking nearby
              </p>

              <div className="mt-7 space-y-5">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EDF6F3] text-[#2E7D6F] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#667885]">
                      Center Address
                    </p>
                    <p className="text-[15px] text-[#2B3C49] leading-relaxed mt-1">
                      {CENTER_INFO.addressLine1},
                      <br />
                      {CENTER_INFO.addressLine2}
                    </p>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2E7D6F] hover:text-[#236358] transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Address copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FDF2E9] text-[#CF7035] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#667885]">
                      Visiting Hours
                    </p>
                    <p className="text-[15px] text-[#2B3C49] mt-1 font-medium">
                      {CENTER_INFO.hoursWeekday}
                    </p>
                    <p className="text-sm text-[#667885]">
                      {CENTER_INFO.hoursSunday}
                    </p>
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EDF6F3] text-[#2E7D6F] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#667885]">
                      Phone
                    </p>
                    <a
                      href={CENTER_INFO.phoneHref}
                      className="text-[15px] font-semibold text-[#2E7D6F] hover:underline mt-0.5 inline-block"
                    >
                      {CENTER_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EDF6F3] text-[#2E7D6F] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#667885]">
                      Email
                    </p>
                    <a
                      href={`mailto:${CENTER_INFO.email}`}
                      className="text-[15px] font-semibold text-[#2E7D6F] hover:underline mt-0.5 inline-block"
                    >
                      {CENTER_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Coordinates */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F3EFE9] text-[#5C6D7A] flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#667885]">
                      GPS Coordinates
                    </p>
                    <p className="text-sm text-[#4A5B68] font-mono mt-1">
                      {CENTER_INFO.latitude}° N, {CENTER_INFO.longitude}° E
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EFEAE2]">
              <a
                href={CENTER_INFO.googleMapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#2E7D6F] hover:bg-[#236358] text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow-[0_8px_20px_rgba(46,125,111,0.22)] transition-all hover:-translate-y-0.5"
              >
                <span>Open Directions in Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Live Map */}
          <div className="lg:col-span-7">
            <div className="h-[380px] sm:h-[460px] lg:h-full min-h-[380px] rounded-[2rem] overflow-hidden border border-[#E6E0D6] shadow-[0_14px_38px_rgba(30,46,59,0.08)] bg-[#EFEAE2]">
              <iframe
                title="Grow Well Therapy Center Location Map in Ludhiana"
                src={CENTER_INFO.googleMapsEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
