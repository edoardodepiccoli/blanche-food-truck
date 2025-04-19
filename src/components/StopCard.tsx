"use client";

// StopCard.tsx
import Image from "next/image";
import { Stop } from "@/types/Stop";
import { format, parseISO } from "date-fns";
import { it } from "date-fns/locale";

type Variant = "primary" | "secondary";

interface StopCardProps {
  stop: Stop;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const StopCard = ({ stop, onEdit, onDelete }: StopCardProps) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // Return original string if date is invalid
      }
      return date.toLocaleDateString('it-IT', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString; // Return original string if parsing fails
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{stop.name}</h3>
        {stop.description && (
          <p className="text-gray-600 mb-4">{stop.description}</p>
        )}
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Indirizzo:</span> {stop.address}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Data:</span> {formatDate(stop.date)}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Ora:</span> {stop.time}
          </p>
          {stop.coordinates && (
            <a
              href={`https://www.google.com/maps?q=${stop.coordinates.lat},${stop.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
            >
              Visualizza su Google Maps
            </a>
          )}
        </div>
      </div>
      {(onEdit || onDelete) && (
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-indigo-600 hover:text-indigo-900 font-medium"
            >
              Modifica
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-900 font-medium"
            >
              Elimina
            </button>
          )}
        </div>
      )}
    </div>
  );
};
