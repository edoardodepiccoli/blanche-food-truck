"use client";

import React, { useEffect, useState } from "react";
import StopForm from "./StopForm";
import { Stop } from "@/types/Stop";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firestore";
import StopsTable from "./StopsTable";
import Image from "next/image";

export default function Dashboard() {
  const [stops, setStops] = useState<Stop[] | null>(null);
  const [editingStop, setEditingStop] = useState<Stop | null>(null);

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
      <div className="w-1/3 flex flex-col justify-center items-center">
        <Image
          src="/truck-primary.png"
          alt="truck image"
          width={150}
          height={150}
        ></Image>
        <StopForm
          editingStop={editingStop}
          setEditingStop={setEditingStop}
        ></StopForm>
      </div>
      <div className="w-2/3 flex flex-col justify-center items-center">
        <StopsTable stops={stops} setEditingStop={setEditingStop}></StopsTable>
      </div>
    </div>
  );
}
