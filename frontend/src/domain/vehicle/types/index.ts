export interface Vehicle {
  id: number;
  model: string;
  brand: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  color: string;
  featured: boolean;
  imageUrl?: string;
  description?: string;
}

export interface VehicleDetail extends Vehicle {
  images: VehicleImage[];
  specifications: VehicleSpecifications;
  history?: string;
  saleConditions?: string;
}

export interface VehicleImage {
  id: number;
  url: string;
  isPrimary: boolean;
  order: number;
}

export interface VehicleSpecifications {
  engine?: string;
  power?: string;
  doors?: number;
  seats?: number;
  trunkCapacity?: string;
  fuelConsumption?: string;
  [key: string]: any;
}

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
  sortBy?: 'price' | 'year' | 'model' | 'dateCreated' | 'mileage';
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  pageSize?: number;
}

export interface VehicleListResponse {
  vehicles: Vehicle[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
