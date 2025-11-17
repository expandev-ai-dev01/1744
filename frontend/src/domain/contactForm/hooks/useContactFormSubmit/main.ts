import { useMutation } from '@tanstack/react-query';
import { contactFormService } from '../../services/contactFormService';
import type { UseContactFormSubmitOptions, UseContactFormSubmitReturn } from './types';

/**
 * @hook useContactFormSubmit
 * @summary Hook for submitting contact form
 * @domain contactForm
 * @type domain-hook
 * @category data
 */
export const useContactFormSubmit = (
  options: UseContactFormSubmitOptions = {}
): UseContactFormSubmitReturn => {
  const { onSuccess, onError } = options;

  const mutation = useMutation({
    mutationFn: contactFormService.submit,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return {
    submit: async (params) => {
      await mutation.mutateAsync(params);
    },
    isSubmitting: mutation.isPending,
    error: mutation.error as Error | null,
  };
};
