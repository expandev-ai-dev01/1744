export interface ContactFormProps {
  vehicleId: number;
  vehicleName: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}
