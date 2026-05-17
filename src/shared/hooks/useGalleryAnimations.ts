import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import { ROWS, COLS, items } from '../utils/galleryData';

gsap.registerPlugin(Draggable);

export const useGalleryAnimations = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const proxyRef = useRef<HTMLDivElement>(null);
    const draggableInstanceRef = useRef<Draggable | null>(null);
    const visibleItemsRef = useRef<Set<number>>(new Set());

    const [isDragging, setIsDragging] = useState(false);
    const [introComplete, setIntroComplete] = useState(false);
    const [titleStep, setTitleStep] = useState(0);
    const [hasEverDragged, setHasEverDragged] = useState(false);

    // Intro animation sequence
    useEffect(() => {
        const timeline = gsap.timeline();

        // Step 1: Show "OUR"
        timeline.to({}, { duration: 0.5, onStart: () => setTitleStep(1) });

        // Step 2: Show "GALLERY"
        timeline.to({}, { duration: 0.8, onStart: () => setTitleStep(2) });

        // Step 3: Start fading in images randomly
        timeline.add(() => {
            const shuffledIndices = [...Array(items.length).keys()].sort(() => Math.random() - 0.5);

            shuffledIndices.forEach((index, i) => {
                if (!itemsRef.current[index]) return;
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

        return () => { timeline.kill(); };
    }, []);

    // Visibility and morphing logic
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

    // Setup Draggable
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
            onDragStart: () => { setIsDragging(true); setHasEverDragged(true); },
            onDragEnd: () => { setTimeout(() => setIsDragging(false), 100); },
            onDrag: function () { updateItems(this.x, this.y, ITEM_WIDTH, ITEM_HEIGHT, wrapWidth, wrapHeight); },
            onThrowUpdate: function () { updateItems(this.x, this.y, ITEM_WIDTH, ITEM_HEIGHT, wrapWidth, wrapHeight); }
        })[0];

        draggableInstanceRef.current = draggableInstance;

        const handleResize = () => {
            ITEM_WIDTH = getItemSize();
            ITEM_HEIGHT = getItemSize();
            wrapWidth = COLS * ITEM_WIDTH;
            wrapHeight = ROWS * ITEM_HEIGHT;
            if (draggableInstance) updateItems(draggableInstance.x, draggableInstance.y, ITEM_WIDTH, ITEM_HEIGHT, wrapWidth, wrapHeight);
        };

        window.addEventListener('resize', handleResize);
        updateItems(0, 0, ITEM_WIDTH, ITEM_HEIGHT, wrapWidth, wrapHeight);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (draggableInstance) draggableInstance.kill();
        };
    }, [updateItems]);

    return {
        refs: { containerRef, itemsRef, proxyRef },
        state: { isDragging, introComplete, titleStep, hasEverDragged }
    };
};
