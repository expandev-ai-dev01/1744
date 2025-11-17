/**
 * @module vehicle
 * @summary Vehicle domain module for catalog management
 * @domain functional
 * @version 1.0.0
 */

export * from './types';
export * from './services/vehicleService';
export * from './hooks/useVehicleList';
export * from './hooks/useVehicleDetail';
export * from './components/VehicleCard';
export * from './components/VehicleFilters';
export * from './components/VehicleSort';
export * from './components/VehicleImageGallery';
export { VehicleSpecifications } from './components/VehicleSpecifications';

export const vehicleModuleMetadata = {
  name: 'vehicle',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: [
    'VehicleCard',
    'VehicleFilters',
    'VehicleSort',
    'VehicleImageGallery',
    'VehicleSpecifications',
  ],
  publicHooks: ['useVehicleList', 'useVehicleDetail'],
  publicServices: ['vehicleService'],
  dependencies: {
    internal: ['@/core/lib', '@/core/utils', '@/core/components'],
    external: ['react', 'react-router-dom', '@tanstack/react-query', 'axios'],
  },
  exports: {
    components: [
      'VehicleCard',
      'VehicleFilters',
      'VehicleSort',
      'VehicleImageGallery',
      'VehicleSpecifications',
    ],
    hooks: ['useVehicleList', 'useVehicleDetail'],
    services: ['vehicleService'],
    types: [
      'Vehicle',
      'VehicleDetail',
      'VehicleImage',
      'VehicleSpecifications',
      'VehicleListParams',
      'VehicleListResponse',
    ],
  },
} as const;
