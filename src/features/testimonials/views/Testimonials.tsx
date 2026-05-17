import { useState, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from '../../../shared/components/Navbar';
import testimonialsData from '../../../data/testimonials.json';

import type { Business } from '../../../shared/models/types';
import { CATEGORIES } from '../../../shared/utils/testimonialsData';
import { MediaCard } from '../../../shared/components/MediaCard';
import { ListCard } from '../../../shared/components/ListCard';

interface TestimonialsProps {
    hideNavbar?: boolean;
    onBusinessClick?: (business: Business) => void;
}

const Testimonials = ({ hideNavbar = false, onBusinessClick }: TestimonialsProps = {}) => {

    const [activeCategory, setActiveCategory] = useState("All");
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredBusinesses = useMemo(() => {
        const data = [...(testimonialsData as Business[])].sort((a, b) => 
            a.businessName.localeCompare(b.businessName)
        );
        
        if (activeCategory === "All") return data;
        
        return data.filter(b => {
            return b.categories?.includes(activeCategory) || false;
        });
    }, [activeCategory]);

    const { mediaBusinesses, listBusinesses } = useMemo(() => {
        const media: Business[] = [];
        const list: Business[] = [];

        filteredBusinesses.forEach(b => {
            const m = b.media;
            const hasMedia = m && (m.video || m.image1 || m.image2 || m.image3);
            const hasTestimonial = b.testimonial && b.testimonial.trim().length > 0;
            const hasCustomLogo = b.logo && !b.logo.includes('LOGO.png') && !b.logo.includes('Logo.png') && !b.logo.includes('LogoWhite.jpg');
            
            if (hasMedia || hasTestimonial || hasCustomLogo) {
                media.push(b);
            } else {
                list.push(b);
            }
        });

        return { mediaBusinesses: media, listBusinesses: list };
    }, [filteredBusinesses]);

    useGSAP(() => {
        gsap.fromTo(".gallery-anim-item", 
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.out",
                overwrite: "auto"
            }
        );
    }, { scope: containerRef, dependencies: [activeCategory] }); 

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-[#FDF4DC] text-[#2C3628] flex flex-col font-body selection:bg-[#2C3628] selection:text-[#FDF4DC] relative">
            {/* STICKY CURTAIN: Makes content disappear under the 'Back to Hub' button */}
            <div className="sticky top-0 left-0 w-full h-[135px] bg-[#FDF4DC] z-[140] pointer-events-none" />

            {!hideNavbar && (
                <div className="fixed top-0 left-0 w-full z-[160] bg-[#FDF4DC]/90 backdrop-blur-md border-b border-[#2C3628]/10 transition-all">
                    <Navbar theme="default" />
                </div>
            )}

            <div className="flex-1 flex flex-col md:flex-row max-w-[1600px] mx-auto w-full pt-4 md:pt-8 px-4 md:px-12 gap-8 md:gap-12 relative pb-24">
                
                {/* --- SIDEBAR: HEADER & CATEGORIES --- */}
                <div className="w-full md:w-1/4 lg:w-1/5 flex flex-col z-20 shrink-0">
                    
                    <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tighter mb-6 md:mb-8 leading-none mt-4 md:mt-0">
                        Meet the Community
                    </h1>

                    <p className="text-sm opacity-70 mb-6 md:mb-8 leading-relaxed pr-4">
                        Discover the diverse businesses, creative studios, and professional agencies within the Espasyo network.
                    </p>

                    <div className="flex flex-row md:flex-col gap-2 md:gap-3 md:border-l border-[#2C3628]/20 md:pl-6 overflow-x-auto no-scrollbar pb-4 md:pb-0 w-full snap-x px-4 md:px-0">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-4 py-2 md:p-0 rounded-full md:rounded-none text-left text-sm md:text-base font-body tracking-wide transition-all snap-start ${
                                    activeCategory === cat 
                                    ? 'bg-[#2C3628]/10 md:bg-transparent text-[#2C3628] md:text-[#2C3628] font-bold md:translate-x-1' 
                                    : 'bg-[#2C3628]/5 md:bg-transparent text-[#2C3628]/60 hover:text-[#2C3628]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- MAIN CONTENT AREA --- */}
                <div className="w-full md:w-3/4 lg:w-4/5 flex flex-col">
                    
                    {mediaBusinesses.length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-6 md:gap-8 mb-20">
                            {mediaBusinesses.map((b) => (
                                <MediaCard key={b.id} business={b} onClick={() => onBusinessClick?.(b)} />
                            ))}
                        </div>
                    )}

                    {mediaBusinesses.length > 0 && listBusinesses.length > 0 && (
                        <div className="w-full flex justify-center mb-16">
                            <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-[#2C3628]/20 to-transparent"></div>
                        </div>
                    )}

                    {listBusinesses.length > 0 && (
                        <div className="flex flex-col w-full">
                            <h3 className="font-display text-xl uppercase tracking-widest opacity-50 mb-6 text-center md:text-left">More of our community</h3>
                            {listBusinesses.map(b => (
                                <ListCard key={b.id} business={b} onClick={() => onBusinessClick?.(b)} />
                            ))}
                        </div>
                    )}

                    {mediaBusinesses.length === 0 && listBusinesses.length === 0 && (
                        <div className="w-full py-32 flex flex-col items-center justify-center opacity-50 text-center gallery-anim-item">
                            <span className="text-4xl mb-4">🔍</span>
                            <p className="font-display text-2xl uppercase tracking-widest">No businesses found</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default Testimonials;