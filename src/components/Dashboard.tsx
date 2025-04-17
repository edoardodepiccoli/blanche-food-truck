"use client";

import React, { useEffect, useState } from "react";
import StopForm from "./StopForm";
import { Stop } from "@/types/Stop";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firestore";
import CardsList from "./CardsList";

export default function Dashboard() {
  const [stops, setStops] = useState<Stop[] | null>(null);

  // Subscribe to changes in the stops collection
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "stops"), (snapshot) => {
      const liveStops: Stop[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Stop[];
      setStops(liveStops);
    });

    return () => unsub();
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <StopForm></StopForm>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <CardsList stops={stops}></CardsList>
      </div>
    </div>
  );
}
