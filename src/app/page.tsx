import Hero from "@/components/Hero";
import StopsList from "@/components/StopsList";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Hero />
      <StopsList />
    </div>
  );
}
