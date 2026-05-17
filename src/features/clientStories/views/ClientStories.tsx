// src/components/Testimonials.tsx
import { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Facebook, Instagram, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import DetailModal from '../../../shared/components/DetailModal';
import FounderModal from '../../../shared/components/FounderModal';
import Navbar from '../../../shared/components/Navbar';
const LOGO = "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/LOGO.png";
import testimonialsData from '../../../data/testimonials.json';

gsap.registerPlugin(Draggable);

// --- CLOUDINARY HARDCODED IMAGES ---
// Since local assets were deleted, import.meta.glob cannot scan files anymore.
// Add all your Cloudinary image URLs into this array:
const cloudinaryCoworkingUrls: string[] = [
  "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774453003/att.boEIijzqnkbNC3laxiXX9bYfo62R9H0OBArnupqFviY.jpg"
  // ... Paste the rest of your coworking Cloudinary URLs here!
];

const cloudinaryEventUrls: string[] = [
  "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774453017/att.kZ3SEWXB5oQ4AShNyTHRv8PSpodbx9s0DPOG-hI_mRE.jpg"
  // ... Paste the rest of your events Cloudinary URLs here!
];

const loadedImages = [...cloudinaryCoworkingUrls, ...cloudinaryEventUrls];
const fallbackImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=500&q=60'
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getInitials = (name: string) => {
    if (!name) return 'E';
    return name
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 3);
};

const imagePool = loadedImages.length > 0 ? shuffleArray(loadedImages) : fallbackImages;

// --- GRID CONFIGURATION ---
const ROWS = 7;
const COLS = 8;
const TOTAL_ITEMS = ROWS * COLS;

// Generate items based on JSON data
export interface TestimonialItem {
  id: string | number;
  isFounder: boolean;
  businessName: string;
  industry: string[];
  services: string[];
  categories?: string[];
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
  src: string; // Dynamic source
  isPlaceholder?: boolean;
}

// Helper to resolve public paths
const resolvePath = (p?: string): string => p ? p.replace(/^public\//, '/') : '';

// 1. Check if a Founder exists first before assigning random images
const founderData = testimonialsData.find(t => t.isFounder);

const allClients = testimonialsData
  .filter(t => !t.isFounder)
  .slice()
  .sort((a, b) => a.businessName.localeCompare(b.businessName));

// 2. Only reserve Slot 0 if there is actually a Founder. Otherwise, use all slots.
const availableSlots = Array.from({ length: TOTAL_ITEMS }, (_, i) => i).filter(i => founderData ? i !== 0 : true);

const centerPrioritySlots = availableSlots.sort((a, b) => {
  const dist = (i: number) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    return (col - 4) ** 2 + (row - 3.5) ** 2;
  };
  return dist(a) - dist(b);
});

const clientBySlot = new Map<number, typeof allClients[0]>();

centerPrioritySlots.forEach((slotIdx, i) => {
  clientBySlot.set(slotIdx, allClients[i % allClients.length]);
});

