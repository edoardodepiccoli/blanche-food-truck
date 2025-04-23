import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div className="relative w-screen max-w-md h-64">
      {/* Fixed‑height background banner */}
      <Image
        src="/hero-bg.png"
        alt="Hero background"
        fill
        className="object-cover"
        quality={100}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[rgba(59,31,27,0.6)]" />
      {/* Logo: half over banner, half over page */}
      <div
        className="
          absolute 
          bottom-0 left-1/2 
          transform 
            -translate-x-1/2 
            translate-y-1/2 
          z-10
        "
      >
        <Image
          src="/logo.png"
          alt="Blanche Pasticceria logo"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
    </div>
  );
}
