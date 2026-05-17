// src/features/contact/viewModels/useContactViewModel.ts
import { useState, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { submitContactForm } from '../../../shared/models/apiService';
import type { ContactFormState } from '../../../shared/models/types';

const initialState: ContactFormState = {
  firstName: '', lastName: '', email: '', inquiryType: '', message: '',
};

export const useContactViewModel = () => {
  const [formState, setFormState] = useState<ContactFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const result = await submitContactForm(formState);
    if (result.success) { setSubmitted(true); setFormState(initialState); }
    else { setError(result.error || 'Unexpected error occurred.'); }
    setIsSubmitting(false);
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    tl.fromTo(contentRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1 })
      .fromTo(formRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1 }, "-=0.7")
      .fromTo(".contact-info-item", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, "-=0.5");
  }, { scope: containerRef });

  return { formState, isSubmitting, submitted, error, containerRef, contentRef, formRef, handleChange, handleSubmit };
};
