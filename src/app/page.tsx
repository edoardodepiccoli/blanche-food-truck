import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-auto">
        <Dashboard />
      </div>
    </div>
  );
}
