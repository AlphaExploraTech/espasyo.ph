import { useState, useRef, useEffect } from 'react';
import { Quote, Pause, Play, ChevronLeft, ChevronRight, X } from 'lucide-react';

import reviewData from '../../../data/reviews.json';
import Navbar from '../../../shared/components/Navbar';

const Reviews = () => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  // Ref to track exact float value for mobile browser sub-pixel scrolling
  const exactScrollPos = useRef(0);

  const shouldScroll = isAutoPlaying && activeCardId === null && !selectedReview;

  // --- MODAL ANIMATION LOGIC ---
  const openModal = (review: any) => {
    setSelectedReview(review);
    setTimeout(() => setIsModalVisible(true), 10); // Tiny delay to trigger CSS transition
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setSelectedReview(null), 300); // Wait for animation to finish before unmounting
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedReview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedReview]);

  // --- AUTO-SCROLL LOGIC ---
  useEffect(() => {
    let animationFrameId: number;

    const autoScroll = () => {
      if (scrollRef.current && shouldScroll) {
        // Sync our exact position if the user manually swiped/scrolled
        if (Math.abs(scrollRef.current.scrollLeft - exactScrollPos.current) > 1) {
          exactScrollPos.current = scrollRef.current.scrollLeft;
        }

        // Use float tracker to bypass iOS fractional scroll bug
        exactScrollPos.current += 0.5;
        scrollRef.current.scrollLeft = exactScrollPos.current;

        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
          exactScrollPos.current = 0;
        }
        animationFrameId = requestAnimationFrame(autoScroll);
      }
    };

    if (shouldScroll) {
      animationFrameId = requestAnimationFrame(autoScroll);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldScroll]);

  const manualScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Responsive scroll amount based on screen size
      const scrollAmount = window.innerWidth < 640 ? window.innerWidth * 0.85 : 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F2E8D5] overflow-x-hidden">
      <Navbar />

      <main className="relative flex-1 flex flex-col justify-center items-center pt-20 pb-12 md:pt-20 md:pb-16">
        {/* --- 1. TITLE & UNDERLINE --- */}
        <div className="relative z-10 flex flex-col items-center mb-6 px-4 shrink-0 text-center w-full">
          <div className="inline-flex flex-col items-center mb-6 max-w-full">
            <h1 className="font-display text-3xl md:text-5xl font-medium text-[#3A2618] tracking-tight">
              What our <span className="font-bold">Ka-Espasyo</span> says!
            </h1>
            <div className="w-full h-1.5 bg-[#8C6B50] rounded-full mt-3 shadow-inner"></div>
          </div>

          <h3 className="text-center mb-4 opacity-80 px-4 font-sans italic text-[#5C4D3C] tracking-wide">
            <span className="md:hidden text-sm font-medium">Tap a card to pause. Click SEE MORE for full review.</span>
            <span className="hidden md:inline-block text-base font-medium">Hover to pause. Click SEE MORE to read.</span>
          </h3>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-2 bg-[#FDF4DC] border border-[#8C6B50]/30 text-[#3A2618] px-5 py-2.5 rounded-full shadow-sm hover:bg-white transition-all font-sans text-sm font-bold tracking-wider uppercase mb-2"
          >
            {isAutoPlaying ? <Pause size={18} /> : <Play size={18} />}
            <span>{isAutoPlaying ? "Pause" : "Resume"} Auto-Scroll</span>
          </button>
        </div>

        {/* --- 4. CAROUSEL --- */}
        <div className="relative w-full max-w-[100vw] mx-auto flex items-center group">
          {!isAutoPlaying && (
            <button onClick={() => manualScroll('left')} className="absolute left-2 md:left-6 z-20 p-2 md:p-3 rounded-full bg-[#FDF4DC]/90 border border-[#8C6B50]/20 hidden md:block hover:bg-white transition-colors">
              <ChevronLeft size={28} strokeWidth={3} className="text-[#3A2618]" />
            </button>
          )}

          <div ref={scrollRef} className={`flex w-full overflow-x-auto py-6 items-start ${isAutoPlaying ? 'hide-scrollbar' : 'custom-h-scrollbar snap-x snap-mandatory'}`}>
            <div className="flex gap-4 md:gap-6 px-4 md:px-12 w-max shrink-0">
              {reviewData.concat(reviewData).map((review, idx) => (
                <ReviewCard
                  key={idx}
                  review={review}
                  onSeeMore={() => openModal(review)}
                  onInteractionStart={() => setActiveCardId(`card-${idx}`)}
                  onInteractionEnd={() => setActiveCardId(null)}
                />
              ))}
            </div>
          </div>

          {!isAutoPlaying && (
            <button onClick={() => manualScroll('right')} className="absolute right-2 md:right-6 z-20 p-2 md:p-3 rounded-full bg-[#FDF4DC]/90 border border-[#8C6B50]/20 hidden md:block hover:bg-white transition-colors">
              <ChevronRight size={28} strokeWidth={3} className="text-[#3A2618]" />
            </button>
          )}
        </div>

        <div className="mt-8 md:mt-10 relative z-10 px-4 text-center">
          <h2 className="font-serif text-xl md:text-3xl text-[#5C4D3C]">
            See more reviews <a href="https://www.facebook.com/espasyostudynofficehub/reviews" target="_blank" rel="noopener noreferrer" className="font-bold text-[#8C6B50] underline decoration-2 hover:text-[#3A2618] transition-colors">here</a>.
          </h2>
        </div>
      </main>

      {/* --- MODAL OVERLAY WITH ANIMATION --- */}
      {selectedReview && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 pt-20 md:pt-4 bg-[#3A2618]/60 backdrop-blur-md transition-opacity duration-300 ease-out ${isModalVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeModal}
        >
          <div
            className={`bg-[#FDF4DC] w-[95vw] sm:w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col relative border border-[#8C6B50]/30 transition-all duration-300 ease-out ${isModalVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-full hover:bg-[#8C6B50]/10 text-[#3A2618] transition-colors z-20"
            >
              <X size={24} />
            </button>

            <div className="p-5 md:p-8 flex flex-col flex-1 overflow-y-auto custom-scrollbar">
              <div className="flex-1 mt-2 md:mt-0">
                <Quote className="w-8 h-8 md:w-10 md:h-10 text-[#A69076] mb-3 md:mb-4 opacity-50" fill="currentColor" />
                <h4 className="font-serif text-xl md:text-3xl font-bold text-[#3A2618] mb-3 md:mb-6">{selectedReview.user}</h4>
                <p className="font-serif text-base md:text-xl text-[#5C4D3C] leading-relaxed italic pb-4 md:pb-8">
                  "{selectedReview.statement}"
                </p>
              </div>

              <div className="mt-auto pt-4 md:pt-6 border-t border-[#8C6B50]/20 flex justify-end shrink-0">
                <button
                  onClick={closeModal}
                  className="bg-[#8C6B50] text-[#FDF4DC] px-6 md:px-8 py-2 md:py-2.5 rounded-full font-sans text-xs md:text-sm font-bold tracking-wider uppercase hover:bg-[#3A2618] transition-colors shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .custom-h-scrollbar::-webkit-scrollbar { height: 6px; }
        @media (min-width: 768px) { .custom-h-scrollbar::-webkit-scrollbar { height: 8px; } }
        .custom-h-scrollbar::-webkit-scrollbar-thumb { background: rgba(140, 107, 80, 0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        @media (min-width: 768px) { .custom-scrollbar::-webkit-scrollbar { width: 6px; } }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #8C6B50; border-radius: 10px; }
      `}</style>
    </div>
  );
};

/* --- CARD COMPONENT --- */
const ReviewCard = ({ review, onSeeMore, onInteractionStart, onInteractionEnd }: any) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [review.statement]);

  return (
    <div
      onMouseEnter={onInteractionStart}
      onMouseLeave={onInteractionEnd}
      onTouchStart={onInteractionStart}
      onTouchEnd={onInteractionEnd}
      onTouchCancel={onInteractionEnd}
      onClick={() => { if (isOverflowing) onSeeMore(); }}
      // RESPONSIVE WIDTH & HEIGHT APPLIED HERE
      className={`w-[85vw] sm:w-[280px] md:w-[320px] h-[320px] sm:h-[350px] md:h-[380px] bg-[#FDF4DC] rounded-xl shadow-lg border border-[#8C6B50]/20 flex flex-col p-5 md:p-6 shrink-0 transition-transform hover:-translate-y-1 ${isOverflowing ? 'cursor-pointer' : ''} snap-center`}
    >
      <div className="flex justify-between items-start mb-3 md:mb-4">
        <h4 className="font-serif text-lg md:text-xl font-bold text-[#3A2618] line-clamp-2 pr-2">{review.user}</h4>
        <Quote className="w-4 h-4 md:w-5 md:h-5 text-[#A69076] rotate-180 shrink-0" fill="currentColor" />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div ref={textRef} className="font-serif text-base md:text-lg text-[#5C4D3C] leading-snug line-clamp-[7] md:line-clamp-[8] overflow-hidden italic">
          "{review.statement}"
        </div>

        {isOverflowing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSeeMore();
            }}
            className="mt-auto pt-3 md:pt-4 text-[#8C6B50] font-sans text-[10px] md:text-xs font-black tracking-widest uppercase hover:text-[#3A2618] text-left"
          >
            ...SEE MORE
          </button>
        )}
      </div>
    </div>
  );
};

export default Reviews;