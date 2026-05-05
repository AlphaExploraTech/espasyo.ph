import { useState, useEffect, type RefObject } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774457587/landing7.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774457587/landing4.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774457587/landing1.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774457587/landing2.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774457587/landing3.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774457587/landing5.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774457587/landing6.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774457587/landing8.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774457587/landing9.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774457587/landing10.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774457587/landing11.jpg'
];

interface HeroProps {
  heroTextRef1?: RefObject<HTMLHeadingElement | null>;
  introFinished: boolean;
  onNavigate: (direction: 'left' | 'right') => void;
}

const Hero = ({ introFinished, onNavigate }: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-screen h-screen flex flex-col justify-center items-center overflow-hidden shrink-0">
      {/* Background Slideshow & Brown Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
          >
            <div
              className="w-full h-full bg-cover bg-center animate-breathe"
              style={{ backgroundImage: `url(${img})` }}
            />
          </div>
        ))}

        {/* Brown overlay for yellow text pop */}
        <div className="absolute inset-0 bg-[#3A2618]/60 mix-blend-multiply z-10"></div>
      </div>

      {/* --- DIRECTIONAL NAVIGATION ARROWS (HIGH CONTRAST) --- */}
      <div className={`absolute inset-0 pointer-events-none z-30 transition-opacity duration-1000 ${introFinished ? 'opacity-100' : 'opacity-0'}`}>

        {/* Left Arrow -> Our Story */}
        <button
          onClick={() => onNavigate('left')}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 pointer-events-auto flex flex-col items-center gap-2 transition-all group"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FDF4DC] text-[#3A2618] flex items-center justify-center group-hover:scale-105 group-hover:bg-white transition-all shadow-[0_0_30px_rgba(253,244,220,0.5)] animate-pulse-subtle border-4 border-white/20 bg-clip-padding">
            <ChevronLeft strokeWidth={2.5} className="w-8 h-8 md:w-10 md:h-10 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-body text-[10px] md:text-sm uppercase tracking-[0.2em] font-black text-[#FDF4DC] bg-[#3A2618]/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap opacity-90 group-hover:opacity-100 group-hover:-translate-y-1 transition-all">
            Our Story
          </span>
        </button>

        {/* Right Arrow -> Community */}
        <button
          onClick={() => onNavigate('right')}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 pointer-events-auto flex flex-col items-center gap-2 transition-all group"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FDF4DC] text-[#3A2618] flex items-center justify-center group-hover:scale-105 group-hover:bg-white transition-all shadow-[0_0_30px_rgba(253,244,220,0.5)] animate-pulse-subtle border-4 border-white/20 bg-clip-padding">
            <ChevronRight strokeWidth={2.5} className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-1 transition-transform" />
          </div>
          <span className="font-body text-[10px] md:text-sm uppercase tracking-[0.2em] font-black text-[#FDF4DC] bg-[#3A2618]/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap opacity-90 group-hover:opacity-100 group-hover:-translate-y-1 transition-all">
            Community
          </span>
        </button>

      </div>

      {/* --- SCROLL INDICATOR --- */}
      <div className={`absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 transition-opacity duration-1000 delay-500 ${introFinished ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Uniform High-Contrast Text Pill */}
        <div className="text-center font-body text-[11px] md:text-sm uppercase tracking-[0.2em] font-black text-[#FDF4DC] bg-[#3A2618]/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-2xl opacity-90 leading-relaxed border border-[#FDF4DC]/10">
          Scroll to see <br /> Our Services
        </div>

        {/* Animated Line */}
        <div className="w-0.5 h-12 md:h-14 bg-[#FDF4DC]/20 relative overflow-hidden rounded-full border border-[#FDF4DC]/10">
          <div className="absolute top-0 left-0 w-full h-[30%] bg-[#FDF4DC] animate-scroll-line-v2 shadow-[0_0_15px_#FDF4DC]" />
        </div>
      </div>

      <style>{`
        @keyframes scroll-line-v2 {
          0% { transform: translateY(-120%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(350%); opacity: 0; }
        }
        .animate-scroll-line-v2 {
          animation: scroll-line-v2 2.5s cubic-bezier(0.76, 0, 0.24, 1) infinite;
        }
        @keyframes pulse-subtle {
          0%, 100% { box-shadow: 0 0 0 0 rgba(253, 244, 220, 0); }
          50% { box-shadow: 0 0 25px 8px rgba(253, 244, 220, 0.4); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        @keyframes breathe {
          0% { transform: scale(1.02); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1.02); }
        }
        .animate-breathe {
          animation: breathe 16s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;