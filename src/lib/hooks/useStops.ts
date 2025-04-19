import { useState, useEffect, useCallback } from 'react';
import { StopsService } from '../services/stops.service';
import { Stop, StopFormData, StopValidationError, validateStop } from '../../types/Stop';

interface UseStopsReturn {
  stops: Stop[];
  loading: boolean;
  error: Error | null;
  createStop: (stopData: StopFormData) => Promise<StopValidationError[]>;
  updateStop: (id: string, stopData: Partial<StopFormData>) => Promise<void>;
  deleteStop: (id: string) => Promise<void>;
  refreshStops: () => Promise<void>;
}

export const useStops = (): UseStopsReturn => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStops = useCallback(async () => {
    try {
      setLoading(true);
      const data = await StopsService.getAllStops();
      setStops(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch stops'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStops();
  }, [fetchStops]);

  const createStop = async (stopData: StopFormData): Promise<StopValidationError[]> => {
    try {
      const validationErrors = validateStop(stopData);
      if (validationErrors.length > 0) {
        return validationErrors;
      }

      await StopsService.createStop(stopData);
      await fetchStops();
      return [];
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create stop'));
      return [];
    }
  };

  const updateStop = async (id: string, stopData: Partial<StopFormData>): Promise<void> => {
    try {
      await StopsService.updateStop(id, stopData);
      await fetchStops();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update stop'));
    }
  };

  const deleteStop = async (id: string): Promise<void> => {
    try {
      await StopsService.deleteStop(id);
      await fetchStops();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete stop'));
    }
  };

  return {
    stops,
    loading,
    error,
    createStop,
    updateStop,
    deleteStop,
    refreshStops: fetchStops,
  };
}; 