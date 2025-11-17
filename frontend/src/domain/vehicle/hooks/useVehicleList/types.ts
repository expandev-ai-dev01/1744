import type { VehicleListParams, VehicleListResponse } from '../../types';

export interface UseVehicleListOptions {
  filters?: VehicleListParams;
  enabled?: boolean;
}

export interface UseVehicleListReturn {
  data: VehicleListResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
