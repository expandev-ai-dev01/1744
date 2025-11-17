import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleDetail } from '@/domain/vehicle/hooks/useVehicleDetail';
import { ContactForm } from '@/domain/contactForm/components/ContactForm';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import type { VehicleContactPageProps } from './types';

/**
 * @page VehicleContactPage
 * @summary Contact form page for vehicle inquiries
 * @domain contactForm
 * @type form-page
 * @category vehicle-management
 *
 * @routing
 * - Path: /vehicles/:id/contact
 * - Params: { id: string }
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Vehicle Summary, Contact Form
 *
 * @data
 * - Sources: Vehicle Detail API
 * - Loading: Spinner loading state
 */
export const VehicleContactPage = (props: VehicleContactPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const vehicleId = id ? parseInt(id, 10) : 0;

  const { data: vehicle, isLoading, error } = useVehicleDetail({ vehicleId });

  const handleSuccess = () => {
    navigate(`/vehicles/${vehicleId}`, {
      state: { contactSuccess: true },
    });
  };

  const handleCancel = () => {
    navigate(`/vehicles/${vehicleId}`);
  };

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar veículo"
        message="Não foi possível carregar os detalhes do veículo. Por favor, tente novamente."
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(`/vehicles/${vehicleId}`)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Voltar para detalhes do veículo
      </button>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex items-start gap-6">
          <div className="w-32 h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
            {vehicle.images && vehicle.images.length > 0 ? (
              <img
                src={vehicle.images[0].url}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-gray-400"
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
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {vehicle.brand} {vehicle.model}
            </h2>
            <p className="text-gray-600 mb-2">{vehicle.year}</p>
            <p className="text-2xl font-bold text-blue-600">{formatPrice(vehicle.price)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <ContactForm
          vehicleId={vehicleId}
          vehicleName={`${vehicle.brand} ${vehicle.model}`}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default VehicleContactPage;
