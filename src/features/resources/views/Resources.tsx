import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';
import {
  Calendar as CalendarIcon,
  ArrowRight,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Resources = () => {
  const container = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const eventCardRef = useRef<HTMLDivElement>(null);

  // --- STATE ---
  const [calendarView, setCalendarView] = useState<
    "daily" | "weekly" | "monthly"
  >("weekly");
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [featureScrollIndex, setFeatureScrollIndex] = useState(0);

  // --- DATA ---
  const dailySchedule = [
    {
      time: "6:00 PM",
      title: "8th Founding Anniversary",
      type: "Event",
      duration: "Evening",
    },
  ];

  // March 2026 starts on a Sunday — no leading padding needed
  const monthlyGrid = [
    1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
    29, 30, 31, 0, 0, 0, 0,
  ];

  const monthlyEvents: {
    [key: number]: { title: string; time: string; type: string }[];
  } = {
    18: [{ title: "8th Founding Anniversary", time: "6:00 PM", type: "Event" }],
    20: [{ title: "Eid'l Fitr", time: "All Day", type: "Holiday" }],
  };

  const weeklyData = [
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

  const eventsData = [
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

  const partnerArticles = [
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

  // --- HANDLERS ---
  const nextEvent = () =>
    setCurrentEventIndex((prev) => (prev + 1) % eventsData.length);
  const prevEvent = () =>
    setCurrentEventIndex(
      (prev) => (prev - 1 + eventsData.length) % eventsData.length,
    );

  const nextFeature = () => {
    const maxIndex = Math.max(0, partnerArticles.length - 1);
    setFeatureScrollIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };
  const prevFeature = () => {
    const maxIndex = Math.max(0, partnerArticles.length - 1);
    setFeatureScrollIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  // --- 3D TILT EFFECT ---
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!eventCardRef.current) return;
    const { left, top, width, height } =
      eventCardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    gsap.to(eventCardRef.current, {
      rotationY: x,
      rotationX: -y,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = () => {
    if (!eventCardRef.current) return;
    gsap.to(eventCardRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const activeEvent = eventsData[currentEventIndex];

  // --- ANIMATIONS ---
  useGSAP(
    () => {
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 20,
          ease: "linear",
        });
      }

      const tl = gsap.timeline();
      tl.from(".page-title-group", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }).from(
        ".content-block",
        { y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        "-=0.5",
      );

      gsap.from(".features-section", {
        scrollTrigger: { trigger: ".features-section", start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="min-h-screen bg-[#2C3628] text-[#F0EAD6] overflow-x-hidden flex flex-col relative"
    >
      {/* --- GRAIN TEXTURE --- */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* --- BACKGROUND MARQUEE --- */}
      <div className="fixed top-1/2 -translate-y-1/2 left-0 w-[200vw] pointer-events-none opacity-[0.02] z-0 select-none overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap font-display text-[15vw] leading-none uppercase tracking-tighter text-[#F0EAD6]"
        >
          <span>Community • Growth • Connection • Rhythm • Tribe • </span>
          <span>Community • Growth • Connection • Rhythm • Tribe • </span>
        </div>
      </div>

      <Navbar theme="default" />

      {/* --- HEADER (UPDATED LAYOUT) --- */}
      <div className="pt-32 px-6 md:px-12 max-w-[1600px] mx-auto w-full relative z-10">
        {/* Flex container for side-by-side layout with equal vertical alignment */}
        <div className="page-title-group border-b border-[#F0EAD6]/20 pb-12 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-16">
          {/* Title on the Left */}
          <h1 className="font-display text-5xl md:text-8xl uppercase tracking-tighter text-[#F0EAD6] drop-shadow-lg shrink-0">
            Life at <span className="text-[#D4A373]">Espasyo</span>
          </h1>

          {/* Description on the Right (Right aligned text) */}
          <p className="font-body text-lg md:text-xl text-[#F0EAD6]/80 max-w-lg leading-relaxed md:text-right">
            From morning brew sessions to evening workshops, this is the
            heartbeat of our shared home. Find your rhythm, connect with the
            tribe, and see what’s cooking in the community today.
          </p>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="flex-1 px-6 md:px-12 max-w-[1600px] mx-auto w-full mb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* LEFT COLUMN: CALENDAR */}
          <div className="content-block h-full flex flex-col">
            <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
              <h2 className="font-display text-3xl uppercase tracking-widest text-[#D4A373]">
                Activity <br /> Calendar
              </h2>

              <div className="flex bg-[#F0EAD6]/10 rounded-full p-1 backdrop-blur-sm">
                {(["daily", "weekly", "monthly"] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setCalendarView(view)}
                    className={`px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${calendarView === view
                      ? "bg-[#F0EAD6] text-[#2C3628] shadow-md"
                      : "text-[#F0EAD6]/60 hover:text-[#F0EAD6]"
                      }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col flex-1 min-h-[400px]">
              {/* DAILY VIEW */}
              {calendarView === "daily" && (
                <div className="flex flex-col gap-0 border-l-2 border-[#D4A373]/30 pl-6 ml-3 py-2 animate-fade-in-up">
                  <h3 className="font-display text-sm font-bold uppercase tracking-widest mb-6 text-[#D4A373]">
                    Today's Agenda
                  </h3>
                  {dailySchedule.map((item, idx) => (
                    <div key={idx} className="relative pb-8 group last:pb-0">
                      <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#2C3628] border-2 border-[#D4A373] group-hover:bg-[#D4A373] transition-colors z-10 scale-100 group-hover:scale-125 duration-300" />
                      <div className="bg-[#F0EAD6]/5 border border-[#F0EAD6]/10 p-4 rounded-xl hover:bg-[#F0EAD6]/10 hover:border-[#F0EAD6]/20 transition-all cursor-default backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-display text-lg font-bold text-[#F0EAD6]">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-bold uppercase bg-[#D4A373] text-[#2C3628] px-2 py-0.5 rounded-full">
                            {item.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs opacity-60 font-mono">
                          <span>{item.time}</span>
                          <span>•</span>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* WEEKLY VIEW */}
              {calendarView === "weekly" && (
                <div className="flex flex-col gap-4 animate-fade-in-up">
                  <h3 className="font-display text-sm font-bold uppercase tracking-widest mb-2 text-[#D4A373]">
                    This Week
                  </h3>
                  {weeklyData.map((item, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center gap-6 p-5 border border-[#F0EAD6]/10 rounded-xl hover:bg-[#F0EAD6]/5 transition-all duration-300 cursor-default backdrop-blur-sm"
                    >
                      <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#3E4A35] rounded-lg group-hover:bg-[#D4A373] transition-colors shadow-inner">
                        <span className="font-display text-[10px] uppercase tracking-wider opacity-80 group-hover:text-[#2C3628]">
                          {item.day}
                        </span>
                        <span className="font-display text-2xl font-bold group-hover:text-[#2C3628]">
                          {item.date}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl uppercase tracking-tight mb-1 group-hover:text-[#D4A373] transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs font-body opacity-60">
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {item.time}
                          </span>
                          <span className="w-1 h-1 bg-[#F0EAD6] rounded-full" />
                          <span>{item.tag}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* MONTHLY VIEW */}
              {calendarView === "monthly" && (
                <div className="bg-[#F0EAD6]/5 border border-[#F0EAD6]/10 rounded-2xl p-6 animate-fade-in-up backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display text-lg font-bold uppercase tracking-widest text-[#F0EAD6]">
                      March 2026
                    </h3>
                    <div className="flex gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4A373]"></span>
                      <span className="text-[10px] uppercase tracking-widest opacity-60">
                        Has Event
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                      <div
                        key={d}
                        className="text-center text-xs font-bold opacity-40 py-2"
                      >
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {monthlyGrid.map((date, idx) => {
                      const events =
                        monthlyEvents[date as keyof typeof monthlyEvents];
                      const hasEvent = events && events.length > 0;

                      return (
                        <div
                          key={idx}
                          className={`aspect-square rounded-lg flex flex-col items-center justify-center relative text-sm group
                                                ${date === 0 ? "invisible" : "bg-[#3E4A35]/50 hover:bg-[#D4A373] hover:text-[#2C3628] cursor-pointer transition-colors"}
                                                ${hasEvent ? "border border-[#D4A373] shadow-[0_0_10px_rgba(212,163,115,0.2)]" : ""}
                                            `}
                        >
                          <span
                            className={hasEvent ? "font-bold" : "opacity-70"}
                          >
                            {date}
                          </span>
                          {hasEvent && (
                            <div className="w-1 h-1 bg-[#D4A373] rounded-full mt-1 group-hover:bg-[#2C3628]"></div>
                          )}

                          {/* Tooltip */}
                          {hasEvent && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-48 animate-scale-up origin-bottom">
                              <div className="bg-[#2C3628] border border-[#D4A373]/30 text-[#F0EAD6] text-xs rounded-lg p-3 shadow-2xl relative">
                                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2C3628] border-b border-r border-[#D4A373]/30 rotate-45"></div>
                                <div className="flex flex-col gap-2">
                                  {events.map((evt, i) => (
                                    <div
                                      key={i}
                                      className="border-b border-[#F0EAD6]/10 last:border-0 pb-1 last:pb-0"
                                    >
                                      <div className="font-bold text-[#D4A373] mb-0.5">
                                        {evt.title}
                                      </div>
                                      <div className="flex justify-between opacity-70 text-[10px]">
                                        <span>{evt.time}</span>
                                        <span className="uppercase">
                                          {evt.type}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: EVENTS CAROUSEL */}
          <div className="content-block h-full flex flex-col perspective-1000">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl uppercase tracking-widest text-[#D4A373]">
                Upcoming <br /> Events
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={prevEvent}
                  className="w-10 h-10 border border-[#F0EAD6]/20 rounded-full flex items-center justify-center hover:bg-[#F0EAD6] hover:text-[#2C3628] transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextEvent}
                  className="w-10 h-10 border border-[#F0EAD6]/20 rounded-full flex items-center justify-center hover:bg-[#F0EAD6] hover:text-[#2C3628] transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div
              ref={eventCardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="flex-1 relative rounded-3xl overflow-hidden shadow-2xl group border border-[#F0EAD6]/10 min-h-[400px] transform-style-3d transition-transform"
            >
              <div className="absolute inset-0 transition-opacity duration-500 ease-in-out">
                <img
                  key={activeEvent.image}
                  src={activeEvent.image}
                  alt={activeEvent.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3628] via-[#2C3628]/40 to-transparent" />
              </div>

              <div
                key={activeEvent.id}
                className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col items-start animate-fade-in-up transform translate-z-10"
              >
                <div className="bg-[#D4A373] text-[#2C3628] font-bold text-xs uppercase px-4 py-2 rounded-full mb-4 shadow-lg flex items-center gap-2">
                  <CalendarIcon size={12} /> {activeEvent.date}
                </div>
                <h3 className="font-display text-4xl md:text-5xl text-[#F0EAD6] uppercase tracking-tighter mb-4 leading-[0.9] drop-shadow-md">
                  {activeEvent.title}
                </h3>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#D4A373] mb-8">
                  <MapPin size={16} /> {activeEvent.location}
                </div>
              </div>

              <div className="absolute top-8 right-8 flex gap-2">
                {eventsData.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentEventIndex
                      ? "bg-[#D4A373] w-6"
                      : "bg-[#F0EAD6]/30"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- PARTNER STORIES (CAROUSEL) — hidden, preserved for later --- */}
        {false && (
          <div className="features-section mt-24 border-t border-[#F0EAD6]/20 pt-16 relative z-10">
            <div className="flex items-center justify-between mb-10 px-4">
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-[#D4A373] mb-2">
                  Featured Stories
                </h3>
                <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tighter text-[#F0EAD6]">
                  Community Articles
                </h2>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={prevFeature}
                  className="w-12 h-12 border border-[#F0EAD6]/20 rounded-full flex items-center justify-center hover:bg-[#F0EAD6] hover:text-[#2C3628] transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextFeature}
                  className="w-12 h-12 border border-[#F0EAD6]/20 rounded-full flex items-center justify-center hover:bg-[#F0EAD6] hover:text-[#2C3628] transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="feature-carousel overflow-hidden w-full px-4">
              <div
                className="flex gap-8 transition-transform duration-700 cubic-bezier(0.23, 1, 0.32, 1)"
                style={{
                  transform: `translateX(-${featureScrollIndex * 340}px)`,
                }}
              >
                {partnerArticles.map((article, idx) => (
                  <div
                    key={idx}
                    className="min-w-[300px] md:min-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden relative group cursor-pointer border border-[#F0EAD6]/10 hover:border-[#D4A373]/50 transition-colors"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C3628] via-[#2C3628]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-start transform transition-transform duration-500 group-hover:-translate-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373] mb-2 bg-[#2C3628]/80 backdrop-blur-md px-2 py-1 rounded border border-[#D4A373]/20">
                        {article.category} • {article.business}
                      </span>
                      <h4 className="font-display text-xl uppercase leading-tight mb-3 text-[#F0EAD6] group-hover:text-[#D4A373] transition-colors">
                        {article.title}
                      </h4>
                      <p className="font-body text-xs text-[#F0EAD6]/70 leading-relaxed mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#D4A373] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        Read Article <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- FOOTER COMPONENT --- */}
      <Footer />
    </div>
  );
};

export default Resources;