import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContactFormSubmit } from '../../hooks/useContactFormSubmit';
import { cn } from '@/core/utils';
import type { ContactFormProps } from './types';
import type { ContactFormData } from '../../types';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(200, 'Nome muito longo'),
  email: z.string().email('Email inválido').max(200, 'Email muito longo'),
  phone: z.string().min(1, 'Telefone é obrigatório').max(50, 'Telefone muito longo'),
  message: z.string().min(1, 'Mensagem é obrigatória').max(1000, 'Mensagem muito longa'),
});

/**
 * @component ContactForm
 * @summary Contact form component for vehicle inquiries
 * @domain contactForm
 * @type domain-component
 * @category form
 */
export const ContactForm = ({ vehicleId, vehicleName, onSuccess, onCancel }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const { submit, isSubmitting, error } = useContactFormSubmit({
    onSuccess: () => {
      reset();
      onSuccess?.();
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    await submit({
      ...data,
      idVehicle: vehicleId,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Interessado em {vehicleName}?</h3>
        <p className="text-gray-600 mb-6">
          Preencha o formulário abaixo e entraremos em contato com você.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">
            Erro ao enviar formulário. Por favor, tente novamente.
          </p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nome completo *
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className={cn(
            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
            errors.name ? 'border-red-500' : 'border-gray-300'
          )}
          placeholder="Seu nome completo"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={cn(
            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
            errors.email ? 'border-red-500' : 'border-gray-300'
          )}
          placeholder="seu@email.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Telefone *
        </label>
        <input
          {...register('phone')}
          type="tel"
          id="phone"
          className={cn(
            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
            errors.phone ? 'border-red-500' : 'border-gray-300'
          )}
          placeholder="(00) 00000-0000"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Mensagem *
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          className={cn(
            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
            errors.message ? 'border-red-500' : 'border-gray-300'
          )}
          placeholder="Descreva sua consulta sobre o veículo..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-3 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
