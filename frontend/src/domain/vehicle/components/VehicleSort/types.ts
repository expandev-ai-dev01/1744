import type { VehicleListParams } from '../../types';

export interface VehicleSortProps {
  sortBy?: VehicleListParams['sortBy'];
  sortOrder?: VehicleListParams['sortOrder'];
  onSortChange: (
    sortBy: VehicleListParams['sortBy'],
    sortOrder: VehicleListParams['sortOrder']
  ) => void;
}
