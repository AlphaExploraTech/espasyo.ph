// src/components/Footer.tsx
const birLogo = "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/BIR.png";
const cdaLogo = "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/CDA.png";
const dtiLogo = "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/DTI.png";
const lguLogo = "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/LGU.png";
const secLogo = "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/SEC.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#DAC0A3] text-[#3A2618] flex flex-col z-50 relative pb-8 px-4 sm:px-12 lg:px-24">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#3A2618]/20 to-transparent mb-8" />
      <div className="flex-1 px-4 sm:px-8 md:px-16 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12">
          <div className="md:col-span-4 flex flex-col justify-between h-full">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-8xl uppercase tracking-tighter leading-none mb-3 sm:mb-4 md:mb-6 text-[#3A2618]">Espasyo</h2>
              <p className="font-body text-lg sm:text-lg text-[#3A2618]/80 max-w-xs leading-relaxed">
                ONE-STOP-SHOP FOR ENTREPRENEURS
              </p>
            </div>
          </div>
          <div className="md:col-span-2">
            {/* <h4 className="font-display text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4 md:mb-6 text-[#3A2618]/60">INFORMATION</h4>
            <ul className="space-y-2 sm:space-y-3 font-body text-xs sm:text-sm text-[#3A2618]/80">
              <li><a href="#" className="hover:text-[#B56A54] transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#B56A54] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#B56A54] transition-colors">Booking Policy</a></li>
              <li><a href="#" className="hover:text-[#B56A54] transition-colors">FAQs</a></li>
            </ul> 
            */}
          </div>
          <div className="md:col-span-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4 md:mb-6 text-[#3A2618]/60">Visit Us</h4>
            <div className="font-body text-lg sm:text-lg text-[#3A2618]/80 space-y-2 sm:space-y-4">
              <p className="leading-relaxed">
                6A T. Bugallon Street,<br />
                Marikina Heights,<br />
                Marikina City
              </p>
              <p>0921 233 4805</p>
              <p>700 600 42</p>
              <a href="mailto:inquiry@espasyo.com" className="block hover:text-[#B56A54] transition-colors">inquiry@espasyo.com</a>
            </div>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-display text-xl font-bold uppercase tracking-widest mb-3 sm:mb-4 md:mb-6 text-[#3A2618]/60">Stay Connected</h4>
            <div className="flex gap-3 sm:gap-4">
              <a href="https://www.facebook.com/espasyostudynofficehub" target="_blank" rel="noreferrer" className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 rounded-full bg-[#3A2618] text-white flex items-center justify-center hover:bg-[#B56A54] transition-colors">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://www.instagram.com/espasyostudyhub_coworkingspace/" target="_blank" rel="noreferrer" className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 rounded-full bg-[#3A2618] text-white flex items-center justify-center hover:bg-[#B56A54] transition-colors">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="mailto:espasyostudyandofficehub@gmail.com" className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 rounded-full bg-[#3A2618] text-white flex items-center justify-center hover:bg-[#B56A54] transition-colors">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-[#3A2618]/20 my-6 sm:my-8 md:my-12"></div>
        <div className="flex flex-col items-center gap-6 sm:gap-7 md:gap-8">
          <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
            <h4 className="font-display text-xl font-bold uppercase tracking-wider text-[#3A2618]/60">Accredited By</h4>
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap justify-center">
              <img src={secLogo} alt="SEC Accredited" className="h-16 sm:h-20 md:h-24 w-auto" />
              <img src={dtiLogo} alt="DTI Accredited" className="h-16 sm:h-20 md:h-24 w-auto" />
              <img src={lguLogo} alt="LGU Accredited" className="h-16 sm:h-20 md:h-24 w-auto" />
              <img src={birLogo} alt="BIR Accredited" className="h-16 sm:h-20 md:h-24 w-auto" />
              <img src={cdaLogo} alt="CDA Accredited" className="h-16 sm:h-20 md:h-24 w-auto" />
            </div>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <p className="font-body text-lg md:text-lg text-[#3A2618]/40">
              © {currentYear} Espasyo Coworking Space. All rights reserved.
            </p>
            <p className="font-body text-[12px] md:text-xs text-[#3A2618]/40 mt-1.5 tracking-wide">
              Powered by{' '}
              <a
                href="https://www.alphaexplora.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3A2618]/60 hover:text-[#B56A54] transition-colors duration-300 font-medium"
              >
                Alphaexplora Information Technology Services
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;