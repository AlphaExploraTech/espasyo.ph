import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const useContactAnimations = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

        tl.fromTo(contentRef.current, 
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1 }
        )
        .fromTo(formRef.current,
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1 },
            "-=0.7"
        )
        .fromTo(".contact-info-item",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1 },
            "-=0.5"
        );
    }, { scope: containerRef });

    return {
        containerRef,
        contentRef,
        formRef
    };
};
