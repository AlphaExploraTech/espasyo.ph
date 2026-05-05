// src/components/Contact.tsx
import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './Common/Navbar';
import { MapPin, Phone, Mail, Facebook, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const container = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();

    // --- FORM STATE LOGIC ---
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatusMessage({ type: '', text: '' });

        try {
            // Send to the Next.js/Vercel serverless function
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    company: "N/A (Espasyo Inquiry)",
                    service: "Espasyo Inquiry",
                    details: formData.message
                }),
            });

            if (response.ok) {
                setStatusMessage({ type: 'success', text: 'Thank you! Your inquiry has been sent.' });
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Failed to send');
            }
        } catch (error) {
            setStatusMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    // --- NUCLEAR SCROLL RESET ---
    useLayoutEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);
        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        gsap.fromTo(container.current,
            { opacity: 0 },
            { opacity: 1, duration: 1 }
        );
        gsap.fromTo(".contact-card",
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
        );
        // FIX: Use fromTo and a specific class name for safety
        gsap.fromTo(".form-animate",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.6, ease: "power2.out" }
        );
    }, { scope: container });

    const handleBack = () => {
        navigate('/', {
            state: {
                skipIntro: true,
                scrollToSection: 'services'
            }
        });
    };

    return (
        <div ref={container} className="min-h-screen bg-[#2C3628] text-[#F0EAD6] flex flex-col">
            <Navbar theme="brown" />

            <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-24 relative">

                <div className="md:w-1/4 lg:w-1/5 flex flex-col z-20 pb-8 h-full">
                    <button onClick={handleBack} className="absolute top-28 left-8 md:left-12 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#D4A373] transition-colors z-10 opacity-80">
                        <span>←</span> Back
                    </button>
                </div>

                <div className="contact-card w-full max-w-6xl bg-[#F0EAD6] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
                    {/* LEFT SIDE: INFO */}
                    <div className="w-full md:w-1/2 bg-[#3E4A35] text-[#F0EAD6] p-8 md:p-12 flex flex-col relative overflow-hidden">
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#D4A373]/10 rounded-full blur-3xl" />
                        <div className="relative z-10 flex flex-col h-full">
                            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tighter mb-2 text-[#D4A373]">Espasyo</h2>
                            <p className="font-body text-xs tracking-[0.2em] uppercase opacity-70 mb-12">Study & Office Hub</p>

                            <div className="flex flex-col gap-8 mb-12">
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#F0EAD6]/10 rounded-full group-hover:bg-[#D4A373] group-hover:text-[#2C3628] transition-colors"><MapPin size={20} /></div>
                                    <div><h3 className="font-bold text-sm uppercase tracking-wider mb-1 text-[#D4A373]">Visit Us</h3><p className="text-sm opacity-80 leading-relaxed max-w-xs">6A T. Bugallon Street, Marikina Heights,<br />Marikina City, Philippines</p></div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#F0EAD6]/10 rounded-full group-hover:bg-[#D4A373] group-hover:text-[#2C3628] transition-colors"><Phone size={20} /></div>
                                    <div><h3 className="font-bold text-sm uppercase tracking-wider mb-1 text-[#D4A373]">Call Us</h3><p className="text-sm opacity-80">0916 611 2928</p><p className="text-sm opacity-80">700 600 42</p></div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#F0EAD6]/10 rounded-full group-hover:bg-[#D4A373] group-hover:text-[#2C3628] transition-colors"><Mail size={20} /></div>
                                    <div><h3 className="font-bold text-sm uppercase tracking-wider mb-1 text-[#D4A373]">Email Us</h3><p className="text-sm opacity-80">inquiry@espasyo.ph</p></div>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <a href="https://www.facebook.com/espasyostudynofficehub" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase tracking-widest hover:text-[#D4A373] transition-colors">
                                    <Facebook size={18} /><span>Follow on Facebook</span>
                                </a>
                                <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-[#F0EAD6]/10 shadow-lg relative group cursor-pointer">
                                    <img
                                        src="https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774546085/espasyoMaps.png"
                                        alt="Espasyo Location Map"
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                    />
                                    <a
                                        href="https://maps.app.goo.gl/fF5wsVjxofb1co857"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center"
                                    >
                                        <div className="bg-[#F0EAD6] text-[#2C3628] px-4 py-2 rounded-full font-display text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                                            Open in Google Maps
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: FORM */}
                    <div className="w-full md:w-1/2 bg-[#F0EAD6] text-[#2C3628] p-8 md:p-12 flex flex-col relative pb-16">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#2C3628]/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="max-w-md mx-auto w-full relative z-10 py-4">
                            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tighter mb-2">Get in Touch</h2>
                            <p className="font-body text-sm opacity-70 mb-8">Fill out the form below and we'll get back to you shortly.</p>

                            {/* Status Message Display */}
                            {statusMessage.text && (
                                <div className={`mb-6 p-4 rounded-xl border-2 flex items-center justify-center text-center font-display text-xs font-bold uppercase tracking-widest transition-all ${statusMessage.type === 'success'
                                    ? 'bg-[#3E4A35]/10 border-[#3E4A35]/30 text-[#2C3628]'
                                    : 'bg-[#C87941]/10 border-[#C87941]/30 text-[#C87941]'
                                    }`}>
                                    {statusMessage.type === 'success' ? '✓ ' : '⚠ '} {statusMessage.text}
                                </div>
                            )}

                            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 pb-6">
                                {/* First Name & Last Name */}
                                <div className="flex gap-4 form-animate">
                                    <div className="group w-1/2">
                                        <label className="block font-display text-xs font-bold uppercase tracking-widest mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-[#C87941] transition-all">First Name</label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full bg-transparent border-b-2 border-[#2C3628]/20 py-3 text-lg focus:outline-none focus:border-[#C87941] transition-colors placeholder:text-[#2C3628]/30" placeholder="John" />
                                    </div>
                                    <div className="group w-1/2">
                                        <label className="block font-display text-xs font-bold uppercase tracking-widest mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-[#C87941] transition-all">Last Name</label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full bg-transparent border-b-2 border-[#2C3628]/20 py-3 text-lg focus:outline-none focus:border-[#C87941] transition-colors placeholder:text-[#2C3628]/30" placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="group form-animate">
                                    <label className="block font-display text-xs font-bold uppercase tracking-widest mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-[#C87941] transition-all">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-transparent border-b-2 border-[#2C3628]/20 py-3 text-lg focus:outline-none focus:border-[#C87941] transition-colors placeholder:text-[#2C3628]/30" placeholder="hello@example.com" />
                                </div>

                                <div className="group form-animate">
                                    <label className="block font-display text-xs font-bold uppercase tracking-widest mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-[#C87941] transition-all">Message</label>
                                    <textarea name="message" value={formData.message} onChange={handleInputChange} required className="w-full bg-transparent border-b-2 border-[#2C3628]/20 py-3 text-lg focus:outline-none focus:border-[#C87941] transition-colors placeholder:text-[#2C3628]/30 min-h-[100px] resize-none" placeholder="How can we help you?"></textarea>
                                </div>

                                <button type="submit" disabled={isLoading} className="form-animate group mt-2 w-full py-4 bg-[#2C3628] text-[#D4A373] border-2 border-[#2C3628] rounded-xl font-bold uppercase tracking-widest hover:bg-[#D4A373] hover:text-[#2C3628] transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
                                    <span>{isLoading ? 'Sending...' : 'Send Inquiry'}</span>
                                    {!isLoading && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;