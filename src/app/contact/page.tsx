"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, MapPin, Check } from "lucide-react";
import Accordion from "@/components/ui/Accordion";

const faqs = [
  {
    title: "What is your return policy?",
    content: "We offer free returns within 60 days of purchase. Items must be unworn with tags attached, backed by our 365-day quality guarantee.",
  },
  {
    title: "How long does shipping take?",
    content: "Standard shipping takes 3–5 business days. Express shipping (1–2 days) is available at checkout for an additional fee.",
  },
  {
    title: "What sizes do you offer?",
    content: "We offer sizes S through XXL across all styles. Check our size guide on each product page for detailed measurements.",
  },
  {
    title: "Do you ship internationally?",
    content: "Yes, we currently ship to over 30 countries. International shipping rates and times are calculated at checkout.",
  },
  {
    title: "How do I care for my ELKO essentials?",
    content: "Machine wash cold, do not bleach, and tumble dry low (or hang dry for modal/bamboo fabrics) for the longest lifespan.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-[1600px] mx-auto px-5 md:px-8 py-10 md:py-16">
      <div className="mb-14 text-center max-w-xl mx-auto">
        <h1 className="font-display text-3xl md:text-5xl mb-4">Contact Us</h1>
        <p className="text-charcoal/60">We usually respond within one business day.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 mb-20">
        {[
          { icon: Mail, title: "Email", value: "support@elko.com" },
          { icon: Phone, title: "Phone", value: "+1 (800) 555-0142" },
          { icon: MessageCircle, title: "Live Chat", value: "Available 9am–8pm EST" },
        ].map(({ icon: Icon, title, value }) => (
          <div key={title} className="p-6 rounded-2xl border border-line text-center">
            <Icon size={22} className="text-gold mx-auto mb-3" strokeWidth={1.5} />
            <p className="font-medium text-sm mb-1">{title}</p>
            <p className="text-charcoal/60 text-sm">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="font-display text-2xl mb-6">Send a Message</h2>
          {submitted ? (
            <div className="p-6 rounded-2xl bg-cream flex items-center gap-3">
              <Check size={20} className="text-gold" />
              <p className="text-sm">Thanks for reaching out — we&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Name" className="px-4 py-3 rounded-xl border border-line outline-none focus:border-gold" />
                <input required type="email" placeholder="Email" className="px-4 py-3 rounded-xl border border-line outline-none focus:border-gold" />
              </div>
              <input placeholder="Subject" className="w-full px-4 py-3 rounded-xl border border-line outline-none focus:border-gold" />
              <textarea required placeholder="Your message" rows={5} className="w-full px-4 py-3 rounded-xl border border-line outline-none focus:border-gold resize-none" />
              <button type="submit" className="cursor-pointer px-8 py-4 rounded-full bg-ink text-paper font-semibold hover:bg-charcoal transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>
        <div>
          <h2 className="font-display text-2xl mb-6">Visit Our Studio</h2>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-cream flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.03)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.03)_50%,rgba(0,0,0,0.03)_75%,transparent_75%,transparent)] bg-[length:24px_24px]" />
            <div className="relative text-center">
              <MapPin size={28} className="text-gold mx-auto mb-2" />
              <p className="font-medium text-sm">128 Madison Ave, New York, NY</p>
            </div>
          </div>
        </div>
      </div>

      <div id="faq" className="max-w-2xl mx-auto scroll-mt-24">
        <h2 className="font-display text-2xl mb-6 text-center">Frequently Asked Questions</h2>
        <Accordion items={faqs} />
      </div>
    </div>
  );
}
