//C:\Users\judef\Documents\espasyo.ph\src\pages\Home.tsx
import { useState, type MouseEvent, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


import Navbar from '../components/Common/Navbar';
import Intro from '../components/Home/Intro';
import Hero from '../components/Home/Hero';
import StorySection from '../components/Home/StorySection';
import ServicesSection from '../components/Home/ServicesSection';
import Services360 from '../components/Home/Services360';
import Testimonials from './Testimonials';
import Contact from './Contact';
import DetailModal from '../components/Shared/Modals/DetailModal';
import FounderModal from '../components/Shared/Modals/FounderModal';
import { GalleryModal } from '../components/Testimonials/GalleryModal';
import type { Business } from '../constants/testimonialsData';

import { testimonialData, serviceCategories } from '../constants/homeData';
import { useSpatialHub } from '../hooks/useSpatialHub';
import { useServicesCarousel } from '../hooks/useServicesCarousel';
import NavTransition from '../components/Common/NavTransition';

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // --- STATE ---
    const [introFinished, setIntroFinished] = useState(() => {
        if (sessionStorage.getItem('hasSeenIntro')) {
            return true;
        }
        if (location.state?.skipIntro) {
            window.history.replaceState({}, '');
            sessionStorage.setItem('hasSeenIntro', 'true');
            return true;
        }
        return false;
    });
    const [selectedDetail, setSelectedDetail] = useState<any>(null);
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
    const [originRect, setOriginRect] = useState<DOMRect | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const pendingAction = useRef<(() => void) | null>(null);

    // --- SPATIAL HUB HOOK ---
    const { 
        activeView, setActiveView, containerRef, layoutRef, 
        handleTouchStart, handleTouchEnd 
    } = useSpatialHub(introFinished);

    // --- CAROUSEL HOOK ---
    const { 
        currentIndex, tilt, isHovering, setIsHovering, setTilt, 
        nextSlide, prevSlide, handleTouchStart: carouselTouchStart, handleTouchMove, 
        handleTouchEnd: carouselTouchEnd, handleMouseMove, getSlideStyles 
    } = useServicesCarousel(serviceCategories.length);

    // --- HANDLERS ---
    // Wrap any view switch in the transition curtain
    const withTransition = useCallback((action: () => void) => {
        pendingAction.current = action;
        setIsTransitioning(true);
    }, []);

    const handleIntroComplete = () => {
        sessionStorage.setItem('hasSeenIntro', 'true');
        setIntroFinished(true);
    };
    const handleGalleryClick = () => navigate('/gallery');

    const handlePolaroidClick = (item: any, e: MouseEvent<HTMLDivElement>) => {
        setOriginRect(e.currentTarget.getBoundingClientRect());
        setSelectedDetail(item);
    };

    const handleViewAllClick = () => withTransition(() => setActiveView('testimonials'));

    const handleHeroNavigate = (dir: 'left' | 'right') => {
        if (dir === 'left') withTransition(() => setActiveView('story'));
        else if (dir === 'right') withTransition(() => setActiveView('testimonials'));
    };

    const activeService = serviceCategories[currentIndex];

    // Navbar theme based on active view and scroll position
    const [scrolledTheme, setScrolledTheme] = useState<'default' | 'brown'>('default');
    useEffect(() => {
        const scrollCol = document.getElementById('main-scroll-column');
        if (!scrollCol) return;
        const handleScroll = () => {
             const servicesTop = document.getElementById('services')?.offsetTop || 0;
             const services360Top = document.getElementById('services-360')?.offsetTop || 999999;
             
             // Transition to green (brown theme) when in services, back to cream (default) for 360 tour
             if (scrollCol.scrollTop >= servicesTop - 100 && scrollCol.scrollTop < services360Top - 100) {
                  setScrolledTheme('brown');
             } else {
                  setScrolledTheme('default');
             }
        };
        scrollCol.addEventListener('scroll', handleScroll);
        return () => scrollCol.removeEventListener('scroll', handleScroll);
    }, [activeView]);

    const navTheme = (activeView === 'hero' && scrolledTheme === 'brown') ? 'brown' : 'default';

    // Handle incoming navigation events from Navbar or Initial State
    useEffect(() => {
        const scrollToTarget = (target: string) => {
            if (target === 'our-story') withTransition(() => setActiveView('story'));
            else if (target === 'testimonials') withTransition(() => setActiveView('testimonials'));
            else if (target === 'services' || target === 'contact' || target === 'hero') {
                withTransition(() => {
                    setActiveView('hero');
                    setTimeout(() => {
                       document.getElementById('main-scroll-column')?.scrollTo({
                         top: document.getElementById(target)?.offsetTop || 0,
                         behavior: 'smooth'
                       });
                    }, 100);
                });
            }
        };

        // Check if there's a target in location state on mount
        if (location.state?.scrollToSection) {
            scrollToTarget(location.state.scrollToSection);
        }

        const handleScrollEvent = (e: Event) => {
            const target = (e as CustomEvent).detail;
            scrollToTarget(target);
        };
        
        window.addEventListener('scrollToSection', handleScrollEvent);
        return () => window.removeEventListener('scrollToSection', handleScrollEvent);
    }, [setActiveView, withTransition, location.state]);

    return (
        <div ref={containerRef} 
             onTouchStart={handleTouchStart} 
             onTouchEnd={handleTouchEnd}
             className={`fixed inset-0 w-screen h-screen overflow-hidden transition-colors duration-1000 ease-in-out ${navTheme === 'brown' ? 'bg-[#4B533E] text-[#FDF4DC]' : 'bg-[#FDF4DC] text-[#3A2618]'}`}
        >
            {!introFinished && <Intro onComplete={handleIntroComplete} />}

            <style>{`
                .animate-infinite-scroll { animation: infinite-scroll 25s linear infinite; }
                @keyframes infinite-scroll { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                .polaroid-shadow { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
                .no-scroll { overflow: hidden; }
                .allow-scroll { overflow-y: auto; overflow-x: hidden; }
            `}</style>

            <div className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-1000 ${introFinished ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <Navbar theme={navTheme} />
            </div>

            {/* GLOBAL BACK BUTTON */}
            {activeView !== 'hero' && (
                <button 
                    onClick={() => setActiveView('hero')} 
                    className={`fixed top-[92px] left-4 md:left-8 z-[150] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 ${navTheme === 'brown' ? 'bg-[#2C3628] text-[#FDF4DC] hover:bg-[#DFA878] hover:text-[#2C3628]' : 'bg-[#3A2618] text-[#FDF4DC] hover:bg-[#DFA878] hover:text-[#3A2618]'}`}
                    title="Back to Hub"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
            )}

            {/* --- SPATIAL CANVAS --- */}
            <div ref={layoutRef} className="absolute top-0 left-0 w-full h-full will-change-transform">
                
                {/* 1. CENTER: VERTICAL SCROLL COLUMN (HERO -> SERVICES -> CONTACT) */}
                <div id="main-scroll-column" 
                     className={`absolute top-0 left-0 w-screen h-screen overflow-x-hidden overflow-y-auto no-scrollbar transition-all duration-300 ${activeView === 'hero' ? 'z-20 pointer-events-auto' : 'z-0 pointer-events-none'}`} 
                     data-lenis-prevent="true">
                    
                    {/* 1A. HERO */}
                    <div id="hero" className="w-full h-screen relative z-10 bg-[#FDF4DC]">
                        <Hero 
                            heroTextRef1={{ current: null }}
                            introFinished={introFinished} 
                            onNavigate={handleHeroNavigate}
                        />
                    </div>

                    {/* 1B. SERVICES */}
                    <div id="services" className="w-full relative bg-[#2C3628] text-[#F0EAD6] z-0">
                        <ServicesSection 
                            activeService={activeService}
                            servicesContentRef={{ current: null }}
                            handleTouchStart={carouselTouchStart}
                            handleTouchMove={handleTouchMove}
                            handleTouchEnd={carouselTouchEnd}
                            serviceCategories={serviceCategories}
                            currentIndex={currentIndex}
                            handleMouseMove={handleMouseMove}
                            setIsHovering={setIsHovering}
                            setTilt={setTilt}
                            tilt={tilt}
                            isHovering={isHovering}
                            prevSlide={prevSlide}
                            nextSlide={nextSlide}
                            handleGalleryClick={handleGalleryClick}
                            getSlideStyles={getSlideStyles}
                        />
                    </div>

                    {/* 1C. 360 TOUR & CTA */}
                    <div id="services-360" className="w-full relative">
                        <Services360 />
                    </div>

                    {/* 1D. CONTACT & FOOTER */}
                    <div id="contact" className="w-full relative">
                        <Contact hideNavbar={true} />
                    </div>
                </div>

                {/* 2. LEFT: STORY SECTION */}
                <div className={`absolute top-0 left-[-100vw] w-screen h-screen bg-[#FDF4DC] transition-all duration-300 ${activeView === 'story' ? 'z-20 pointer-events-auto opacity-100' : 'z-0 pointer-events-none opacity-0'}`}>
                    <StorySection 
                        testimonialData={testimonialData}
                        handleViewAllClick={handleViewAllClick}
                        handleGalleryTransition={handleGalleryClick}
                        handlePolaroidClick={handlePolaroidClick}
                    />
                </div>

                {/* 3. RIGHT: TESTIMONIALS */}
                <div className={`absolute top-0 left-[100vw] w-screen h-screen bg-[#FDF4DC] overflow-y-auto no-scrollbar transition-all duration-300 ${activeView === 'testimonials' ? 'z-20 pointer-events-auto opacity-100' : 'z-0 pointer-events-none opacity-0'}`} data-lenis-prevent="true">
                    {/* Render Testimonials natively, hide its internal navbar */}
                    <div className="relative w-full min-h-screen pb-12">
                        <Testimonials 
                            hideNavbar={true} 
                            onBusinessClick={(b) => {
                                console.log('📍 Hub: setSelectedBusiness called for:', b?.businessName);
                                setSelectedBusiness(b);
                            }} 
                        />
                    </div>
                </div>

            </div>

            {selectedDetail && (
                selectedDetail.isFounder 
                    ? <FounderModal originRect={originRect!} onClose={() => setSelectedDetail(null)} src={selectedDetail.src} />
                    : <DetailModal item={selectedDetail} originRect={originRect!} onClose={() => setSelectedDetail(null)} />
            )}

            {selectedBusiness && (
                <GalleryModal business={selectedBusiness} onClose={() => setSelectedBusiness(null)} />
            )}

            {/* NAV TRANSITION OVERLAY */}
            <NavTransition
                isVisible={isTransitioning}
                onHalfway={() => {
                    pendingAction.current?.();
                    pendingAction.current = null;
                }}
                onDone={() => setIsTransitioning(false)}
            />
        </div>
    );
};

export default Home;