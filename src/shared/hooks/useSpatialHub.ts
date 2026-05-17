import { useState, useRef, type TouchEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export type ViewState = 'hero' | 'story' | 'testimonials';

export const useSpatialHub = (introFinished: boolean) => {
    const [activeView, setActiveView] = useState<ViewState>('hero');
    const containerRef = useRef<HTMLDivElement>(null);
    const layoutRef = useRef<HTMLDivElement>(null);

    // Touch handling for swipe gestures
    const touchStart = useRef<{ x: number, y: number } | null>(null);

    const handleTouchStart = (e: TouchEvent) => {
        touchStart.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    };

    const handleTouchEnd = (e: TouchEvent) => {
        if (!touchStart.current) return;

        const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        };

        const dx = touchEnd.x - touchStart.current.x;
        const dy = touchEnd.y - touchStart.current.y;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        // Minimum swipe distance
        if (Math.max(absDx, absDy) > 50) {
            const scrollCol = document.getElementById('main-scroll-column');
            const isScrolled = scrollCol ? scrollCol.scrollTop > 50 : false;

            if (activeView === 'hero') {
                if (absDx > absDy && !isScrolled) {
                    if (dx > 0) setActiveView('story'); // Swipe Right -> Show Left content (Story)
                    else setActiveView('testimonials'); // Swipe Left -> Show Right content (Testimonials)
                }
            } else if (activeView === 'story') {
                // Return to hero if swiping left
                if (absDx > absDy && dx < 0) setActiveView('hero');
            } else if (activeView === 'testimonials') {
                // Return to hero if swiping right
                if (absDx > absDy && dx > 0) setActiveView('hero');
            }
        }
        touchStart.current = null;
    };

    useGSAP(() => {
        if (!layoutRef.current || !introFinished) return;
        
        // Target translations for the layout container
        let x = '0vw';
        let y = '0vh';

        if (activeView === 'hero') { x = '0vw'; y = '0vh'; }
        else if (activeView === 'story') { x = '100vw'; y = '0vh'; }
        else if (activeView === 'testimonials') { x = '-100vw'; y = '0vh'; }

        gsap.to(layoutRef.current, {
            x,
            y,
            duration: 1.2,
            ease: 'power4.inOut'
        });
    }, { scope: containerRef, dependencies: [activeView, introFinished] });

    return {
        activeView,
        setActiveView,
        containerRef,
        layoutRef,
        handleTouchStart,
        handleTouchEnd
    };
};
