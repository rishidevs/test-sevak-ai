/** @jsxImportSource react */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCardIcon, BanknotesIcon, ShieldCheckIcon, ChatBubbleLeftEllipsisIcon, VideoCameraIcon, ChartBarIcon, CheckCircleIcon, UserGroupIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { 
  Rocket,
  CheckCircle, 
  Star,
  Phone,
  Mic,
  Shield,
  Users,
  Heart,
  MapPin,
  Clock,
  Award,
  Zap,
  IndianRupee,
  BanknoteIcon,
  Download,
  ChevronRight,
  Globe,
  UserCheck,
  Headphones, CreditCard, ShieldCheck, MessageCircle, Video, BarChart,
   Mail,
} from "lucide-react";


import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";
import { 
  trackFormSubmission, 
  trackButtonClick, 
  trackWhatsAppClick, 
  initScrollTracking,
  trackSectionView
} from "@/lib/analytics";
import { Analytics } from "@vercel/analytics/react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data for Featured Sevaks
const featuredSevaks = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 4.9,
    totalRatings: 127,
    location: "Bandra, Mumbai",
    hourlyRate: 350,
    skills: ["House Cleaning", "Organization"],
    tasksCompleted: 340,
    avatar: "PS",
    image: null
  },
  {
    id: 2,
    name: "Ravi Kumar",
    rating: 4.8,
    totalRatings: 203,
    location: "Koramangala, Bangalore",
    hourlyRate: 450,
    skills: ["Cooking", "North Indian"],
    tasksCompleted: 520,
    avatar: null,
    image: "/logos/logo90x90.png"
  },
  {
    id: 3,
    name: "Sunita Devi",
    rating: 5.0,
    totalRatings: 89,
    location: "Sector 14, Gurgaon",
    hourlyRate: 300,
    skills: ["Childcare", "Baby Sitting"],
    tasksCompleted: 280,
    avatar: null,
    image: "/logos/logo90x90.png"
  },
  {
    id: 4,
    name: "Mahesh Patil",
    rating: 4.7,
    totalRatings: 156,
    location: "Andheri, Mumbai",
    hourlyRate: 400,
    skills: ["Driving", "Car Care"],
    tasksCompleted: 410,
    avatar: null,
    image: "/logos/logo90x90.png"
  },
];

// Category data
const categories = [
  {
    id: 1,
    title: "Maids & Housekeeping",
    description: "Verified cleaning & household help",
    icon: MapPin,
    active: true,
    iconColor: "text-blue-600"
  },
  {
    id: 2,
    title: "Cooks & Chefs",
    description: "Skilled cooking professionals",
    icon: MapPin,
    active: true,
    iconColor: "text-green-600"
  },
  {
    id: 3,
    title: "Nannies & Babysitters",
    description: "Trusted childcare specialists",
    icon: MapPin,
    active: true,
    iconColor: "text-purple-600"
  },
  {
    id: 5,
    title: "Elderly Care",
    description: "Compassionate senior care",
    icon: MapPin,
    active: true,
    iconColor: "text-pink-600"
  },
  {
    id: 6,
    title: "Laundry & Ironing",
    description: "Garment care specialists",
    icon: MapPin,
    active: false,
    iconColor: "text-blue-600"
  },
  {
    id: 7,
    title: "Tutors",
    description: "Educational support & coaching",
    icon: MapPin,
    active: false,
    iconColor: "text-orange-600"
  },
  {
    id: 8,
    title: "Security Guards",
    description: "Trained security personnel",
    icon: MapPin,
    active: false,
    iconColor: "text-gray-600"
  },
  {
    id: 9,
    title: "Personal Assistants",
    description: "Administrative & personal support",
    icon: MapPin,
    active: false,
    iconColor: "text-teal-600"
  },
];

const workflowSteps = [
  {
    step: 1,
    title: "Tell us what you need",
    description: "Skip the typing—speak your requirements in your language using our voice feature."
  },
  {
    step: 2,
    title: "Get matched by our AI",
    description: "Top 3 verified Sevaks based on your needs"
  },
  {
    step: 3,
    title: "View profiles & interviews",
    description: "Flexible video interviews—set the time that suits you."
  },
  {
      "step": 4,
  "title": "Choose how to interview",
  "description": "→ Option 1: Connect directly with a video call<br/>→ Option 2: Save time—get our pre-screening with a summary report"
  },
  {
    step: 5,
    title: "Hire directly. Pay directly.",
    description: "No middlemen—hire and pay your Sevak directly. Discuss the salary and handle payment your way."
  },
];


// FAQ Section Data & Types
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I find a reliable Sevak?',
    answer: 'Use our AI matching feature to find Sevaks based on your specific needs. All Sevaks are background verified and have customer reviews.',
    category: 'Finding Sevaks'
  },
  {
    id: '2',
    question: 'What safety measures are in place?',
    answer: 'All Sevaks undergo background verification, police checks, and ID verification. We also provide emergency contact features.',
    category: 'Safety'
  },
  {
    id: '3',
    question: 'How does pricing work?',
    answer: 'Sevaks set their hourly rates. You can see the total cost before booking. We offer discounts for regular bookings.',
    category: 'Pricing'
  },
  {
    id: '4',
    question: 'Can I cancel a booking?',
    answer: 'Yes, you can cancel up to 2 hours before the scheduled time. Cancellation fees may apply for last-minute cancellations.',
    category: 'Bookings'
  },
  {
    id: '5',
    question: 'How do I become a Sevak?',
    answer: 'Tap "Become a Sevak" in your profile, complete the registration process, upload required documents, and pass our verification.',
    category: 'Becoming a Sevak'
  },
];

