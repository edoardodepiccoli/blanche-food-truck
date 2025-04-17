import { Stop } from "@/types/Stop";
import React from "react";

type Props = {
  stops: Stop[] | null;
};

export default function CardsList({ stops }: Props) {
  if (!stops || stops.length === 0) {
    return <p className="text-gray-500">Nessuna tappa trovata.</p>;
  }

  const isPast = (dateStr: string) => {
    const today = new Date().toISOString().split("T")[0];
    return dateStr < today;
  };

  const sortedStops = [...stops].sort((a, b) => a.date.localeCompare(b.date));
  const upcomingStops = sortedStops.filter((stop) => !isPast(stop.date));
  const pastStops = sortedStops.filter((stop) => isPast(stop.date));

  const renderRow = (stop: Stop, isPast: boolean) => (
    <tr key={stop.id} className={isPast ? "opacity-30" : ""}>
      <td>📅 {stop.date}</td>
      <td>{stop.name}</td>
      <td>
        <a
          href={stop.locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-outline btn-info w-full"
        >
          Vai
        </a>
      </td>
      <td>
        <a
          href={stop.groupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-outline btn-success w-full"
        >
          Apri
        </a>
      </td>
      <td className="flex gap-2">
        <button className="btn btn-sm btn-warning">Modifica</button>
        <button className="btn btn-sm btn-error">Elimina</button>
      </td>
    </tr>
  );

  return (
    <div className="w-full overflow-x-auto px-8">
      <h1 className="font-bold text-3xl mb-4">Tutte le tappe</h1>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Data</th>
            <th>Nome</th>
            <th>Google Maps</th>
            <th>Gruppo WhatsApp</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {upcomingStops.map((stop) => renderRow(stop, false))}
          {pastStops.length > 0 && (
            <>
              <tr>
                <td
                  colSpan={5}
                  className="pt-8 pb-2 text-center text-sm text-gray-500"
                >
                  --- TAPPE PASSATE ---
                </td>
              </tr>
              {pastStops.map((stop) => renderRow(stop, true))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
