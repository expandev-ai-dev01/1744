/**
 * @summary
 * Contact form service business rules and database operations for contact form
 * submission with vehicle inquiry management.
 *
 * @module contactFormRules
 */

import { getPool } from '@/instances/database';
import { ContactFormCreateParams, ContactFormCreateResponse } from './contactFormTypes';

/**
 * @summary
 * Creates a new contact form submission for a specific vehicle
 *
 * @function contactFormCreate
 * @module contactForm
 *
 * @param {ContactFormCreateParams} params - Contact form submission parameters
 * @param {number} params.idVehicle - Vehicle identifier
 * @param {string} params.name - Customer name
 * @param {string} params.email - Customer email address
 * @param {string} params.phone - Customer phone number
 * @param {string} params.message - Customer inquiry message
 *
 * @returns {Promise<ContactFormCreateResponse>} Created contact form identifier
 *
 * @throws {Error} When vehicle not found or unavailable
 * @throws {Error} When required parameters are missing
 * @throws {Error} When database operation fails
 *
 * @example
 * const result = await contactFormCreate({
 *   idVehicle: 123,
 *   name: 'João Silva',
 *   email: 'joao@example.com',
 *   phone: '(11) 98765-4321',
 *   message: 'Gostaria de mais informações sobre este veículo.'
 * });
 */
export async function contactFormCreate(
  params: ContactFormCreateParams
): Promise<ContactFormCreateResponse> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input('idVehicle', params.idVehicle)
    .input('name', params.name)
    .input('email', params.email)
    .input('phone', params.phone)
    .input('message', params.message)
    .execute('[functional].[spContactFormCreate]');

  const contactFormData = result.recordset[0];

  return {
    idContactForm: contactFormData.idContactForm,
  };
}
