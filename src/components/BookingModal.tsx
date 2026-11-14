import React, { useEffect, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  X,
} from 'lucide-react';
import { CENTER_INFO, SERVICE_LABELS } from '../data/content';
import { ConsultationSubmission, ServiceKey } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  initialService?: ServiceKey | '';
  onClose: () => void;
  onSubmitConsultation: (submission: ConsultationSubmission) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  initialService = '',
  onClose,
  onSubmitConsultation,
}) => {
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [serviceType, setServiceType] = useState<string>(initialService);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] =
    useState<ConsultationSubmission | null>(null);

  useEffect(() => {
    if (isOpen) {
      setServiceType(initialService || '');
      setSubmittedRecord(null);
      setIsSubmitting(false);
    }
  }, [isOpen, initialService]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const record: ConsultationSubmission = {
      id: `gw-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      parentName: parentName.trim(),
      childName: childName.trim(),
      childAge: childAge.trim(),
      serviceType: serviceType || 'all',
      email: email.trim(),
      phone: phone.trim(),
      notes: notes.trim() || undefined,
      timestamp: new Date().toISOString(),
      status: 'new',
    };

    setTimeout(() => {
      onSubmitConsultation(record);
      setSubmittedRecord(record);
      setIsSubmitting(false);
      setParentName('');
      setChildName('');
      setChildAge('');
      setServiceType('');
      setEmail('');
      setPhone('');
      setNotes('');
    }, 350);
  };

  const getWhatsAppFollowUp = (record: ConsultationSubmission) => {
    const serviceLabel =
      SERVICE_LABELS[record.serviceType] || record.serviceType;
    const text = `Hello Grow Well team, I just submitted a consultation request for ${record.childName} (Age ${record.childAge}) regarding ${serviceLabel}. Parent name: ${record.parentName}.`;
    return `https://wa.me/${CENTER_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1E2E3B]/55 backdrop-blur-sm animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-[2rem] shadow-[0_28px_70px_rgba(30,46,59,0.28)] border border-white/80 overflow-hidden my-auto animate-modal-up">
        {/* Top Sage Accent Strip */}
        <div className="h-2 bg-gradient-to-r from-[#2E7D6F] via-[#4A9B8E] to-[#E68A4F]" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white hover:bg-[#EFEAE2] text-[#4A5B68] hover:text-[#1E2E3B] border border-[#E6E0D6] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close consultation modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {submittedRecord ? (
            /* Confirmation View */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#EDF6F3] text-[#2E7D6F] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h2
                  id="booking-modal-title"
                  className="font-display text-2xl sm:text-3xl font-semibold text-[#1E2E3B]"
                >
                  Thank You, {submittedRecord.parentName}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#4A5B68] leading-relaxed">
                  We&apos;ve received your consultation request for{' '}
                  <strong className="text-[#1E2E3B]">
                    {submittedRecord.childName}
                  </strong>
                  . Our compassionate care team will reach out within 24 hours.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#EAE4DB] text-left text-sm space-y-1.5">
                <div className="flex justify-between gap-2">
                  <span className="text-[#667885]">Selected Focus:</span>
                  <span className="font-semibold text-[#2E7D6F]">
                    {SERVICE_LABELS[submittedRecord.serviceType] ||
                      submittedRecord.serviceType}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#667885]">Contact Phone:</span>
                  <span className="font-medium text-[#1E2E3B]">
                    {submittedRecord.phone}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={getWhatsAppFollowUp(submittedRecord)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1FB858] text-white font-semibold text-sm px-5 py-3.5 rounded-full transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center bg-[#2E7D6F] hover:bg-[#236358] text-white font-semibold text-sm px-5 py-3.5 rounded-full transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Form View */
            <>
              <div className="pr-8 mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2E7D6F] bg-[#EDF6F3] px-3 py-1 rounded-full mb-2.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Free · No Obligation</span>
                </div>
                <h2
                  id="booking-modal-title"
                  className="font-display text-2xl sm:text-3xl font-semibold text-[#1E2E3B]"
                >
                  Schedule a Consultation
                </h2>
                <p className="text-sm text-[#566775] mt-1">
                  Share a few details below and our therapist will connect with
                  you at your convenience.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="parentName"
                      className="block text-xs font-bold uppercase tracking-wider text-[#3B4C59] mb-1.5"
                    >
                      Parent Name *
                    </label>
                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g., Priya Mehta"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD6CA] text-sm text-[#1E2E3B] placeholder:text-[#98A4AE] focus:border-[#2E7D6F] focus:ring-2 focus:ring-[#2E7D6F]/15 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="childName"
                      className="block text-xs font-bold uppercase tracking-wider text-[#3B4C59] mb-1.5"
                    >
                      Child Name *
                    </label>
                    <input
                      type="text"
                      id="childName"
                      name="childName"
                      required
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="e.g., Aarav"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD6CA] text-sm text-[#1E2E3B] placeholder:text-[#98A4AE] focus:border-[#2E7D6F] focus:ring-2 focus:ring-[#2E7D6F]/15 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="childAge"
                      className="block text-xs font-bold uppercase tracking-wider text-[#3B4C59] mb-1.5"
                    >
                      Child Age (Years) *
                    </label>
                    <input
                      type="number"
                      id="childAge"
                      name="childAge"
                      min={1}
                      max={18}
                      required
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      placeholder="1 – 18"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD6CA] text-sm text-[#1E2E3B] placeholder:text-[#98A4AE] focus:border-[#2E7D6F] focus:ring-2 focus:ring-[#2E7D6F]/15 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="serviceType"
                      className="block text-xs font-bold uppercase tracking-wider text-[#3B4C59] mb-1.5"
                    >
                      Therapy Service *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      required
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD6CA] text-sm text-[#1E2E3B] focus:border-[#2E7D6F] focus:ring-2 focus:ring-[#2E7D6F]/15 focus:outline-none transition-all"
                    >
                      <option value="">Select a service</option>
                      <option value="occupational">Occupational Therapy</option>
                      <option value="speech">Speech &amp; Language Therapy</option>
                      <option value="physical">Physical Therapy</option>
                      <option value="all">All / Not Sure Yet</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-wider text-[#3B4C59] mb-1.5"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="parent@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD6CA] text-sm text-[#1E2E3B] placeholder:text-[#98A4AE] focus:border-[#2E7D6F] focus:ring-2 focus:ring-[#2E7D6F]/15 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold uppercase tracking-wider text-[#3B4C59] mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD6CA] text-sm text-[#1E2E3B] placeholder:text-[#98A4AE] focus:border-[#2E7D6F] focus:ring-2 focus:ring-[#2E7D6F]/15 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-xs font-bold uppercase tracking-wider text-[#3B4C59] mb-1.5"
                  >
                    Anything You&apos;d Like Us to Know?{' '}
                    <span className="font-normal normal-case text-[#768591]">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Preferred call timing or your child's goals..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD6CA] text-sm text-[#1E2E3B] placeholder:text-[#98A4AE] focus:border-[#2E7D6F] focus:ring-2 focus:ring-[#2E7D6F]/15 focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-[#2E7D6F] hover:bg-[#236358] disabled:bg-[#9CB8B2] text-white font-semibold text-base py-3.5 rounded-full shadow-[0_10px_24px_rgba(46,125,111,0.26)] transition-all hover:-translate-y-0.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? 'Submitting Request...'
                    : 'Request Free Consultation'}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-xs text-[#6B7C89] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D6F]" />
                  <span>
                    Your family&apos;s information is kept strictly private and
                    confidential.
                  </span>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
