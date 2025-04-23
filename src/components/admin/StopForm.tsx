import React, { useEffect, useState } from "react";
import { createStop, updateStop } from "@/lib/firestore";

import { Stop } from "@/types/Stop";
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

  useEffect(() => {
    if (editingStop) {
      setFormData(editingStop);
    } else {
      setFormData({
        name: "",
        date: format(new Date(), "yyyy-MM-dd"),
        locationUrl: "",
        groupUrl: "",
      });
    }
  }, [editingStop]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStop && editingStop.id) {
      await updateStop(editingStop.id, formData);
    } else {
      await createStop(formData);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl text-center">
        {editingStop && editingStop.id ? "Modifica Tappa" : "Nuova Tappa"}
      </h1>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nome della tappa"
        className="w-full input"
      />

      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full input"
      />

      <input
        name="locationUrl"
        value={formData.locationUrl}
        onChange={handleChange}
        placeholder="Link Google Maps"
        className="w-full input"
      />

      <input
        name="groupUrl"
        value={formData.groupUrl}
        onChange={handleChange}
        placeholder="Link gruppo WhatsApp"
        className="w-full input"
      />

      <button type="submit" className="btn btn-primary w-full">
        {editingStop && editingStop.id ? "Salva Modifica" : "Crea Tappa"}
      </button>

      {editingStop && editingStop.id && (
        <button
          type="button"
          className="btn btn-outline w-full"
          onClick={() => setEditingStop(null)}
        >
          Annulla
        </button>
      )}
    </form>
  );
}
