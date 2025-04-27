import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/admin");
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  return { user, loading, logout };
}
