import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicleList } from '@/domain/vehicle/hooks/useVehicleList';
import { VehicleCard } from '@/domain/vehicle/components/VehicleCard';
import { VehicleFilters } from '@/domain/vehicle/components/VehicleFilters';
import { VehicleSort } from '@/domain/vehicle/components/VehicleSort';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import type { VehicleListParams, Vehicle } from '@/domain/vehicle/types';
import type { VehicleListPageProps } from './types';

/**
 * @page VehicleListPage
 * @summary Vehicle catalog listing page with filters and sorting
 * @domain vehicle
 * @type list-page
 * @category vehicle-management
 */
export const VehicleListPage = (props: VehicleListPageProps) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<VehicleListParams>({
    page: 1,
    pageSize: 20,
    sortBy: 'price',
    sortOrder: 'ASC',
  });

  const { data, isLoading, error, refetch } = useVehicleList({ filters });

  const handleFiltersChange = (newFilters: VehicleListParams) => {
    setFilters({
      ...newFilters,
      page: 1,
      pageSize: filters.pageSize,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    });
  };

  const handleSortChange = (
    sortBy: VehicleListParams['sortBy'],
    sortOrder: VehicleListParams['sortOrder']
  ) => {
    setFilters({
      ...filters,
      sortBy,
      sortOrder,
      page: 1,
    });
  };

  const handleVehicleClick = (vehicle: Vehicle) => {
    navigate(`/vehicles/${vehicle.id}`);
  };

  const handlePageChange = (newPage: number) => {
    setFilters({
      ...filters,
      page: newPage,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar veículos"
        message="Não foi possível carregar a lista de veículos. Por favor, tente novamente."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Catálogo de Veículos</h1>
        <p className="text-gray-600">Encontre o veículo ideal para você</p>
      </div>

      <VehicleFilters filters={filters} onFiltersChange={handleFiltersChange} />

      <div className="flex items-center justify-between mb-6">
        <VehicleSort
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSortChange={handleSortChange}
        />
        {data && (
          <p className="text-sm text-gray-600">
            {data.total} veículo{data.total !== 1 ? 's' : ''} encontrado
            {data.total !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {isLoading ? (
        <LoadingSpinner size="lg" />
      ) : data && data.vehicles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {data.vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={handleVehicleClick} />
            ))}
          </div>

          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(data.page - 1)}
                disabled={data.page === 1}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>
              <span className="px-4 py-2 text-sm text-gray-700">
                Página {data.page} de {data.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(data.page + 1)}
                disabled={data.page === data.totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Próxima
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum veículo encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">
            Tente ajustar os filtros para encontrar mais resultados.
          </p>
        </div>
      )}
    </div>
  );
};

export default VehicleListPage;
