// src/components/Services360.tsx
import { useState, useRef, useEffect } from 'react';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';

// REQUIRED CSS FOR PHOTO SPHERE VIEWER
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';

const Services360 = () => {
  const [currentScene, setCurrentScene] = useState('nav3');
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  // --- 360 VIEWER STATE ---
  const viewerRef = useRef<any>(null);

  // --- TOUR CONFIGURATION ---
  const scenes: Record<string, any> = {
    nav3: {
      image: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3.jpg",
      initialYaw: 190,
      hotspots: [
        { pitch: -10, yaw: 190, text: "Member's Lounge", target: "nav4" },
        { pitch: -40, yaw: 100, text: "View Documents", target: "modal", imageUrl: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-1.png", iconType: "eye" },
        { pitch: -10, yaw: 240, text: "View Documents 2", target: "modal", imageUrl: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-2.png", iconType: "eye" },
      ]
    },
    nav4: {
      image: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav4.jpg",
      initialYaw: 0,
      hotspots: [
        { pitch: -3, yaw: 195, text: "Reception", target: "nav3" },
        { pitch: -5, yaw: 0, text: "Community Hallway", target: "nav5" }
      ]
    },
    nav5: {
      image: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav5.jpg",
      initialYaw: -30,
      hotspots: [
        { pitch: -5, yaw: -110, text: "Reception", target: "nav4" },
        { pitch: -2, yaw: -30, text: "Upper Deck", target: "nav6" },
        { pitch: 17, yaw: 27, text: "View Medals", target: "modal", imageUrl: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav5-1.png", iconType: "eye" },

      ]
    },
    nav6: {
      image: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav6.jpg",
      initialYaw: 180,
      hotspots: [
        { pitch: -5, yaw: 105, text: "Lower Deck", target: "nav5" },
        { pitch: 30, yaw: 180, text: "Inner Hall", target: "nav7" }
      ]
    },
    nav7: {
      image: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav7.jpg",
      initialYaw: 40,
      hotspots: [
        { pitch: -30, yaw: -4, text: "Back", target: "nav6" },
        { pitch: -5, yaw: 40, text: "Collaboration Room", target: "nav8" },
      ]
    },
    nav8: {
      image: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav8.jpg",
      initialYaw: 0,
      hotspots: [
        { pitch: -5, yaw: -10, text: "Exit Room", target: "nav7" },
        { pitch: -7, yaw: -120, text: "Private Suite B", target: "nav9_1" },
        { pitch: 0, yaw: 150, text: "View Medals", target: "modal", imageUrl: "/assets/360/Nav8-1.png", iconType: "eye" },
        { pitch: -7, yaw: 120, text: "Private Suite C", target: "nav9_2" },
        { pitch: 12, yaw: -140, text: "View Medals", target: "modal", imageUrl: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav8-2.png", iconType: "eye" },
      ]
    },
    nav9_1: {
      image: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav9-1.jpg",
      initialYaw: 70,
      hotspots: [
        { pitch: -5, yaw: 70, text: "Back to Hall", target: "nav8" }
      ]
    },
    nav9_2: {
      image: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav9-2.jpg",
      initialYaw: 70,
      hotspots: [
        { pitch: -5, yaw: 70, text: "Back to Hall", target: "nav8" }
      ]
    }
  };

  // --- TRANSITION LOGIC (SMOOTH SINGLE TRANSITION) ---
  const handleSceneSwitch = (targetScene: string, markerPitch: number = 0, markerYaw: number = 0) => {
    const nextScene = scenes[targetScene];
    if (!viewerRef.current || !nextScene) return;

    const viewer = viewerRef.current;

    // Single smooth transition to the next scene, facing the marker direction
    viewer.setPanorama(nextScene.image, {
      position: {
        yaw: markerYaw * Math.PI / 180,
        pitch: markerPitch * Math.PI / 180,
      },
      zoom: 65,
      transition: 1200,
      showLoader: false,
    }).then(() => {
      setCurrentScene(targetScene);
    });
  };

  // --- UPDATE MARKERS WHEN SCENE CHANGES ---
  useEffect(() => {
    if (viewerRef.current) {
      const viewer = viewerRef.current;
      const markersPlugin = viewer.getPlugin(MarkersPlugin);
      if (markersPlugin) {
        markersPlugin.clearMarkers();
        const markers = getMarkersForScene();
        markersPlugin.setMarkers(markers);
      }
    }
  }, [currentScene]);

  // --- GET MARKERS FOR CURRENT SCENE ---
  const getMarkersForScene = () => {
    const scene = scenes[currentScene];

    if (!scene.hotspots) return [];

    return scene.hotspots.map((hs: any, index: number) => {
      const templates = {
        dot: `<div class="espasyo-marker-content"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="30" fill="currentColor"/></svg></div>`,
        eye: `<div class="espasyo-marker-content"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></div>`
      };

      const markerHtml = hs.iconType === 'eye' ? templates.eye : templates.dot;

      return {
        id: `marker-${currentScene}-${index}`,
        position: { yaw: hs.yaw * Math.PI / 180, pitch: hs.pitch * Math.PI / 180 },
        html: markerHtml,
        anchor: 'center center',
        data: {
          target: hs.target,
          pitch: hs.pitch,
          yaw: hs.yaw,
          imageUrl: hs.imageUrl,
          onClick: () => {
            if (hs.target === 'modal' && hs.imageUrl) {
              setModalImage(hs.imageUrl);
            } else {
              // Pass pitch and yaw to zoom to the marker location
              handleSceneSwitch(hs.target, hs.pitch, hs.yaw);
            }
          }
        }
      };
    });
  };

  return (
    <div className="w-full bg-[#FEEBCA] text-[#482216] overflow-x-hidden relative">

      {/* --- PURE CSS STYLES FOR MARKERS & MODAL ANIMATIONS --- */}
      <style>{`
    .psv-marker { cursor: pointer; }
    
    .espasyo-marker-content {
        width: 32px; height: 32px;
        background-color: rgba(144, 134, 96, 0.9); /* Changed to Sage Green */
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 0 0 1px rgba(72,34,22, 0.2);
        transition: all 0.3s ease;
        animation: customBounce 2s infinite;
        color: #FEEBCA;
    }
    
    .espasyo-marker-content:hover {
        background-color: #482216;
        color: #FEEBCA;
        transform: scale(1.1);
    }
    
    .espasyo-marker-content svg {
        width: 16px; height: 16px; fill: currentColor;
    }
    
    /* Ensure eye icons are clickable */
    .modal-eye-hotspot {
        pointer-events: auto !important;
        z-index: 40;
    }
    
    .modal-eye-hotspot:hover {
        transform: scale(1.15);
    }
    
    /* --- MODAL ANIMATIONS --- */
    .animate-modal-bg {
        animation: modalBgFadeIn 0.3s ease-out forwards;
    }
    
    /* Plays every time modalImage changes! */
    .animate-image-transition {
        animation: imageFadeScale 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    @keyframes customBounce {
        0%, 100% { transform: translateY(-15%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
        50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); }
    }
    @keyframes modalBgFadeIn {
        from { opacity: 0; backdrop-filter: blur(0px); }
        to { opacity: 1; backdrop-filter: blur(4px); }
    }
    @keyframes imageFadeScale {
        from { opacity: 0; filter: blur(5px); transform: scale(0.95); }
        to { opacity: 1; filter: blur(0px); transform: scale(1); }
    }
`}</style>

      {/* --- SECTION 1: THE VIRTUAL GATEWAY (FULL WIDTH) --- */}
      <section className="flex flex-col items-center w-full bg-[#FEEBCA] pt-16">
        <div className="text-center mb-8 px-4">
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-4 text-[#482216]">
            The Espasyo Experience
          </h1>
          <p className="font-body text-sm md:text-base tracking-[0.2em] uppercase text-[#908660] font-bold">
            Your Digital Gateway to our Community
          </p>
        </div>

        {/* 360 VIEWER CONTAINER - EDGE TO EDGE */}
        <div
          onMouseLeave={() => setIsInteractive(false)}
          className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[280px] relative group z-20 bg-black shadow-[0_30px_60px_rgba(0,0,0,0.3)] overflow-hidden"
          style={{ filter: 'sepia(0.2) saturate(1.2) contrast(1.05) brightness(1.05)' }}
        >
          {/* INTERACTION OVERLAY */}
          {!isInteractive && (
            <div
              className="absolute inset-0 z-40 bg-black/20 flex items-center justify-center cursor-pointer backdrop-blur-[2px] transition-all duration-300 hover:bg-black/40"
              onClick={() => setIsInteractive(true)}
            >
              <div className="bg-[#FEEBCA]/90 text-[#482216] px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-sm shadow-xl flex items-center gap-3 transition-transform hover:scale-105 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m10 8 6 4-6 4Z" /></svg>
                Click to Interact
              </div>
            </div>
          )}

          <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_60%,rgba(212,163,115,0.08)_100%)]" />

          {/* --- CONTAINER-BOUND MODAL --- */}
          {modalImage && (
            <div
              className="absolute inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-pointer animate-modal-bg"
              onClick={() => setModalImage(null)}
            >
              <div
                className="relative flex items-center justify-center max-w-full max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute -top-4 -right-4 z-50 w-10 h-10 bg-black hover:bg-[#FEEBCA] text-[#FEEBCA] hover:text-[#482216] rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg border border-white/20"
                  onClick={() => setModalImage(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                {/* --- IMAGE TRANSITION CONTAINER --- */}
                <div key={modalImage} className="relative inline-block max-h-[80vh] animate-image-transition">
                  <img src={modalImage} alt="Detail View" className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-[#FEEBCA]/20" />

                  {/* ========================================================= */}
                  {/* HOTSPOTS FOR NAV 3-1 */}
                  {/* ========================================================= */}
                  {modalImage === "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-1.png" && (
                    <>
                      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-40">
                        <div className="espasyo-marker-content modal-eye-hotspot" onClick={(e) => { e.stopPropagation(); setModalImage("https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-1-1.png"); }} title="Click for closer view">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                        </div>
                      </div>

                      <div className="absolute top-[40%] left-[20%] z-40">
                        <div className="espasyo-marker-content modal-eye-hotspot" onClick={(e) => { e.stopPropagation(); setModalImage("https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-1-3.png"); }} title="Click for close-up view">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                        </div>
                      </div>

                      <div className="absolute bottom-[20%] left-[20%] z-40">
                        <div className="espasyo-marker-content modal-eye-hotspot" onClick={(e) => { e.stopPropagation(); setModalImage("https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-1-4.png"); }} title="Click for close-up view">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                        </div>
                      </div>
                    </>
                  )}

                  {/* ========================================================= */}
                  {/* HOTSPOTS FOR NAV 3-2 (NEW!) */}
                  {/* ========================================================= */}
                  {modalImage === "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-2.png" && (
                    <>
                      {/* Nav3-2-1 Link */}
                      <div className="absolute top-[28%] left-[33%] -translate-x-1/2 -translate-y-1/2 z-40">
                        <div className="espasyo-marker-content modal-eye-hotspot" onClick={(e) => { e.stopPropagation(); setModalImage("https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-2-1.png"); }} title="Click for close-up view">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                        </div>
                      </div>

                      {/* Nav3-2-2 Link */}
                      <div className="absolute bottom-[20%] left-[33%] -translate-x-1/2 -translate-y-1/2 z-40">
                        <div className="espasyo-marker-content modal-eye-hotspot" onClick={(e) => { e.stopPropagation(); setModalImage("https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-2-2.png"); }} title="Click for close-up view">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* ========================================================= */}
                {/* DYNAMIC BACK BUTTONS */}
                {/* ========================================================= */}
                {/* Back button for Nav3-1 Sub-details */}
                {(modalImage === "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-1-1.png" || modalImage === "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-1-3.png" || modalImage === "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-1-4.png") && (
                  <button
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-6 py-2 bg-black/80 hover:bg-[#FEEBCA] text-[#FEEBCA] hover:text-[#482216] rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 backdrop-blur-md border border-white/20 shadow-lg animate-image-transition pointer-events-auto"
                    onClick={(e) => { e.stopPropagation(); setModalImage("https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-1.png"); }}
                  >
                    ← Back
                  </button>
                )}

                {/* Back button for Nav3-2 Sub-details */}
                {(modalImage === "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-2-1.png" || modalImage === "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-2-2.png") && (
                  <button
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-6 py-2 bg-black/80 hover:bg-[#FEEBCA] text-[#FEEBCA] hover:text-[#482216] rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 backdrop-blur-md border border-white/20 shadow-lg animate-image-transition pointer-events-auto"
                    onClick={(e) => { e.stopPropagation(); setModalImage("https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3-2.png"); }}
                  >
                    ← Back
                  </button>
                )}

              </div>
            </div>
          )}

          <ReactPhotoSphereViewer
            src={scenes['nav3'].image}
            width="100%"
            height="100%"
            fisheye={false}
            minZoom={10}
            maxZoom={100}
            defaultZoomLvl={50}
            defaultYaw={scenes['nav3'].initialYaw * Math.PI / 180}
            defaultPitch={0}
            plugins={[[MarkersPlugin, {}]]}
            onReady={(instance: any) => {
              viewerRef.current = instance;

              const markersPlugin = instance.getPlugin(MarkersPlugin);
              if (markersPlugin) {
                markersPlugin.clearMarkers();
                const markers = getMarkersForScene();
                markersPlugin.setMarkers(markers);

                // Fixed selecting markers to call their onClick handler
                markersPlugin.addEventListener('select-marker', (e: any) => {
                  const marker = e.marker;
                  if (marker.config.data && marker.config.data.onClick) {
                    marker.config.data.onClick();
                  }
                });
              }

              instance.addEventListener('click', ({ data }: any) => {
                const pitchDeg = (data.pitch * 180) / Math.PI;
                const yawDeg = (data.yaw * 180) / Math.PI;
                console.log(`📍 { pitch: ${pitchDeg.toFixed(2)}, yaw: ${yawDeg.toFixed(2)} }`);
              });
            }}
          />

        </div>

        {/* --- SMOOTH TRANSITION DIVIDER --- */}
        <div className="w-full flex justify-center py-12">
          <div className="w-24 border-b border-[#482216]/10" />
        </div>
      </section>
    </div>
  );
};

export default Services360;