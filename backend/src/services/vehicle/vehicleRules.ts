/**
 * @summary
 * Vehicle service business rules and database operations for vehicle listing
 * and detail retrieval with comprehensive filtering, sorting, and pagination capabilities.
 *
 * @module vehicleRules
 */

import { getPool } from '@/instances/database';
import {
  VehicleListParams,
  VehicleListResponse,
  VehicleListItem,
  VehicleDetail,
  VehicleImage,
  VehicleGetResponse,
} from './vehicleTypes';
import { IRecordSet } from 'mssql';

/**
 * @summary
 * Retrieves a paginated and filtered list of vehicles from the catalog
 *
 * @function vehicleList
 * @module vehicle
 *
 * @param {VehicleListParams} params - Vehicle list filtering and pagination parameters
 * @param {number} [params.idBrand] - Filter by brand identifier
 * @param {number} [params.idFuelType] - Filter by fuel type identifier
 * @param {number} [params.idTransmission] - Filter by transmission type identifier
 * @param {number} [params.idColor] - Filter by color identifier
 * @param {number} [params.yearMin] - Minimum year filter
 * @param {number} [params.yearMax] - Maximum year filter
 * @param {number} [params.priceMin] - Minimum price filter
 * @param {number} [params.priceMax] - Maximum price filter
 * @param {boolean} [params.featuredOnly] - Filter featured vehicles only
 * @param {string} [params.sortBy] - Sort field (price, year, model, dateCreated, mileage)
 * @param {string} [params.sortOrder] - Sort direction (ASC, DESC)
 * @param {number} [params.page] - Page number for pagination (default: 1)
 * @param {number} [params.pageSize] - Items per page (default: 20)
 *
 * @returns {Promise<VehicleListResponse>} Paginated vehicle list with metadata
 *
 * @throws {Error} When database operation fails
 * @throws {Error} When stored procedure returns validation error
 *
 * @example
 * const result = await vehicleList({
 *   idBrand: 1,
 *   yearMin: 2020,
 *   priceMax: 50000,
 *   sortBy: 'price',
 *   sortOrder: 'ASC',
 *   page: 1,
 *   pageSize: 20
 * });
 */
export async function vehicleList(params: VehicleListParams): Promise<VehicleListResponse> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input('idBrand', params.idBrand || null)
    .input('idFuelType', params.idFuelType || null)
    .input('idTransmission', params.idTransmission || null)
    .input('idColor', params.idColor || null)
    .input('yearMin', params.yearMin || null)
    .input('yearMax', params.yearMax || null)
    .input('priceMin', params.priceMin || null)
    .input('priceMax', params.priceMax || null)
    .input('featuredOnly', params.featuredOnly || 0)
    .input('sortBy', params.sortBy || 'dateCreated')
    .input('sortOrder', params.sortOrder || 'DESC')
    .input('page', params.page || 1)
    .input('pageSize', params.pageSize || 20)
    .execute('[functional].[spVehicleList]');

  const recordsets = result.recordsets as IRecordSet<any>[];
  const vehicles: VehicleListItem[] = Array.isArray(recordsets[0]) ? recordsets[0] : [];
  const totalResult =
    Array.isArray(recordsets[1]) && recordsets[1].length > 0 ? recordsets[1][0] : { total: 0 };
  const total = totalResult.total;
  const page = params.page || 1;
  const pageSize = params.pageSize || 20;
  const totalPages = Math.ceil(total / pageSize);

  return {
    vehicles,
    total,
    page,
    pageSize,
    totalPages,
  };
}

/**
 * @summary
 * Retrieves detailed information about a specific vehicle including all
 * specifications, images, and related reference data
 *
 * @function vehicleGet
 * @module vehicle
 *
 * @param {number} idVehicle - Vehicle identifier
 *
 * @returns {Promise<VehicleGetResponse>} Complete vehicle details with images
 *
 * @throws {Error} When vehicle not found or unavailable
 * @throws {Error} When database operation fails
 *
 * @example
 * const result = await vehicleGet(123);
 */
export async function vehicleGet(idVehicle: number): Promise<VehicleGetResponse> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input('idVehicle', idVehicle)
    .execute('[functional].[spVehicleGet]');

  const recordsets = result.recordsets as IRecordSet<any>[];
  const vehicleData: VehicleDetail[] = Array.isArray(recordsets[0]) ? recordsets[0] : [];
  const imagesData: VehicleImage[] = Array.isArray(recordsets[1]) ? recordsets[1] : [];

  if (vehicleData.length === 0) {
    throw new Error('vehicleNotFound');
  }

  return {
    vehicle: vehicleData[0],
    images: imagesData,
  };
}
