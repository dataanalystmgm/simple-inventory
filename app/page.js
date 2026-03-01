"use client";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc 
} from "firebase/firestore";

// --- 1. KONFIGURASI FIREBASE ---
// Tempelkan konfigurasi dari Firebase Console kamu di sini
const firebaseConfig = {
  apiKey: "AIzaSyBW3wrWIO3dGvjNvgEoJ7dGCov6xwBgexw",
  authDomain: "inventory-23fd2.firebaseapp.com",
  databaseURL: "https://inventory-23fd2-default-rtdb.firebaseio.com",
  projectId: "inventory-23fd2",
  storageBucket: "inventory-23fd2.firebasestorage.app",
  messagingSenderId: "57860150315",
  appId: "1:57860150315:web:c4b8a970ce978565cec66e",
  measurementId: "G-B7YJDXYVFV"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(true);

  // --- 2. AMBIL DATA (REALTIME) ---
  useEffect(() => {
    const q = query(collection(db, "inventory"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemList = [];
      querySnapshot.forEach((doc) => {
        itemList.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- 3. TAMBAH DATA ---
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (name !== "" && quantity !== "") {
      await addDoc(collection(db, "inventory"), {
        name: name.trim(),
        quantity: parseInt(quantity),
        createdAt: new Date(),
      });
      setName("");
      setQuantity("");
    }
  };

  // --- 4. HAPUS DATA ---
  const handleDeleteItem = async (id) => {
    await deleteDoc(doc(db, "inventory", id));
  };

  return (
    <div className="p-8 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">📦 My Inventory</h1>

      {/* FORM INPUT */}
      <form onSubmit={handleAddItem} className="mb-8 p-4 border rounded shadow-sm bg-gray-50">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nama Barang"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded text-black"
            required
          />
          <input
            type="number"
            placeholder="Jumlah"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 border rounded text-black"
            required
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Tambah Barang
          </button>
        </div>
      </form>

      {/* TABEL DATA */}
      <div className="border rounded overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">Nama</th>
              <th className="p-3">Jumlah</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" className="p-4 text-center">Memuat data...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan="3" className="p-4 text-center text-gray-500">Belum ada barang.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium text-black">{item.name}</td>
                  <td className="p-3 text-black">{item.quantity}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}