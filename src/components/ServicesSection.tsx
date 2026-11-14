import React, { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { ADDITIONAL_PROGRAMS, CORE_SERVICES } from '../data/content';
import { ServiceKey, TherapyService } from '../types';

interface ServicesSectionProps {
  onSelectServiceDetail: (service: TherapyService) => void;
  onBookService: (serviceId?: ServiceKey) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceDetail,
  onBookService,
}) => {
  const [showAllServices, setShowAllServices] = useState(false);

  return (
    <section id="services" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#2E7D6F] bg-[#EDF6F3] px-3.5 py-1.5 rounded-full mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#1E2E3B] leading-tight">
            Personalized Therapies Built Around Joyful Play
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5B68] leading-relaxed">
            Every therapy program is tailored to your child’s unique rhythm—helping
            them build everyday skills, expressive confidence, and lasting independence.
          </p>
        </div>

        {/* 3 Core Therapy Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {CORE_SERVICES.map((service) => {
            const pillStyles =
              service.accentColor === 'terracotta'
                ? 'bg-[#FDF2E9] text-[#B85E27]'
                : 'bg-[#EDF6F3] text-[#236358]';

            return (
              <article
                key={service.id}
                className="group flex flex-col bg-[#FAF8F5] rounded-[1.75rem] overflow-hidden border border-[#EAE4DB] shadow-[0_6px_22px_rgba(30,46,59,0.04)] hover:shadow-[0_18px_40px_rgba(46,125,111,0.12)] hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EFEAE2]">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm ${pillStyles}`}
                    >
                      {service.sessionDuration}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-6 sm:p-7">
                  <h3 className="font-display text-2xl font-semibold text-[#1E2E3B] group-hover:text-[#2E7D6F] transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-[15px] text-[#4A5B68] leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2.5 flex-1">
                    {service.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-sm font-medium text-[#2E3F4D]"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#D7ECE5] text-[#236358] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[2.7]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="mt-7 pt-5 border-t border-[#E8E2D9] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectServiceDetail(service)}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2E7D6F] hover:text-[#236358] transition-colors cursor-pointer group/btn"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onBookService(service.id)}
                      className="text-xs font-semibold px-3.5 py-2 rounded-full bg-white border border-[#DED7CC] hover:border-[#2E7D6F] hover:text-[#2E7D6F] text-[#3B4C59] transition-colors cursor-pointer"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Expandable Additional Programs */}
        {showAllServices && (
          <div className="mt-8 grid md:grid-cols-2 gap-7 animate-modal-up">
            {ADDITIONAL_PROGRAMS.map((program) => (
              <div
                key={program.id}
                className="bg-[#EDF6F3]/65 rounded-[1.75rem] p-7 border border-[#D4E9E2] flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#236358] bg-white px-3 py-1 rounded-full border border-[#D4E9E2] mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#E68A4F]" />
                    <span>{program.subtitle}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#1E2E3B]">
                    {program.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] text-[#4A5B68] leading-relaxed">
                    {program.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {program.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2.5 text-sm font-medium text-[#2E3F4D]"
                      >
                        <Check className="w-4 h-4 text-[#2E7D6F] shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D4E9E2]">
                  <button
                    type="button"
                    onClick={() => onBookService(program.recommendedService)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#2E7D6F] hover:text-[#236358] cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Free Consultation for This Program</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Controls */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setShowAllServices((prev) => !prev)}
            className="inline-flex items-center gap-2 bg-[#E68A4F] hover:bg-[#CF7035] text-white font-semibold px-7 py-3.5 rounded-full shadow-[0_8px_22px_rgba(230,138,79,0.28)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>
              {showAllServices
                ? 'Hide Additional Support Programs'
                : 'View All Services'}
            </span>
            {showAllServices ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onBookService('all')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D6F] hover:text-[#236358] px-5 py-3 rounded-full hover:bg-[#EDF6F3] transition-colors cursor-pointer"
          >
            <span>Not sure which therapy fits? Book a Free Evaluation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
