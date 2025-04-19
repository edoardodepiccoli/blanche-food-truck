"use client";

import Dashboard from "@/components/Dashboard";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsub();
  });

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-auto">
        {loading ? <p>Loading...</p> : <Dashboard />}
      </div>
    </div>
  );
}
