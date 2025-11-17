/**
 * @api {get} /external/vehicle/:id Get Vehicle Details
 * @apiName GetVehicleDetails
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves detailed information about a specific vehicle including
 * all specifications, images, and related reference data
 *
 * @apiParam {Number} id Vehicle identifier
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Response data
 * @apiSuccess {Object} data.vehicle Vehicle details
 * @apiSuccess {Array} data.images Array of vehicle images
 *
 * @apiError {String} ValidationError Invalid vehicle ID provided
 * @apiError {String} NotFoundError Vehicle not found or unavailable
 * @apiError {String} ServerError Internal server error
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { vehicleGet } from '@/services/vehicle';
import { successResponse, errorResponse } from '@/utils/response';

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate route parameters
     * @throw {ValidationError}
     */
    const validated = paramsSchema.parse(req.params);

    /**
     * @rule {fn-vehicle-detail} Retrieve complete vehicle details with images
     */
    const data = await vehicleGet(validated.id);

    res.json(successResponse(data));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Invalid vehicle ID', 'VALIDATION_ERROR', error.errors));
    } else if (error.number === 51000) {
      res.status(404).json(errorResponse(error.message, 'NOT_FOUND'));
    } else {
      next(error);
    }
  }
}
