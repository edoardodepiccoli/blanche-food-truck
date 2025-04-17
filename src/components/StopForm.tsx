import React, { useState } from "react";
import type { Stop } from "@/types/Stop"; // adjust path as needed
import { createStop } from "@/lib/firestore";

export default function StopForm() {
  const [formData, setFormData] = useState<Stop>({
    name: "",
    date: "",
    locationUrl: "",
    groupUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form validation
    console.log("Submitted FormData:", formData);
    // TODO: Implement error handling
    createStop(formData).then(() => console.log("Created Stop!"));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-md mx-auto flex flex-col justify-center gap-2"
    >
      <h1 className="font-bold text-3xl">Nuova Tappa</h1>

      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome della tappa"
          className="w-full input"
        />
      </div>

      <div>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="Data della tappa"
          className="w-full input"
        />
      </div>

      <div>
        <input
          type="text"
          name="locationUrl"
          value={formData.locationUrl}
          onChange={handleChange}
          placeholder="Link Google Maps"
          className="w-full input"
        />
      </div>

      <div>
        <input
          type="text"
          name="groupUrl"
          value={formData.groupUrl}
          onChange={handleChange}
          placeholder="Link gruppo WhatsApp"
          className="w-full input"
        />
      </div>

      <div>
        <button type="submit" className="w-full btn btn-primary">
          Crea Tappa
        </button>
      </div>
    </form>
  );
}
