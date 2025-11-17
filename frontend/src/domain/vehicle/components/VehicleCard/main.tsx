import { cn } from '@/core/utils';
import type { VehicleCardProps } from './types';

/**
 * @component VehicleCard
 * @summary Card component displaying vehicle information
 * @domain vehicle
 * @type domain-component
 * @category display
 */
export const VehicleCard = ({ vehicle, onClick }: VehicleCardProps) => {
  const handleClick = () => {
    onClick?.(vehicle);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all',
        'hover:shadow-md hover:border-blue-300 cursor-pointer'
      )}
    >
      <div className="aspect-video bg-gray-200 flex items-center justify-center">
        {vehicle.imageUrl ? (
          <img
            src={vehicle.imageUrl}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="text-sm text-gray-600">{vehicle.year}</p>
          </div>
          {vehicle.featured && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Destaque
            </span>
          )}
        </div>
        <div className="space-y-1 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Combustível:</span>
            <span className="ml-2">{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Transmissão:</span>
            <span className="ml-2">{vehicle.transmission}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Quilometragem:</span>
            <span className="ml-2">{vehicle.mileage.toLocaleString('pt-BR')} km</span>
          </div>
        </div>
        <div className="pt-3 border-t border-gray-200">
          <p className="text-2xl font-bold text-blue-600">{formatPrice(vehicle.price)}</p>
        </div>
      </div>
    </div>
  );
};
