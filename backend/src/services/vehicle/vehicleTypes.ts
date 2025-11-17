/**
 * @summary
 * Type definitions for vehicle service operations including list filtering,
 * sorting, pagination parameters, and detailed vehicle information.
 */

/**
 * @interface VehicleListParams
 * @description Parameters for vehicle listing with filtering and pagination
 *
 * @property {number} [idBrand] - Filter by brand identifier
 * @property {number} [idFuelType] - Filter by fuel type identifier
 * @property {number} [idTransmission] - Filter by transmission type identifier
 * @property {number} [idColor] - Filter by color identifier
 * @property {number} [yearMin] - Minimum year filter
 * @property {number} [yearMax] - Maximum year filter
 * @property {number} [priceMin] - Minimum price filter
 * @property {number} [priceMax] - Maximum price filter
 * @property {boolean} [featuredOnly] - Filter featured vehicles only
 * @property {string} [sortBy] - Sort field (price, year, model, dateCreated, mileage)
 * @property {string} [sortOrder] - Sort direction (ASC, DESC)
 * @property {number} [page] - Page number for pagination
 * @property {number} [pageSize] - Items per page
 */
export interface VehicleListParams {
  idBrand?: number;
  idFuelType?: number;
  idTransmission?: number;
  idColor?: number;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  featuredOnly?: boolean;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
}

/**
 * @interface VehicleListItem
 * @description Vehicle list item with basic information and primary image
 *
 * @property {number} idVehicle - Vehicle identifier
 * @property {string} model - Vehicle model name
 * @property {number} year - Manufacturing year
 * @property {number} price - Vehicle price
 * @property {number} mileage - Vehicle mileage in kilometers
 * @property {string} description - Vehicle description
 * @property {number | null} engineSize - Engine size in liters
 * @property {number | null} doors - Number of doors
 * @property {boolean} featured - Featured vehicle flag
 * @property {number} idBrand - Brand identifier
 * @property {string} brandName - Brand name
 * @property {number} idFuelType - Fuel type identifier
 * @property {string} fuelTypeName - Fuel type name
 * @property {number} idTransmission - Transmission identifier
 * @property {string} transmissionName - Transmission name
 * @property {number} idColor - Color identifier
 * @property {string} colorName - Color name
 * @property {string | null} colorHex - Color hex code
 * @property {string | null} primaryImageUrl - Primary image URL
 */
export interface VehicleListItem {
  idVehicle: number;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
  engineSize: number | null;
  doors: number | null;
  featured: boolean;
  idBrand: number;
  brandName: string;
  idFuelType: number;
  fuelTypeName: string;
  idTransmission: number;
  transmissionName: string;
  idColor: number;
  colorName: string;
  colorHex: string | null;
  primaryImageUrl: string | null;
}

/**
 * @interface VehicleListResponse
 * @description Response structure for vehicle list with pagination metadata
 *
 * @property {VehicleListItem[]} vehicles - Array of vehicle items
 * @property {number} total - Total number of vehicles matching filters
 * @property {number} page - Current page number
 * @property {number} pageSize - Items per page
 * @property {number} totalPages - Total number of pages
 */
export interface VehicleListResponse {
  vehicles: VehicleListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * @interface VehicleDetail
 * @description Complete vehicle information with all specifications and reference data
 *
 * @property {number} idVehicle - Vehicle identifier
 * @property {string} model - Vehicle model name
 * @property {number} year - Manufacturing year
 * @property {number} price - Vehicle price
 * @property {number} mileage - Vehicle mileage in kilometers
 * @property {string} description - Vehicle description
 * @property {number | null} engineSize - Engine size in liters
 * @property {number | null} doors - Number of doors
 * @property {boolean} featured - Featured vehicle flag
 * @property {number} idBrand - Brand identifier
 * @property {string} brandName - Brand name
 * @property {string} brandCode - Brand code
 * @property {number} idFuelType - Fuel type identifier
 * @property {string} fuelTypeName - Fuel type name
 * @property {string} fuelTypeCode - Fuel type code
 * @property {number} idTransmission - Transmission identifier
 * @property {string} transmissionName - Transmission name
 * @property {string} transmissionCode - Transmission code
 * @property {number} idColor - Color identifier
 * @property {string} colorName - Color name
 * @property {string} colorCode - Color code
 * @property {string | null} colorHex - Color hex code
 * @property {Date} dateCreated - Creation timestamp
 * @property {Date} dateModified - Last modification timestamp
 */
export interface VehicleDetail {
  idVehicle: number;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
  engineSize: number | null;
  doors: number | null;
  featured: boolean;
  idBrand: number;
  brandName: string;
  brandCode: string;
  idFuelType: number;
  fuelTypeName: string;
  fuelTypeCode: string;
  idTransmission: number;
  transmissionName: string;
  transmissionCode: string;
  idColor: number;
  colorName: string;
  colorCode: string;
  colorHex: string | null;
  dateCreated: Date;
  dateModified: Date;
}

/**
 * @interface VehicleImage
 * @description Vehicle image information
 *
 * @property {number} idVehicleImage - Vehicle image identifier
 * @property {number} idVehicle - Vehicle identifier
 * @property {string} imageUrl - Image URL
 * @property {boolean} isPrimary - Primary image flag
 * @property {number} displayOrder - Display order
 * @property {Date} dateCreated - Creation timestamp
 */
export interface VehicleImage {
  idVehicleImage: number;
  idVehicle: number;
  imageUrl: string;
  isPrimary: boolean;
  displayOrder: number;
  dateCreated: Date;
}

/**
 * @interface VehicleGetResponse
 * @description Response structure for vehicle detail retrieval
 *
 * @property {VehicleDetail} vehicle - Complete vehicle information
 * @property {VehicleImage[]} images - Array of vehicle images
 */
export interface VehicleGetResponse {
  vehicle: VehicleDetail;
  images: VehicleImage[];
}
