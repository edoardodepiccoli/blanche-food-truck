import React, { useState } from "react";
import type { Stop } from "@/types/Stop";
import { createStop } from "@/lib/firestore";
import { format } from "date-fns";

export default function StopForm() {
  const [formData, setFormData] = useState<Stop>({
    name: "",
    date: format(new Date(), "yyyy-MM-dd"),
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
    // TODO: Clean up this duplicated code
    setFormData({
      name: "",
      date: format(new Date(), "yyyy-MM-dd"),
      locationUrl: "",
      groupUrl: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-md mx-auto flex flex-col justify-center gap-2"
    >
      <h1 className="font-bold text-3xl mb-4">Nuova Tappa</h1>

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
