import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services/vehicleService';
import type { UseVehicleDetailOptions, UseVehicleDetailReturn } from './types';

/**
 * @hook useVehicleDetail
 * @summary Hook for fetching detailed vehicle information
 * @domain vehicle
 * @type domain-hook
 * @category data
 */
export const useVehicleDetail = (options: UseVehicleDetailOptions): UseVehicleDetailReturn => {
  const { vehicleId, enabled = true } = options;

  const queryKey = ['vehicle-detail', vehicleId];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => vehicleService.getById(vehicleId),
    enabled: enabled && !!vehicleId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
