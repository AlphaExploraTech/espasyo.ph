// src/features/resources/viewModels/useResourcesViewModel.ts
// ViewModel for the Resources page — merges animation + control state.

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  DAILY_SCHEDULE,
  MONTHLY_GRID,
  MONTHLY_EVENTS,
  WEEKLY_DATA,
  EVENTS_DATA,
  PARTNER_ARTICLES,
} from '../../../shared/utils/resourcesData';

gsap.registerPlugin(ScrollTrigger);

export const useResourcesViewModel = () => {
  const container = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const eventCardRef = useRef<HTMLDivElement>(null);

  // --- STATE ---
  const [calendarView, setCalendarView] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [featureScrollIndex, setFeatureScrollIndex] = useState(0);

  // --- HANDLERS ---
  const nextEvent = () => setCurrentEventIndex((prev) => (prev + 1) % EVENTS_DATA.length);
  const prevEvent = () => setCurrentEventIndex((prev) => (prev - 1 + EVENTS_DATA.length) % EVENTS_DATA.length);

  const nextFeature = () => {
    const maxIndex = Math.max(0, PARTNER_ARTICLES.length - 1);
    setFeatureScrollIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };
  const prevFeature = () => {
    const maxIndex = Math.max(0, PARTNER_ARTICLES.length - 1);
    setFeatureScrollIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  // --- 3D TILT EFFECT ---
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!eventCardRef.current) return;
    const { left, top, width, height } = eventCardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    gsap.to(eventCardRef.current, { rotationY: x, rotationX: -y, duration: 0.5, ease: "power2.out" });
  };

  const handleCardMouseLeave = () => {
    if (!eventCardRef.current) return;
    gsap.to(eventCardRef.current, { rotationY: 0, rotationX: 0, duration: 0.5, ease: "power2.out" });
  };

  const activeEvent = EVENTS_DATA[currentEventIndex];

  // --- ANIMATIONS ---
  useGSAP(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, { xPercent: -50, repeat: -1, duration: 20, ease: "linear" });
    }

    const tl = gsap.timeline();
    tl.from(".page-title-group", { y: 30, opacity: 0, duration: 1, ease: "power3.out" })
      .from(".content-block", { y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }, "-=0.5");

    gsap.from(".features-section", {
      scrollTrigger: { trigger: ".features-section", start: "top 85%" },
      y: 50, opacity: 0, duration: 0.8,
    });
  }, { scope: container });

  return {
    // Refs
    container,
    marqueeRef,
    eventCardRef,

    // Data
    dailySchedule: DAILY_SCHEDULE,
    monthlyGrid: MONTHLY_GRID,
    monthlyEvents: MONTHLY_EVENTS,
    weeklyData: WEEKLY_DATA,
    eventsData: EVENTS_DATA,
    partnerArticles: PARTNER_ARTICLES,
    activeEvent,

    // State
    calendarView,
    setCalendarView,
    currentEventIndex,
    featureScrollIndex,

    // Handlers
    nextEvent,
    prevEvent,
    nextFeature,
    prevFeature,
    handleCardMouseMove,
    handleCardMouseLeave,
  };
};