// Review data structure
interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  category: 'client' | 'Sevak';
  type?: string;
  avatar: string;
}

const clientReviews: Review[] = [
  // 5-Star Reviews
  {
    id: 'c1',
    name: 'RamCharan',
    rating: 5,
    review: 'I literally voiced my requirement in Telugu — found a caring Sevak for my parents within a day.',
    category: 'client',
    avatar: 'RC'
  },
  {
    id: 'c2',
    name: 'Raj Arjun',
    rating: 5,
    review: 'I paid for police verification and got a PCC-cleared maid — now I feel safe leaving her around my kids and elderly parents.',
    category: 'client',
    avatar: 'RA'
  },
  {
    id: 'c3',
    name: 'Kumar BT',
    rating: 5,
    review: 'The Sevak was punctual, polite, and spoke our language — matched perfectly on the first try.',
    category: 'client',
    avatar: 'KB'
  },
  // 4-Star Reviews
  {
    id: 'c4',
    name: 'Rohit Reddy',
    rating: 4,
    review: 'I got matched with the right nanny on the second try — worth the short wait.',
    category: 'client',
    avatar: 'RR'
  },
  {
    id: 'c5',
    name: 'Amit Reddy',
    rating: 4,
    review: 'App was easy, got two good options — but would\'ve liked more photos or voice samples.',
    category: 'client',
    avatar: 'AR'
  },
  {
    id: 'c6',
    name: 'Srilata B',
    rating: 4,
    review: 'My mom used the app easily and found help — one candidate didn\'t show, but the second was great.',
    category: 'client',
    avatar: 'SB'
  },
  {
    id: 'c7',
    name: 'Rathnakar P',
    rating: 4,
    review: 'I just typed what I needed — they did the rest. A bit of follow-up needed but good result.',
    category: 'client',
    avatar: 'RP'
  },
  // 3-Star Reviews
  {
    id: 'c8',
    name: 'Ramesh Duggirala',
    rating: 3,
    review: 'Got two profiles quickly, but one wasn\'t a good fit. Support team helped replace fast.',
    category: 'client',
    avatar: 'RD'
  },
  {
    id: 'c9',
    name: 'Sandesh',
    rating: 3,
    review: 'Service helped me in an urgent situation — but I wish the cook had more experience.',
    category: 'client',
    avatar: 'S'
  },
  {
    id: 'c10',
    name: 'Varun Adiraju',
    rating: 3,
    review: 'App is smooth and Sevaks are verified, but availability in my area was limited at first.',
    category: 'client',
    avatar: 'VA'
  },
];

const SevakReviews: Review[] = [
  // 5-Star Reviews
  {
    id: 'h1',
    name: 'Subhasini',
    rating: 5,
    review: 'I now clean 4 homes through SevakAI — no agent cuts, families treat me well.',
    category: 'Sevak',
    type: 'Maid',
    avatar: 'S'
  },
  {
    id: 'h2',
    name: 'Vijaya T',
    rating: 5,
    review: 'They placed me close to home and made my profile from my voice — I feel respected.',
    category: 'Sevak',
    type: 'Nanny',
    avatar: 'VT'
  },
  {
    id: 'h3',
    name: 'Seshikanth',
    rating: 5,
    review: 'I take care of an old couple now — they\'re kind, and I get paid properly every month.',
    category: 'Sevak',
    type: 'Elder Care',
    avatar: 'S'
  },
  {
    id: 'h4',
    name: 'Lakshmi V',
    rating: 5,
    review: 'SevakAI found me all my current houses — I even get compliments for my work.',
    category: 'Sevak',
    type: 'Maid',
    avatar: 'LV'
  },
  // 4-Star Reviews
  {
    id: 'h5',
    name: 'Govind',
    rating: 4,
    review: 'I like my work now — I get jobs directly and support if anything goes wrong.',
    category: 'Sevak',
    type: 'Elder Care',
    avatar: 'G'
  },
  {
    id: 'h6',
    name: 'Shivam',
    rating: 4,
    review: 'I gave my answers in Hindi and got placed in 2 days — I just wish I had more interviews.',
    category: 'Sevak',
    type: 'Nanny',
    avatar: 'S'
  },
  // 3-Star Reviews
  {
    id: 'h7',
    name: 'Esamma',
    rating: 3,
    review: 'I got a house to work in after 2 weeks — it\'s good now but I hope to get more work soon.',
    category: 'Sevak',
    type: 'Maid',
    avatar: 'E'
  },
  {
    id: 'h8',
    name: 'Ganga R',
    rating: 3,
    review: 'They made my profile and helped me talk better — just waiting for a second job now.',
    category: 'Sevak',
    type: 'Elder Care',
    avatar: 'GR'
  },
];

