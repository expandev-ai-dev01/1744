/**
 * @api {get} /external/vehicle List Vehicles
 * @apiName ListVehicles
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves a paginated and filtered list of vehicles from the catalog
 *
 * @apiParam {Number} [idBrand] Brand identifier filter
 * @apiParam {Number} [idFuelType] Fuel type identifier filter
 * @apiParam {Number} [idTransmission] Transmission type identifier filter
 * @apiParam {Number} [idColor] Color identifier filter
 * @apiParam {Number} [yearMin] Minimum year filter
 * @apiParam {Number} [yearMax] Maximum year filter
 * @apiParam {Number} [priceMin] Minimum price filter
 * @apiParam {Number} [priceMax] Maximum price filter
 * @apiParam {Boolean} [featuredOnly] Filter featured vehicles only
 * @apiParam {String} [sortBy] Sort field (price, year, model, dateCreated, mileage)
 * @apiParam {String} [sortOrder] Sort direction (ASC, DESC)
 * @apiParam {Number} [page] Page number (default: 1)
 * @apiParam {Number} [pageSize] Items per page (default: 20, max: 100)
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Response data
 * @apiSuccess {Array} data.vehicles Array of vehicle items
 * @apiSuccess {Number} data.total Total number of vehicles
 * @apiSuccess {Number} data.page Current page number
 * @apiSuccess {Number} data.pageSize Items per page
 * @apiSuccess {Number} data.totalPages Total number of pages
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { vehicleList } from '@/services/vehicle';
import { successResponse, errorResponse } from '@/utils/response';

const querySchema = z.object({
  idBrand: z.coerce.number().int().positive().optional(),
  idFuelType: z.coerce.number().int().positive().optional(),
  idTransmission: z.coerce.number().int().positive().optional(),
  idColor: z.coerce.number().int().positive().optional(),
  yearMin: z.coerce.number().int().min(1900).max(2100).optional(),
  yearMax: z.coerce.number().int().min(1900).max(2100).optional(),
  priceMin: z.coerce.number().min(0).optional(),
  priceMax: z.coerce.number().min(0).optional(),
  featuredOnly: z
    .union([z.boolean(), z.string().transform((val) => val === 'true' || val === '1')])
    .optional(),
  sortBy: z.enum(['price', 'year', 'model', 'dateCreated', 'mileage']).optional(),
  sortOrder: z.enum(['ASC', 'DESC']).optional(),
  page: z.coerce.number().int().min(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(100).optional(),
});

export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate query parameters
     * @throw {ValidationError}
     */
    const validated = querySchema.parse(req.query);

    /**
     * @rule {fn-vehicle-list} Retrieve filtered and paginated vehicle list
     */
    const data = await vehicleList(validated);

    res.json(
      successResponse(data, {
        page: data.page,
        pageSize: data.pageSize,
        total: data.total,
      })
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else if (error.number === 51000) {
      res.status(400).json(errorResponse(error.message, 'BUSINESS_RULE_ERROR'));
    } else {
      next(error);
    }
  }
}
