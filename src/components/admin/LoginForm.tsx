import React, { useState } from "react";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "object" && err !== null && "message" in err) {
        setError(String((err as { message: unknown }).message));
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={login}
      className="flex flex-col gap-2 max-w-sm mx-auto mt-10 px-4"
    >
      <div className="text-3xl text-center font-bold">Accedi</div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        className="input w-full"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="input w-full"
      />
      <button type="submit" className="btn btn-outline">
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
