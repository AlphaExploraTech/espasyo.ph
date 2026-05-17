import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IntroProps {
    onComplete: () => void;
}

const Intro = ({ onComplete }: IntroProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const creamBgRef = useRef<HTMLDivElement>(null);
    const doorsWrapperRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const leftDoorPanelRef = useRef<HTMLDivElement>(null);
    const rightDoorPanelRef = useRef<HTMLDivElement>(null);
    const doorFrameRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.set(containerRef.current, { display: 'none' });
                onComplete();
            }
        });

        const words = textContainerRef.current?.children;

        if (words) {
            // Initial setup: hide text and hide the doors
            gsap.set(words, { opacity: 0, y: 30 });
            gsap.set(doorsWrapperRef.current, { opacity: 0 });

            // 1. ESPASYO STUDY & OFFICE HUB (Hold for 1.2s)
            tl.to(words[0], { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
                .to(words[0], { opacity: 0, y: -20, duration: 0.6, ease: "power3.in" }, "+=1.2");

            // 2. WHERE ENTREPRENEURS RISE TOGETHER (Hold for 1.2s)
            tl.to(words[1], { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
                .to(words[1], { opacity: 0, y: -20, duration: 0.6, ease: "power3.in" }, "+=1.2");

            // 3. WHERE IDEAS BECOME ENTERPRISE (Mahaba to, kaya hold for 1.8s)
            tl.to(words[2], { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
                .to(words[2], { opacity: 0, y: -20, duration: 0.6, ease: "power3.in" }, "+=1.8");

            // 4. A Hub Built on Community Spirit (Hold for 1.2s)
            tl.to(words[3], { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
                .to(words[3], { opacity: 0, y: -20, duration: 0.6, ease: "power3.in" }, "+=1.2");

            // 5. DOORS MATERIALIZE (Slower fade in - 1.5s)
            tl.to(doorsWrapperRef.current, { opacity: 1, duration: 1.5, ease: "power2.inOut" });

            // Instantly hide the solid cream background once the doors cover it
            tl.set(creamBgRef.current, { opacity: 0 });

            // 6. " Welcome to ESPASYO " (Slower text reveal - 1.5s)
            tl.to(words[4], { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }, "-=0.2");

            // 7. THE DOOR REVEAL (Hold the welcome text longer before opening)
            tl.to(doorFrameRef.current, { scale: 1.02, duration: 0.8, ease: "power2.out" }, "+=1.5")
                // Doors slide majestically open (Slower open - 2.5s)
                .to(leftDoorPanelRef.current, { x: '-100%', duration: 2.5, ease: "power4.inOut" }, "-=0.4")
                .to(rightDoorPanelRef.current, { x: '100%', duration: 2.5, ease: "power4.inOut" }, "<");
        }

    }, { scope: containerRef });

    // SMOOTH SKIP FUNCTION
    const handleSkip = () => {
        if (containerRef.current) {
            // Fade out the entire intro container instantly then unmount
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    gsap.set(containerRef.current, { display: 'none' });
                    onComplete();
                }
            });
        }
    };

    return (
        <div ref={containerRef} className="fixed inset-0 z-[99999] flex overflow-hidden bg-transparent perspective-1000">

            {/* --- SKIP INTRO BUTTON (Moved to Lower Left) --- */}
            <button
                onClick={handleSkip}
                // Changed from right-x to left-x. Visible over both cream and door backgrounds.
                className="absolute bottom-8 left-6 md:left-10 z-[100000] px-5 py-2 rounded-full border border-[#D4A373]/40 bg-black/5 backdrop-blur-md text-[#D4A373] hover:bg-[#D4A373]/10 hover:text-[#FDFCF5] transition-all duration-300 font-display text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2 group"
            >
                Skip Intro
                <span className="text-sm transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>

            {/* THE INITIAL PLAIN CREAM BACKGROUND */}
            <div ref={creamBgRef} className="absolute inset-0 bg-[#FDFCF5] z-0" />

            {/* THE DOORS WRAPPER (Starts at opacity 0, fades in) */}
            <div ref={doorsWrapperRef} className="absolute inset-0 z-10">
                {/* WARM STONE DOOR FRAME */}
                <div ref={doorFrameRef} className="absolute inset-0 z-20 border-[16px] sm:border-[20px] md:border-[30px] border-[#F1E5CF] rounded-sm shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] scale-[1.01] pointer-events-none" />

                {/* THE DOOR PANELS */}
                <div className="flex w-full h-full relative z-10">

                    {/* --- LEFT DOOR PANEL --- */}
                    <div
                        ref={leftDoorPanelRef}
                        className="w-1/2 h-full bg-[#3E2723] border-r-2 border-black/40 relative shadow-2xl overflow-hidden"
                        style={{ willChange: 'transform' }}
                    >
                        {/* Rich Mahogany Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/40 to-black/60" />

                        {/* Architectural Wood Panel Detailing */}
                        <div className="absolute top-[10%] bottom-[10%] left-[20%] right-[15%] border-4 border-[#F1E5CF]/10 rounded-sm shadow-2xl overflow-hidden">
                            <div className="absolute inset-2 sm:inset-4 border border-[#D4A373]/20 rounded-sm shadow-inner bg-black/10" />
                            <div className="absolute inset-x-4 sm:inset-x-8 top-10 sm:top-16 bottom-10 sm:bottom-16 border border-[#D4A373]/10 rounded-sm bg-black/20" />
                        </div>

                        {/* DOOR HARDWARE: Ornate Brass Handle */}
                        <div className="absolute top-[60%] -translate-y-1/2 right-2 sm:right-4 md:right-8 z-20 flex flex-col items-center gap-1">
                            <div className="w-2 sm:w-3 md:w-4 h-16 sm:h-20 md:h-28 bg-gradient-to-r from-[#E6C280] to-[#996B3D] rounded-sm border-t border-white/30 shadow-[0_5px_15px_rgba(0,0,0,0.8)] relative">
                                <div className="absolute inset-x-[1px] top-2 bottom-2 bg-black/20 rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT DOOR PANEL --- */}
                    <div
                        ref={rightDoorPanelRef}
                        className="w-1/2 h-full bg-[#3E2723] relative shadow-2xl overflow-hidden"
                        style={{ willChange: 'transform' }}
                    >
                        {/* Mahogany Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-900/40 to-black/60" />

                        {/* Architectural Wood Panel Detailing */}
                        <div className="absolute top-[10%] bottom-[10%] right-[20%] left-[15%] border-4 border-[#F1E5CF]/10 rounded-sm shadow-2xl overflow-hidden">
                            <div className="absolute inset-2 sm:inset-4 border border-[#D4A373]/20 rounded-sm shadow-inner bg-black/10" />
                            <div className="absolute inset-x-4 sm:inset-x-8 top-10 sm:top-16 bottom-10 sm:bottom-16 border border-[#D4A373]/10 rounded-sm bg-black/20" />
                        </div>

                        {/* Seam Shadow */}
                        <div className="absolute top-0 bottom-0 left-0 w-8 bg-black/40 blur-xl z-10" />

                        {/* DOOR HARDWARE: Ornate Brass Handle */}
                        <div className="absolute top-[60%] -translate-y-1/2 left-2 sm:left-4 md:left-8 z-20 flex flex-col items-center gap-1">
                            <div className="w-2 sm:w-3 md:w-4 h-16 sm:h-20 md:h-28 bg-gradient-to-r from-[#E6C280] to-[#996B3D] rounded-sm border-t border-white/30 shadow-[0_5px_15px_rgba(0,0,0,0.8)] relative">
                                <div className="absolute inset-x-[1px] top-2 bottom-2 bg-black/20 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* THE TEXT LAYER */}
            <div
                ref={textContainerRef}
                className="absolute inset-0 flex items-center justify-center pointer-events-none text-center px-4 sm:px-6 z-30"
            >
                {/* Intro 1 */}
                <h2 className="absolute font-display text-[#3A2618] text-2xl sm:text-4xl md:text-5xl uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold leading-tight">
                    ESPASYO STUDY & OFFICE HUB <br className="hidden sm:block" /><span className="text-[#D4A373]">THE HUB</span>
                </h2>

                {/* Intro 2 */}
                <h2 className="absolute font-display text-[#3A2618] text-2xl sm:text-4xl md:text-5xl uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold leading-tight">
                    WHERE ENTREPRENEURS <br className="hidden sm:block" /><span className="text-[#D4A373]">RISE TOGETHER</span>
                </h2>

                {/* Intro 3 */}
                <h2 className="absolute font-display text-[#3A2618] text-xl sm:text-3xl md:text-4xl uppercase tracking-[0.1em] sm:tracking-[0.15em] font-bold leading-tight">
                    WHERE IDEAS BECOME ENTERPRISE <br className="hidden sm:block" /><span className="text-[#D4A373] text-lg sm:text-2xl md:text-3xl">YOUR SPACE FOR BUSINESS SOLUTIONS</span>
                </h2>

                {/* Intro 4 */}
                <h2 className="absolute font-display text-[#3A2618] text-2xl sm:text-4xl md:text-5xl uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold leading-tight">
                    A Hub Built on <br className="hidden sm:block" /><span className="text-[#D4A373]">Community Spirit</span>
                </h2>

                {/* Final Reveal Text (Doors background) */}
                <div className="absolute flex flex-col items-center">
                    <h2
                        className="font-display text-[#D4A373] text-lg sm:text-2xl md:text-3xl uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold mb-2 md:mb-4"
                        style={{ textShadow: '0 4px 15px rgba(0, 0, 0, 0.9), 0 2px 5px rgba(0,0,0,0.7)' }}
                    >
                        Welcome to
                    </h2>
                    <h1 className="font-display text-[#FDFCF5] text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] uppercase tracking-tighter" style={{ textShadow: '0 8px 30px rgba(0,0,0,0.8)' }}>
                        ESPASYO
                    </h1>
                </div>
            </div>

        </div>
    );
};

export default Intro;