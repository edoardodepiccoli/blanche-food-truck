import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

import { Stop } from "@/types/Stop";
import { app } from "@/lib/firebase";

// Initialize Firestore
export const db = getFirestore(app);

// Reference to the "stops" collection
const stopsCollection = collection(db, "stops");

// Create a new stop (ID is auto-generated by Firestore)
export const createStop = async (stop: Omit<Stop, "id">): Promise<Stop> => {
  const docRef = await addDoc(stopsCollection, stop);
  return { ...stop, id: docRef.id };
};

// Get all stops (with IDs attached to each object)
export const getAllStops = async (): Promise<Stop[]> => {
  const snapshot = await getDocs(stopsCollection);
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Stop)
  );
};

// Get a single stop by ID
export const getStop = async (id: string): Promise<Stop | null> => {
  const docRef = doc(db, "stops", id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists()
    ? { id: snapshot.id, ...(snapshot.data() as Stop) }
    : null;
};

// Update a stop by ID
export const updateStop = async (
  id: string,
  updates: Partial<Omit<Stop, "id">>
): Promise<void> => {
  const docRef = doc(db, "stops", id);
  await updateDoc(docRef, updates);
};

// Delete a stop by ID
export const deleteStop = async (id: string): Promise<void> => {
  const docRef = doc(db, "stops", id);
  await deleteDoc(docRef);
};
