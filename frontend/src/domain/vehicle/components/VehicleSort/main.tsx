import type { VehicleSortProps } from './types';
import type { VehicleListParams } from '../../types';

/**
 * @component VehicleSort
 * @summary Sort controls for vehicle list
 * @domain vehicle
 * @type domain-component
 * @category form
 */
export const VehicleSort = ({ sortBy, sortOrder, onSortChange }: VehicleSortProps) => {
  const handleSortByChange = (value: string) => {
    const newSortBy = value as VehicleListParams['sortBy'];
    onSortChange(newSortBy, sortOrder || 'ASC');
  };

  const handleSortOrderChange = (value: string) => {
    const newSortOrder = value as VehicleListParams['sortOrder'];
    onSortChange(sortBy || 'price', newSortOrder);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
        <select
          value={sortBy || 'price'}
          onChange={(e) => handleSortByChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="price">Preço</option>
          <option value="year">Ano</option>
          <option value="model">Modelo</option>
          <option value="mileage">Quilometragem</option>
          <option value="dateCreated">Data de Cadastro</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Ordem:</label>
        <select
          value={sortOrder || 'ASC'}
          onChange={(e) => handleSortOrderChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ASC">Crescente</option>
          <option value="DESC">Decrescente</option>
        </select>
      </div>
    </div>
  );
};
