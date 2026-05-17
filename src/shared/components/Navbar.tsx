// src/components/Navbar.tsx
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface NavbarProps {
  theme?: 'default' | 'brown';
}

const Navbar = ({ theme }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTheme = theme || (location.pathname === '/contact' ? 'brown' : 'default');
  const isDarkTheme = activeTheme === 'brown';

  // COLORS
  const containerClasses = isDarkTheme ? 'bg-[#482216] border-[#FDF4DC]' : 'bg-[#FDF4DC] border-[#4B533E]/20';
  const textClasses = isDarkTheme ? 'text-[#FDF4DC]' : 'text-[#3A2618]';
  const hoverTextClasses = isDarkTheme ? 'text-[#FDF4DC]' : 'text-[#B56A54]';

  // --- MOBILE MENU STATE ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // --- NAVIGATION LOGIC ---
  const handleNavigation = (destination: string, type: 'scroll' | 'route') => {
    // Close mobile menu on click
    setIsMobileMenuOpen(false);
    // 1. Handle Standard Page Routes
    if (type === 'route') {
      navigate(destination);
      return;
    }

    // 2. Handle Scroll Links
    if (type === 'scroll') {
      const targetSection = destination.replace('#', '');

      // A. If NOT on Home -> Navigate
      if (location.pathname !== '/') {
        navigate('/', {
          state: {
            scrollToSection: targetSection,
            skipIntro: true
          }
        });
      }
      // B. If ALREADY on Home -> Dispatch Custom Event
      else {
        // Dispatch event instead of navigating/reloading
        const event = new CustomEvent('scrollToSection', { detail: targetSection });
        window.dispatchEvent(event);
      }
    }
  };

  const navLinks = [
    { label: 'Our Story', dest: '#our-story', type: 'scroll' },
    { label: 'Our Services', dest: '#services', type: 'scroll' },
    { label: 'Our Community', dest: '#testimonials', type: 'scroll' },
    { label: 'Our Gallery', dest: '/gallery', type: 'route' },
    { label: 'Our Reviews', dest: '/reviews', type: 'route' },
    { label: 'Resources', dest: '/resources', type: 'route' },
    { label: 'Contact Us', dest: '/contact', type: 'route' },
  ] as const;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[130] h-[72px] flex justify-between items-center m-2 px-6 lg:px-12 rounded-lg border-2 transition-colors duration-500 ease-in-out ${containerClasses}`}
      >
        <Link
          to="/"
          className={`flex items-center font-display font-bold text-xl tracking-tighter transition-colors duration-500 shrink-0 ${textClasses}`}
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('scrollToSection', { detail: 'hero' }));
            } else {
              e.preventDefault();
              navigate('/', { state: { skipIntro: true } });
            }
          }}
        >
          ESPASYO COMMUNITY
        </Link>

        {/* ETO YUNG FIX: Ginawang lg:flex para sa laptop lang lalabas. Pinaliit din yung text/gap sa smaller laptops (lg) tapos lalaki sa desktop (xl) */}
        <div className="hidden lg:flex gap-4 xl:gap-8 font-body text-xs xl:text-sm font-bold uppercase tracking-widest">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavigation(link.dest, link.type)}
              className="relative group overflow-hidden whitespace-nowrap"
            >
              <span className={`block group-hover:-translate-y-full transition-transform duration-300 ease-out ${hoverTextClasses}`}>
                {link.label}
              </span>
              <span className={`absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out ${textClasses}`}>
                {link.label}
              </span>
            </button>
          ))}
        </div>

        {/* MOBILE HAMBURGER ICON - FIX: Ginawang lg:hidden para lumabas sa tablets */}
        <button
          className={`lg:hidden p-2 -mr-2 transition-colors duration-300 ${textClasses} hover:${hoverTextClasses}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* MOBILE OVERLAY NAVIGATION */}
      {typeof document !== 'undefined' && createPortal(
        <div
          className={`fixed inset-0 z-[120] flex flex-col items-center justify-start p-6 pt-32 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isDarkTheme ? 'bg-[#4B533E]' : 'bg-[#FDF4DC]'} 
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-[20px]'}`}
        >
          <div className="flex flex-col items-center gap-6 sm:gap-8 w-full overflow-y-auto no-scrollbar pb-8">
            {navLinks.map((link, index) => (
              <button
                key={link.label}
                onClick={() => handleNavigation(link.dest, link.type)}
                className={`font-display text-3xl sm:text-4xl uppercase tracking-tighter w-full text-center transition-all duration-500 transform ${textClasses} hover:${hoverTextClasses}`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile footer info inside overlay */}
          <div className={`mt-auto pt-4 mb-4 font-body text-center text-sm tracking-widest uppercase opacity-70 ${textClasses} ${isMobileMenuOpen ? 'opacity-100 transition-opacity duration-1000 delay-500' : 'opacity-0'}`}>
            <p className="mb-2">Espasyo Coworking Space</p>
            <p className="opacity-60 text-xs">Marikina City</p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Navbar;