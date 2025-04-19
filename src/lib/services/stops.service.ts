import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Stop, StopFormData } from '../../types/Stop';

export class StopsService {
  private static readonly COLLECTION_NAME = 'stops';

  static async createStop(stopData: StopFormData): Promise<Stop> {
    const now = new Date().toISOString();
    const stop: Omit<Stop, 'id'> = {
      ...stopData,
      status: 'scheduled',
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, this.COLLECTION_NAME), stop);
    return { ...stop, id: docRef.id };
  }

  static async updateStop(id: string, stopData: Partial<StopFormData>): Promise<void> {
    const stopRef = doc(db, this.COLLECTION_NAME, id);
    await updateDoc(stopRef, {
      ...stopData,
      updatedAt: new Date().toISOString(),
    });
  }

  static async deleteStop(id: string): Promise<void> {
    const stopRef = doc(db, this.COLLECTION_NAME, id);
    await deleteDoc(stopRef);
  }

  static async getAllStops(): Promise<Stop[]> {
    const q = query(collection(db, this.COLLECTION_NAME), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Stop[];
  }

  static async getStopById(id: string): Promise<Stop | null> {
    const stopRef = doc(db, this.COLLECTION_NAME, id);
    const stopDoc = await getDocs(collection(db, this.COLLECTION_NAME));
    const stop = stopDoc.docs.find(doc => doc.id === id);
    
    return stop ? { id: stop.id, ...stop.data() } as Stop : null;
  }
} 