"use client";
import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function InventoryList({ items, refresh }) {
  const handleDelete = async (id) => {
    if (confirm("Hapus barang ini?")) {
      await deleteDoc(doc(db, "products", id));
      refresh();
    }
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-3">Nama Barang</th>
            <th className="p-3 text-center">Stok</th>
            <th className="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{item.name}</td>
              <td className="p-3 text-center font-semibold">{item.qty}</td>
              <td className="p-3 text-right">
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}