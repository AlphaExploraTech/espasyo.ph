import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useHomeAnimations = () => {
    const location = useLocation();

    // --- REFS ---
    const container = useRef<HTMLDivElement>(null);
    const scrollContainer = useRef<HTMLDivElement>(null);
    const testimonialColumnRef = useRef<HTMLDivElement>(null);
    const servicesContentRef = useRef<HTMLDivElement>(null);
    const heroTextRef1 = useRef<HTMLHeadingElement>(null);
    const heroTextRef2 = useRef<HTMLHeadingElement>(null);
    const subTextRef = useRef<HTMLDivElement>(null);
    const navContainerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const morphRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // --- STATE ---
    const [navTheme, setNavTheme] = useState<'default' | 'brown'>(() => {
        const target = location.state?.scrollToSection;
        return (target === 'services' || target === 'services-end') ? 'brown' : 'default';
    });
    const [introFinished, setIntroFinished] = useState(() => location.state?.skipIntro ? true : false);
    const [originStoryVisible, setOriginStoryVisible] = useState(false);
    const [missionVisible, setMissionVisible] = useState(false);

    const handleIntroComplete = () => setIntroFinished(true);

    useEffect(() => {
        const handleScrollEvent = (e: Event) => {
            const customEvent = e as CustomEvent;
            const target = customEvent.detail;
            if (timelineRef.current && target) {
                const labelPos = timelineRef.current.scrollTrigger?.labelToScroll(target);
                if (labelPos !== undefined) timelineRef.current.scrollTrigger?.scroll(labelPos);
            }
        };
        window.addEventListener('scrollToSection', handleScrollEvent);
        return () => window.removeEventListener('scrollToSection', handleScrollEvent);
    }, []);

    useLayoutEffect(() => {
        if (!location.state?.scrollToSection) window.scrollTo(0, 0);
    }, [location.pathname, location.state]);

    useGSAP(() => {
        if (introFinished) {
            const duration = location.state?.skipIntro ? 0 : 1.2;
            const stagger = location.state?.skipIntro ? 0 : 0.1;

            const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });
            entranceTl
                .fromTo(navContainerRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: duration })
                .fromTo(heroTextRef1.current, { y: 100, opacity: 0, skewY: 0 }, { y: 0, opacity: 1, skewY: 0, duration: duration }, "-=0.8")
                .fromTo(heroTextRef2.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: duration }, "-=1.0")
                .fromTo(subTextRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: duration }, "-=0.8")
                .fromTo(marqueeRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: duration }, "-=1.2")
                .fromTo(".polaroid-entry", { y: 150, opacity: 0, rotation: 5 }, { y: 0, opacity: 1, rotation: 0, duration: duration, stagger: stagger }, "-=1.0");

            if (scrollContainer.current && testimonialColumnRef.current && servicesContentRef.current) {
                ScrollTrigger.refresh();

                const scrollTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: scrollContainer.current,
                        pin: true,
                        scrub: 0,
                        end: () => {
                            const vw = window.innerWidth;
                            const vh = window.innerHeight;
                            const mWidth = (vw < 640 ? 50 : vw < 768 ? 60 : 70) + 16;
                            const widthTotal = vw * 3 - mWidth;

                            const tColParent = testimonialColumnRef.current?.parentElement?.clientHeight || vh;
                            const tScroll = Math.max(0, (testimonialColumnRef.current?.scrollHeight || 0) - tColParent + 50);
                            const sScroll = Math.max(0, (servicesContentRef.current?.scrollHeight || 0) - vh);

                            const horizontalScroll = widthTotal - vw;
                            return "+=" + (horizontalScroll + tScroll + sScroll);
                        },
                        invalidateOnRefresh: true,
                    }
                });
                timelineRef.current = scrollTl;

                scrollTl.to(scrollContainer.current, {
                    x: () => {
                        const vw = window.innerWidth;
                        const mWidth = (vw < 640 ? 50 : vw < 768 ? 60 : 70) + 16;
                        return -(vw - mWidth);
                    },
                    ease: "none", duration: 10
                });
                scrollTl.addLabel("our-story");
                scrollTl.addLabel("testimonials-start");

                scrollTl.to(testimonialColumnRef.current, {
                    y: () => {
                        const tColParent = testimonialColumnRef.current?.parentElement?.clientHeight || window.innerHeight;
                        return -(Math.max(0, (testimonialColumnRef.current?.scrollHeight || 0) - tColParent + 50));
                    },
                    ease: "none", duration: 25
                });

                scrollTl.to({}, {
                    duration: 0.01,
                    onStart: () => { setOriginStoryVisible(true); setMissionVisible(false); },
                    onReverseComplete: () => setOriginStoryVisible(false),
                }, "testimonials-start+=8.33");

                scrollTl.to({}, {
                    duration: 0.01,
                    onStart: () => { setMissionVisible(true); },
                    onReverseComplete: () => { setMissionVisible(false); setOriginStoryVisible(true); },
                }, "testimonials-start+=16.67");

                scrollTl.addLabel("testimonials-end");

                scrollTl.fromTo(".view-all-card", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, ease: "back.out(1.7)", duration: 5 }, "<+80%");

                scrollTl.to(scrollContainer.current, {
                    x: () => {
                        const vw = window.innerWidth;
                        const mWidth = (vw < 640 ? 50 : vw < 768 ? 60 : 70) + 16;
                        return -(2 * vw - mWidth);
                    },
                    ease: "none",
                    duration: 10,
                    onStart: () => setNavTheme('brown'),
                    onReverseComplete: () => setNavTheme('default'),
                });
                scrollTl.addLabel("services");

                scrollTl.to(servicesContentRef.current, {
                    y: () => -(Math.max(0, (servicesContentRef.current?.scrollHeight || 0) - window.innerHeight)),
                    ease: "none", duration: 25
                });
                scrollTl.addLabel("services-end");

                const targetSection = location.state?.scrollToSection;
                if (targetSection) {
                    const labelPos = scrollTl.scrollTrigger?.labelToScroll(targetSection);
                    if (labelPos) scrollTl.scrollTrigger?.scroll(labelPos);
                }
            }
        }
    }, { scope: container, dependencies: [introFinished] });

    return {
        refs: {
            container,
            scrollContainer,
            testimonialColumnRef,
            servicesContentRef,
            heroTextRef1,
            heroTextRef2,
            subTextRef,
            navContainerRef,
            marqueeRef,
            morphRef
        },
        state: {
            navTheme,
            introFinished,
            originStoryVisible,
            missionVisible
        },
        handlers: {
            handleIntroComplete
        }
    };
};
