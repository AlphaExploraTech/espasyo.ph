import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useResourcesAnimations = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const eventCardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
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
    }, { scope: containerRef });

    const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!eventCardRef.current) return;
        const { left, top, width, height } = eventCardRef.current.getBoundingClientRect();
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

    return {
        containerRef,
        marqueeRef,
        eventCardRef,
        handleCardMouseMove,
        handleCardMouseLeave
    };
};
