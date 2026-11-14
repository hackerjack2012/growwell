import { useEffect, useState } from 'react';
import { AdminModal } from './components/AdminModal';
import { ApproachSection } from './components/ApproachSection';
import { BookingModal } from './components/BookingModal';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LocationSection } from './components/LocationSection';
import { Navbar } from './components/Navbar';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ServicesSection } from './components/ServicesSection';
import { StoriesSection } from './components/StoriesSection';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import {
  ConsultationSubmission,
  ServiceKey,
  SubmissionStatus,
  TherapyService,
} from './types';

const STORAGE_KEY = 'growChildSubmissions';

const SAMPLE_SUBMISSIONS: ConsultationSubmission[] = [
  {
    id: 'sample-1',
    parentName: 'Meera Kapoor',
    childName: 'Vihaan',
    childAge: '4',
    serviceType: 'speech',
    email: 'meera.kapoor@example.com',
    phone: '+91 98154 22310',
    notes: 'Looking for gentle speech clarity & social play sessions after 3 PM.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    status: 'new',
  },
  {
    id: 'sample-2',
    parentName: 'Harpreet Singh',
    childName: 'Simran',
    childAge: '6',
    serviceType: 'occupational',
    email: 'harpreet.s@example.com',
    phone: '+91 98761 44890',
    notes: 'Fine motor & handwriting support ahead of primary school.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    status: 'scheduled',
  },
];

function loadSubmissions(): ConsultationSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function App() {
  const [submissions, setSubmissions] = useState<ConsultationSubmission[]>(() =>
    loadSubmissions()
  );
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<ServiceKey | ''>(
    ''
  );
  const [selectedServiceDetail, setSelectedServiceDetail] =
    useState<TherapyService | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [largeText, setLargeText] = useState(false);

  // Persist submissions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [submissions]);

  // Apply WCAG large text class on html element
  useEffect(() => {
    const root = document.documentElement;
    if (largeText) {
      root.classList.add('text-large');
    } else {
      root.classList.remove('text-large');
    }
  }, [largeText]);

  const handleOpenBooking = (service?: ServiceKey) => {
    setPreselectedService(service || '');
    setBookingOpen(true);
  };

  const handleSubmitConsultation = (record: ConsultationSubmission) => {
    setSubmissions((prev) => [...prev, record]);
  };

  const handleUpdateStatus = (index: number, status: SubmissionStatus) => {
    setSubmissions((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, status } : item))
    );
  };

  const handleDeleteSubmission = (index: number) => {
    setSubmissions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleLoadSampleData = () => {
    setSubmissions(SAMPLE_SUBMISSIONS);
  };

  const newSubmissionsCount = submissions.filter(
    (s) => !s.status || s.status === 'new'
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E2E3B]">
      {/* Skip link for keyboard & screen-reader accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-[#2E7D6F] focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setAdminOpen(true)}
        newSubmissionsCount={newSubmissionsCount}
      />

      <main id="main-content" className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />

        <ServicesSection
          onSelectServiceDetail={(service) => setSelectedServiceDetail(service)}
          onBookService={(serviceId) => handleOpenBooking(serviceId)}
        />

        <ApproachSection />

        <StoriesSection />

        <LocationSection />

        <CtaBanner onOpenBooking={() => handleOpenBooking()} />
      </main>

      <Footer
        onOpenBooking={() => handleOpenBooking()}
        largeText={largeText}
        onToggleLargeText={() => setLargeText((prev) => !prev)}
      />

      <WhatsAppFloat />

      {/* Modals */}
      <ServiceDetailModal
        service={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        onBookService={(serviceId) => handleOpenBooking(serviceId)}
      />

      <BookingModal
        isOpen={bookingOpen}
        initialService={preselectedService}
        onClose={() => setBookingOpen(false)}
        onSubmitConsultation={handleSubmitConsultation}
      />

      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        submissions={submissions}
        onUpdateStatus={handleUpdateStatus}
        onDeleteSubmission={handleDeleteSubmission}
        onLoadSampleData={handleLoadSampleData}
      />
    </div>
  );
}

export default App;
