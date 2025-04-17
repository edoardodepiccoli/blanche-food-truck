import React, { useEffect, useState } from "react";
import type { Stop } from "@/types/Stop";
import { createStop, updateStop } from "@/lib/firestore";
import { format } from "date-fns";

type Props = {
  editingStop: Stop | null;
  setEditingStop: (stop: Stop | null) => void;
};

export default function StopForm({ editingStop, setEditingStop }: Props) {
  const [formData, setFormData] = useState<Stop>(
    editingStop || {
      name: "",
      date: format(new Date(), "yyyy-MM-dd"),
      locationUrl: "",
      groupUrl: "",
    }
  );

  // Change stop that is being edited when clicking on another stop's edit button
  useEffect(() => {
    if (editingStop) {
      setFormData(editingStop);
    }
  }, [editingStop]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form validation and error handling

    // NOTE: If the editing stop is somewhat present but not from the database,
    // then we are not editing, but creating it. Let's check for the id then.
    if (editingStop && editingStop.id) {
      await updateStop(editingStop.id, {
        name: formData.name,
        date: formData.date,
        locationUrl: formData.locationUrl,
        groupUrl: formData.groupUrl,
      });
      console.log("Updated Stop!");
    } else {
      await createStop(formData);
      console.log("Created Stop!");
    }

    setFormData({
      name: "",
      date: format(new Date(), "yyyy-MM-dd"),
      locationUrl: "",
      groupUrl: "",
    });

    setEditingStop(null);
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
        <button type="submit" className="w-full btn btn-primary mb-2">
          {editingStop && editingStop.id ? "Modifica Tappa" : "Crea Tappa"}
        </button>
        {editingStop && editingStop.id && (
          <button
            className="w-full btn btn-outline"
            onClick={() => {
              setEditingStop(null);
              setFormData({
                name: "",
                date: format(new Date(), "yyyy-MM-dd"),
                locationUrl: "",
                groupUrl: "",
              });
            }}
          >
            Annulla Modifica
          </button>
        )}
      </div>
    </form>
  );
}
