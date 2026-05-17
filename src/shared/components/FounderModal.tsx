import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { X, Instagram, Facebook, Linkedin, Play } from "lucide-react";

interface FounderModalProps {
  originRect: DOMRect;
  onClose: () => void;
  src: string;
}

const FounderModal = ({ originRect, onClose, src }: FounderModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // --- ADDED PLAY STATE ---
  const [play, setPlay] = useState(false);

  useLayoutEffect(() => {
    if (!mediaRef.current) return;

    const finalRect = mediaRef.current.getBoundingClientRect();

    const dx = originRect.left - finalRect.left;
    const dy = originRect.top - finalRect.top;
    const sx = originRect.width / finalRect.width;
    const sy = originRect.height / finalRect.height;

    const ctx = gsap.context(() => {
      // Create a master timeline for the opening sequence
      const tl = gsap.timeline();
      
      tl.from(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      }, 0)
      .from(mediaRef.current, {
        x: dx,
        y: dy,
        scaleX: sx,
        scaleY: sy,
        duration: 0.8,
        ease: "expo.out",
      }, 0)
      .from(detailsRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.6,
        ease: "power3.out",
      }, 0.2); // Details fade in slightly after media expansion starts
    });

    return () => ctx.revert();
  }, [originRect]);

  // Handle closing animation
  const handleClose = () => {
    // If not yet mounted refs, just call onClose
    if (!mediaRef.current || !overlayRef.current || !detailsRef.current) {
      onClose();
      return;
    }
    
    // Calculate the reverse transform needed to go back to origin rect
    const finalRect = mediaRef.current.getBoundingClientRect();
    const dx = originRect.left - finalRect.left;
    const dy = originRect.top - finalRect.top;
    const sx = originRect.width / finalRect.width;
    const sy = originRect.height / finalRect.height;

    const tl = gsap.timeline({ onComplete: onClose });
    
    // Fade out details faster than the scaling animation
    tl.to(detailsRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.4,
      ease: "power2.in"
    }, 0)
    // Scale modal back down to original thumb size/position
    .to(mediaRef.current, {
      x: dx,
      y: dy,
      scaleX: sx,
      scaleY: sy,
      duration: 0.6,
      ease: "expo.inOut"
    }, 0.1)
    // Fade overlay out behind it
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.in"
    }, 0.2); 
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={(e) => { e.stopPropagation(); handleClose(); }}
      />

      {/* modal */}
      <div
        ref={modalRef}
        className="relative z-10 flex w-[92vw] max-w-6xl h-[78vh] rounded-2xl overflow-hidden bg-[#2b3327]/90 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.6)] border border-[#FDF4DC]/20"
      >
        {/* close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-50 text-[#e6dfc8] hover:text-[#FDF4DC] transition-colors bg-black/20 p-2 rounded-full backdrop-blur-md"
        >
          <X size={22} />
        </button>

        {/* --- MEDIA SECTION (Updated for Video) --- */}
        <div 
          ref={mediaRef} 
          className="relative w-[50%] md:w-[58%] h-full overflow-hidden bg-black cursor-pointer group"
          onClick={() => setPlay(true)}
        >
          {!play ? (
            <>
              {/* Thumbnail Image */}
              <img src={src} alt="Ms. Tina" className="w-full h-full object-contain opacity-90 transition-transform duration-700 group-hover:scale-105" />
              
              {/* Dark Gradient for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2b3327]/90 pointer-events-none" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-10">
                <div className="rounded-full bg-white/20 backdrop-blur-lg p-5 border border-white/30 shadow-xl">
                  <Play size={34} className="text-white fill-white ml-1" />
                </div>
              </div>
            </>
          ) : (
            <iframe
              // Replace this URL with Ms. Tina's actual video URL
              src="https://www.youtube.com/embed/IlPRb2q5VSA?autoplay=1&mute=0&playsinline=1" 
              title="Founder Story Video"
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>

        {/* details */}
        <div ref={detailsRef} className="w-[50%] md:w-[42%] h-full px-8 md:px-12 py-12 flex flex-col justify-start relative z-20 -ml-8 overflow-y-auto pointer-events-auto custom-scrollbar">
          {/* Container added for scroll flow */}
          <div className="flex flex-col h-auto min-h-full justify-center">
            <h3 className="uppercase tracking-widest text-[14px] md:text-[18px] text-[#FDF4DC] mb-4 font-bold font-display">
              Origin Story
            </h3>
            <h4 className="font-display uppercase text-[32px] md:text-[46px] text-[#B56A54] font-semibold mb-6 leading-none tracking-tighter">
              How It All Started
            </h4>

            <div className="space-y-4">
              <p className="opacity-90 text-[14px] md:text-[16px] text-[#f2f0e9] font-body leading-relaxed">
                It began with a simple observation by our founder, <strong>Ms. Tina</strong>. She noticed that many talented freelancers and small business owners were isolated, working from noisy cafes or lonely bedrooms.
              </p>
              <p className="opacity-90 text-[14px] md:text-[16px] text-[#f2f0e9] font-body leading-relaxed">
                She didn't want to build just another "office hub" with cubicles. She envisioned a sanctuary—a place where creatives could collide, collaborate, and grow together.
              </p>
            </div>

            <div className="my-8 h-px bg-white/10" />

            <blockquote className="italic text-xl md:text-2xl leading-relaxed opacity-90 mb-8 text-[#efe9d5] font-display border-l-4 border-[#FDF4DC] pl-6">
              "Espasyo isn't about the desk you rent. It's about the person sitting next to you."
            </blockquote>

            <div className="mt-auto flex gap-5 pt-4 text-[#FDF4DC]">
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook size={24} /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram"><Instagram size={24} /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderModal;