"use client";

import React, { useState } from "react";

import { Stop } from "@/types/Stop";
import StopForm from "./StopForm";
import StopsTable from "./StopsTable";
import { useStops } from "@/hooks/useStops";

export default function Dashboard() {
  const [editingStop, setEditingStop] = useState<Stop | null>(null);
  const stops = useStops();

  return (
    <div className="w-full flex flex-col max-w-lg m-auto">
      {/* Sticky Form at top */}
      <div className="sticky top-0 z-20 bg-base-100 pt-4 px-4 pb-4 border-b border-b-primary">
        <StopForm editingStop={editingStop} setEditingStop={setEditingStop} />
      </div>

      {/* Stops list below */}
      <div className="mt-8 px-4">
        <StopsTable stops={stops} setEditingStop={setEditingStop} />
      </div>
    </div>
  );
}
