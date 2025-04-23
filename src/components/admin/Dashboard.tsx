"use client";

import React, { useState } from "react";

import Image from "next/image";
import { Stop } from "@/types/Stop";
import StopForm from "./StopForm";
import StopsTable from "./StopsTable";
import { useStops } from "@/hooks/useStops";

export default function Dashboard() {
  const [editingStop, setEditingStop] = useState<Stop | null>(null);

  const stops = useStops();

  return (
    <div className="w-full md:h-full flex flex-col md:flex-row">
      <div className="md:w-1/3 flex flex-col justify-center items-center">
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
      <div className="md:w-2/3 flex flex-col justify-center items-center">
        <StopsTable stops={stops} setEditingStop={setEditingStop}></StopsTable>
      </div>
    </div>
  );
}
