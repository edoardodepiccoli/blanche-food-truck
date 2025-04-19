"use client";

import { useState } from 'react';
import { Stop } from '../types/Stop';
import { useStops } from '../lib/hooks/useStops';
import { StopCard } from './StopCard';
import { StopForm } from './StopForm';

interface StopsListProps {
  isAdmin?: boolean;
}

export const StopsList = ({ isAdmin = false }: StopsListProps) => {
  const { stops, loading, error, deleteStop } = useStops();
  const [editingStop, setEditingStop] = useState<Stop | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this stop?')) {
      await deleteStop(id);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading stops...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-600">
        Error loading stops: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isAdmin && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Manage Stops</h2>
          <button
            onClick={() => setEditingStop({} as Stop)}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add New Stop
          </button>
        </div>
      )}

      {isAdmin && editingStop && (
        <div className="bg-white p-6 rounded-lg shadow">
          <StopForm
            initialData={editingStop}
            onSuccess={() => setEditingStop(null)}
            onCancel={() => setEditingStop(null)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stops.map((stop) => (
          <StopCard
            key={stop.id}
            stop={stop}
            onEdit={isAdmin ? () => setEditingStop(stop) : undefined}
            onDelete={isAdmin ? () => handleDelete(stop.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
};
