"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddItemForm({ onAdded }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !qty) return alert("Isi semua data!");

    try {
      await addDoc(collection(db, "products"), {
        name: name,
        qty: Number(qty),
        createdAt: new Date(),
      });
      setName("");
      setQty("");
      onAdded(); // Panggil fungsi refresh list di parent
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
      <h2 className="font-bold text-lg">Tambah Barang Baru</h2>
      <input
        className="p-2 border rounded"
        placeholder="Nama Barang (contoh: Laptop)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="p-2 border rounded"
        type="number"
        placeholder="Jumlah Stok"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />
      <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Simpan Barang</button>
    </form>
  );
}