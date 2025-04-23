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
      <div className="h-screen flex flex-col">
        <div className="w-full h-12 bg-primary-content px-12 flex justify-between items-center"></div>
        <p className="w-full h-screen flex justify-center items-center">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="w-full h-12 bg-primary-content px-12 flex justify-between items-center">
        <Link href="/">⬅️ Pagina principale</Link>
        {user && (
          <Link href="" onClick={() => handleSignOut()}>
            Logout
          </Link>
        )}
      </div>
      <div className="flex-1 overflow-auto">
        {user ? <Dashboard /> : <LoginForm />}
      </div>
    </div>
  );
}
