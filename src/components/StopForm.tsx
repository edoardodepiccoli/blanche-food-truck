"use client";

import { useState } from 'react';
import { StopFormData, StopValidationError } from '../types/Stop';
import { useStops } from '../lib/hooks/useStops';

interface StopFormProps {
  initialData?: Partial<StopFormData>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const StopForm = ({ initialData, onSuccess, onCancel }: StopFormProps) => {
  const { createStop, updateStop } = useStops();
  const [formData, setFormData] = useState<StopFormData>({
    name: initialData?.name || '',
    address: initialData?.address || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    description: initialData?.description || '',
    status: initialData?.status || 'scheduled',
  });
  const [errors, setErrors] = useState<StopValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    try {
      const validationErrors = await createStop(formData);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }
      onSuccess?.();
    } catch (error) {
      setErrors([{ field: 'general', message: 'An error occurred while saving the stop' }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getFieldError = (field: keyof StopFormData) => {
    return errors.find(e => e.field === field)?.message;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
            getFieldError('name') ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
        />
        {getFieldError('name') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
            getFieldError('address') ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
        />
        {getFieldError('address') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('address')}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
              getFieldError('date') ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
          {getFieldError('date') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('date')}</p>
          )}
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
              getFieldError('time') ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
          {getFieldError('time') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('time')}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {errors.find(e => e.field === 'general') && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-600">{errors.find(e => e.field === 'general')?.message}</p>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};