const items: TestimonialItem[] = Array.from({ length: TOTAL_ITEMS }, (_, i) => {
  // Handle Founder logic properly
  if (founderData && i === 0) {
    return {
      ...founderData,
      id: `founder-0`,
      src: imagePool.length > 0 ? imagePool[0] : fallbackImages[0],
      isPlaceholder: false
    } as TestimonialItem;
  }

  const clientData = clientBySlot.get(i)!;
  const rawLogo = clientData.logo || '';
  const logoUrl = resolvePath(rawLogo);
  const thumbnailSrc = logoUrl || LOGO;

  // Mark as placeholder if no logo exists OR if it contains generic "logo" naming
  const isPlaceholder = !rawLogo || 
                        rawLogo.toLowerCase().includes('logo.png') ||
                        rawLogo.toLowerCase().includes('logowhite') ||
                        thumbnailSrc === LOGO;

  return {
    ...clientData,
    id: `${clientData.id}-${i}`,
    src: thumbnailSrc,
    isPlaceholder
  } as TestimonialItem;
});

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const proxyRef = useRef<HTMLDivElement>(null);
  const draggableInstanceRef = useRef<Draggable | null>(null);
  const visibleItemsRef = useRef<Set<number>>(new Set());

  const [selectedItem, setSelectedItem] = useState<typeof items[0] | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [titleStep, setTitleStep] = useState(0);
  const [hasEverDragged, setHasEverDragged] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedItem]);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.to({}, {
      duration: 0.5,
      onStart: () => setTitleStep(1)
    });

    timeline.to({}, {
      duration: 0.8,
      onStart: () => setTitleStep(2)
    });

    timeline.add(() => {
      const shuffledIndices = [...Array(items.length).keys()].sort(() => Math.random() - 0.5);

      shuffledIndices.forEach((index, i) => {
        gsap.to(itemsRef.current[index], {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: i * 0.05,
          ease: "elastic.out(1, 0.5)",
          onComplete: () => {
            if (i === shuffledIndices.length - 1) {
              setIntroComplete(true);
            }
          }
        });
      });
    }, "-=0.3");

    return () => {
      timeline.kill();
    };
  }, []);

  const isInViewport = useCallback((element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const buffer = 100;
    return (
      rect.right >= -buffer &&
      rect.left <= window.innerWidth + buffer &&
      rect.bottom >= -buffer &&
      rect.top <= window.innerHeight + buffer
    );
  }, []);

  const morphInItem = useCallback((element: HTMLDivElement, index: number) => {
    if (visibleItemsRef.current.has(index)) return;

    visibleItemsRef.current.add(index);

    gsap.fromTo(element,
      { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.7)" }
    );
  }, []);

  const checkVisibleItems = useCallback(() => {
    if (!introComplete) return;
    itemsRef.current.forEach((item, index) => {
      if (item && isInViewport(item)) morphInItem(item, index);
    });
  }, [introComplete, isInViewport, morphInItem]);

  const updateItems = useCallback((x: number, y: number, itemWidth: number, itemHeight: number, wrapW: number, wrapH: number) => {
    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      const initialCol = index % COLS;
      const initialRow = Math.floor(index / COLS);
      const initialX = initialCol * itemWidth;
      const initialY = initialRow * itemHeight;

      let newX = (initialX + x) % wrapW;
      let newY = (initialY + y) % wrapH;

      if (newX < 0) newX += wrapW;
      if (newY < 0) newY += wrapH;

      newX -= wrapW / 2;
      newY -= wrapH / 2;

      gsap.set(item, { x: newX, y: newY });
    });

    requestAnimationFrame(checkVisibleItems);
  }, [checkVisibleItems]);

  useEffect(() => {
    const container = containerRef.current;
    const proxy = proxyRef.current;
    if (!container || !proxy) return;

    const getItemSize = () => {
      const vw = window.innerWidth;
      const sizeVw = vw < 768 ? 40 : 14;
      return (vw * sizeVw) / 100;
    };
    let ITEM_WIDTH = getItemSize();
    let ITEM_HEIGHT = getItemSize();
    let wrapWidth = COLS * ITEM_WIDTH;
    let wrapHeight = ROWS * ITEM_HEIGHT;

    const draggableInstance = Draggable.create(proxy, {
      trigger: container,
      type: "x,y",
      inertia: true,
      edgeResistance: 0,
      cursor: "grab",
      activeCursor: "grabbing",

      onDragStart: () => {
        setIsDragging(true);
        setHasEverDragged(true);
      },
      onDragEnd: () => {
        setTimeout(() => setIsDragging(false), 100);
      },
      onDrag: function () { updateItems(this.x, this.y, ITEM_WIDTH, ITEM_HEIGHT, wrapWidth, wrapHeight); },
      onThrowUpdate: function () { updateItems(this.x, this.y, ITEM_WIDTH, ITEM_HEIGHT, wrapWidth, wrapHeight); }
    })[0];

    draggableInstanceRef.current = draggableInstance;

    const handleResize = () => {
      ITEM_WIDTH = getItemSize();
      ITEM_HEIGHT = getItemSize();
      wrapWidth = COLS * ITEM_WIDTH;
      wrapHeight = ROWS * ITEM_HEIGHT;
      if (draggableInstance) {
        updateItems(draggableInstance.x, draggableInstance.y, ITEM_WIDTH, ITEM_HEIGHT, wrapWidth, wrapHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    updateItems(0, 0, ITEM_WIDTH, ITEM_HEIGHT, wrapWidth, wrapHeight);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (draggableInstance) draggableInstance.kill();
    };
  }, [updateItems]);

  const handleClick = useCallback((item: typeof items[0], index: number) => {
    if (isDragging) return;

    const element = itemsRef.current[index];

    if (element) {
      const rect = element.getBoundingClientRect();
      setOriginRect(rect);
      setSelectedItem(item);
    }
  }, [isDragging]);

  return (
    <div className="h-screen w-screen bg-[#F0EAD6] overflow-hidden relative select-none touch-none">
      <Navbar theme="default" />

      {/* Animated Title */}
      <div className="fixed inset-0 z-[40] flex items-center justify-center pointer-events-none select-none">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4 md:gap-8 px-12 py-6 rounded-3xl bg-black/20 backdrop-blur-md border border-black/10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

            <h1 className="font-display text-[12vw] md:text-[7vw] uppercase tracking-tighter leading-none text-center whitespace-nowrap text-white relative z-10"
              style={{ textShadow: '4px 4px 15px rgba(0,0,0,0.6), 10px 5px 0px #2C3628', opacity: titleStep >= 1 ? 1 : 0, transform: titleStep >= 1 ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(50px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
              CLIENT
            </h1>
            <h1 className="font-display text-[12vw] md:text-[7vw] uppercase tracking-tighter leading-none text-center whitespace-nowrap text-white relative z-10"
              style={{ textShadow: '4px 4px 15px rgba(0,0,0,0.6), 10px 5px 0px #2C3628', opacity: titleStep >= 2 ? 1 : 0, transform: titleStep >= 2 ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(50px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)', transitionDelay: '0.2s' }}>
              STORIES
            </h1>
          </div>

          <div className="flex items-center gap-2 font-body text-sm md:text-base font-bold uppercase tracking-widest text-[#2C3628] bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 shadow-lg mt-2"
            style={{ opacity: introComplete && !hasEverDragged ? 1 : 0, transform: introComplete && !hasEverDragged ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease-out', transitionDelay: hasEverDragged ? '0s' : '1s' }}>
            <div className="flex items-center gap-2" style={{ textShadow: '0px 1px 2px rgba(255,255,255,0.8)' }}>
              <span>Drag to see more</span>
              <span className="text-xl animate-pulse">→</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden">
        <div className="relative w-0 h-0">
          {items.map((item, i) => {
            return (
              <div
                key={item.id}
                ref={el => { itemsRef.current[i] = el }}
                className={`absolute top-0 left-0 group perspective-1000 z-0 hover:z-[150] ${isDragging ? 'pointer-events-none' : ''} p-2 sm:p-3 w-[40vw] h-[40vw] -ml-[20vw] -mt-[20vw] md:w-[14vw] md:h-[14vw] md:-ml-[7vw] md:-mt-[7vw]`}
                style={{
                  willChange: 'transform',
                  opacity: 0,
                  transform: 'scale(0.5)'
                }}
                onClick={() => handleClick(item, i)}
              >
                <div className="w-full h-full relative transition-all duration-500 ease-out transform group-hover:scale-105 group-hover:rotate-[2deg] shadow-none group-hover:shadow-xl origin-center">

                  {/* Base Image */}
                  <img
                    src={item.src}
                    alt={item.businessName}
                    className={`w-full h-full object-contain pointer-events-none rounded-sm ${item.isPlaceholder ? 'hidden' : 'bg-[#2C3628]'}`}
                    loading="lazy"
                    decoding="async"
                  />

                  {/* TEXT ONLY PLACEHOLDER DESIGN (Initials centered) */}
                  {item.isPlaceholder && (
                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center pointer-events-none z-10 bg-gradient-to-br from-[#3A2618] to-[#251810] rounded-sm border border-white/5 shadow-inner transition-opacity duration-300 group-hover:opacity-0">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="font-display text-[8vw] md:text-[4vw] leading-none text-white font-black tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                          {getInitials(item.businessName)}
                        </span>
                        <div className="w-8 md:w-12 h-0.5 bg-white/20 rounded-full mt-2" />
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-[#837B70] opacity-[0.38] transition-opacity duration-300 group-hover:opacity-0 pointer-events-none rounded-sm" />

                  {/* Hover Info Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col p-3 md:p-5 shadow-inner border border-white/5 rounded-sm backdrop-blur-[2px]">
                    <div className="mb-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      <h3 className="font-display text-lg md:text-2xl uppercase text-[#e68a52] leading-none mb-1 truncate drop-shadow-sm" style={{ textShadow: '1px 1px 0px #F0EAD6' }}>{item.businessName}</h3>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-100">
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-[#F0EAD6] rounded-xl rotate-12 flex items-center justify-center shadow-lg hover:rotate-0 transition-transform">
                        <Play size={20} className="text-[#5c4033] fill-current ml-1 -rotate-12" />
                      </div>
                    </div>
                    <div className="mt-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                      <p className="font-body text-[12px] md:text-auto text-center text-white leading-tight italic opacity-90 line-clamp-2 drop-shadow-sm mb-3">"{item.testimonial}"</p>
                      <div className="flex justify-center gap-3 text-[#FDF4DC]">
                        {item.links?.facebook && (
                          <a href={item.links.facebook.startsWith('http') ? item.links.facebook : `https://${item.links.facebook}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="opacity-80 hover:opacity-100 transition-opacity">
                            <Facebook size={16} />
                          </a>
                        )}
                        {item.links?.instagram && (
                          <a href={item.links.instagram.startsWith('http') ? item.links.instagram : `https://${item.links.instagram}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="opacity-80 hover:opacity-100 transition-opacity">
                            <Instagram size={16} />
                          </a>
                        )}
                        {item.links?.LinkedIn && (
                          <a href={item.links.LinkedIn.startsWith('http') ? item.links.LinkedIn : `https://${item.links.LinkedIn}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="opacity-80 hover:opacity-100 transition-opacity">
                            <Linkedin size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div ref={proxyRef} className="absolute top-0 left-0 w-1 h-1 opacity-0 pointer-events-none" />

      {/* --- MODAL RENDERING LOGIC --- */}
      {selectedItem && originRect && selectedItem.isFounder && (
        <FounderModal
          src={selectedItem.src}
          originRect={originRect}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {selectedItem && originRect && !selectedItem.isFounder && (
        <DetailModal
          item={selectedItem}
          originRect={originRect}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Testimonials;