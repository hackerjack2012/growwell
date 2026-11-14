import React, { useEffect } from 'react';
import { Calendar, Check, Clock, Sparkles, Users, X } from 'lucide-react';
import { ServiceKey, TherapyService } from '../types';

interface ServiceDetailModalProps {
  service: TherapyService | null;
  onClose: () => void;
  onBookService: (serviceId: ServiceKey) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  useEffect(() => {
    if (!service) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1E2E3B]/55 backdrop-blur-sm animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-detail-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-[0_28px_70px_rgba(30,46,59,0.28)] border border-white/70 my-auto animate-modal-up">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1E2E3B] shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
          aria-label="Close therapy details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden bg-[#EFEAE2]">
          <img
            src={service.image}
            alt={service.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2E3B]/75 via-[#1E2E3B]/20 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25 mb-2">
              Personalized 1-on-1 Program
            </span>
            <h2
              id="service-detail-title"
              className="font-display text-2xl sm:text-3xl font-semibold text-white"
            >
              {service.title}
            </h2>
            <p className="text-sm text-white/90 mt-1">{service.tagline}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Quick Metadata Pills */}
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E6E0D6] text-xs sm:text-sm font-medium text-[#344654]">
              <Users className="w-4 h-4 text-[#2E7D6F]" />
              <span>{service.ageRange}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E6E0D6] text-xs sm:text-sm font-medium text-[#344654]">
              <Clock className="w-4 h-4 text-[#E68A4F]" />
              <span>{service.sessionDuration}</span>
            </div>
          </div>

          <p className="text-[#4A5B68] leading-relaxed text-[15px]">
            {service.description}
          </p>

          {/* How It Helps */}
          <div className="bg-white rounded-2xl p-5 border border-[#EAE4DB]">
            <h3 className="font-display text-lg font-semibold text-[#1E2E3B] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E68A4F]" />
              How This Therapy Supports Your Child
            </h3>
            <ul className="space-y-2.5">
              {service.whoItHelps.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm text-[#455664] leading-relaxed"
                >
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#EDF6F3] text-[#2E7D6F] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.6]" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Inside a Session */}
          <div className="bg-[#EDF6F3]/75 rounded-2xl p-5 border border-[#D4E9E2]">
            <h3 className="font-display text-lg font-semibold text-[#1E2E3B] mb-2">
              Inside a Grow Well Session
            </h3>
            <p className="text-sm text-[#3E5260] leading-relaxed">
              {service.insideSession}
            </p>
          </div>

          {/* CTA Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-full text-sm font-semibold text-[#4A5B68] hover:text-[#1E2E3B] hover:bg-[#EFEAE2] transition-colors cursor-pointer"
            >
              Back to Services
            </button>
            <button
              type="button"
              onClick={() => {
                const targetId = service.id;
                onClose();
                onBookService(targetId);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2E7D6F] hover:bg-[#236358] text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow-[0_8px_22px_rgba(46,125,111,0.28)] transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book {service.shortTitle} Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
