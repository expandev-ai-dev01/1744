/**
 * @api {post} /external/contact-form Submit Contact Form
 * @apiName SubmitContactForm
 * @apiGroup ContactForm
 * @apiVersion 1.0.0
 *
 * @apiDescription Submits a contact form for a specific vehicle with customer
 * information and inquiry message
 *
 * @apiParam {Number} idVehicle Vehicle identifier
 * @apiParam {String} name Customer name (max 200 characters)
 * @apiParam {String} email Customer email address (max 200 characters)
 * @apiParam {String} phone Customer phone number (max 50 characters)
 * @apiParam {String} message Customer inquiry message (max 1000 characters)
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Response data
 * @apiSuccess {Number} data.idContactForm Created contact form identifier
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} NotFoundError Vehicle not found or unavailable
 * @apiError {String} ServerError Internal server error
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { contactFormCreate } from '@/services/contactForm';
import { successResponse, errorResponse } from '@/utils/response';

const bodySchema = z.object({
  idVehicle: z.number().int().positive(),
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  phone: z.string().min(1).max(50),
  message: z.string().min(1).max(1000),
});

export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate request body
     * @throw {ValidationError}
     */
    const validated = bodySchema.parse(req.body);

    /**
     * @rule {fn-contact-form-submission} Create contact form submission
     */
    const data = await contactFormCreate(validated);

    res.status(201).json(successResponse(data));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else if (error.number === 51000) {
      if (error.message === 'vehicleNotFound') {
        res.status(404).json(errorResponse(error.message, 'NOT_FOUND'));
      } else {
        res.status(400).json(errorResponse(error.message, 'BUSINESS_RULE_ERROR'));
      }
    } else {
      next(error);
    }
  }
}
