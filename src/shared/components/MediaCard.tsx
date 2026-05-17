import type { Business } from '../models/types';
import { resolvePath } from '../utils/testimonialsData';

// Helper to extract up to 2 initials from the business name
const getInitials = (name: string) => {
    if (!name) return '';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

// Returns a consistent color scheme based on the business name string
const getColorScheme = (name: string) => {
    const schemes = [
        { bg: '#3A2618', text: '#FDF4DC' }, // Dark Brown + Cream
        { bg: '#2C3628', text: '#FDF4DC' }, // Dark Green + Cream
        { bg: '#DFA878', text: '#3A2618' }, // Sandy Beige + Dark Brown
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % schemes.length;
    return schemes[index];
};

export const MediaCard = ({ business, onClick }: { business: Business, onClick: () => void }) => {
    // Check if the business has a custom logo instead of the default generic ones
    const hasCustomLogo = business.logo && !business.logo.includes('LOGO.png') && !business.logo.includes('Logo.png') && !business.logo.includes('LogoWhite.jpg');
    const scheme = getColorScheme(business.businessName);

    return (
        <div className="flex flex-col h-full group cursor-pointer gallery-anim-item" onClick={onClick}>
            <div className="relative w-full flex items-center justify-center p-2 md:p-8 h-24 sm:h-32 md:h-auto md:aspect-square transition-transform duration-500 group-hover:-translate-y-2">
                {hasCustomLogo ? (
                    <img 
                        src={resolvePath(business.logo)} 
                        alt={business.businessName} 
                        className="max-w-full max-h-16 sm:max-h-20 md:max-h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-lg relative z-10" 
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div 
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-full md:h-full md:max-w-[120px] md:max-h-[120px] flex items-center justify-center rounded-xl shadow-lg transition-transform duration-700 group-hover:scale-110 drop-shadow-lg relative z-10"
                        style={{ backgroundColor: scheme.bg }}
                    >
                        <span 
                            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest"
                            style={{ color: scheme.text }}
                        >
                            {getInitials(business.businessName)}
                        </span>
                    </div>
                )}
            </div>
            <div className="text-center relative z-20 flex-1 pt-1 md:pt-2 flex flex-col">
                <h3 className="font-display text-[10px] sm:text-xs md:text-lg tracking-wide uppercase group-hover:text-[#B56A54] group-hover:scale-105 transition-all duration-300 line-clamp-3 px-1 md:px-2 leading-[1.1] md:leading-snug">
                    {business.businessName}
                </h3>
            </div>
        </div>
    );
};