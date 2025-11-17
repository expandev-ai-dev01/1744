import { publicClient } from '@/core/lib/api';
import type { ContactFormSubmitParams, ContactFormResponse } from '../types';

/**
 * @service contactFormService
 * @summary Contact form submission service for public endpoints
 * @domain contactForm
 * @type rest-service
 * @apiContext external
 */
export const contactFormService = {
  /**
   * @endpoint POST /api/v1/external/contact-form
   * @summary Submits contact form for a specific vehicle
   */
  async submit(params: ContactFormSubmitParams): Promise<ContactFormResponse> {
    const response = await publicClient.post('/contact-form', params);
    return response.data.data;
  },
};
