/** @jsxImportSource react */
import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Send,
  Home,
  Utensils,
  Baby,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const openWhatsApp = () => {
    const message = "Hi! I'm interested in SevakAI's services. Can you help me?";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const subscribers = JSON.parse(
        localStorage.getItem("newsletter_subscribers") || "[]"
      );

      if (subscribers.includes(email)) {
        toast({
          title: "Already Subscribed",
          description:
            "This email is already subscribed to our newsletter",
          variant: "default",
        });
      } else {
        subscribers.push(email);
        localStorage.setItem(
          "newsletter_subscribers",
          JSON.stringify(subscribers)
        );

        toast({
          title: "Successfully Subscribed! 🎉",
          description:
            "You'll receive updates about new features and service areas",
        });

        setEmail("");
      }
    } catch {
      toast({
        title: "Subscription Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Newsletter Section */}
        <motion.div
          className="bg-slate-800 rounded-2xl p-8 mb-12 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Stay Updated with SevakAI
            </h3>
            <p className="text-slate-300 mb-6">
              Get notified when we launch in your city and receive tips for finding the perfect domestic help.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white text-slate-900 rounded-lg px-4 py-3"
                disabled={isSubscribing}
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all"
              >
                {isSubscribing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
            <p className="text-xs text-slate-400 mt-3">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logos/logo90x90.png"
                alt="SevakAI Logo"
                className="w-8 h-8 rounded-lg object-contain"
              />
              <div>
                <h3 className="font-bold text-lg">SevakAI</h3>
                <p className="text-xs text-slate-300">AI-Powered Help Hiring</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Hire trusted maids, cooks & nannies without the guesswork.
              Verified Sevaks using AI, not WhatsApp groups.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-orange-400 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", id: "home" },
                { name: "How It Works", id: "how-it-works" },
                { name: "Pricing", id: "pricing" },
                { name: "Testimonials", id: "testimonials" },
                { name: "Download App", id: "download-app" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-orange-400 mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><Home className="w-4 h-4 text-orange-400" /> Maids & Housekeepers</li>
              <li className="flex items-center gap-2"><Utensils className="w-4 h-4 text-orange-400" /> Cooks & Chefs</li>
              <li className="flex items-center gap-2"><Baby className="w-4 h-4 text-orange-400" /> Nannies & Babysitters</li>
              <li className="flex items-center gap-2"><HeartHandshake className="w-4 h-4 text-orange-400" /> Elderly Care</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-orange-400 mb-4">Get In Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span className="text-slate-300">Hyderabad, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-400" />
                <span className="text-slate-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <span className="text-slate-300">support@metanovaai.com</span>
              </div>
            </div>
            <div className="mt-6">
              <Button
                onClick={openWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white w-full rounded-lg text-sm"
              >
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>© 2024 SevakAI. Built for fairness. Powered by AI.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Help Center</a>
          </div>
        </div>

        {/* Location Badge */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center bg-green-900 text-green-300 px-4 py-2 rounded-full text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Now in Hyderabad | Expanding to Bengaluru, Chennai, and Dubai
          </div>
        </div>
      </div>
    </footer>
  );
}
