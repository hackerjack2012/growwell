import React, { useEffect, useMemo, useState } from 'react';
import {
  Download,
  Eye,
  EyeOff,
  Inbox,
  Lock,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Trash2,
  Unlock,
  X,
} from 'lucide-react';
import {
  LOCKOUT_SECONDS,
  MAX_LOGIN_ATTEMPTS,
  STAFF_PASSCODE,
} from '../config/admin';
import { SERVICE_LABELS } from '../data/content';
import { ConsultationSubmission, SubmissionStatus } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: ConsultationSubmission[];
  onUpdateStatus: (index: number, status: SubmissionStatus) => void;
  onDeleteSubmission: (index: number) => void;
}

const STATUS_STYLES: Record<SubmissionStatus, string> = {
  new: 'bg-[#FDF2E9] text-[#B85E27] border-[#F6D3B8]',
  contacted: 'bg-[#EEF4FB] text-[#285A8C] border-[#CBE0F5]',
  scheduled: 'bg-[#EDF6F3] text-[#236358] border-[#C5E5DA]',
  completed: 'bg-[#F2F4F6] text-[#4A5B68] border-[#DCE2E7]',
};

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  submissions,
  onUpdateStatus,
  onDeleteSubmission,
}) => {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState<string>('all_filter');

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

  // Countdown after repeated failed sign-in attempts
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = window.setTimeout(
      () => setLockoutSeconds((prev) => prev - 1),
      1000
    );
    return () => window.clearTimeout(timer);
  }, [lockoutSeconds]);

  // Reset the sign-in form whenever the portal is fully closed
  useEffect(() => {
    if (isOpen) return;
    setUnlocked(false);
    setPasscode('');
    setShowPasscode(false);
    setAuthError('');
    setFailedAttempts(0);
    setLockoutSeconds(0);
  }, [isOpen]);

  const filteredWithIndices = useMemo(() => {
    return submissions
      .map((item, originalIndex) => ({ item, originalIndex }))
      .filter(({ item }) => {
        const matchesService =
          serviceFilter === 'all_filter' || item.serviceType === serviceFilter;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !q ||
          item.parentName.toLowerCase().includes(q) ||
          item.childName.toLowerCase().includes(q) ||
          item.phone.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q);
        return matchesService && matchesSearch;
      })
      .reverse();
  }, [submissions, searchQuery, serviceFilter]);

  const stats = useMemo(() => {
    const total = submissions.length;
    const newCount = submissions.filter(
      (s) => !s.status || s.status === 'new'
    ).length;
    const scheduledCount = submissions.filter(
      (s) => s.status === 'scheduled'
    ).length;
    return { total, newCount, scheduledCount };
  }, [submissions]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    if (passcode.trim() === STAFF_PASSCODE) {
      setUnlocked(true);
      setAuthError('');
      setPasscode('');
      setFailedAttempts(0);
      setLockoutSeconds(0);
      return;
    }

    const nextAttempts = failedAttempts + 1;
    setFailedAttempts(nextAttempts);
    setPasscode('');

    if (nextAttempts >= MAX_LOGIN_ATTEMPTS) {
      setAuthError(
        `Too many unsuccessful attempts. Please wait ${LOCKOUT_SECONDS} seconds before trying again.`
      );
      setLockoutSeconds(LOCKOUT_SECONDS);
      setFailedAttempts(0);
    } else {
      const remaining = MAX_LOGIN_ATTEMPTS - nextAttempts;
      setAuthError(
        `Incorrect staff passcode. ${remaining} ${
          remaining === 1 ? 'attempt' : 'attempts'
        } remaining.`
      );
    }
  };

  const handleExportCsv = () => {
    if (submissions.length === 0) return;
    const headers = [
      'Submitted At',
      'Parent Name',
      'Child Name',
      'Age',
      'Service',
      'Phone',
      'Email',
      'Status',
      'Notes',
    ];
    const rows = submissions.map((s) => [
      new Date(s.timestamp).toLocaleString(),
      s.parentName,
      s.childName,
      s.childAge,
      SERVICE_LABELS[s.serviceType] || s.serviceType,
      s.phone,
      s.email,
      s.status || 'new',
      s.notes || '',
    ]);
    const csv = [headers, ...rows]
      .map((r) =>
        r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      )
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `grow-well-consultations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const cleanPhoneForWhatsApp = (phone: string) =>
    phone.replace(/[^\d]/g, '');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1E2E3B]/60 backdrop-blur-sm animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full ${
          unlocked ? 'max-w-5xl' : 'max-w-md'
        } bg-[#FAF8F5] rounded-[2rem] shadow-[0_28px_70px_rgba(30,46,59,0.3)] border border-white/80 overflow-hidden my-auto animate-modal-up`}
      >
        {/* Top Bar */}
        <div className="bg-[#1E2E3B] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2E7D6F] flex items-center justify-center">
              {unlocked ? (
                <Unlock className="w-4 h-4 text-white" />
              ) : (
                <Lock className="w-4 h-4 text-white" />
              )}
            </div>
            <div>
              <h2
                id="admin-modal-title"
                className="font-display text-xl font-semibold text-white"
              >
                Grow Well Staff Portal
              </h2>
              <p className="text-xs text-[#B6C5D1]">
                Consultation Inquiries &amp; Care Coordination
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close staff admin portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!unlocked ? (
          /* Staff Passcode Screen */
          <div className="p-7 sm:p-8">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#667885] mb-3">
              <Lock className="w-3.5 h-3.5 text-[#2E7D6F]" />
              <span>Authorized staff only</span>
            </div>

            <p className="text-sm text-[#4A5B68] leading-relaxed mb-5">
              Enter your private clinic passcode to view and manage consultation
              requests saved from the website.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="adminPasscode"
                  className="block text-xs font-bold uppercase tracking-wider text-[#3B4C59] mb-1.5"
                >
                  Staff Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    id="adminPasscode"
                    name="adminPasscode"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setAuthError('');
                    }}
                    placeholder="Enter passcode"
                    autoComplete="current-password"
                    disabled={lockoutSeconds > 0}
                    className="w-full pl-4 pr-12 py-3 rounded-xl bg-white border border-[#DDD6CA] text-sm text-[#1E2E3B] placeholder:text-[#98A4AE] focus:border-[#2E7D6F] focus:ring-2 focus:ring-[#2E7D6F]/15 focus:outline-none disabled:bg-[#F1ECE4] disabled:cursor-not-allowed"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode((prev) => !prev)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center text-[#7A8B97] hover:text-[#1E2E3B] hover:bg-[#F3EFE9] transition-colors cursor-pointer"
                    aria-label={
                      showPasscode ? 'Hide staff passcode' : 'Show staff passcode'
                    }
                    aria-pressed={showPasscode}
                  >
                    {showPasscode ? (
                      <EyeOff className="w-4.5 h-4.5" />
                    ) : (
                      <Eye className="w-4.5 h-4.5" />
                    )}
                  </button>
                </div>
                {authError && (
                  <p
                    role="alert"
                    className="mt-2 text-xs font-medium text-[#B4433A] leading-relaxed"
                  >
                    {authError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={lockoutSeconds > 0 || passcode.length === 0}
                className="w-full bg-[#2E7D6F] hover:bg-[#236358] disabled:bg-[#B9CDC8] text-white font-semibold py-3 rounded-full transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                {lockoutSeconds > 0
                  ? `Locked for ${lockoutSeconds}s`
                  : 'Sign In to Dashboard'}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-[#EAE4DB] text-xs text-[#7A8B97] leading-relaxed">
              <p>
                Forgot or need to update the passcode? Contact the center
                administrator.
              </p>
            </div>
          </div>
        ) : (
          /* Unlocked Admin Dashboard */
          <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto space-y-6">
            {/* Summary Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 border border-[#EAE4DB]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#667885]">
                  Total Requests
                </p>
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#1E2E3B] mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="bg-[#FDF2E9]/70 rounded-2xl p-4 border border-[#F5D6BE]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#B85E27]">
                  New / Awaiting
                </p>
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#B85E27] mt-1">
                  {stats.newCount}
                </p>
              </div>
              <div className="bg-[#EDF6F3] rounded-2xl p-4 border border-[#CFE8DF]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#236358]">
                  Scheduled
                </p>
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#236358] mt-1">
                  {stats.scheduledCount}
                </p>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#7A8B97] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search parent, child, phone, or email..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#DDD6CA] text-sm text-[#1E2E3B] focus:border-[#2E7D6F] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6CA] text-sm text-[#1E2E3B] focus:border-[#2E7D6F] focus:outline-none"
                  aria-label="Filter by therapy service"
                >
                  <option value="all_filter">All Services</option>
                  <option value="occupational">Occupational</option>
                  <option value="speech">Speech &amp; Language</option>
                  <option value="physical">Physical</option>
                  <option value="all">Combined Evaluation</option>
                </select>

                <button
                  type="button"
                  onClick={handleExportCsv}
                  disabled={submissions.length === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2E7D6F] hover:bg-[#236358] disabled:bg-[#C2D2CE] text-white text-sm font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Submissions List */}
            {filteredWithIndices.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-[#D8D1C5] p-10 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#EDF6F3] text-[#2E7D6F] flex items-center justify-center mx-auto mb-3">
                  <Inbox className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#1E2E3B]">
                  {submissions.length === 0
                    ? 'No Consultation Requests Yet'
                    : 'No Matching Requests Found'}
                </h3>
                <p className="text-sm text-[#5E707E] mt-1 max-w-md mx-auto">
                  {submissions.length === 0
                    ? 'Submissions from the booking form automatically appear here in real time.'
                    : 'Try clearing your search or selecting another therapy filter.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredWithIndices.map(({ item, originalIndex }) => {
                  const status: SubmissionStatus = item.status || 'new';
                  const cleanWa = cleanPhoneForWhatsApp(item.phone);

                  return (
                    <div
                      key={item.id || `${item.timestamp}-${originalIndex}`}
                      className="bg-white rounded-2xl p-5 border border-[#EAE4DB] hover:border-[#D3CBBF] transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-base text-[#1E2E3B]">
                              {item.parentName}
                            </span>
                            <span className="text-sm text-[#5E707E]">
                              · Child:{' '}
                              <strong className="text-[#2E3F4D]">
                                {item.childName}
                              </strong>{' '}
                              (Age {item.childAge})
                            </span>
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EDF6F3] text-[#236358]">
                              {SERVICE_LABELS[item.serviceType] ||
                                item.serviceType}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-[#546573]">
                            <a
                              href={`tel:${item.phone}`}
                              className="inline-flex items-center gap-1 hover:text-[#2E7D6F]"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>{item.phone}</span>
                            </a>
                            <a
                              href={`mailto:${item.email}`}
                              className="inline-flex items-center gap-1 hover:text-[#2E7D6F]"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>{item.email}</span>
                            </a>
                            <span className="text-xs text-[#80909C]">
                              {new Date(item.timestamp).toLocaleString(
                                'en-IN',
                                {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: 'numeric',
                                  minute: '2-digit',
                                }
                              )}
                            </span>
                          </div>

                          {item.notes && (
                            <p className="text-xs sm:text-sm text-[#455664] bg-[#FAF8F5] rounded-xl px-3.5 py-2 border border-[#EFEAE2] mt-2">
                              <span className="font-semibold text-[#1E2E3B]">
                                Note:{' '}
                              </span>
                              {item.notes}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <select
                            value={status}
                            onChange={(e) =>
                              onUpdateStatus(
                                originalIndex,
                                e.target.value as SubmissionStatus
                              )
                            }
                            aria-label={`Status for ${item.parentName}`}
                            className={`text-xs font-bold px-3 py-2 rounded-full border cursor-pointer focus:outline-none ${STATUS_STYLES[status]}`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                          </select>

                          {cleanWa.length >= 10 && (
                            <a
                              href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(
                                `Hello ${item.parentName}, this is Grow Well Therapy Center following up on your consultation request for ${item.childName}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C43] text-xs font-bold transition-colors"
                              title="Follow up on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => onDeleteSubmission(originalIndex)}
                            className="p-2 rounded-full text-[#8B9AA6] hover:text-[#C0483E] hover:bg-[#FCECEB] transition-colors cursor-pointer"
                            aria-label={`Delete inquiry from ${item.parentName}`}
                            title="Delete inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
