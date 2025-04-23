import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import { Stop } from "@/types/Stop";
import { db } from "@/lib/firestore";

export function useStops() {
  const [stops, setStops] = useState<Stop[] | null>(null);

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

  return stops;
}
