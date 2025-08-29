
/** @jsxImportSource react */
import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Utensils, Baby, Dog, Heart } from "lucide-react";

const Services = () => {
  const [, setLocation] = useLocation();
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
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); // Change title every 3 seconds

    return () => clearInterval(interval);
  }, [titles.length]);

  // Navigation handlers
  const handleFindYourSevak = () => {
    // Navigate to landing page and scroll to download section
    localStorage.setItem("scrollToSection", "app-download");
    setLocation("/");
  };

  const handleLearnMore = () => {
    // Navigate to landing page and scroll to how it works section
    localStorage.setItem("scrollToSection", "how-it-works");
    setLocation("/");
  };

  const services = [
    {
      icon: Sparkles,
      title: "Maids",
      description: "Daily cleaning, dishes, sweeping, mopping, dusting.",
      features: ["Full-time", "Part-time", "One-time deep clean"],
      highlights: ["Trust score + availability match.", "Multilingual onboarding: Hindi, Telugu, Tamil, etc."],
    },
    {
      icon: Utensils,
      title: "Cooks",
      description: "Daily meals, diet-specific cooking, regional specialties.",
      features: ["Breakfast shifts", "Lunch shifts", "Dinner shifts"],
      highlights: ["Audio answers for food preferences.", "Skill tags (veg/non-veg)."],
    },
    {
      icon: Baby,
      title: "Nannies",
      description: "Infant care, toddler engagement, after-school help.",
      features: ["Screened for child-safety", "Behavior score verified"],
      highlights: ["Listen to how they interact with children."],
    },
    {
      icon: Dog,
      title: "Pet Sitters",
      description: "Pet feeding, walking, grooming, companionship.",
      features: ["Daily visits", "Overnight care", "Pet-specific training"],
      highlights: ["AI-matched pet-friendly profiles.", "Experience with various pets."],
    },
    {
      icon: Heart,
      title: "Elderly Caregivers",
      description: "Mobility help, meal support, companionship, reminders.",
      features: ["Compassionate caregivers", "Past experience verified"],
      highlights: ["AI picks patient-friendly profiles.", "Language match preferences."],
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
                          <motion.h1
                key={currentTitleIndex}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-4"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`first-${currentTitleIndex}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className={`text-slate-900 whitespace-normal break-words block leading-relaxed ${
                      titles[currentTitleIndex].language === 'English' 
                        ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl' 
                        : 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
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
                    className={`bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent whitespace-normal break-words block leading-relaxed ${
                      titles[currentTitleIndex].language === 'English' 
                        ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl' 
                        : 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
                    }`}
                  >
                    {titles[currentTitleIndex].secondLine}
                  </motion.span>
                </AnimatePresence>
              </motion.h1>
          </AnimatePresence>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto px-4">
            Verified domestic Sevaks, AI-matched to your needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants} transition={{ duration: 0.5 }}>
              <Card className="h-full border-none shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="p-2 rounded-lg text-white shadow-md bg-gradient-to-br from-orange-400 to-amber-500 bg-[length:200%_200%] hover:animate-shimmer flex-shrink-0"
                    >
                      <service.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-900 whitespace-normal break-words leading-tight min-w-0 flex-1">
                      {service.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-slate-600">
                    For: {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {service.features.map((feature, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs bg-orange-50 text-orange-700"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {service.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <span className="text-orange-500 mt-0.5">•</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-2xl p-8 text-center shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">
            Powered by AI Technology
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
            All Sevaks go through AI-driven trust scoring and are available in{" "}
            <span className="font-semibold text-orange-600">Hyderabad</span>, soon expanding to{" "}
            <span className="font-semibold text-orange-600">Bengaluru</span>,{" "}
            <span className="font-semibold text-orange-600">Chennai</span> &{" "}
            <span className="font-semibold text-orange-600">Dubai</span>.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleFindYourSevak}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Find Your Sevak
            </button>
            <button 
              onClick={handleLearnMore}
              className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Services;