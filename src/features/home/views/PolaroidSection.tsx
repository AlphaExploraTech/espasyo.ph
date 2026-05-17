import React from 'react';

// 1. Define the type for your image data
interface PolaroidItem {
  id: number;
  text: string;
  color: string;
}

const PolaroidSection: React.FC = () => {
  // 2. Dummy data
  const items: PolaroidItem[] = [
    { id: 1, text: "Date Night", color: "#FFD700" },
    { id: 2, text: "Beach Trip", color: "#FF6347" },
    { id: 3, text: "Anniversary", color: "#87CEEB" },
    { id: 4, text: "Hiking", color: "#90EE90" },
    { id: 5, text: "Christmas", color: "#FF69B4" },
  ];

  return (
    // CONTAINER: Stacks vertically on mobile (flex-col), side-by-side on desktop (md:flex-row)
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-[#3A2618]">

      {/* RIGHT PANEL (Text) */}
      <div className="w-full md:w-1/2 order-1 md:order-2 flex flex-col justify-center p-8 md:p-20 text-[#FDF4DC] md:h-screen md:sticky md:top-0 bg-[#3A2618] z-10">
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-6 text-[#DDA79A]">
          Our Journey
        </h2>
        <div className="font-body text-lg md:text-xl leading-relaxed opacity-90 space-y-6">
          <p>
            This text stays fixed on the right side.
            You can scroll through the memories on the left,
            but this description remains right here.
          </p>
          <p>
            It creates a nice storytelling experience where the context
            is always visible.
          </p>
        </div>
      </div>

      {/* LEFT PANEL (Scrollable Images) */}
      <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col items-center gap-12 py-12 md:py-24 bg-[#FDF4DC]/5">
        {items.map((item, index) => (
          // POLAROID CARD STYLE
          <div
            key={item.id}
            // RESPONSIVE FIX:
            // 1. w-[90%] -> On mobile, take up 90% of screen width (fixes "too small" issue)
            // 2. max-w-md -> Stops it from getting too big on tablets
            // 3. md:w-80 -> Reverts to fixed size on large desktop screens
            className={`
                bg-[#FDF4DC] p-4 pb-8 md:pb-12 shadow-2xl flex-shrink-0 transition-transform duration-500 hover:scale-105 hover:rotate-0
                w-[90%] max-w-md md:w-80
                ${index % 2 === 0 ? '-rotate-1 md:-rotate-2' : 'rotate-1 md:rotate-2'} 
            `}
          >
            {/* Photo Placeholder */}
            <div
              className="w-full aspect-[4/5] mb-4 bg-gray-200 shadow-inner"
              style={{ backgroundColor: item.color }}
            />
            {/* Caption */}
            <p className="font-display text-center text-[#3A2618] text-2xl md:text-xl uppercase tracking-widest leading-none mt-2">
              {item.text}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PolaroidSection;