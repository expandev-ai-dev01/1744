import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useVehicleDetail } from '@/domain/vehicle/hooks/useVehicleDetail';
import { VehicleImageGallery } from '@/domain/vehicle/components/VehicleImageGallery';
import { VehicleSpecifications } from '@/domain/vehicle/components/VehicleSpecifications';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import type { VehicleDetailPageProps } from './types';

/**
 * @page VehicleDetailPage
 * @summary Vehicle details page displaying complete vehicle information
 * @domain vehicle
 * @type detail-page
 * @category vehicle-management
 *
 * @routing
 * - Path: /vehicles/:id
 * - Params: { id: string }
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Image Gallery, Details, Specifications, Contact Form
 *
 * @data
 * - Sources: Vehicle Detail API
 * - Loading: Skeleton loading states
 * - Caching: 5 minutes stale time
 */
export const VehicleDetailPage = (props: VehicleDetailPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const vehicleId = id ? parseInt(id, 10) : 0;

  const { data: vehicle, isLoading, error, refetch } = useVehicleDetail({ vehicleId });

  useEffect(() => {
    if (location.state?.contactSuccess) {
      setShowSuccessMessage(true);
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar veículo"
        message="Não foi possível carregar os detalhes do veículo. Por favor, tente novamente."
        onRetry={() => refetch()}
        onBack={() => navigate('/vehicles')}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (!vehicle) {
    return (
      <ErrorMessage
        title="Veículo não encontrado"
        message="O veículo solicitado não foi encontrado ou não está mais disponível."
        onBack={() => navigate('/vehicles')}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <button
        onClick={() => navigate('/vehicles')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Voltar para o catálogo
      </button>

      {showSuccessMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm font-medium text-green-800">
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <VehicleImageGallery
            images={vehicle.images || []}
            vehicleName={`${vehicle.brand} ${vehicle.model}`}
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {vehicle.brand} {vehicle.model}
                </h1>
                <p className="text-lg text-gray-600">{vehicle.year}</p>
              </div>
              {vehicle.featured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Destaque
                </span>
              )}
            </div>
            <p className="text-4xl font-bold text-blue-600 mb-6">{formatPrice(vehicle.price)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Combustível</p>
              <p className="text-lg font-semibold text-gray-900">{vehicle.fuelType}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Transmissão</p>
              <p className="text-lg font-semibold text-gray-900">{vehicle.transmission}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Quilometragem</p>
              <p className="text-lg font-semibold text-gray-900">
                {vehicle.mileage.toLocaleString('pt-BR')} km
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Cor</p>
              <p className="text-lg font-semibold text-gray-900">{vehicle.color}</p>
            </div>
          </div>

          {vehicle.description && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
              <p className="text-gray-700 whitespace-pre-line">{vehicle.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Especificações Técnicas</h2>
        <VehicleSpecifications specifications={vehicle.specifications} />
      </div>

      {vehicle.history && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Histórico</h2>
          <p className="text-gray-700 whitespace-pre-line">{vehicle.history}</p>
        </div>
      )}

      {vehicle.saleConditions && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Condições de Venda</h2>
          <p className="text-gray-700 whitespace-pre-line">{vehicle.saleConditions}</p>
        </div>
      )}

      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Interessado neste veículo?</h2>
        <p className="text-gray-700 mb-6">
          Entre em contato conosco para mais informações ou para agendar um test drive.
        </p>
        <button
          onClick={() => navigate(`/vehicles/${vehicle.id}/contact`)}
          className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Entrar em Contato
        </button>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
