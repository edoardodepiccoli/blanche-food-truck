import React from "react";
import { Stop } from "@/types/Stop";
import { deleteStop } from "@/lib/firestore";
import { formatDateItalian } from "@/lib/utils";

type Props = {
  stops: Stop[] | null;
  setEditingStop: (stop: Stop) => void;
};

export default function StopsTable({ stops, setEditingStop }: Props) {
  if (!stops || stops.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">Nessuna tappa trovata.</p>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const isPast = (dateStr: string) => dateStr < today;

  const sortedStops = [...stops].sort((a, b) => a.date.localeCompare(b.date));
  const upcomingStops = sortedStops.filter((s) => !isPast(s.date));
  const pastStops = sortedStops.filter((s) => isPast(s.date));

  const renderCard = (stop: Stop, past: boolean) => (
    <div
      key={stop.id}
      className={`card bg-base-100 border border-base-300 shadow-md p-4 ${
        past ? "opacity-50" : ""
      }`}
    >
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">{stop.name}</h2>
          <p>📅 {formatDateItalian(stop.date)}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={stop.locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline btn-info flex-1"
          >
            Google Maps
          </a>
          <a
            href={stop.groupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline btn-success flex-1"
          >
            WhatsApp
          </a>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setEditingStop(stop)}
            className="btn btn-sm btn-warning flex-1"
          >
            {past ? "Riproponi" : "Modifica"}
          </button>
          <button
            onClick={() => {
              if (confirm("Vuoi eliminare la tappa?") && stop.id)
                deleteStop(stop.id);
            }}
            className="btn btn-sm btn-error flex-1"
          >
            Elimina
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid gap-6 grid-cols-1">
      {upcomingStops.map((stop) => renderCard(stop, false))}
      {pastStops.length > 0 && (
        <div className="col-span-full text-center text-gray-500">
          --- TAPPE PASSATE ---
        </div>
      )}
      {pastStops.map((stop) => renderCard(stop, true))}
    </div>
  );
}
