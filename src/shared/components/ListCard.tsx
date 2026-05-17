import type { Business } from '../models/types';

export const ListCard = ({ business, onClick }: { business: Business, onClick: () => void }) => {
    return (
        <div 
            onClick={onClick}
            className="flex items-center justify-between border-b border-[#2C3628]/10 py-3 md:py-4 cursor-pointer group gallery-anim-item"
        >
            <h3 className="font-display text-lg md:text-xl uppercase tracking-wide group-hover:text-[#B56A54] group-hover:scale-[1.02] origin-left transition-all duration-300 w-full leading-tight font-bold">
                {business.businessName}
            </h3>
            <span className="text-[#2C3628]/30 group-hover:text-[#B56A54] transition-all text-2xl font-light shrink-0 ml-4 group-hover:translate-x-2 duration-300">→</span>
        </div>
    );
};
