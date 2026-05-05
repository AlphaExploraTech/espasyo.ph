import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';
import { useContactAnimations } from '../hooks/useContactAnimations';

export interface ContactProps {
  hideNavbar?: boolean;
}

const Contact = ({ hideNavbar = false }: ContactProps) => {
  const { formState, isSubmitting, submitted, error, handleChange, handleSubmit } = useContactForm();
  const { containerRef, contentRef, formRef } = useContactAnimations();

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDF4DC] text-[#3A2618] selection:bg-[#3A2618] selection:text-[#FDF4DC]">
      {!hideNavbar && <Navbar theme="default" />}

      <main className={`pb-20 px-4 sm:px-8 max-w-[1400px] mx-auto flex flex-col justify-center items-center ${hideNavbar ? 'pt-20' : 'pt-32 lg:pt-40 min-h-[calc(100vh-160px)]'}`}>
        {/* Subtle Divider at Top of Form (When embedded) */}
        {hideNavbar && (
          <div className="w-full flex justify-center mb-10 opacity-0 animate-[fade-in_1s_ease-out_forwards]">
            <div className="w-16 h-[1px] bg-[#4B533E]/20" />
          </div>
        )}

        <div className="w-full max-w-[1100px] bg-[#F2E8D5] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(44,54,40,0.3)] flex flex-col lg:flex-row border border-[#4B533E]/10 relative z-10 transition-all">

          {/* LEFT: CONTENT (Dark Green) */}
          <div ref={contentRef} className="lg:w-[45%] bg-[#3A4332] p-10 lg:p-14 text-[#FDF4DC] flex flex-col justify-between relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#2C3628] opacity-50 z-0"></div>

            <div className="relative z-10 space-y-10">
              <div className="space-y-1">
                <h1 className="text-8xl sm:text-8xl font-display font-bold uppercase tracking-tighter text-[#DFA878]">
                  ESPASYO
                </h1>
                <p className="text-lg font-body tracking-[0.2em] uppercase text-[#FDF4DC]/60 font-semibold">
                  Study & Office Hub
                </p>
              </div>

              <div className="space-y-8 pl-1">
                <div className="flex items-start gap-5">
                  <div className="w-8 h-8 rounded-full bg-[#FDF4DC]/10 flex items-center justify-center shrink-0 text-[#FDF4DC]">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[28px] font-bold uppercase tracking-[0.15em] text-[#DFA878] mb-1">Visit Us</p>
                    <p className="text-base font-body leading-relaxed text-[#FDF4DC]/90">
                      6A T. Bugallon Street, Marikina Heights,<br />
                      Marikina City, Philippines
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-8 h-8 rounded-full bg-[#FDF4DC]/10 flex items-center justify-center shrink-0 text-[#FDF4DC]">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[28px] font-bold uppercase tracking-[0.15em] text-[#DFA878] mb-1">Call Us</p>
                    <p className="text-base font-body leading-relaxed text-[#FDF4DC]/90">
                      0921 233 4805<br />
                      700 600 42
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-8 h-8 rounded-full bg-[#FDF4DC]/10 flex items-center justify-center shrink-0 text-[#FDF4DC]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[28px] font-bold uppercase tracking-[0.15em] text-[#DFA878] mb-1">Email Us</p>
                    <p className="text-base font-body leading-relaxed text-[#FDF4DC]/90">inquire@espasyo.ph</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-12">
                <a href="https://www.facebook.com/espasyostudynofficehub" target="_blank" rel="noreferrer" className="text-[18px] font-bold uppercase tracking-[0.15em] text-[#FDF4DC] flex items-center gap-3 hover:text-[#DFA878] transition-colors w-max">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                  Follow Us on Facebook
                </a>

                <div className="w-full h-32 sm:h-44 rounded-xl overflow-hidden shadow-lg relative group cursor-pointer">
                  <img
                    src="https://res.cloudinary.com/dlk93aehl/image/upload/v1774545067/espasyoMaps.png"
                    alt="Espasyo Location Map"
                    className="w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100"
                  />
                  <a
                    href="https://maps.app.goo.gl/fF5wsVjxofb1co857"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center"
                  >
                    <div className="bg-[#F2E8D5] text-[#3A2618] px-4 py-2 rounded-full font-display text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                      Open in Google Maps
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="lg:w-[55%] p-10 lg:p-16 bg-[#F2E8D5] relative flex flex-col justify-center">
            <div className="mb-12 space-y-2">
              <h2 className="text-8xl lg:text-7xl font-display font-bold uppercase tracking-tighter text-[#3A2618]">
                Get In Touch
              </h2>
              <p className="text-lg text-[#3A2618]/70 font-body">
                Fill out the form below and we'll get back to you shortly.
              </p>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="space-y-2 w-full">
                  <label className="text-[24px] font-bold uppercase tracking-widest text-[#3A2618]/60">First Name</label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formState.firstName || ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#3A2618]/20 py-2 focus:border-[#3A2618] outline-none transition-colors font-body text-base text-[#3A2618] placeholder:text-[#3A2618]/30"
                    placeholder="Juan"
                  />
                </div>
                <div className="space-y-2 w-full">
                  <label className="text-[24px] font-bold uppercase tracking-widest text-[#3A2618]/60">Last Name</label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formState.lastName || ''}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#3A2618]/20 py-2 focus:border-[#3A2618] outline-none transition-colors font-body text-base text-[#3A2618] placeholder:text-[#3A2618]/30"
                    placeholder="Dela Cruz"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[24px] font-bold uppercase tracking-widest text-[#3A2618]/60">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#3A2618]/20 py-2 focus:border-[#3A2618] outline-none transition-colors font-body text-base text-[#3A2618] placeholder:text-[#3A2618]/30"
                  placeholder="hello@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[24px] font-bold uppercase tracking-widest text-[#3A2618]/60">Inquiry Type</label>
                <select
                  required
                  name="inquiryType"
                  value={formState.inquiryType || ''}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#3A2618]/20 py-2 focus:border-[#3A2618] outline-none transition-colors font-body text-base text-[#3A2618] appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-[#3A2618]/30">Select an option...</option>
                  <option value="General Inquiry" className="text-[#3A2618] bg-[#F2E8D5]">General Inquiry</option>
                  <option value="Consultation" className="text-[#3A2618] bg-[#F2E8D5]">Consultation</option>
                  <option value="Booking" className="text-[#3A2618] bg-[#F2E8D5]">Booking</option>
                  <option value="Other" className="text-[#3A2618] bg-[#F2E8D5]">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[24px] font-bold uppercase tracking-widest text-[#3A2618]/60">Message</label>
                <textarea
                  required
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-transparent border-b border-[#3A2618]/20 py-2 focus:border-[#3A2618] outline-none transition-colors font-body text-base text-[#3A2618] placeholder:text-[#3A2618]/30 resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="pt-8 flex justify-center w-full">
                <button
                  disabled={isSubmitting || submitted}
                  type="submit"
                  className={`group w-full max-w-[280px] py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all duration-300 font-display text-sm uppercase tracking-widest shadow-md hover:shadow-lg
                    ${submitted
                      ? 'bg-transparent border border-[#3A2618] text-[#3A2618]'
                      : 'bg-[#3A2618] text-[#DFA878] hover:bg-[#2A1A10] hover:scale-[1.02]'
                    }
                    ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}
                  `}
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 size={20} className="animate-scale-up text-[#3A2618]" />
                      <span className="font-bold">Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <span className="font-bold">Send Message</span>
                      <Send size={16} className={`${isSubmitting ? 'animate-bounce' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`} />
                    </>
                  )}
                </button>
              </div>

              {error && (
                <p className="text-center text-sm text-red-500 font-body mt-2">
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;