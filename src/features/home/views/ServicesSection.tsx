import { type RefObject, type MouseEvent, type TouchEvent } from 'react';
import { Check } from 'lucide-react';

interface ServicesSectionProps {
  activeService: any;
  servicesContentRef: RefObject<HTMLDivElement | null>;
  handleTouchStart: (e: TouchEvent) => void;
  handleTouchMove: (e: TouchEvent) => void;
  handleTouchEnd: () => void;
  serviceCategories: any[];
  currentIndex: number;
  handleMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
  setIsHovering: (val: boolean) => void;
  setTilt: (val: { x: number; y: number }) => void;
  tilt: { x: number; y: number };
  isHovering: boolean;
  prevSlide: () => void;
  nextSlide: () => void;
  handleGalleryClick: () => void;
  getSlideStyles: (index: number) => { className: string; isCenter: boolean };
}

const ServicesSection = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  activeService: _activeService,
  servicesContentRef,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  serviceCategories,
  currentIndex,
  handleMouseMove,
  setIsHovering,
  setTilt,
  tilt,
  isHovering,
  prevSlide,
  nextSlide,
  handleGalleryClick,
  getSlideStyles,
}: ServicesSectionProps) => {
  return (
    <section className="w-full relative min-h-fit bg-[#FEEBCA] pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-12 transition-colors duration-1000">

      {/* FOREGROUND CONTENT */}
      <div ref={servicesContentRef} className="w-full relative z-10 flex flex-col pt-8 sm:pt-12 md:pt-16">

        {/* TOP SECTION */}
        <div className="w-full flex flex-col items-center relative z-20 pb-12">
          <div className="w-full max-w-5xl text-center pt-4 md:pt-6">
            <h1 className="font-display text-6xl sm:text-7xl md:text-6xl uppercase tracking-widest mb-12 text-[#908660]">ONE ROOF. ALL THE SOLUTIONS</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center px-4">
              <div>
                <h2 className="font-display text-4xl sm:text-4xl uppercase text-[#482216] mb-4 leading-none">LEGAL &<br />COMPLIANCE</h2>
                <h3 className="font-body text-xl sm:text-2xl text-[#482216]/70 leading-relaxed">We ensure your business meets all regulatory requirements without the headache.</h3>
              </div>
              <div>
                <h2 className="font-display text-4xl sm:text-4xl uppercase text-[#482216] mb-4 leading-none">COST<br />EFFICIENT</h2>
                <h3 className="font-body text-xl sm:text-2xl text-[#482216]/70 leading-relaxed">Reduce overhead costs with our flexible virtual packages.</h3>
              </div>
              <div>
                <h2 className="font-display text-4xl sm:text-4xl uppercase text-[#482216] mb-4 leading-none">TRUSTED &<br />DEPENDABLE</h2>
                <h3 className="font-body text-xl sm:text-2xl text-[#482216]/70 leading-relaxed">With 8 years experience supporting nearly 100 MSMEs.</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 py-8 sm:py-12 md:py-16 w-full">
          <div className="flex flex-col items-center w-full max-w-5xl">
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <p className="font-body text-xs sm:text-lg tracking-widest uppercase mb-2 text-[#908660] font-bold">Our Expertise</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-none text-[#482216]">SERVICES</h2>
            </div>

            <div
              className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] mb-4 sm:mb-6 md:mb-8 flex items-center justify-center perspective-1000 touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {serviceCategories.map((service, index) => {
                const { className, isCenter } = getSlideStyles(index);
                return (
                  <div
                    key={`${service.title}-${index}`}
                    onMouseMove={isCenter ? handleMouseMove : undefined}
                    onMouseEnter={isCenter ? () => setIsHovering(true) : undefined}
                    onMouseLeave={isCenter ? () => { setIsHovering(false); setTilt({ x: 0, y: 0 }); } : undefined}
                    className={`absolute top-0 w-[90vw] sm:w-[80vw] md:w-72 h-[250px] sm:h-[300px] md:h-80 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] border border-[#482216]/10 ${className}`}
                    style={{
                      transform: isCenter && isHovering
                        ? `translateX(-50%) perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.05, 1.05, 1.05)`
                        : undefined,
                      transition: isHovering ? 'transform 0.1s ease-out' : 'all 0.7s cubic-bezier(0.25,0.8,0.25,1)'
                    }}
                  >
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    {isCenter && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" style={{ opacity: isHovering ? 0.3 + (tilt.y / 20) : 0, transition: 'opacity 0.3s' }} />}

                    {/* Brown overlay + centered white text */}
                    <div className={`absolute inset-0 bg-[#3A2618]/70 flex items-center justify-center p-2 sm:p-4 transition-all duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-80'}`}>
                      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-[#D4B896] font-bold text-center leading-[0.9]" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)' }}>
                        {service.title.split(' ').map((word: string, i: number) => (
                          <span key={i} className="block">{word}</span>
                        ))}
                      </h2>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
              <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                <button 
                  onClick={prevSlide} 
                  className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 border-2 md:border-3 border-[#482216] text-[#482216] rounded-full flex items-center justify-center hover:bg-[#482216] hover:text-[#FEEBCA] transition-all font-bold text-lg md:text-2xl shadow-md hover:shadow-lg active:scale-95"
                >
                  ←
                </button>
                <div className="flex gap-2.5 sm:gap-3 md:gap-4">
                  {serviceCategories.map((_, i) => (
                    <div key={i} className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-[#908660] w-5 sm:w-6' : 'bg-[#482216]/10'}`} />
                  ))}
                </div>
                <button 
                  onClick={nextSlide} 
                  className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 border-2 md:border-3 border-[#482216] text-[#482216] rounded-full flex items-center justify-center hover:bg-[#482216] hover:text-[#FEEBCA] transition-all font-bold text-lg md:text-2xl shadow-md hover:shadow-lg active:scale-95"
                >
                  →
                </button>
              </div>
              <button onClick={handleGalleryClick} className="px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-2 border-2 border-[#482216] text-[#482216] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#482216] hover:text-[#FEEBCA] transition-colors">Show All Gallery</button>
            </div>

            {/* Detailed Services Container */}
            <div className="w-full max-w-5xl relative mt-8 bg-[#482216]/5 border border-[#482216]/10 backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-500">
              {serviceCategories.map((service, index) => (
                <div
                  key={service.id}
                  className={`w-full p-6 sm:p-8 md:p-10 transition-all duration-500 ease-in-out ${index === currentIndex ? 'relative opacity-100 z-10' : 'absolute top-0 left-0 opacity-0 z-0 pointer-events-none'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#482216]/10 pb-6 md:pb-8 mb-6 md:mb-8 gap-4">
                    <div className="text-left">
                      <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter mb-2 text-[#482216]">
                        {service.title}
                      </h3>
                      <p className="font-body text-[#482216]/80 max-w-2xl text-lg md:text-base leading-relaxed font-bold">
                        {service.description}
                      </p>
                    </div>
                    {service.id !== 'workspace' && (
                      <div className="text-left md:text-right shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#908660] block mb-1 font-body">Serviced by our trusted community:</span>
                        {service.providerLink ? (
                          <a
                            href={service.providerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-display text-lg md:text-base uppercase tracking-wider text-[#482216] hover:text-[#908660] transition-colors underline decoration-[#482216]/20 hover:decoration-[#908660]/50 underline-offset-4 cursor-pointer"
                          >
                            {service.provider}
                          </a>
                        ) : (
                          <span className="font-display text-lg md:text-base uppercase tracking-wider text-[#482216]">
                            {service.provider}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
                    {service.services.map((subService: any, idx: number) => (
                      <div key={idx} className="flex flex-col">
                        <h4 className="font-display text-lg sm:text-xl uppercase tracking-wide text-[#482216] mb-3 flex items-start gap-2">
                          <span className="text-[#908660] mt-1 shrink-0"><Check size={16} /></span>
                          {subService.title}
                        </h4>

                        {subService.items.length > 0 && (
                          <ul className="flex flex-col gap-2 pl-6">
                            {subService.items.map((item: string, i: number) => (
                              <li key={i} className="text-lg font-body text-[#482216]/80 leading-relaxed list-disc marker:text-[#908660]">
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;