export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactFormSubmitParams extends ContactFormData {
  idVehicle: number;
}

export interface ContactFormResponse {
  idContactForm: number;
}
