import type { VehicleDetail } from '../../types';

export interface UseVehicleDetailOptions {
  vehicleId: number;
  enabled?: boolean;
}

export interface UseVehicleDetailReturn {
  data: VehicleDetail | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
