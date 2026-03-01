"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import AddItemForm from "@/components/AddItemForm";
import InventoryList from "@/components/InventoryList";

export default function Home() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        📦 My Inventory
      </h1>
      
      <AddItemForm onAdded={fetchItems} />
      
      {items.length === 0 ? (
        <p className="mt-8 text-center text-gray-500">Belum ada barang di gudang.</p>
      ) : (
        <InventoryList items={items} refresh={fetchItems} />
      )}
    </main>
  );
}