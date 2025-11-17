import type { ContactFormSubmitParams } from '../../types';

export interface UseContactFormSubmitOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export interface UseContactFormSubmitReturn {
  submit: (params: ContactFormSubmitParams) => Promise<void>;
  isSubmitting: boolean;
  error: Error | null;
}
