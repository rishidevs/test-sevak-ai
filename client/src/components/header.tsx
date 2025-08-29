/** @jsxImportSource react */
import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { MapPin, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase, signOut, getCurrentUser } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser().then(setUser);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        setUser(session?.user ?? null);
      }
    );

    // Handle scroll effect for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Sign Out Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      setLocation("/login");
    }
  };

  // Navigation handler
  const handleNav = (sectionId: string) => {
    if (location === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsMenuOpen(false);
    } else {
      localStorage.setItem("scrollToSection", sectionId);
      setLocation("/");
      setIsMenuOpen(false);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg' 
        : 'bg-white border-b border-slate-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 lg:h-16">
          {/* Logo + Location */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => handleNav("home")}
              className="flex items-center space-x-2 lg:space-x-3"
            >
              <img
                src="/logos/logo90x90.png"
                alt="SevakAI Logo"
                className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg object-contain flex-shrink-0"
              />
              <div className="text-left flex-shrink-0">
                <h1 className="text-base lg:text-lg font-bold text-slate-900">SevakAI</h1>
                <p className="text-xs text-slate-500 hidden sm:block">
                  Trusted Help. Anytime, Anywhere.
                </p>
              </div>
            </button>

            <div className="hidden xl:flex items-center ml-4 lg:ml-6 space-x-1 text-sm bg-green-50 text-green-700 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
              <MapPin className="h-3 w-3" />
              <span className="font-medium">Now in Hyderabad</span>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on smaller screens to prevent text cutoff */}
          <nav className="hidden xl:flex items-center space-x-5 flex-shrink-0">
            {[
              { label: "Home", section: "home" },
              { label: "Services", section: "/services", isRoute: true },
              { label: "How It Works", section: "how-it-works" },
              { label: "Pricing", section: "pricing" },
              { label: "Testimonials", section: "testimonials" },
              { label: "FAQs", section: "faq" },
              { label: "Contact Us", section: "contact" },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() =>
                  item.isRoute
                    ? setLocation(item.section)
                    : handleNav(item.section)
                }
                className="relative whitespace-nowrap font-medium text-slate-700 hover:text-transparent bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-400 transition-all duration-300 group flex-shrink-0 text-sm"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <Button
              onClick={() => handleNav("app-download")}
              className="bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-white px-4 py-2 rounded-lg shadow-md font-medium whitespace-nowrap transition-all duration-300 hover:shadow-lg hover:scale-105 flex-shrink-0 text-sm"
            >
              Join Beta
            </Button>
          </nav>

          {/* Mobile menu button - Show on all screens below xl */}
          <div className="xl:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Show on all screens below xl */}
        {isMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 py-3 bg-white/95 backdrop-blur-md mobile-menu">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-green-700 bg-green-50 px-3 py-2 rounded-lg mx-3 text-sm">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">Now in Hyderabad</span>
              </div>

              {[
                { label: "Home", section: "home" },
                { label: "Services", section: "/services", isRoute: true },
                { label: "How It Works", section: "how-it-works" },
                { label: "Pricing", section: "pricing" },
                { label: "Testimonials", section: "testimonials" },
                { label: "FAQs", section: "faq" },
                { label: "Contact Us", section: "contact" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    item.isRoute
                      ? (setLocation(item.section), setIsMenuOpen(false))
                      : handleNav(item.section)
                  }
                  className="block w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors duration-200 font-medium text-sm"
                >
                  {item.label}
                </button>
              ))}

              <div className="px-3 pt-2">
                <Button
                  onClick={() => handleNav("app-download")}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-white py-2.5 rounded-lg font-medium transition-all duration-300 text-sm"
                >
                  Download App
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
