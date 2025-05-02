"use client";

import PixelTrail from "@/components/PixelTrail/PixelTrail";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  MessageSquare,
  Leaf,
  Sparkles,
  Sun,
  Droplet,
  Calendar,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Ribbons from "@/components/Ribbons/Ribbons";
export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-500 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      <Ribbons
        baseThickness={30}
        colors={["#ffffff"]}
        speedMultiplier={0.5}
        maxAge={500}
        enableFade={false}
        enableShaderEffect={true}
      />
      <header className="py-4 px-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-green-100">
        <div className="container max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl text-green-800">BloomBuddy</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-20 md:py-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/leaf-pattern.svg')] bg-repeat opacity-10"></div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-20 right-20 w-64 h-64 rounded-full bg-green-300/20 blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{
              duration: 3,
              delay: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-emerald-300/20 blur-3xl"
          />
        </div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-6"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium w-fit shadow-sm">
                <Sparkles size={14} className="text-green-600" />
                <span>Your Personal Plant Care Assistant</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 leading-tight">
                Nurture Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                  Green
                </span>{" "}
                Companions
              </h1>

              <p className="text-lg text-green-700 md:pr-12 leading-relaxed">
                BloomBuddy helps you care for your plants with AI-powered advice
                and disease detection. Your personal gardening assistant is just
                a conversation away.
              </p>

              <div className="flex flex-wrap gap-4 mt-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white shadow-md shadow-green-200 hover:shadow-lg transition-all"
                >
                  <Link href="/chat">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Chat with BloomBuddy
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-green-600 text-green-700 hover:bg-green-50 shadow-sm hover:shadow transition-all"
                >
                  <Link href="/jasmine">
                    <Leaf className="mr-2 h-5 w-5 text-green-600" />
                    Check Plant Health
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-green-100"
                    >
                      <Image
                        src={`/images/ava${i}.png`}
                        alt={`User ${i}`}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-green-700">
                  <span className="font-semibold">2,500+</span> plant lovers
                  trust BloomBuddy
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/g.jpeg"
                  alt="Beautiful healthy plants"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-3xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>

                {/* Interactive floating elements */}
                <motion.div
                  initial={{ y: 10 }}
                  animate={{ y: -10 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-[220px]"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Droplet className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">
                        Watering Time
                      </h3>
                      <p className="text-sm text-green-600 mt-1">
                        Your Monstera needs water today
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: -10 }}
                  animate={{ y: 10 }}
                  transition={{
                    duration: 4,
                    delay: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-[220px]"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Sun className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">
                        Light Check
                      </h3>
                      <p className="text-sm text-green-600 mt-1">
                        Perfect light for your Pothos
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Trust badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg max-w-[260px] border border-green-100">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-green-800">
                    4.9/5 rating
                  </span>
                </div>
                <p className="text-sm text-green-600 mt-2">
                  Trusted by plant enthusiasts worldwide
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-green-50/50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm border border-green-100"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-green-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-green-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/plant-pattern.svg')] bg-repeat opacity-5"></div>
        </div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium w-fit mx-auto mb-4">
              <Sparkles size={14} className="text-green-600" />
              <span>Powerful Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              How BloomBuddy Helps You
            </h2>
            <p className="text-lg text-green-600 max-w-2xl mx-auto">
              Your all-in-one solution for plant care and disease detection with
              advanced AI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-green-50 to-white rounded-xl p-8 border border-green-100 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-green-600 mb-4">{feature.description}</p>
                <Link
                  href={`/features/${feature.slug}`}
                  className="inline-flex items-center text-green-700 font-medium text-sm hover:text-green-600 transition-colors"
                >
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-green-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/leaf-pattern.svg')] bg-repeat opacity-5"></div>
        </div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium w-fit mx-auto mb-4">
              <Star size={14} className="text-green-600 fill-green-600" />
              <span>What People Say</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Plant Lovers Trust BloomBuddy
            </h2>
            <p className="text-lg text-green-600 max-w-2xl mx-auto">
              See what our community has to say about their experience
            </p>
          </motion.div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg border border-green-100 p-6 md:p-10 min-h-[280px]">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === activeTestimonial ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 p-6 md:p-10 flex flex-col"
                >
                  <div className="flex flex-1">
                    <div className="text-xl md:text-2xl text-green-700 italic font-light leading-relaxed">
                      "{testimonial.text}"
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatarUrl}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">
                        {testimonial.name}
                      </h4>
                      <p className="text-green-600 text-sm">
                        {testimonial.title}
                      </p>
                    </div>
                    <div className="flex ml-auto">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === activeTestimonial
                      ? "bg-green-600"
                      : "bg-green-200"
                  } transition-colors`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 md:p-14 text-white relative overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-[url('/patterns/leaf-pattern-light.svg')] bg-repeat opacity-10"></div>

            {/* Decorative elements */}
            <motion.div
              animate={{
                opacity: [0.4, 0.6, 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-green-400/20 blur-3xl"
            />
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 10, delay: 1, repeat: Infinity }}
              className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl"
            />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to grow with confidence?
              </h2>
              <p className="text-green-50 text-lg mb-10 max-w-xl mx-auto">
                Start chatting with BloomBuddy today and give your plants the
                care they deserve. Your green friends will thank you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50 shadow-lg shadow-green-700/20 hover:shadow-xl transition-all"
                >
                  <Link href="/chat">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Chat Now
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50 shadow-lg shadow-green-700/20 hover:shadow-xl transition-all"
                >
                  <Link href="/jasmine">
                    <Leaf className="mr-2 h-5 w-5" />
                    Check Plant Health
                  </Link>
                </Button>
              </div>

              <p className="text-green-100 text-sm mt-8">
                No credit card required • Free plan available
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-100 py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-green-300" />
                <span className="font-bold text-xl text-white">BloomBuddy</span>
              </div>
              <p className="text-green-300 text-sm">
                Your personal plant care assistant powered by AI.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-white mb-4">Features</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/features"
                    className="text-green-300 hover:text-white transition-colors"
                  >
                    AI Plant Care
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features"
                    className="text-green-300 hover:text-white transition-colors"
                  >
                    Disease Detection
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features"
                    className="text-green-300 hover:text-white transition-colors"
                  >
                    Watering Schedule
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features"
                    className="text-green-300 hover:text-white transition-colors"
                  >
                    Plant Library
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-green-300 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-green-300 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-green-300 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-green-300 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/terms"
                    className="text-green-300 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-green-300 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-green-300 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-green-400">
              &copy; {new Date().getFullYear()} BloomBuddy. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-green-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                {/* Twitter icon */}
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-green-400 hover:text-white transition-colors"
              >
                <span className="sr-only">YouTube</span>
                {/* YouTube icon */}
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Personalized Plant Care",
    description:
      "Get tailored care tips for any plant in your collection based on your specific conditions, environment, and plant species.",
    icon: <Droplet className="h-6 w-6 text-green-600" />,
    slug: "plant-care",
  },
  {
    title: "Disease Detection & Treatment",
    description:
      "Upload photos of your plants to identify potential diseases and get detailed treatment recommendations from our AI.",
    icon: <Leaf className="h-6 w-6 text-green-600" />,
    slug: "disease-detection",
  },
  {
    title: "Smart Watering Reminders",
    description:
      "Receive timely reminders based on each plant's needs, weather conditions, and seasonal changes.",
    icon: <Calendar className="h-6 w-6 text-green-600" />,
    slug: "watering-reminders",
  },
  {
    title: "Extensive Plant Library",
    description:
      "Access our comprehensive database of plants with detailed care guides, growing tips, and troubleshooting advice.",
    icon: <Sun className="h-6 w-6 text-green-600" />,
    slug: "plant-library",
  },
  {
    title: "Light & Temperature Analysis",
    description:
      "Analyze your home's environment to determine the optimal placement for each of your plants.",
    icon: <Sun className="h-6 w-6 text-green-600" />,
    slug: "environment-analysis",
  },
  {
    title: "Community & Expert Support",
    description:
      "Connect with fellow plant enthusiasts and get advice from gardening experts for specific plant questions.",
    icon: <MessageSquare className="h-6 w-6 text-green-600" />,
    slug: "community",
  },
];

const stats = [
  {
    value: "50K+",
    label: "Happy Plants",
    icon: <Leaf className="h-6 w-6 text-green-600" />,
  },
  {
    value: "10K+",
    label: "Active Users",
    icon: <MessageSquare className="h-6 w-6 text-green-600" />,
  },
  {
    value: "95%",
    label: "Success Rate",
    icon: <Sparkles className="h-6 w-6 text-green-600" />,
  },
  {
    value: "24/7",
    label: "Plant Support",
    icon: <Sun className="h-6 w-6 text-green-600" />,
  },
];

const testimonials = [
  {
    text: "BloomBuddy transformed how I care for my plants. The disease detection feature saved my monstera from root rot, and the care reminders keep all my plants thriving!",
    name: "Sarah Johnson",
    title: "Indoor Garden Enthusiast",
    avatarUrl: "/images/ava1.png",
  },
  {
    text: "As someone who always struggled to keep plants alive, BloomBuddy has been a game-changer. The personalized advice is spot-on, and my home is now filled with healthy plants.",
    name: "Michael Chen",
    title: "Plant Newbie",
    avatarUrl: "/images/ava2.png",
  },
  {
    text: "I've tried many plant care apps, but BloomBuddy is in a league of its own. The AI actually understands specific plant needs and gives actionable advice that works.",
    name: "Priya Patel",
    title: "Urban Gardener",
    avatarUrl: "/images/ava3.png",
  },
];
