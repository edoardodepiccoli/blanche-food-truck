// StopCard.tsx

import Image from "next/image";
import { Stop } from "@/types/Stop";
import { formatDateItalian } from "@/lib/utils";

type Variant = "primary" | "secondary";

export default function StopCard({
  stop,
  variant = "secondary",
}: {
  stop: Stop;
  variant?: Variant;
}) {
  const isPrimary = variant === "primary";
  const imageSrc = isPrimary ? "/truck-secondary.png" : "/truck-primary.png";
  return (
    <div
      key={stop.id}
      className={`
        card card-side w-full max-w-xl mx-auto my-4 shadow
        ${
          isPrimary
            ? "bg-[#5b4241] text-primary-content"
            : "bg-base-100 border border-base-300"
        }
      `}
    >
      <figure className="pl-4">
        <Image
          src={imageSrc}
          alt="truck"
          width={100}
          height={100}
          className="object-contain w-24 h-24"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-xl">{stop.name}</h2>
        <p>📅 {formatDateItalian(stop.date)}</p>
        <div className="card-actions justify-end">
          <a
            href={stop.locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-sm btn-outline w-full ${
              isPrimary ? "border-white text-white" : "btn-info"
            }`}
          >
            Google Maps
          </a>
          <a
            href={stop.groupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-sm btn-outline w-full ${
              isPrimary ? "border-white text-white" : "btn-success"
            }`}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
