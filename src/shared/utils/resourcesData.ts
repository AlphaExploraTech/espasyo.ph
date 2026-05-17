// src/constants/resourcesData.ts

export const DAILY_SCHEDULE = [
  {
    time: "6:00 PM",
    title: "8th Founding Anniversary",
    type: "Event",
    duration: "Evening",
  },
];

export const MONTHLY_GRID = [
  1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28,
  29, 30, 31, 0, 0, 0, 0,
];

export const MONTHLY_EVENTS: {
  [key: number]: { title: string; time: string; type: string }[];
} = {
  18: [{ title: "8th Founding Anniversary", time: "6:00 PM", type: "Event" }],
  20: [{ title: "Eid'l Fitr", time: "All Day", type: "Holiday" }],
};

export const WEEKLY_DATA = [
  {
    day: "WED",
    date: "18",
    title: "8th Founding Anniversary",
    time: "6:00 PM",
    tag: "Anniversary",
  },
  {
    day: "FRI",
    date: "20",
    title: "Eid'l Fitr",
    time: "All Day",
    tag: "Holiday",
  },
];

export const EVENTS_DATA = [
  {
    id: 1,
    title: "8th Founding Anniversary",
    date: "March 18, 2026",
    location: "Espasyo, Marikina",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Eid'l Fitr (Regular Holiday)",
    date: "March 20, 2026",
    location: "National Holiday",
    image:
      "https://images.unsplash.com/photo-1738382782161-a0bf706eced2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const PARTNER_ARTICLES = [
  {
    category: "Coffee Partner",
    business: "Kape Klasiko",
    title: "The Art of Slow Brewing: Why Patience Tastes Better",
    excerpt:
      "Learn how our local partner sources beans from Benguet and the best way to brew them at your desk.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Financial Advice",
    business: "SecureBooks PH",
    title: "Tax Compliance Guide for Freelancers in 2026",
    excerpt:
      "Our resident accounting partners break down the new BIR updates so you don't have to stress.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Local Eats",
    business: "The Daily Dough",
    title: "Best Pastries for Your Morning Meetings",
    excerpt:
      "A guide to the flakiest croissants in Marikina, delivered fresh to Espasyo every Tuesday.",
    image:
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Legal",
    business: "Atty. Marco & Associates",
    title: "Intellectual Property Rights for Creatives",
    excerpt:
      "Protecting your designs and code: A simplified guide for our freelance members.",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Wellness",
    business: "Serene Yoga Studio",
    title: "5 Desk Stretches to Prevent Back Pain",
    excerpt:
      "Simple movements you can do right in the coworking area to keep your energy flowing.",
    image:
      "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Design",
    business: "Pixel Perfect Studio",
    title: "Branding Trends Taking Over 2026",
    excerpt:
      "Our in-house design residents share what's hot in typography and color palettes this year.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b7993125486?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Productivity",
    business: "Focus Flow",
    title: "Time Blocking 101: Master Your Schedule",
    excerpt:
      "How to use the Espasyo quiet zones effectively to double your output in half the time.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Tech Gear",
    business: "Circuit City",
    title: "Essential Gadgets for the Digital Nomad",
    excerpt:
      "A curated list of noise-canceling headphones and power banks available at a discount for members.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  },
];
