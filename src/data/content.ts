import {
  AdditionalSupportProgram,
  CareJourneyStep,
  FamilyTestimonial,
  TherapyService,
} from '../types';

export const CENTER_INFO = {
  name: 'Grow Well',
  fullName: 'Grow Well Therapy Center',
  tagline: 'Therapy Center for Specially Abled Kids',
  addressLine1: 'Near Pizza Bite Hub, Radha Swami Road',
  addressLine2: 'Opp. USPC Jain Public School, Ludhiana-141015',
  fullAddress:
    'Near Pizza Bite Hub, Radha Swami Road, Opp. USPC Jain Public School, Ludhiana-141015',
  latitude: 30.900259,
  longitude: 75.919442,
  phoneDisplay: '+91 7340715741',
  phoneRaw: '917340715741',
  phoneHref: 'tel:+917340715741',
  email: 'hello@growchild.org',
  hoursWeekday: 'Monday – Saturday: 9:00 AM – 6:00 PM',
  hoursSunday: 'Sunday: Closed',
  whatsappUrl:
    'https://wa.me/917340715741?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Grow%20Well%20therapy%20services.',
  googleMapsDirectUrl:
    'https://www.google.com/maps/search/?api=1&query=30.900259,75.919442',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=30.900259,75.919442&z=16&output=embed',
};

export const TRUST_METRICS = [
  {
    value: '2+',
    label: 'Licensed Therapists',
    detail: 'Dedicated 1-on-1 clinical specialists',
  },
  {
    value: '12+',
    label: 'Families Supported',
    detail: 'Intimate, personalized care attention',
  },
  {
    value: '8+',
    label: 'Years of Excellence',
    detail: 'Trusted evidence-based guidance',
  },
  {
    value: '100%',
    label: 'Family-Centered',
    detail: 'Parents partnered at every milestone',
  },
];

export const CORE_SERVICES: TherapyService[] = [
  {
    id: 'occupational',
    title: 'Occupational Therapy',
    shortTitle: 'Occupational',
    tagline: 'Everyday confidence through purposeful play',
    description:
      'Building daily living skills, fine motor abilities, sensory processing, and independence through engaging activities.',
    image: '/images/occupational-therapy.jpg',
    imageAlt:
      'Young child practicing fine motor skills with wooden Montessori pegboards alongside a smiling occupational therapist',
    accentColor: 'sage',
    highlights: [
      'Fine motor & handwriting',
      'Sensory integration',
      'Self-care routines',
    ],
    whoItHelps: [
      'Children experiencing sensory sensitivities to sounds, textures, or transitions',
      'Kids working on pencil grip, scissors, buttoning, or independent eating',
      'Children building focus, emotional regulation, and calm daily routines',
    ],
    insideSession:
      'Every 45-minute session feels like purposeful, joyful play. Using tactile wooden tools, sensory swings, and structured routines, we gently build motor planning and independence at your child’s exact comfort pace.',
    ageRange: 'Ages 1.5 – 16 years',
    sessionDuration: '45 mins · 1-on-1',
  },
  {
    id: 'speech',
    title: 'Speech & Language Therapy',
    shortTitle: 'Speech & Language',
    tagline: 'Helping every voice be heard and celebrated',
    description:
      'Supporting clear communication, language development, social skills, and feeding abilities.',
    image: '/images/speech-therapy.jpg',
    imageAlt:
      'Compassionate speech therapist sitting on a cozy rug engaging a smiling young boy with illustrated animal story cards',
    accentColor: 'terracotta',
    highlights: ['Speech delays', 'Social communication', 'Articulation'],
    whoItHelps: [
      'Toddlers and children with delayed first words or expressive language',
      'Kids strengthening articulation clarity, listening comprehension, and conversation',
      'Children developing peer play skills, non-verbal cues, or oral-motor feeding comfort',
    ],
    insideSession:
      'Seated warmly at eye level with picture cards, storybooks, and interactive turn-taking games, our therapist nurtures natural communication—never pressured drills—while coaching parents on simple home cues.',
    ageRange: 'Ages 1.5 – 16 years',
    sessionDuration: '45 mins · 1-on-1',
  },
  {
    id: 'physical',
    title: 'Physical Therapy',
    shortTitle: 'Physical',
    tagline: 'Moving with strength, balance, and joy',
    description:
      'Improving strength, balance, coordination, and mobility so children can move confidently.',
    image: '/images/physical-therapy.jpg',
    imageAlt:
      'Smiling pediatric physical therapist holding the hand of a happy child walking across colorful soft balance stepping stones',
    accentColor: 'teal',
    highlights: [
      'Gross motor skills',
      'Balance & coordination',
      'Posture & mobility',
    ],
    whoItHelps: [
      'Children working on core stability, walking confidence, jumping, or stair climbing',
      'Kids with low muscle tone, balance differences, or coordination challenges',
      'Children building stamina and posture for playground play and school comfort',
    ],
    insideSession:
      'Inside our bright, cushioned movement studio, children climb, balance on pastel stepping stones, and complete fun obstacle courses that steadily build strength, body awareness, and pride in movement.',
    ageRange: 'Ages 1 – 16 years',
    sessionDuration: '45 mins · 1-on-1',
  },
];

