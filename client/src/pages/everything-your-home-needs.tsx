"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface HelperType {
  emoji: string;
  title: string;
  highlights: string[];
}

const helperTypes: HelperType[] = [
  {
    emoji: "👩‍🔧",
    title: "Maids & Housekeepers",
    highlights: [
      "For: Daily cleaning, dishes, sweeping, mopping, dusting",
      "✅ Full-time | ✅ Part-time | ✅ One-time deep clean",
      "🎯 Trust score + availability match",
      "🗣 Multilingual onboarding: Hindi, Telugu, Tamil, etc.",
    ],
  },
  {
    emoji: "🍳",
    title: "Cooks & Chefs",
    highlights: [
      "For: Daily meals, diet-specific cooking, regional specialties",
      "✅ Breakfast, lunch, dinner shifts",
      "🎯 Audio answers for food preferences, skill tags (veg/non-veg)",
    ],
  },
  {
    emoji: "👶",
    title: "Nannies & Babysitters",
    highlights: [
      "For: Infant care, toddler engagement, after-school help",
      "✅ Screened for child-safety + behavior score",
      "🗣 Listen to how they interact with children",
    ],
  },
  {
    emoji: "👵",
    title: "Elderly Care Assistants",
    highlights: [
      "For: Mobility help, meal support, companionship, reminders",
      "✅ Compassionate & calm helpers with past experience",
      "🎯 AI picks patient-friendly profiles with language match",
    ],
  },
  {
    emoji: "🩺",
    title: "Patient Care at Home",
    highlights: [
      "For: Post-surgery care, medication reminders, hygiene help",
      "✅ Trained attendants | ✅ Female/male preference",
      "🎯 Skill tags: lifting, bathing, oxygen familiarity",
    ],
  },
];

export default function EverythingYourHomeNeeds() {
  return (
    <section className="bg-white py-20 px-4">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4">
          <span className="text-slate-900 whitespace-normal break-words leading-tight">Everything Your Home Needs —</span>{" "}
          <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent whitespace-normal break-words leading-tight">
            In One Place
          </span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 px-4">
          Verified domestic helpers, AI-matched to your needs.
        </p>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {helperTypes.map((helper) => (
          <motion.div
            key={helper.title}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="shadow-lg border-none hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
              <CardHeader className="flex items-center gap-4 bg-gradient-to-r from-orange-50 to-amber-50 p-6">
                <span className="text-4xl" aria-label={helper.title}>
                  {helper.emoji}
                </span>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  {helper.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 pb-6 px-6 text-left space-y-3">
                {helper.highlights.map((line, idx) => (
                  <p
                    key={idx}
                    className="text-sm text-slate-700 leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto mt-12 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 px-5 py-3 text-base rounded-full shadow-sm"
        >
          All helpers go through AI-driven trust scoring and are available in
          Hyderabad, soon expanding to Bengaluru, Chennai & Dubai.
        </Badge>
      </motion.div>
    </section>
  );
}
