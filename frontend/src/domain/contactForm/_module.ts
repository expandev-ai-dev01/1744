/**
 * @module contactForm
 * @summary Contact form domain module for vehicle inquiries
 * @domain functional
 * @version 1.0.0
 */

export * from './types';
export * from './services/contactFormService';
export * from './hooks/useContactFormSubmit';
export * from './components/ContactForm';

export const contactFormModuleMetadata = {
  name: 'contactForm',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['ContactForm'],
  publicHooks: ['useContactFormSubmit'],
  publicServices: ['contactFormService'],
  dependencies: {
    internal: ['@/core/lib', '@/core/utils', '@/core/components'],
    external: ['react', 'react-hook-form', 'zod', '@tanstack/react-query', 'axios'],
  },
  exports: {
    components: ['ContactForm'],
    hooks: ['useContactFormSubmit'],
    services: ['contactFormService'],
    types: ['ContactFormData', 'ContactFormSubmitParams'],
  },
} as const;
