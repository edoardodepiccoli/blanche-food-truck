"use client";

import Dashboard from "@/components/admin/Dashboard";
import Link from "next/link";
import LoginForm from "@/components/admin/LoginForm";
import { useAuth } from "@/hooks/useAuth";

export default function Admin() {
  const { user, loading, logout } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <header className="h-12 bg-primary-content px-2 flex justify-between items-center" />
        <main className="flex-1 flex justify-center items-center">
          Loading...
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <header className="h-12 bg-primary-content px-2 flex justify-between items-center">
        <Link href="/" className="btn btn-link">
          Pagina principale
        </Link>
        {user && (
          <button className="btn btn-link" onClick={handleSignOut}>
            Logout
          </button>
        )}
      </header>
      <main className="flex-1">{user ? <Dashboard /> : <LoginForm />}</main>
    </div>
  );
}
