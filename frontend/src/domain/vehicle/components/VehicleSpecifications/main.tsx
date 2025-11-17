import type { VehicleSpecificationsProps } from './types';

/**
 * @component VehicleSpecifications
 * @summary Component displaying vehicle technical specifications
 * @domain vehicle
 * @type domain-component
 * @category display
 */
export const VehicleSpecifications = ({ specifications }: VehicleSpecificationsProps) => {
  const specItems = [
    { label: 'Motor', value: specifications.engine },
    { label: 'Potência', value: specifications.power },
    { label: 'Portas', value: specifications.doors },
    { label: 'Lugares', value: specifications.seats },
    { label: 'Capacidade do Porta-Malas', value: specifications.trunkCapacity },
    { label: 'Consumo', value: specifications.fuelConsumption },
  ];

  const validSpecs = specItems.filter((item) => item.value !== undefined && item.value !== null);

  if (validSpecs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Especificações técnicas não disponíveis</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {validSpecs.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">{item.label}:</span>
          <span className="text-sm text-gray-900">{item.value}</span>
        </div>
      ))}
    </div>
  );
};
