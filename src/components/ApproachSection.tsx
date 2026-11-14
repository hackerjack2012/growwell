import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';
import { CARE_JOURNEY } from '../data/content';

export const ApproachSection: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-[#FAF8F5] border-y border-[#EFEAE2]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Photo */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[2rem] bg-[#EDF6F3] -rotate-2 -z-10"
                aria-hidden="true"
              />
              <div className="rounded-[1.75rem] overflow-hidden shadow-[0_18px_45px_rgba(30,46,59,0.10)] border border-white">
                <img
                  src="/images/approach-sanctuary.jpg"
                  alt="Compassionate therapist sitting warmly with parents in a sunlit consultation lounge reviewing their child's developmental milestones"
                  className="w-full aspect-[4/3] lg:aspect-[4/4.4] object-cover"
                />
              </div>

              {/* Warm badge overlay */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:right-5 bg-white rounded-2xl px-5 py-4 shadow-[0_12px_30px_rgba(30,46,59,0.10)] border border-[#EAE4DB] flex items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-full bg-[#EDF6F3] text-[#2E7D6F] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1E2E3B]">
                    Parents as Active Partners
                  </p>
                  <p className="text-xs text-[#596A77]">
                    Collaborative weekly guidance for home
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Philosophy + 4-Step Care Journey */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#2E7D6F] bg-[#EDF6F3] px-3.5 py-1.5 rounded-full mb-4">
              <Heart className="w-3.5 h-3.5 text-[#E68A4F] fill-[#E68A4F]" />
              Our Approach
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1E2E3B] leading-tight">
              Clinical Excellence Guided by Genuine Compassion
            </h2>

            <div className="mt-5 space-y-4 text-base sm:text-lg text-[#455664] leading-relaxed">
              <p>
                At Grow Well, we believe every child deserves the opportunity to
                thrive. We combine clinical excellence with genuine compassion,
                creating individualized plans that honor each child&apos;s unique
                strengths and needs.
              </p>
              <p className="text-[#2E3F4D] font-medium">
                Our family-centered approach means parents are active partners in
                every step of the journey.
              </p>
            </div>

            {/* 4-Step Care Journey Grid */}
            <div className="mt-9 grid sm:grid-cols-2 gap-4">
              {CARE_JOURNEY.map((item) => (
                <div
                  key={item.step}
                  className="bg-white rounded-2xl p-5 border border-[#EAE4DB] hover:border-[#2E7D6F]/35 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display text-sm font-bold text-[#2E7D6F] bg-[#EDF6F3] px-2.5 py-1 rounded-lg">
                      {item.step}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-[#1E2E3B]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#546573] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
