// src/components/Common/NavTransition.tsx
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface NavTransitionProps {
  isVisible: boolean;
  onHalfway?: () => void; // called when the overlay is fully opaque (safe to switch view)
  onDone?: () => void;    // called when the overlay fades out completely
}

/**
 * A lightweight, branded transition curtain.
 * - Fades in (0 → 1) over ~0.35 s  → fires onHalfway
 * - Holds for ~0.2 s
 * - Fades out (1 → 0) over ~0.45 s → fires onDone
 *
 * The parent controls visibility through `isVisible`.
 * When isVisible goes true, we run the full animation.
 */
const NavTransition = ({ isVisible, onHalfway, onDone }: NavTransitionProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!isVisible || !overlayRef.current) return;
    if (ran.current) return;
    ran.current = true;

    const el = overlayRef.current;
    const logo = logoRef.current;

    // Reset
    gsap.set(el, { display: 'flex', opacity: 0 });
    gsap.set(logo, { opacity: 0, y: 12, scale: 0.94 });

    const tl = gsap.timeline();

    // Curtain in
    tl.to(el, { opacity: 1, duration: 0.35, ease: 'power2.in' })
      .to(logo, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power3.out' }, '-=0.1')
      .add(() => { onHalfway?.(); })
      // Hold
      .to({}, { duration: 0.3 })
      // Logo out
      .to(logo, { opacity: 0, y: -8, duration: 0.25, ease: 'power2.in' })
      // Curtain out
      .to(el, {
        opacity: 0,
        duration: 0.45,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(el, { display: 'none' });
          ran.current = false;
          onDone?.();
        }
      });
  }, [isVisible, onHalfway, onDone]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] hidden flex-col items-center justify-center bg-[#FDF4DC] pointer-events-none"
      style={{ willChange: 'opacity' }}
    >
      {/* Subtle corner accent lines — mahogany */}
      <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#3A2618]/30" />
      <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#3A2618]/30" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-[#3A2618]/30" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-[#3A2618]/30" />

      {/* Centre logo mark */}
      <div ref={logoRef} className="flex flex-col items-center gap-3 select-none">
        {/* Thin rule */}
        <div className="w-12 h-px bg-[#B56A54]/60" />

        <p
          className="font-display text-[#3A2618] text-xl uppercase tracking-[0.35em] font-bold"
          style={{ letterSpacing: '0.35em' }}
        >
          ESPASYO
        </p>

        {/* Three-dot loader */}
        <div className="flex items-center gap-2 mt-1">
          {[0, 0.18, 0.36].map((delay, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#B56A54]"
              style={{
                animation: `navdot 0.9s ease-in-out ${delay}s infinite`
              }}
            />
          ))}
        </div>

        {/* Thin rule */}
        <div className="w-12 h-px bg-[#B56A54]/60" />
      </div>

      <style>{`
        @keyframes navdot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.35; }
          40%            { transform: scale(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default NavTransition;
