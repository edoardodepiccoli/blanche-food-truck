export interface Stop {
  id: string;
  name: string;
  address: string;
  date: string;
  time: string;
  description?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface StopFormData extends Omit<Stop, 'id' | 'createdAt' | 'updatedAt'> {}

export interface StopValidationError {
  field: keyof StopFormData | 'general';
  message: string;
}

export const validateStop = (stop: StopFormData): StopValidationError[] => {
  const errors: StopValidationError[] = [];
  
  if (!stop.name?.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  }
  
  if (!stop.address?.trim()) {
    errors.push({ field: 'address', message: 'Address is required' });
  }
  
  if (!stop.date) {
    errors.push({ field: 'date', message: 'Date is required' });
  }
  
  if (!stop.time) {
    errors.push({ field: 'time', message: 'Time is required' });
  }
  
  return errors;
};
