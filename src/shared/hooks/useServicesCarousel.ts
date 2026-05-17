import { useState, useCallback, type MouseEvent, type TouchEvent } from 'react';

export const useServicesCarousel = (itemCount: number) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % itemCount);
        setTilt({ x: 0, y: 0 });
    }, [itemCount]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
        setTilt({ x: 0, y: 0 });
    }, [itemCount]);

    const handleTouchStart = (e: TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;
        if (distance > minSwipeDistance) nextSlide();
        if (distance < -minSwipeDistance) prevSlide();
        setTouchStart(null);
        setTouchEnd(null);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isHovering) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / (width / 2);
        const y = (e.clientY - top - height / 2) / (height / 2);
        setTilt({ x: -y * 10, y: x * 10 });
    };

    const getSlideStyles = useCallback((index: number) => {
        const isCenter = index === currentIndex;
        const isRight = index === (currentIndex + 1) % itemCount;
        const isLeft = index === (currentIndex - 1 + itemCount) % itemCount;

        let styles = "opacity-0 scale-50 z-0 translate-x-[-50%] pointer-events-none";

        if (isCenter) {
            styles = "left-1/2 -translate-x-1/2 opacity-100 scale-100 z-20 cursor-pointer";
        } else if (isLeft) {
            styles = "left-1/2 -translate-x-full md:left-[15%] md:-translate-x-1/2 opacity-0 md:opacity-40 scale-75 z-10 grayscale";
        } else if (isRight) {
            styles = "left-1/2 translate-x-0 md:left-[85%] md:-translate-x-1/2 opacity-0 md:opacity-40 scale-75 z-10 grayscale";
        }

        return { className: styles, isCenter };
    }, [currentIndex, itemCount]);

    return {
        currentIndex,
        tilt,
        isHovering,
        setIsHovering,
        setTilt,
        nextSlide,
        prevSlide,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleMouseMove,
        getSlideStyles
    };
};
