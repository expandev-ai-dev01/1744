import { useState } from 'react';
import type { VehicleFiltersProps } from './types';

/**
 * @component VehicleFilters
 * @summary Filter controls for vehicle list
 * @domain vehicle
 * @type domain-component
 * @category form
 */
export const VehicleFilters = ({ filters, onFiltersChange }: VehicleFiltersProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (field: string, value: any) => {
    const newFilters = { ...localFilters, [field]: value || undefined };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    const emptyFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ano Mínimo</label>
          <input
            type="number"
            value={localFilters.yearMin || ''}
            onChange={(e) =>
              handleInputChange('yearMin', e.target.value ? parseInt(e.target.value) : undefined)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 2015"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ano Máximo</label>
          <input
            type="number"
            value={localFilters.yearMax || ''}
            onChange={(e) =>
              handleInputChange('yearMax', e.target.value ? parseInt(e.target.value) : undefined)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 2024"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preço Mínimo</label>
          <input
            type="number"
            value={localFilters.priceMin || ''}
            onChange={(e) =>
              handleInputChange('priceMin', e.target.value ? parseFloat(e.target.value) : undefined)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 30000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preço Máximo</label>
          <input
            type="number"
            value={localFilters.priceMax || ''}
            onChange={(e) =>
              handleInputChange('priceMax', e.target.value ? parseFloat(e.target.value) : undefined)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 100000"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={localFilters.featuredOnly || false}
            onChange={(e) => handleInputChange('featuredOnly', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">Apenas veículos em destaque</span>
        </label>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleApplyFilters}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={handleClearFilters}
          className="px-6 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  );
};
