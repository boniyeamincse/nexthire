// ============================================
// NEXTHIRE — SITE CONSTANTS
// ============================================

export const SITE = {
  name: 'NextHire',
  tagline: 'Land Your Dream Job',
  description: 'AI-powered mock interview platform with live tutor sessions, real-time feedback, and intelligent performance analytics.',
  url: 'https://nexthire.io',
};

export const NAV_LINKS = [
  { label: 'Features',    href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'For Tutors',  href: '#for-tutors' },
  { label: 'Pricing',     href: '#pricing' },
  { label: 'Enterprise',  href: '#enterprise' },
];

export const STATS = [
  { value: '50K+',   label: 'Interviews Conducted',  icon: '🎯' },
  { value: '8,200+', label: 'Expert Tutors',          icon: '👨‍🏫' },
  { value: '94%',    label: 'Placement Success Rate', icon: '🚀' },
  { value: '120+',   label: 'Interview Categories',   icon: '📂' },
];

export const FEATURES = [
  {
    id: 'ai-interview',
    icon: '🤖',
    badge: 'AI Powered',
    badgeVariant: 'badge-blue',
    title: 'AI Mock Interviews',
    desc: 'Practice with intelligent AI that asks adaptive follow-up questions, evaluates your tone, pacing, and clarity in real time.',
    color: '#00c6ff',
  },
  {
    id: 'live-sessions',
    icon: '🎥',
    badge: 'Live',
    badgeVariant: 'badge-purple',
    title: 'Live Tutor Sessions',
    desc: 'Book 1-on-1 video sessions with verified industry experts. Filter by domain, price, rating, and availability.',
    color: '#7c3aed',
  },
  {
    id: 'video-room',
    icon: '💻',
    badge: 'WebRTC',
    badgeVariant: 'badge-green',
    title: 'HD Interview Room',
    desc: 'Fully featured video interview room with screen sharing, live chat, session recording, and AI transcription.',
    color: '#06d6a0',
  },
  {
    id: 'ai-scoring',
    icon: '📊',
    badge: 'Analytics',
    badgeVariant: 'badge-blue',
    title: 'Performance Scorecard',
    desc: 'Get detailed scores on technical knowledge, communication, confidence, and receive personalized improvement plans.',
    color: '#00c6ff',
  },
  {
    id: 'smart-scheduling',
    icon: '🗓️',
    badge: 'Smart',
    badgeVariant: 'badge-amber',
    title: 'Smart Scheduling',
    desc: 'Calendly-style slot booking with automatic reminders via Email, SMS, WhatsApp, and push notifications.',
    color: '#f59e0b',
  },
  {
    id: 'wallet',
    icon: '💰',
    badge: 'Payments',
    badgeVariant: 'badge-green',
    title: 'Wallet & Earnings',
    desc: 'Tutors earn on every session. Commission-based marketplace with bKash, Nagad, Stripe, and SSLCommerz support.',
    color: '#06d6a0',
  },
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Create Your Profile',
    desc: 'Sign up as a student or tutor. Complete your profile, upload your resume, and set your goals.',
    icon: '👤',
  },
  {
    step: '02',
    title: 'Browse & Book Sessions',
    desc: 'Filter expert tutors by category, price, language, and rating. Book your slot in seconds.',
    icon: '🔍',
  },
  {
    step: '03',
    title: 'Complete Payment',
    desc: 'Secure checkout with multiple payment gateways. Instant booking confirmation sent to your inbox.',
    icon: '💳',
  },
  {
    step: '04',
    title: 'Join Interview Room',
    desc: 'Enter your HD video interview room. Share your screen, chat, and conduct the session live.',
    icon: '🎥',
  },
  {
    step: '05',
    title: 'Get AI Feedback',
    desc: 'Receive your performance scorecard with AI-powered insights, strengths, and improvement areas.',
    icon: '🤖',
  },
  {
    step: '06',
    title: 'Track Your Growth',
    desc: 'Monitor progress over time with analytics dashboards, certificates, and session history.',
    icon: '📈',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Anika Rahman',
    role: 'Software Engineer @ Google',
    avatar: 'AR',
    rating: 5,
    text: 'NextHire completely transformed my interview prep. The AI feedback was incredibly detailed and I landed my dream job after just 4 sessions!',
    color: '#00c6ff',
  },
  {
    name: 'Rafiq Ahmed',
    role: 'Senior Tutor — 800+ Sessions',
    avatar: 'RA',
    rating: 5,
    text: 'As a tutor, the platform is seamless. Scheduling, payments, and the video room all work perfectly. My earnings have tripled this year.',
    color: '#7c3aed',
  },
  {
    name: 'Priya Sharma',
    role: 'HR Lead @ TechCorp',
    avatar: 'PS',
    rating: 5,
    text: 'We use NextHire to run our campus hiring campaigns. The organization dashboard makes managing 200+ candidates completely effortless.',
    color: '#06d6a0',
  },
];

export const PRICING_PLANS = [
  {
    name: 'Student',
    price: '৳499',
    period: '/month',
    desc: 'Perfect for job seekers and freshers preparing for interviews.',
    features: [
      '5 AI Mock Interviews/month',
      '2 Live Tutor Sessions',
      'Performance Scorecard',
      'Resume Analysis',
      'Email Reminders',
      'Basic Analytics',
    ],
    cta: 'Start Free Trial',
    popular: false,
    variant: 'secondary',
  },
  {
    name: 'Pro',
    price: '৳1,299',
    period: '/month',
    desc: 'For serious candidates who want consistent expert coaching.',
    features: [
      'Unlimited AI Mock Interviews',
      '8 Live Tutor Sessions',
      'Advanced AI Scoring',
      'Resume + LinkedIn Review',
      'WhatsApp + SMS Reminders',
      'Interview Recording',
      'Priority Tutor Matching',
      'Certificate of Completion',
    ],
    cta: 'Get Pro',
    popular: true,
    variant: 'primary',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For universities, training centers, and HR teams.',
    features: [
      'Unlimited Everything',
      'Organization Dashboard',
      'Bulk Candidate Invitations',
      'Custom Branding',
      'Dedicated Account Manager',
      'API Access',
      'SLA & Compliance Reports',
      'SSO Integration',
    ],
    cta: 'Contact Sales',
    popular: false,
    variant: 'secondary',
  },
];

export const FOR_TUTORS = [
  { icon: '📅', title: 'Set Your Schedule', desc: 'Full control over your availability. Set slots, durations, and prices your way.' },
  { icon: '💸', title: 'Earn Every Session', desc: 'Competitive commission model. Request withdrawals anytime via bKash, Nagad, or bank transfer.' },
  { icon: '⭐', title: 'Build Your Reputation', desc: 'Collect verified reviews, boost your ranking, and grow your student base organically.' },
  { icon: '📊', title: 'Track Performance', desc: 'Real-time analytics on sessions, earnings, student ratings, and growth over time.' },
];

export const FOOTER_LINKS = {
  Product:  ['Features', 'How It Works', 'Pricing', 'Changelog', 'Roadmap'],
  Company:  ['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact'],
  Tutors:   ['Become a Tutor', 'Tutor Guidelines', 'Earnings', 'Verification', 'Support'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'],
};
