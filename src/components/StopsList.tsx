"use client";

import { db } from "@/lib/firestore";
import { Stop } from "@/types/Stop";
import { onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import StopCard from "./StopCard";

export default function StopsList() {
  const [stops, setStops] = useState<Stop[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "stops"), (snapshot) => {
      const liveStops = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Stop, "id">),
      }));
      setStops(liveStops as Stop[]);
      setIsLoading(false);
    });

    return () => unsub();
  }, []);

  if (!stops || stops.length === 0) {
    if (isLoading) {
      return (
        <div className="text-center text-gray-500 mt-16">Caricamento...</div>
      );
    }
  }

  const todayStr = new Date().toISOString().split("T")[0];
  const sortedStops = [...(stops || [])].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  const todayStops = sortedStops.filter((stop) => stop.date === todayStr);
  const upcomingStops = sortedStops.filter((stop) => stop.date > todayStr);

  return (
    <div className="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
      {/* Today's Stops */}
      {todayStops.length > 0 && (
        <>
          <h1 className="font-bold text-2xl mt-12 mb-2 text-center">
            Oggi ci trovi a...
          </h1>
          {todayStops.map((stop) => (
            <StopCard key={stop.id} stop={stop} variant="primary" />
          ))}
        </>
      )}

      {/* Upcoming Stops */}
      {upcomingStops.length > 0 && (
        <div className="border-t border-[#5b4241] mt-8 pt-8 mb-2">
          <h2 className="font-bold text-2xl text-center">Prossime tappe</h2>
          {upcomingStops.map((stop) => (
            <StopCard key={stop.id} stop={stop} variant="secondary" />
          ))}
        </div>
      )}
    </div>
  );
}
