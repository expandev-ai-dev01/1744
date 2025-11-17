import { publicClient } from '@/core/lib/api';
import type { Vehicle, VehicleDetail, VehicleListParams, VehicleListResponse } from '../types';

/**
 * @service vehicleService
 * @summary Vehicle management service for public endpoints
 * @domain vehicle
 * @type rest-service
 * @apiContext external
 */
export const vehicleService = {
  /**
   * @endpoint GET /api/v1/external/vehicle
   * @summary Fetches list of vehicles with filters and pagination
   */
  async list(params?: VehicleListParams): Promise<VehicleListResponse> {
    const response = await publicClient.get('/vehicle', { params });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/vehicle/:id
   * @summary Fetches detailed information about a specific vehicle
   */
  async getById(id: number): Promise<VehicleDetail> {
    const response = await publicClient.get(`/vehicle/${id}`);
    return response.data.data;
  },
};
