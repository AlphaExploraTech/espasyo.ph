// DetailModal.tsx
import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { X, Instagram, Facebook, Linkedin, Play, ChevronLeft, ChevronRight } from "lucide-react";

// IMPORTANT FIX: Auto-resolve LogoWhite.jpg to the public folder
const resolvePath = (p?: string): string => {
  if (!p) return '';
  if (p.includes('LogoWhite.jpg')) return 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/LogoWhite.jpg'; // Force to public folder
  return p.replace(/^public\//, '/');
};



interface DetailModalProps {
  item: {
    id: string | number;
    businessName: string;
    industry: string[];
    services: string[];
    links?: {
      website?: string;
      facebook?: string;
      instagram?: string;
      LinkedIn?: string;
    };
    testimonial: string;
    media?: {
      video?: string;
      image1?: string;
      image2?: string;
      image3?: string;
    };
    placeholderImage?: string;
    src: string;
  };
  originRect: DOMRect;
  onClose: () => void;
}

const DetailModal = ({ item, originRect, onClose }: DetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [play, setPlay] = useState(false);

  // Compute available media
  const availableMedia: { type: 'video' | 'image'; src: string; id: string }[] = [];
  
  if (item.media?.video) {
    availableMedia.push({ type: 'video', src: item.media.video, id: 'video' });
  }
  if (item.media?.image1) {
    availableMedia.push({ type: 'image', src: item.media.image1, id: 'image1' });
  }
  if (item.media?.image2) {
    availableMedia.push({ type: 'image', src: item.media.image2, id: 'image2' });
  }
  if (item.media?.image3) {
    availableMedia.push({ type: 'image', src: item.media.image3, id: 'image3' });
  }

  // Fallback if no media array items exist
  if (availableMedia.length === 0) {
    availableMedia.push({ type: 'image', src: item.placeholderImage || item.src, id: 'fallback' });
  }

  const activeMedia = availableMedia[activeIndex];

  useLayoutEffect(() => {
    if (!mediaRef.current) return;

    const finalRect = mediaRef.current.getBoundingClientRect();
    const dx = originRect.left - finalRect.left;
    const dy = originRect.top - finalRect.top;
    const sx = originRect.width / finalRect.width;
    const sy = originRect.height / finalRect.height;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(overlayRef.current, { opacity: 0, duration: 0.8, ease: "power2.out" }, 0)
        .from(mediaRef.current, { x: dx, y: dy, scaleX: sx, scaleY: sy, duration: 0.8, ease: "expo.out" }, 0)
        .from(detailsRef.current, { opacity: 0, x: 40, duration: 0.6, ease: "power3.out" }, 0.2);
    });

    return () => ctx.revert();
  }, [originRect]);

  const handleClose = () => {
    if (!mediaRef.current || !overlayRef.current || !detailsRef.current) {
      onClose();
      return;
    }
    
    const finalRect = mediaRef.current.getBoundingClientRect();
    const dx = originRect.left - finalRect.left;
    const dy = originRect.top - finalRect.top;
    const sx = originRect.width / finalRect.width;
    const sy = originRect.height / finalRect.height;

    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(detailsRef.current, { opacity: 0, x: 20, duration: 0.4, ease: "power2.in" }, 0)
      .to(mediaRef.current, { x: dx, y: dy, scaleX: sx, scaleY: sy, duration: 0.6, ease: "expo.inOut" }, 0.1)
      .to(overlayRef.current, { opacity: 0, duration: 0.6, ease: "power2.in" }, 0.2);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
      {/* overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={(e) => { e.stopPropagation(); handleClose(); }}
      />

      {/* MODAL CONTAINER */}
      <div
        ref={modalRef}
        className="relative z-10 flex flex-col md:flex-row w-[95vw] max-w-[1200px] h-[90vh] max-h-[900px] rounded-2xl overflow-hidden bg-[#2b3327]/80 backdrop-blur-sm shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-black/40 hover:bg-black/80 text-[#e6dfc8] hover:text-white p-2 rounded-full backdrop-blur-sm transition border border-white/10"
        >
          <X size={20} />
        </button>

        {/* MEDIA SECTION (50%) */}
        <div
          ref={mediaRef}
          className="relative w-full h-[40%] min-h-[200px] md:h-full md:w-1/2 shrink-0 overflow-hidden bg-black flex flex-col"
        >
          <div className="w-full h-full relative">
            {activeMedia.type === 'video' ? (
              <div className="w-full h-full">
                {!play ? (
                  <>
                    <img
                      src={resolvePath(item.placeholderImage || item.src)}
                      alt={item.businessName}
                      className="w-full h-full object-contain opacity-80"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/LogoWhite.jpg'; }}
                    />
                    <div 
                      className="absolute inset-0 flex items-center justify-center transition cursor-pointer hover:scale-105"
                      onClick={() => setPlay(true)}
                    >
                      <div className="rounded-full bg-white/20 backdrop-blur-md p-4 md:p-6 border border-white/30 shadow-2xl">
                        <Play size={34} className="text-white fill-white ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  activeMedia.src.toLowerCase().endsWith('.mp4') || activeMedia.src.includes('cloudinary.com/') ? (
                    <video
                      src={resolvePath(activeMedia.src)}
                      className="w-full h-full object-contain"
                      autoPlay
                      controls
                      playsInline
                      webkit-playsinline="true"
                    />
                  ) : (
                    <iframe
                      src={resolvePath(activeMedia.src).replace("/open?id=", "/file/d/").replace("/view", "/preview")}
                      title="Video"
                      className="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )
                )}
              </div>
            ) : (
              <img 
                src={resolvePath(activeMedia.src)} 
                alt={`${item.businessName} gallery`} 
                className="w-full h-full object-contain p-2"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/LogoWhite.jpg'; }}
              />
            )}
          </div>

          {availableMedia.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setActiveIndex((prev) => (prev === 0 ? availableMedia.length - 1 : prev - 1)); setPlay(false); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors border border-white/10">
                <ChevronLeft size={20} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setActiveIndex((prev) => (prev === availableMedia.length - 1 ? 0 : prev + 1)); setPlay(false); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors border border-white/10">
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                {availableMedia.map((_, idx) => (
                  <button key={idx} onClick={() => { setActiveIndex(idx); setPlay(false); }} className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? "bg-[#d4a373] w-6" : "bg-white/50 hover:bg-white/80"}`} />
                ))}
              </div>
            </>
          )}

          {/* Carousel Navigation Dots */}
          {availableMedia.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
              {availableMedia.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setPlay(false); // Reset video play state when changing slides
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex 
                      ? "bg-[#FDF4DC] w-8" 
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS SECTION (50%) */}
        <div
          ref={detailsRef}
          className="flex-1 min-h-0 md:w-1/2 flex flex-col px-5 py-5 md:px-8 md:py-8 overflow-y-auto overscroll-contain pointer-events-auto border-l border-white/10"
          data-lenis-prevent
          style={{ scrollbarWidth: 'thin', msOverflowStyle: 'auto' }}
        >
          <style>{`
              [data-lenis-prevent]::-webkit-scrollbar {
                  display: block !important;
                  width: 5px !important;
              }
              [data-lenis-prevent]::-webkit-scrollbar-thumb {
                  background: #FDF4DC40;
                  border-radius: 10px;
              }
          `}</style>
          <h3 className="uppercase tracking-widest text-[16px] md:text-[20px] text-[#FDF4DC] mb-4 font-bold font-display opacity-80 shrink-0">
            About Our Client
          </h3>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-display uppercase text-2xl text-[#B56A54] font-bold leading-tight mb-5">
                {item.businessName}
              </p>

              {/* Connect Links: Moved up below Business Name */}
              {(item.links?.website || item.links?.facebook || item.links?.instagram || item.links?.LinkedIn) && (
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FDF4DC]/50">Connect with us:</span>
                  {item.links.website && (
                    <a
                      href={item.links.website.startsWith('http') ? item.links.website : `https://${item.links.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FDF4DC] text-[#2b3327] hover:bg-[#E6C280] transition-colors px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                    >
                      View Website
                    </a>
                  )}

                  <div className="flex gap-4 items-center">
                    {item.links.facebook && (
                      <a
                        href={item.links.facebook.startsWith('http') ? item.links.facebook : `https://${item.links.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FDF4DC] hover:text-white transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook size={20} />
                      </a>
                    )}
                    {item.links.instagram && (
                      <a
                        href={item.links.instagram.startsWith('http') ? item.links.instagram : `https://${item.links.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FDF4DC] hover:text-white transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram size={20} />
                      </a>
                    )}
                    {item.links.LinkedIn && (
                      <a
                        href={item.links.LinkedIn.startsWith('http') ? item.links.LinkedIn : `https://${item.links.LinkedIn}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FDF4DC] hover:text-white transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={20} />
                      </a>
                    )}
                  </div>
                </div>
              )}
              
              {item.industry && item.industry.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {item.industry.map((ind, idx) => (
                    <span key={idx} className="inline-block bg-[#FDF4DC]/15 text-[#e6dfc8] px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-[#FDF4DC]/30">
                      {ind}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {item.services && item.services.length > 0 && (
              <div className="pt-2">
                <p className="font-display uppercase text-[12px] text-[#FDF4DC] font-semibold tracking-widest mb-2 opacity-70">
                  Services Provided
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 block w-full">
                  <ul className="text-[#f2f0e9] font-body text-base leading-relaxed opacity-90 space-y-3 block w-full">
                    {item.services.slice(0, 4).map((service, idx) => (
                      <li key={idx} className="flex items-center gap-3 group">
                        <span className="text-[#DFA878] text-[10px] shrink-0">◆</span>
                        <span className="flex-1 leading-snug" title={service}>{service}</span>
                      </li>
                    ))}
                  </ul>
                  {item.services.length > 4 && (
                    <ul className="text-[#f2f0e9] font-body text-base leading-relaxed opacity-90 space-y-3 block w-full">
                      {item.services.slice(4, 12).map((service, idx) => (
                        <li key={idx} className="flex items-center gap-3 group">
                          <span className="text-[#DFA878] text-[10px] shrink-0">◆</span>
                          <span className="flex-1 leading-snug" title={service}>{service}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="my-6 h-px bg-white/10" />

          <blockquote className="italic text-base leading-relaxed opacity-90 mb-auto text-[#efe9d5] font-body border-l-2 border-[#FDF4DC]/50 pl-4">
            “{item.testimonial}”
          </blockquote>

        </div>
      </div>
    </div>
  );
};

export default DetailModal;