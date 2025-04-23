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

  // Helper to determine if a stop date is in the past
  const isPast = (dateStr: string) => {
    const today = new Date().toISOString().split("T")[0];
    return dateStr < today;
  };

  // Sort stops by date
  const sortedStops = [...stops].sort((a, b) => a.date.localeCompare(b.date));

  // Separate upcoming and past stops
  const upcomingStops = sortedStops.filter((stop) => !isPast(stop.date));
  const pastStops = sortedStops.filter((stop) => isPast(stop.date));

  // Render a table row for desktop view
  const renderTableRow = (stop: Stop, past: boolean) => (
    <tr key={stop.id} className={past ? "opacity-50" : ""}>
      <td className="px-4 py-2">📅 {formatDateItalian(stop.date)}</td>
      <td className="px-4 py-2">{stop.name}</td>
      <td className="px-4 py-2">
        <a
          href={stop.locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-outline btn-info w-full"
        >
          Vai
        </a>
      </td>
      <td className="px-4 py-2">
        <a
          href={stop.groupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-outline btn-success w-full"
        >
          Apri
        </a>
      </td>
      <td className="px-4 py-2 flex gap-2">
        <button
          className="btn btn-sm btn-warning flex-1"
          onClick={() => setEditingStop(stop)}
        >
          {past ? "Riproponi" : "Modifica"}
        </button>
        <button
          className="btn btn-sm btn-error flex-1"
          onClick={() => {
            if (confirm("Vuoi eliminare la tappa?") && stop.id) {
              deleteStop(stop.id);
            }
          }}
        >
          Elimina
        </button>
      </td>
    </tr>
  );

  // Render a card for mobile view
  const renderCard = (stop: Stop, past: boolean) => (
    <div
      key={stop.id}
      className={`card bg-base-100 shadow-md p-4 ${past ? "opacity-50" : ""}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">📅 {stop.date}</span>
        <span className="font-medium truncate">{stop.name}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        <a
          href={stop.locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-xs btn-outline btn-info flex-1 min-w-[100px]"
        >
          Maps
        </a>
        <a
          href={stop.groupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-xs btn-outline btn-success flex-1 min-w-[100px]"
        >
          WhatsApp
        </a>
      </div>
      <div className="flex gap-2">
        <button
          className="btn btn-xs btn-warning flex-1"
          onClick={() => setEditingStop(stop)}
        >
          {past ? "Riproponi" : "Modifica"}
        </button>
        <button
          className="btn btn-xs btn-error flex-1"
          onClick={() => {
            if (confirm("Vuoi eliminare la tappa?") && stop.id) {
              deleteStop(stop.id);
            }
          }}
        >
          Elimina
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full px-4 py-8">
      <h1 className="font-bold text-2xl mb-6 text-center">Tutte le tappe</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table-auto w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Data</th>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2">Google Maps</th>
              <th className="px-4 py-2">Gruppo WhatsApp</th>
              <th className="px-4 py-2">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {upcomingStops.map((stop) => renderTableRow(stop, false))}
            {pastStops.length > 0 && (
              <>
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    --- TAPPE PASSATE ---
                  </td>
                </tr>
                {pastStops.map((stop) => renderTableRow(stop, true))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {upcomingStops.map((stop) => renderCard(stop, false))}
        {pastStops.length > 0 && (
          <div className="text-center text-gray-500">--- TAPPE PASSATE ---</div>
        )}
        {pastStops.map((stop) => renderCard(stop, true))}
      </div>
    </div>
  );
}
