// src/features/home/viewModels/useHomeViewModel.ts
// ViewModel for the Home page — calls Model layer, manages state, returns data.

import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Business } from '../../../shared/models/types';
import { useSpatialHub } from '../../../shared/hooks/useSpatialHub';
import { useServicesCarousel } from '../../../shared/hooks/useServicesCarousel';
import { testimonialData, serviceCategories } from '../../../shared/utils/homeData';

export const useHomeViewModel = () => {
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
  const withTransition = useCallback((action: () => void) => {
    pendingAction.current = action;
    setIsTransitioning(true);
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setIntroFinished(true);
  };

  const handleGalleryClick = () => navigate('/gallery');

  const handlePolaroidClick = (item: any, e: React.MouseEvent<HTMLDivElement>) => {
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

  // Handle incoming navigation events
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

  return {
    // State
    introFinished,
    selectedDetail,
    selectedBusiness,
    originRect,
    isTransitioning,
    activeView,
    navTheme,
    currentIndex,
    tilt,
    isHovering,
    activeService,
    testimonialData,
    serviceCategories,

    // Setters
    setSelectedDetail,
    setSelectedBusiness,
    setActiveView,
    setIsTransitioning,
    setIsHovering,
    setTilt,

    // Refs
    containerRef,
    layoutRef,
    pendingAction,

    // Handlers
    handleIntroComplete,
    handleGalleryClick,
    handlePolaroidClick,
    handleViewAllClick,
    handleHeroNavigate,
    handleTouchStart,
    handleTouchEnd,
    carouselTouchStart,
    handleTouchMove,
    carouselTouchEnd,
    handleMouseMove,
    nextSlide,
    prevSlide,
    getSlideStyles,
  };
};
