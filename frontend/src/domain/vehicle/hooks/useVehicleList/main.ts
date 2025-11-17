import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicleService';
import type { UseVehicleListOptions, UseVehicleListReturn } from './types';

/**
 * @hook useVehicleList
 * @summary Hook for fetching and managing vehicle list with filters
 * @domain vehicle
 * @type domain-hook
 * @category data
 */
export const useVehicleList = (options: UseVehicleListOptions = {}): UseVehicleListReturn => {
  const { filters = {}, enabled = true } = options;

  const queryKey = ['vehicles', filters];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => vehicleService.list(filters),
    enabled,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