// ScrollableReviews Component
const ScrollableReviews: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const [api, setApi] = React.useState<any>();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!api) return;

    const autoScroll = () => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    };

    const startAutoScroll = () => {
      timeoutRef.current = setInterval(autoScroll, 4000);
    };

    const stopAutoScroll = () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    startAutoScroll();

    api.on('pointerDown', stopAutoScroll);
    api.on('pointerUp', () => {
      setTimeout(startAutoScroll, 3000);
    });

    return () => {
      stopAutoScroll();
    };
  }, [api]);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const getAvatarColor = (avatar: string) => {
    const colors = [
      'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500', 
      'bg-orange-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = avatar.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {reviews.map((review) => (
          <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  {renderStars(review.rating)}
                </div>
                <p className="text-slate-700 mb-4 italic flex-grow">
                  "{review.review}"
                </p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 ${getAvatarColor(review.avatar)} rounded-full flex items-center justify-center text-white font-bold mr-3`}>
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {review.name}
                    </p>
                    {review.type && (
                      <p className="text-sm text-slate-500">({review.type})</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
};

export default function Landing() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    address: '',
    helpType: '',
    language: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOTPField, setShowOTPField] = useState(false);
  const [otp, setOtp] = useState('');
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState("home");
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  
  const titles = [
    {
      firstLine: "Hire Trusted Help",
      secondLine: "Without the Guesswork",
      language: "English"
    },
    {
      firstLine: "विश्वसनीय सहायता किराए पर लें",
      secondLine: "बिना अनुमान के",
      language: "Hindi"
    },
    {
      firstLine: "నమ్మదగిన సహాయాన్ని నియమించండి",
      secondLine: "అంచనా లేకుండా",
      language: "Telugu"
    }
  ];

  useEffect(() => {
    initScrollTracking();
  }, []);

  useEffect(() => {
    // Handle scrolling to sections when navigating from other pages
    const scrollToSectionFromStorage = localStorage.getItem("scrollToSection");
    if (scrollToSectionFromStorage) {
      // Clear the localStorage item
      localStorage.removeItem("scrollToSection");
      
      // Wait for the page to render and then scroll
      setTimeout(() => {
        const element = document.getElementById(scrollToSectionFromStorage);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sectionIds = ["home", "featured-services", "how-it-works", "pricing", "testimonials", "faq", "contact"];
            setActiveSection(sectionIds[index] || "home");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); // Change title every 3 seconds

    return () => clearInterval(interval);
  }, [titles.length]);

  const helpTypes = [
    'Maid/Housekeeper',
    'Cook/Chef', 
    'Nanny/Babysitter',
    'Elderly Care',
    'Personal Assistant'
  ];

  const languages = [
    'English',
    'Hindi', 
    'Telugu',
    'Tamil',
    'Kannada',
    'Malayalam',
    'Bengali',
    'Marathi',
    'Gujarati'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!showOTPField) {
      trackFormSubmission('beta_signup_step1');
      trackButtonClick('send_otp', 'app-download');
      
      setIsSubmitting(true);
      setTimeout(() => {
        setShowOTPField(true);
        setIsSubmitting(false);
        toast({
          title: "OTP Sent! 📱",
          description: `Verification code sent to ${formData.phone}`,
        });
      }, 1000);
    } else {
      trackFormSubmission('beta_signup_complete', 100);
      trackButtonClick('verify_complete_signup', 'app-download');
      
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "Welcome to SevakAI! 🎉",
          description: "Please download our app to complete your hiring journey.",
        });
        const downloadSection = document.getElementById('app-download');
        if (downloadSection) {
          downloadSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openWhatsApp = () => {
    trackWhatsAppClick();
    const message = "Hi! I'm interested in SevakAI's services. Can you help me?";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAppDownload = (platform: string) => {
    trackButtonClick(`download_${platform}`, 'app-download');
    toast({
      title: `${platform} Download`,
      description: "App download will be available soon!",
    });
  };

  // Animation variants for Framer Motion
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };
  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      transition: { duration: 0.3, yoyo: Infinity } 
    },
  };
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden hero-section">
      <Analytics />
         {/* Hero Section */}
<section 
  id="home" 
  className="relative w-full pt-16 pb-24 bg-gradient-to-br from-orange-50 to-amber-100 overflow-hidden"
  ref={(el) => (sectionsRef.current[0] = el)}
>
  <motion.div 
    className="container mx-auto px-6 sm:px-4 text-center z-10 relative"
    initial="hidden"
    animate="visible"
    variants={heroVariants}
  >
    {/* Heading */}
    <motion.h1 
      className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-wide mb-4 leading-tight z-10 relative px-2 sm:px-4 overflow-hidden"
      variants={heroVariants}
    >
      <span className="relative inline-block">
        <AnimatePresence mode="wait">
          <motion.span
            key={`first-${currentTitleIndex}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`text-slate-900 whitespace-normal break-words block leading-relaxed ${
              titles[currentTitleIndex].language === 'English' 
                ? 'text-2xl sm:text-3xl md:text-4xl lg:text-6xl' 
                : 'text-lg sm:text-xl md:text-2xl lg:text-4xl'
            }`}
          >
            {titles[currentTitleIndex].firstLine}
          </motion.span>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.span
            key={`second-${currentTitleIndex}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 bg-clip-text text-transparent whitespace-normal break-words block leading-relaxed ${
              titles[currentTitleIndex].language === 'English' 
                ? 'text-2xl sm:text-3xl md:text-4xl lg:text-6xl' 
                : 'text-lg sm:text-xl md:text-2xl lg:text-4xl'
            }`}
          >
            {titles[currentTitleIndex].secondLine}
          </motion.span>
        </AnimatePresence>
        {/* Shimmer Effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] animate-shimmer"></span>
      </span>
    </motion.h1>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-3xl mx-auto px-2 sm:px-4">
      Say goodbye to random referrals. SevakAI connects you with verified helpers  —{" "}
      <span className="text-orange-500 font-semibold">
        using AI, not WhatsApp groups.
      </span>
    </p>

    {/* Hero Image */}
    <motion.div
      className="w-full mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <img
        src="/assets/hero.png"
        alt="Hire Trusted Help"
        className="w-full h-auto max-h-[500px] object-contain mx-auto rounded-none shadow-none"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </motion.div>

    {/* Key Features */}
    <motion.div 
      className="flex flex-wrap justify-center gap-4 mb-8"
      variants={heroVariants}
    >
      <Badge variant="secondary" className="bg-white text-slate-700 px-4 py-2 text-sm">
        🕒 Full-time | Part-time | One-time
      </Badge>
      <Badge variant="secondary" className="bg-white text-slate-700 px-4 py-2 text-sm">
        🛡️ Verified profiles | ₹ No commissions
      </Badge>
      <Badge variant="secondary" className="bg-white text-slate-700 px-4 py-2 text-sm">
        🌐 Multilingual AI
      </Badge>
    </motion.div>

    {/* Download App Section */}
    <motion.div 
      className="mb-8"
      variants={heroVariants}
    >
      <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">Download Our App</h3>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* App Store Button */}
        <motion.a
          href="#"
          className="inline-flex items-center bg-black text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="white">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <div className="text-left">
            <div className="text-xs">Download on the</div>
            <div className="text-base font-semibold">App Store</div>
          </div>
        </motion.a>
        {/* Google Play Button */}
        <motion.a
          href="#"
          className="inline-flex items-center bg-black text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
          </svg>
          <div className="text-left">
            <div className="text-xs">Get it on</div>
            <div className="text-base font-semibold">Google Play</div>
          </div>
        </motion.a>
      </div>
    </motion.div>

    {/* Location Badge */}
    <motion.div 
      variants={heroVariants}
      className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-base font-medium"
    >
      <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
      Now in Hyderabad. Expanding to Bengaluru, Chennai, and Dubai.
    </motion.div>
  </motion.div>
</section>


     {/* Why SevakAI Works */}
<section 
  className="py-20 px-4 bg-white"
  ref={(el) => (sectionsRef.current[1] = el)}
>
  <motion.div 
    className="max-w-6xl mx-auto"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={sectionVariants}
  >
    {/* Heading */}
    <div className="text-center mb-16">
      <motion.h2 
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide mb-4 px-4"
        variants={sectionVariants}
      >
        <span className="text-slate-900 whitespace-normal break-words">Why&nbsp;</span>
        <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 bg-clip-text text-transparent whitespace-normal break-words">
          SevakAI&nbsp;Works
        </span>
      </motion.h2>
      <p className="text-base sm:text-lg text-slate-600 px-4">
        Smarter, safer hiring —{" "}
        <span className="text-orange-500 font-semibold">
          powered by cutting-edge AI
        </span>
      </p>
    </div>

    {/* Cards */}
    <motion.div 
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={sectionVariants}
    >
      {[
        { icon: Zap, title: "AI-Matched Sevaks", desc: "We help you discover the ideal fit through skills, language, and availability." },
        { icon: Mic, title: "Multilingual Support", desc: "Sevaks available in multiple languages." },
        { icon: Shield, title: "Background Verified", desc: "ID checks, face scans, and experience verified" },
        { icon: Phone, title: "Interview Options", desc: "Shortlisted Sevaks can be pre-screened by you or us." },
        { icon: IndianRupee, title: "No Commissions", desc: " Sevaks receive 100% of what you pay — no cuts, no middlemen." },
        { icon: Award, title: "30-Day Match Guarantee", desc: "Can't find a match? Get your money back." },
      ].map((item, index) => (
        <motion.div
          key={index}
          className="card border-none shadow-lg hover:shadow-xl transition-shadow"
          variants={sectionVariants}
        >
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <item.icon className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <p className="text-slate-600">{item.desc}</p>
          </CardContent>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
</section>

{/* Featured Services Section */}
<section 
  id="featured-services" 
  className="relative w-full py-20 overflow-hidden"
  ref={(el) => (sectionsRef.current[1] = el)}
>
  {/* Background */}
  <motion.div
    id="bg-layer"
    className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200"
    style={{
      zIndex: 0,
      backgroundSize: "200% 200%",
      transformOrigin: "center"
    }}
    animate={{
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
    }}
    transition={{
      duration: 30,
      ease: "linear",
      repeat: Infinity
    }}
  />

  <motion.div 
    className="container mx-auto px-6 sm:px-4 text-center z-10 relative"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={sectionVariants}
  >
    {/* Styled Heading */}
    <motion.h2 
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide mb-4 px-2 sm:px-4 relative overflow-hidden"
      variants={sectionVariants}
    >
      <span className="relative inline-block">
        <span className="text-slate-900 whitespace-normal break-words">Our&nbsp;Top&nbsp;</span>
        <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 bg-clip-text text-transparent whitespace-nowrap">
          Featured&nbsp;Services
        </span>
        {/* Shimmer Effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] animate-shimmer"></span>
      </span>
    </motion.h2>

    {/* Subtitle */}
    <p className="text-lg text-slate-600 mb-12 px-2 sm:px-4">
      Explore our best offerings —{" "}
      <span className="text-orange-500 font-semibold">
        trusted, reliable, and tailored for you
      </span>
      .
    </p>

    {/* Cards Scroll */}
    <motion.div
      id="tilt-container"
      className="w-full overflow-hidden relative z-10 perspective-1000 max-w-full"
      onMouseMove={(e) => {
        const container = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - container.left;
        const y = e.clientY - container.top;
        const centerX = container.width / 2;
        const centerY = container.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((x - centerX) / centerX) * -5;

        e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        const bg = document.getElementById("bg-layer");
        if (bg) {
          bg.style.transform = `rotateX(${-rotateX}deg) rotateY(${-rotateY}deg) scale(1.05)`;
        }

        const speedBoost = Math.max(Math.abs(rotateX), Math.abs(rotateY)) / 5;
        const glowIntensity = 0.3 + speedBoost * 0.7;

        const cards = document.querySelectorAll(".floating-card");
        cards.forEach((card) => {
          card.style.animationDuration = `${6 - speedBoost * 2}s`;
          card.style.boxShadow = `0 0 ${12 + glowIntensity * 20}px rgba(251,146,60,${glowIntensity})`;
        });

        const scrollTrack = document.getElementById("scroll-track");
        if (scrollTrack) {
          scrollTrack.style.animationDuration = `${25 - speedBoost * 10}s`;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotateX(0deg) rotateY(0deg)`;
        const bg = document.getElementById("bg-layer");
        if (bg) {
          bg.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        }
        const cards = document.querySelectorAll(".floating-card");
        cards.forEach((card) => {
          card.style.animationDuration = `6s`;
          card.style.boxShadow = `0 0 15px rgba(251,146,60,0.3)`;
        });
        const scrollTrack = document.getElementById("scroll-track");
        if (scrollTrack) {
          scrollTrack.style.animationDuration = `25s`;
        }
      }}
      style={{
        transition: "transform 0.3s ease",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Infinite Scroll */}
      <motion.div 
        id="scroll-track"
        className="flex space-x-4 sm:space-x-6 md:space-x-10"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            duration: 15,
            ease: "linear",
            repeat: Infinity
          }
        }}
      >
        {[...[ 
          { image: "/assets/services/maid-1.png", label: "Maid", color: "from-yellow-500 to-yellow-400" },
          { image: "/assets/services/cook-2.png", label: "Cook", color: "from-red-500 to-orange-400" },
          { image: "/assets/services/elderly-care-3.png", label: "Elderly Care", color: "from-purple-500 to-pink-400" },
          { image: "/assets/services/nanny-1.png", label: "Nanny", color: "from-green-500 to-teal-400" },
          { image: "/assets/services/pet-sitter-3.png", label: "Pet Sitter", color: "from-blue-500 to-cyan-400" },
        ], ...[
          { image: "/assets/services/maid-1.png", label: "Maid", color: "from-yellow-500 to-yellow-400" },
          { image: "/assets/services/cook-2.png", label: "Cook", color: "from-red-500 to-orange-400" },
          { image: "/assets/services/elderly-care-3.png", label: "Elderly Care", color: "from-purple-500 to-pink-400" },
          { image: "/assets/services/nanny-1.png", label: "Nanny", color: "from-green-500 to-teal-400" },
          { image: "/assets/services/pet-sitter-3.png", label: "Pet Sitter", color: "from-blue-500 to-cyan-400" },
        ]].map((service, index) => (
          <motion.div
            key={`image-${index}`}
            className="floating-card flex-shrink-0 w-[130px] sm:w-[155px] md:w-[180px] lg:w-[200px] h-[180px] sm:h-[230px] md:h-[270px] lg:h-[310px] relative overflow-hidden rounded-2xl md:rounded-[32px] border border-orange-200 bg-white group transition-all duration-500 service-card"
            style={{
              boxShadow: "0 0 15px rgba(251,146,60,0.3)",
              animation: "glowPulse 4s infinite ease-in-out",
            }}
            whileHover={{
              scale: 1.08,
              rotate: 1,
              boxShadow: "0 0 30px rgba(251,146,60,0.5)",
            }}
            whileTap={{ scale: 0.97 }}
                    animate={{
          y: [0, -8, 0, 8, 0],
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (index % 5) * 0.5
          }
        }}
          >
            <motion.img
              src={service.image}
              alt={service.label}
              className="w-full h-full object-cover rounded-2xl md:rounded-[32px] transition-transform duration-500 ease-in-out group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            {/* Label Overlay */}
            <motion.div
              className={`absolute bottom-0 left-0 w-full backdrop-blur-md bg-gradient-to-r ${service.color} text-white text-xs sm:text-sm md:text-base font-semibold py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-3 md:px-3.5 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500`}
              style={{
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                boxShadow: "0 -3px 15px rgba(0,0,0,0.3)"
              }}
            >
              {service.label}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </motion.div>

  {/* Glow Pulse Animation */}
  <style>{`
    @keyframes glowPulse {
      0%, 100% { box-shadow: 0 0 15px rgba(251,146,60,0.3); }
      50% { box-shadow: 0 0 25px rgba(251,146,60,0.5); }
    }
  `}</style>
</section>



{/* How It Works */}
<section 
  id="how-it-works" 
  className="relative py-20 px-4 bg-gradient-to-b from-slate-50 via-orange-50/40 to-white overflow-hidden"
  ref={(el) => (sectionsRef.current[2] = el)}
>
  {/* Background Decorative Shapes */}
  <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute top-40 -right-32 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-orange-100/50 rounded-full blur-2xl animate-pulse"></div>

  <motion.div 
    className="relative max-w-6xl mx-auto"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.8, ease: "easeOut" } }
    }}
  >
    {/* Section Title */}
    <div className="text-center mb-16 relative z-10">
      <motion.h2 
        className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 relative overflow-hidden"
        variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
      >
        <span className="relative inline-block">
          <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
            Hiring Help Should Be Simple
          </span>
          <br />
          Here's How It Works
          {/* Shimmer Effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] animate-shimmer"></span>
        </span>
        {/* Orange underline */}
        <span className="block w-24 h-1 mt-3 mx-auto bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"></span>
      </motion.h2>

      <motion.p 
        className="text-lg text-slate-600 max-w-2xl mx-auto font-light"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        Follow these <span className="font-semibold text-orange-500 underline decoration-orange-300/60 decoration-2 underline-offset-2">
          five simple steps
        </span> to get the help you need — quick, easy, and stress-free.
      </motion.p>
    </div>

    {/* Steps */}
    <motion.div className="space-y-16 relative z-10">
      {workflowSteps.map((step, index) => {
        const highlightedDescription = step.description
          .replace(/(quick|easy|best|professional|trusted|simple|guarantee)/gi, '<span class="text-orange-500 font-medium">$1</span>');

        return (
          <motion.div
            key={index}
            className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border border-slate-200/50 hover:-translate-y-1"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ willChange: "transform" }}
          >
            {/* Text Section */}
            <div className={index % 2 === 0 ? "md:order-1 md:w-2/3" : "md:order-2 md:w-2/3"}>
              <div className="flex items-center mb-4 relative">
                {/* Rotating + Pulsing Orange Glow */}
                <motion.div
                  className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-300 opacity-40 blur-lg"
                  style={{ zIndex: 0 }}
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                />
                {/* Step Number */}
                <motion.div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4 shadow-lg relative z-10"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, #FBBF77, #FB923C)",
                    boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(251,146,60,0.4)",
                    color: "white"
                  }}
                  animate={{ 
                    boxShadow: [
                      "inset -2px -2px 4px rgba(0,0,0,0.15), 0 0 0px rgba(251,146,60,0.6)", 
                      "inset -2px -2px 4px rgba(0,0,0,0.15), 0 0 18px rgba(251,146,60,0.9)", 
                      "inset -2px -2px 4px rgba(0,0,0,0.15), 0 0 0px rgba(251,146,60,0.6)"
                    ] 
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {step.step}
                  <div 
                    style={{
                      position: "absolute",
                      top: "5px",
                      left: "6px",
                      width: "12px",
                      height: "6px",
                      background: "rgba(255,255,255,0.6)",
                      borderRadius: "50%",
                      filter: "blur(1px)"
                    }}
                  />
                </motion.div>
                <h3 className="text-2xl font-bold tracking-wide text-slate-900 relative overflow-hidden">
                  <span className="relative inline-block">
                    {step.title}
                    {/* Shimmer Effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] animate-shimmer"></span>
                  </span>
                </h3>
              </div>
              <p 
                className="text-slate-600 leading-relaxed text-base md:text-lg font-light"
                dangerouslySetInnerHTML={{ __html: highlightedDescription }}
              />
            </div>

            {/* Image Section */}
            <div className={index % 2 === 0 ? "md:order-2 md:w-1/3" : "md:order-1 md:w-1/3"}>
              <motion.div 
                key={`step-image-${index}`}
                className="aspect-[4/3] w-full max-w-xs mx-auto rounded-2xl md:rounded-[28px] overflow-hidden bg-white/20 backdrop-blur-md border-2 border-gradient-to-br from-orange-300/50 to-amber-300/50 shadow-md"
                animate={{ 
                  y: [0, -6, 0], 
                  transition: { 
                    repeat: Infinity, 
                    duration: 4, 
                    ease: "easeInOut",
                    repeatDelay: 0
                  } 
                }}
                style={{ willChange: "transform" }}
              >
                <motion.img
                  src={`/assets/how-it-works/step${step.step}.png`}
                  alt={step.title}
                  className="w-full h-full object-cover rounded-2xl md:rounded-[28px]"
                  initial={{ scale: 1, filter: "brightness(100%)" }}
                  whileHover={{ 
                    scale: 1.08, 
                    filter: "brightness(112%) drop-shadow(0 0 20px rgba(251, 146, 60, 0.6))" 
                  }}
                  transition={{ duration: 0.4 }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  </motion.div>

  {/* Shimmer Animation CSS */}
  <style>
    {`
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .animate-shimmer {
        animation: shimmer 2.2s ease-in-out 1;
      }
    `}
  </style>
</section>



   {/* Pricing */}
<section 
  id="pricing" 
  className="relative py-20 px-4 bg-gradient-to-b from-white via-orange-50/30 to-white overflow-hidden"
  ref={(el) => (sectionsRef.current[3] = el)}
>
  {/* Background Decorative Shapes */}
  <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute top-40 -right-32 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl animate-pulse"></div>

  <motion.div 
    className="relative max-w-5xl mx-auto text-center z-10"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15, duration: 0.8, ease: "easeOut" } }
    }}
  >
    {/* Title */}
    <motion.h2 
      className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 relative overflow-hidden"
      variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
    >
      <span className="relative inline-block">
        One-Time Fee. <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">No Hidden Charges.</span>
        {/* Shimmer Effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] animate-shimmer"></span>
      </span>
    </motion.h2>
    <motion.p 
      className="text-lg text-slate-600 max-w-2xl mx-auto"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      Transparent pricing that works for you — <span className="font-semibold text-orange-500 underline decoration-orange-300/60">fair, upfront, and risk-free</span>.
    </motion.p>

    {/* Pricing Cards */}
    <motion.div 
      className="grid md:grid-cols-2 gap-8 mt-16"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      {[
        { 
          title: "Basic Access", 
          desc: [
            { icon: CreditCardIcon, text: "Flat one-time fee to access SevakAI's verified Sevak pool" },
            { icon: BanknotesIcon, text: "You pay the Sevak directly — no salary cuts or commissions" },
            { icon: ShieldCheckIcon, text: "30-Day Money-Back Guarantee if no suitable match is found" }
          ]
        },
        { 
          title: "Premium Screening", 
          desc: [
            { icon: ChatBubbleLeftEllipsisIcon, text: "Add-on Screening (Optional)" },
            { icon: VideoCameraIcon, text: "We conduct detailed screening and share audio/video clips + summary" },
            { icon: ChartBarIcon, text: "Comprehensive Sevak evaluation report" }
          ]
        },
      ].map((plan, index) => (
        <motion.div
          key={index}
          className="group relative rounded-2xl border border-orange-200 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-[length:200%_200%] animate-gradient bg-clip-text text-transparent">
              {plan.title}
            </h3>
          </div>

          {/* Card Content */}
          <div className="p-8 space-y-4 text-left">
            {plan.desc.map((item, i) => (
              <motion.div 
                key={i} 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                <item.icon className="h-5 w-5 text-green-500 mt-1" />
                <span className="ml-3 text-slate-700 leading-relaxed">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Glow Hover Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-orange-300 to-amber-300 transition-opacity duration-500"></div>
        </motion.div>
      ))}
    </motion.div>

    {/* Footer Tagline */}
    <motion.p 
      className="mt-12 text-base text-slate-700 font-medium"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      Built for fairness. Powered by AI. <span className="text-orange-500 font-semibold">Trusted by families.</span>
    </motion.p>
  </motion.div>
</section>

<style>{`
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradient {
    animation: gradientMove 4s ease infinite;
  }
`}</style>
      {/* Testimonials */}
<section 
  id="testimonials" 
  className="py-20 px-4 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden testimonials"
  ref={(el) => (sectionsRef.current[4] = el)}
>
  {/* Decorative Blobs */}
  <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-0 -right-32 w-80 h-80 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>

  <motion.div 
    className="max-w-6xl mx-auto relative z-10"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={sectionVariants}
  >
    {/* Section Heading */}
    <div className="text-center mb-16">
      <motion.h2 
        className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-6 relative overflow-hidden"
        variants={sectionVariants}
      >
        <span className="relative inline-block">
          What <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Families</span> 
          {" "}and <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">Sevaks</span> Are Saying
          {/* Shimmer Effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] animate-shimmer"></span>
        </span>
      </motion.h2>
      <motion.p 
        className="text-lg text-slate-600 max-w-2xl mx-auto"
        variants={sectionVariants}
      >
        Real stories. Real trust. <span className="font-semibold text-orange-500 underline decoration-orange-300/60">Hear it from the people</span> who matter most.
      </motion.p>
    </div>

    <motion.div 
      className="space-y-20"
      variants={sectionVariants}
    >
      {/* Client Reviews */}
      <motion.div 
        variants={sectionVariants}
        className="hover:scale-[1.01] transition-transform duration-500"
      >
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center bg-gradient-to-r from-blue-50 to-sky-50 px-6 py-3 rounded-full shadow-sm">
            <UserGroupIcon className="h-6 w-6 text-blue-600 mr-3" />
            <h3 className="text-xl font-bold text-blue-900">CLIENT REVIEWS</h3>
            <span className="text-sm text-blue-700 ml-2">(Maid, Nanny, Elder Care Hiring)</span>
          </div>
        </div>
        <ScrollableReviews reviews={clientReviews} />
      </motion.div>

      {/* Sevak Reviews */}
      <motion.div 
        variants={sectionVariants}
        className="hover:scale-[1.01] transition-transform duration-500"
      >
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 rounded-full shadow-sm">
            <SparklesIcon className="h-6 w-6 text-green-600 mr-3" />
            <h3 className="text-xl font-bold text-green-900">Sevak REVIEWS</h3>
            <span className="text-sm text-green-700 ml-2">(Maid, Nanny, Elder Care Workers)</span>
          </div>
        </div>
        <ScrollableReviews reviews={SevakReviews} />
      </motion.div>
    </motion.div>
  </motion.div>
</section>
{/* FAQ Section */}
<section 
  id="faq" 
  className="relative py-20 px-4 bg-gradient-to-b from-orange-50 via-white to-orange-50 overflow-hidden accordion"
  ref={(el) => (sectionsRef.current[5] = el)}
>
  {/* Background Decorative Shapes */}
  <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-0 -right-32 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl animate-pulse"></div>

  <motion.div 
    className="max-w-4xl mx-auto relative z-10"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.8, ease: "easeOut" } }
    }}
  >
    <motion.h2 
      className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-12 text-center relative overflow-hidden"
      variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
    >
      <span className="relative inline-block">
        Frequently Asked <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Questions</span>
        {/* Shimmer Effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] animate-shimmer"></span>
      </span>
    </motion.h2>

    {/* FAQ Accordion */}
    <motion.div 
      className="space-y-4"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <Accordion type="single" collapsible>
        {faqData.map((faq, index) => (
          <motion.div
            key={faq.id}
            className="group bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <AccordionItem value={faq.id} className="px-6">
              <AccordionTrigger className="py-5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-500 font-bold">
                    ❓
                  </span>
                  <span className="text-left text-lg font-semibold text-slate-800 group-hover:text-orange-500 transition-colors duration-300">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>

              {/* Smooth expand animation */}
              <AccordionContent className="px-6 pb-5 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-slate-700 leading-relaxed"
                >
                  {faq.answer.split(" ").map((word, i) => 
                    word.toLowerCase().includes("ai") || word.toLowerCase().includes("sevak") ? (
                      <span key={i} className="text-orange-500 font-medium">{word} </span>
                    ) : (
                      <span key={i}>{word} </span>
                    )
                  )}
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  </motion.div>
</section>

{/* App Download Section */}
<section
  id="app-download"
  className="relative py-20 px-4 bg-gradient-to-br from-orange-50 via-white to-amber-50 overflow-hidden"
  ref={(el) => (sectionsRef.current[6] = el)}
>
  {/* Decorative Background Shapes */}
  <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse" />
  <div className="absolute bottom-0 -right-32 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl animate-pulse" />

  <motion.div
    className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.1, duration: 0.8, ease: "easeOut" },
      },
    }}
  >
    {/* Left: Text + Store Buttons + Email Notify */}
    <motion.div
      className="text-center md:text-left"
      variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
    >
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 relative overflow-hidden">
        <span className="relative inline-block">
          Download Our{" "}
          <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
            App
          </span>
          {/* Shimmer Effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] animate-shimmer"></span>
        </span>
      </h2>

      <p className="text-base md:text-lg text-slate-600 mb-8">
        Get started today and connect with{" "}
        <span className="text-orange-500 font-semibold">verified domestic Sevaks</span> in your area.
      </p>

      {/* Store Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center mb-12">
        {/* App Store */}
        <a
          href="#"
          onClick={() => handleAppDownload("ios")}
          className="inline-flex items-center bg-black text-white px-6 py-4 rounded-2xl shadow-xl hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
        >
          <svg className="w-10 h-10 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          <div className="text-left">
            <div className="text-xs">Download on the</div>
            <div className="text-base font-bold">App Store</div>
          </div>
        </a>

        {/* Google Play */}
        <a
          href="#"
          onClick={() => handleAppDownload("android")}
          className="inline-flex items-center bg-black text-white px-6 py-4 rounded-2xl shadow-xl hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
        >
          <svg className="w-10 h-10 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
          </svg>
          <div className="text-left">
            <div className="text-xs">Get it on</div>
            <div className="text-base font-bold">Google Play</div>
          </div>
        </a>
      </div>

      {/* Notify by Email */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
  Coming Soon
  <Rocket className="w-5 h-5 text-orange-500" />
</h3>

        <p className="text-slate-600 mb-6">
          Sign up to be <span className="text-orange-500 font-semibold">notified first</span> when it's live!
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // handleNotifyMe(); // implement to post email to your backend
          }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
          <Button
            type="submit"
            className="px-8 py-3 rounded-xl font-semibold bg-orange-500 hover:bg-orange-600 text-white"
          >
            Notify Me
          </Button>
        </form>
      </div>
    </motion.div>

    {/* Right: Single Composite iPhone Mockup */}
    <motion.div
      className="relative flex justify-center md:justify-end"
      variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}
    >
      <motion.img
        src="/images/phone-mock.png"  // <- place your generated PNG here
        alt="SevakAI App Mockup"
        className="w-72 md:w-96 drop-shadow-2xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  </motion.div>
</section>


{/* Contact */}
<section 
  id="contact" 
  className="relative py-20 px-4 bg-gradient-to-b from-orange-50 via-white to-orange-50"
  ref={(el) => (sectionsRef.current[7] = el)}
>
  {/* Background Shapes */}
  <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-0 -right-32 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl animate-pulse"></div>

  <motion.div 
    className="max-w-6xl mx-auto relative z-10 text-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={sectionVariants}
  >
    {/* Section Header */}
    <motion.h2 
      className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-12 relative overflow-hidden"
      variants={sectionVariants}
    >
      <span className="relative inline-block">
        Need Help or Have{" "}
        <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
          Questions?
        </span>
        {/* Shimmer Effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] animate-shimmer"></span>
      </span>
    </motion.h2>

    {/* Contact Cards */}
    <motion.div 
      className="grid md:grid-cols-3 gap-8"
      variants={sectionVariants}
    >
      {/* WhatsApp */}
      <motion.div
        className="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden 
                   hover:border-orange-400 hover:shadow-orange-200 hover:shadow-2xl 
                   hover:scale-105 transition-all duration-300 cursor-pointer"
        onClick={openWhatsApp}
        variants={sectionVariants}
      >
        <CardContent className="p-8 text-center">
          <svg className="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          <h3 className="text-lg font-semibold mb-2">Chat on WhatsApp</h3>
          <p className="text-slate-600">Our AI Agent is available 24x7</p>
        </CardContent>
      </motion.div>

      {/* Call Us */}
      <motion.div
        className="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden 
                   hover:border-orange-400 hover:shadow-orange-200 hover:shadow-2xl 
                   hover:scale-105 transition-all duration-300"
        variants={sectionVariants}
      >
        <CardContent className="p-8 text-center">
          <Phone className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Call Us</h3>
          <button 
            onClick={() => {
              trackButtonClick('call_phone', 'contact');
              window.location.href = 'tel:+919876543210';
            }}
            className="text-blue-600 font-medium mt-2 hover:underline"
          >
            +91 98765 43210
          </button>
        </CardContent>
      </motion.div>

      {/* Office */}
      <motion.div
        className="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden 
                   hover:border-orange-400 hover:shadow-orange-200 hover:shadow-2xl 
                   hover:scale-105 transition-all duration-300"
        variants={sectionVariants}
      >
        <CardContent className="p-8 text-center">
          <MapPin className="h-16 w-16 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Office</h3>
          <p className="text-slate-600">Hyderabad, India</p>
          <p className="text-slate-500 text-sm mt-2">(Dubai & Chennai Coming Soon)</p>
        </CardContent>
      </motion.div>
    </motion.div>
  </motion.div>
</section>


    </div>
  );
}