export const ADDITIONAL_PROGRAMS: AdditionalSupportProgram[] = [
  {
    id: 'sensory-play',
    title: 'Sensory Integration & Play Readiness',
    subtitle: 'Calm regulation & school transitions',
    description:
      'Gentle sensory-friendly environments tailored to help children process sight, sound, touch, and movement comfortably while preparing for group classroom routines.',
    highlights: [
      'Individualized sensory diet guidance',
      'Calm transition strategies for home & school',
      'Peer turn-taking & joyful play confidence',
    ],
    recommendedService: 'occupational',
  },
  {
    id: 'early-intervention',
    title: 'Early Intervention & Parent Coaching',
    subtitle: 'Comprehensive multi-therapy collaboration',
    description:
      'When your child benefits from combined Occupational, Speech, and Physical support, we coordinate a unified developmental roadmap with regular parent coaching.',
    highlights: [
      'Combined developmental screening',
      'Practical weekly home-activity plans',
      'Ongoing milestone reviews with parents',
    ],
    recommendedService: 'all',
  },
];

export const CARE_JOURNEY: CareJourneyStep[] = [
  {
    step: '01',
    title: 'Free Listening Consultation',
    description:
      'A warm, unhurried conversation with our care team where you share your child’s story, strengths, and hopes.',
  },
  {
    step: '02',
    title: 'Play-Based Evaluation',
    description:
      'Gentle observation through familiar play so your child feels safe, respected, and genuinely understood.',
  },
  {
    step: '03',
    title: 'Individualized Care Plan',
    description:
      'Clear, realistic goals tailored around your child’s unique pace across OT, Speech, or Physical Therapy.',
  },
  {
    step: '04',
    title: 'Active Family Partnership',
    description:
      'Simple everyday strategies and milestone check-ins so progress continues naturally at home and school.',
  },
];

export const FAMILY_TESTIMONIALS: FamilyTestimonial[] = [
  {
    id: 'priya',
    quote:
      'After just a few months, our son is speaking more, playing with peers, and showing so much joy. We finally feel hopeful.',
    author: 'Priya M.',
    relation: 'Mother of Aarav (age 5)',
    focusTag: 'Speech & Social Play',
    initials: 'PM',
  },
  {
    id: 'rahul',
    quote:
      "The team at Grow Well truly cares. They've helped our daughter gain confidence and independence in ways we never imagined.",
    author: 'Rahul S.',
    relation: 'Father of Ananya',
    focusTag: 'Confidence & Independence',
    initials: 'RS',
  },
];

export const SERVICE_LABELS: Record<string, string> = {
  occupational: 'Occupational Therapy',
  speech: 'Speech & Language Therapy',
  physical: 'Physical Therapy',
  all: 'All / Combined Evaluation',
};
