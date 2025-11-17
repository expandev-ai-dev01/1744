/**
 * @summary
 * Type definitions for contact form service operations including submission
 * parameters and response structures.
 */

/**
 * @interface ContactFormCreateParams
 * @description Parameters for contact form submission
 *
 * @property {number} idVehicle - Vehicle identifier
 * @property {string} name - Customer name (max 200 characters)
 * @property {string} email - Customer email address (max 200 characters)
 * @property {string} phone - Customer phone number (max 50 characters)
 * @property {string} message - Customer inquiry message (max 1000 characters)
 */
export interface ContactFormCreateParams {
  idVehicle: number;
  name: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * @interface ContactFormCreateResponse
 * @description Response structure for contact form creation
 *
 * @property {number} idContactForm - Created contact form identifier
 */
export interface ContactFormCreateResponse {
  idContactForm: number;
}
