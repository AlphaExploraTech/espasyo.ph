import React, { useState, useRef, useEffect, type MouseEvent } from 'react';

interface StorySectionProps {
  testimonialData: any[];
  handleViewAllClick: () => void;
  handleGalleryTransition: () => void;
  handlePolaroidClick: (item: any, e: MouseEvent<HTMLDivElement>) => void;
}

const StorySection = ({
  testimonialData,
  handleViewAllClick,
  handleGalleryTransition,
  handlePolaroidClick
}: StorySectionProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const scrollEl = scrollAreaRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollProgress(progress);
    };

    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute visibility flags based on scroll progress (0 to 1) FOR DESKTOP ONLY
  const originStoryVisible = scrollProgress > 0.3;
  const missionVisible = scrollProgress > 0.7;

  const filteredData = testimonialData.filter(item => !item.isViewAll);

  return (
    <div
      ref={scrollAreaRef}
      className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar bg-[#FDF4DC] transition-colors duration-1000"
      data-lenis-prevent="true"
    >
      {/* THE MASK */}
      <div className="sticky top-0 left-0 w-full h-[152px] md:h-[168px] bg-[#FDF4DC] z-[60] pointer-events-none -mb-[152px] md:-mb-[168px] border-b-[8px] border-[#FDF4DC]"></div>

      <div className="relative z-10 flex flex-col md:flex-row w-full min-h-[max-content] px-4 sm:px-6 md:pl-8 md:pr-12 pt-[152px] md:pt-[168px] gap-2 sm:gap-6 md:gap-8 pb-32">

        {/* ========================================= */}
        {/* TEXT PANEL: DESKTOP ONLY (Hidden on Mobile) */}
        {/* ========================================= */}
        <div id="our-story" className="hidden md:flex flex-1 w-1/2 sticky top-[168px] h-[calc(100vh-180px)] z-20 flex-col justify-center bg-transparent mx-0 pl-16">
          <div className="relative w-full h-full overflow-hidden">

            {/* Panel 1: Intro */}
            <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${originStoryVisible ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
              <h2 className="font-display text-6xl lg:text-8xl uppercase tracking-tighter mb-8 leading-[0.9] text-[#3A2618]">Our Story</h2>
              <div className="max-w-3xl font-body text-m opacity-80 leading-relaxed space-y-6 text-justify text-[#3A2618]">
                <p>Founded in 2018 by respected educators, Espasyo was created to give Filipinos a professional, welcoming, and flexible space for both learning and working. Located in the heart of Marikina City, it has grown into a vibrant hub where students, freelancers, entrepreneurs, and businesses come together in an inspiring environment.</p>
                <p>Recognizing the community’s need for a space that blends focused study areas with collaborative coworking and virtual office services, Espasyo introduced a hybrid model designed to meet the diverse requirements of a dynamic clientele.</p>
                <p className="font-bold text-[#B56A54]">Scroll to see our origin story.</p>
              </div>
            </div>

            {/* Panel 2: Vision */}
            <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${originStoryVisible && !missionVisible ? 'opacity-100 translate-y-0' : originStoryVisible && missionVisible ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
              <p className="font-display text-sm uppercase tracking-widest mb-3 font-bold text-[#B56A54]">The Vision</p>
              <h2 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-8 leading-[0.9] text-[#3A2618]">OUR SHARED PROSPERITY</h2>
              <div className="max-w-3xl font-body text-lg opacity-80 leading-relaxed space-y-5 text-justify text-[#3A2618]">
                <p>Espasyo aims to be the leading coworking, virtual office, and study and business hub in Marikina City—empowering Filipinos to innovate, connect, and thrive in a collaborative environment.</p>
              </div>
              <blockquote className="mt-8 italic text-2xl leading-relaxed opacity-90 font-display border-l-4 pl-6 border-[#B56A54] text-[#3A2618]">
                "Espasyo isn't about the desk you rent. It's about the person sitting next to you."
              </blockquote>
            </div>

            {/* Panel 3: Mission */}
            <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
              <p className="font-display text-sm uppercase tracking-widest mb-3 font-bold text-[#B56A54]">The Mission</p>
              <h2 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-8 leading-[0.9] text-[#3A2618]">OUR COLLECTIVE IMPACT</h2>
              <div className="max-w-3xl font-body text-lg opacity-80 leading-relaxed space-y-5 text-justify text-[#3A2618]">
                <p>To provide a professional, welcoming, and flexible space for learning and working—empowering individuals and businesses to succeed in a collaborative community.</p>
              </div>
              <blockquote className="mt-8 italic text-xl leading-relaxed opacity-90 font-display border-l-4 pl-6 border-[#B56A54] text-[#3A2618]">
                "A COMMUNITY OF ENTREPRENEURS EMPOWERED TO CONNECT, COLLABORATE AND SUCCEED."
              </blockquote>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* MIXED CONTENT: POLAROIDS & MOBILE TEXT      */}
        {/* ========================================= */}
        <div className="flex-1 w-full mt-2 md:mt-0 relative">

          {/* Desktop Green Frame Background */}
          <div className="hidden md:block sticky top-[168px] w-full h-[calc(100vh-180px)] bg-[#4B533E] rounded-3xl shadow-inner z-[5]"></div>

          <div className="relative z-10 flex flex-col items-center gap-y-12 lg:gap-y-24 md:-mt-[calc(100vh-180px)] py-4 md:py-16 px-0 md:px-8 w-full bg-transparent md:bg-transparent">

            {/* MOBILE ONLY: INTRO TEXT (Before any polaroids) */}
            <div className="md:hidden w-full px-2 mb-4 text-center sm:text-left">
              <h2 className="font-display text-5xl uppercase tracking-tighter mb-4 leading-[0.9] text-[#3A2618]">Our Story</h2>
              <div className="font-body text-base opacity-80 leading-relaxed space-y-4 text-[#3A2618]">
                <p>Founded in 2018 by respected educators, Espasyo was created to give Filipinos a professional, welcoming, and flexible space for both learning and working. Located in the heart of Marikina City, it has grown into a vibrant hub where students, freelancers, entrepreneurs, and businesses come together in an inspiring environment.</p>
                <p>Recognizing the community’s need for a space that blends focused study areas with collaborative coworking and virtual office services, Espasyo introduced a hybrid model designed to meet the diverse requirements of a dynamic clientele.</p>
              </div>
            </div>

            {filteredData.map((item, index) => {
              // DYNAMIC FALLBACK: If there are fewer than 9 items, ensure the text still renders at the end.
              const isOriginStorySlot = index === 2 || (filteredData.length < 3 && index === filteredData.length - 1);
              const isMissionSlot = index === 5 || (filteredData.length < 6 && filteredData.length >= 3 && index === filteredData.length - 1);

              return (
                <React.Fragment key={item.id}>

                  {/* Polaroid Card */}
                  <div
                    onClick={(e) => handlePolaroidClick(item, e)}
                    className={`polaroid-entry bg-[#FDF4DC] p-4 sm:p-6 md:p-8 lg:p-12 pb-16 sm:pb-20 md:pb-24 lg:pb-32 polaroid-shadow hover:scale-[1.02] transition-transform duration-500 ease-out w-full max-w-[400px] md:max-w-[550px] lg:max-w-[700px] group rounded-xl mx-auto cursor-pointer`}
                  >
                    <div className="aspect-square w-full overflow-hidden mb-4 sm:mb-5 md:mb-6 relative rounded-lg bg-[#3A2618]/5 shadow-inner flex items-center justify-center">
                      <img src={item.src || ''} alt={item.caption} className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-mono font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#482216] tracking-tight leading-tight">{item.caption}</h3>
                    </div>
                  </div>

                  {/* MOBILE ONLY: ORIGIN STORY (After 3rd polaroid) */}
                  {isOriginStorySlot && (
                    <div className="md:hidden w-full px-2 my-4 text-center sm:text-left">
                      <p className="font-display text-sm uppercase tracking-widest mb-3 font-bold text-[#B56A54]">The Vision</p>
                      <h2 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-8 leading-[0.9] text-[#3A2618]">OUR SHARED PROSPERITY</h2>
                      <div className="font-body text-base opacity-80 leading-relaxed space-y-4 text-[#3A2618]">
                        <p>Espasyo aims to be the leading coworking, virtual office, and study and business hub in Marikina City—empowering Filipinos to innovate, connect, and thrive in a collaborative environment.</p>
                      </div>
                      <blockquote className="mt-6 italic text-lg leading-relaxed opacity-90 font-display border-l-4 pl-4 border-[#B56A54] text-[#3A2618]">
                        "Espasyo isn't about the desk you rent. It's about the person sitting next to you."
                      </blockquote>
                    </div>
                  )}

                  {/* MOBILE ONLY: MISSION (After 6th polaroid) */}
                  {isMissionSlot && (
                    <div className="md:hidden w-full px-2 my-4 text-center sm:text-left">
                      <p className="font-display text-sm uppercase tracking-widest mb-3 font-bold text-[#B56A54]">The Mission</p>
                      <h2 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-8 leading-[0.9] text-[#3A2618]">OUR COLLECTIVE IMPACT</h2>
                      <div className="font-body text-base opacity-80 leading-relaxed text-[#3A2618]">
                        <p>To provide a professional, welcoming, and flexible space for learning and working—empowering individuals and businesses to succeed in a collaborative community.</p>
                      </div>
                      <blockquote className="mt-6 italic text-base leading-relaxed opacity-90 font-display border-l-4 pl-4 border-[#B56A54] text-[#3A2618]">
                        "A COMMUNITY OF ENTREPRENEURS EMPOWERED TO CONNECT, COLLABORATE AND SUCCEED."
                      </blockquote>
                    </div>
                  )}

                </React.Fragment>
              );
            })}

            {/* Grouped CTAs with smaller gap */}
            <div className="flex flex-col items-center w-full gap-y-4 sm:gap-y-6 lg:gap-y-8 max-w-[400px] md:max-w-[550px] lg:max-w-[700px]">
              <div
                onClick={handleViewAllClick}
                className="w-full bg-[#FDF4DC] polaroid-shadow rounded-2xl py-6 sm:py-8 lg:py-10 flex flex-col items-center justify-center cursor-pointer group transition-transform duration-300 hover:scale-[1.02] mx-auto"
              >
                <h3 className="font-display text-xl sm:text-3xl md:text-4xl uppercase tracking-widest mb-2 transition-colors text-[#3A2618] group-hover:text-[#B56A54] text-center">View All Testimonials</h3>
                <div className="text-xl sm:text-2xl transition-transform duration-300 group-hover:translate-x-2 text-[#3A2618] group-hover:text-[#B56A54]">→</div>
              </div>

              <button
                onClick={handleGalleryTransition}
                className="w-full bg-[#FDF4DC] polaroid-shadow rounded-2xl py-6 sm:py-8 lg:py-10 flex flex-col items-center justify-center cursor-pointer group transition-transform duration-300 hover:scale-[1.02] mx-auto"
              >
                <h3 className="font-display text-xl sm:text-3xl md:text-4xl uppercase tracking-widest mb-2 transition-colors text-[#3A2618] group-hover:text-[#B56A54] text-center">View The Gallery</h3>
                <div className="text-xl sm:text-2xl transform transition-transform duration-300 group-hover:translate-x-2 text-[#3A2618] group-hover:text-[#B56A54]">→</div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StorySection;