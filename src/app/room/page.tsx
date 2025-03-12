"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, Edit, Trash2, Filter } from "lucide-react";

interface Room {
  id: number;
  room_name: string;
  type: string;
  price: number;
}

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [newRoom, setNewRoom] = useState<{ room_name: string; type: string; price: number }>(
    { room_name: "", type: "Standard", price: 0 }
  );
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/rooms.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data Rooms:", data);
        setRooms(data);
      })
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  const handleAddRoom = () => {
    if (!newRoom.room_name.trim() || newRoom.price <= 0) {
      toast.error("Nama dan harga harus valid!");
      return;
    }
    const newId = rooms.length ? rooms[rooms.length - 1].id + 1 : 1;
    setRooms([...rooms, { id: newId, ...newRoom }]);
    setNewRoom({ room_name: "", type: "Standard", price: 0 });
    toast.success("Kamar berhasil ditambahkan! 🎉");
  };

  const handleDeleteRoom = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus kamar ini?")) {
      setRooms(rooms.filter((room) => room.id !== id));
      toast.error("Kamar berhasil dihapus! ❌");
    }
  };

  const handleEditRoom = (room: Room) => setEditingRoom(room);

  const filteredRooms = rooms.filter((room) => 
    (room.room_name?.toLowerCase().includes(search.toLowerCase()) || 
      room.type?.toLowerCase().includes(search.toLowerCase())) &&
    (filter ? room.type === filter : true)
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  return (
    <div className="container mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">Room List</h1>

      <div className="bg-pink-600 shadow-md rounded-lg p-4 mb-6">
        <div className="mb-4 flex space-x-2 items-center">
          <input
            type="text"
            placeholder="Search room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border text-pink-600 rounded-lg flex-1"
          />
          <button onClick={() => setShowFilter(!showFilter)} className="bg-white hover:bg-pink-200 text-pink-600 px-4 py-2 rounded-lg flex items-center">
            <Filter size={20} />
          </button>
        </div>
        {showFilter && (
          <div className="mb-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border text-pink-600 rounded-lg w-full"
            >
              <option value="">All Types</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
        )}

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Room Name"
            value={newRoom.room_name}
            onChange={(e) => setNewRoom({ ...newRoom, room_name: e.target.value })}
            className="p-2 border text-pink-600 rounded-lg flex-1"
          />
          <select
            value={newRoom.type}
            onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
            className="p-2 border text-pink-600 rounded-lg"
          >
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={newRoom.price}
            onChange={(e) => setNewRoom({ ...newRoom, price: Number(e.target.value) })}
            className="p-2 border text-pink-600 rounded-lg flex-1"
          />
          <button onClick={handleAddRoom} className="bg-white hover:bg-pink-200 text-pink-600 px-4 py-2 rounded-lg flex items-center">
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-pink-600">
              <th className="py-3 px-6 text-white border-b">ID</th>
              <th className="py-3 px-6 text-white border-b">Room Name</th>
              <th className="py-3 px-6 text-white border-b">Type</th>
              <th className="py-3 px-6 text-white border-b">Price</th>
              <th className="py-3 px-6 text-white border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => (
              <tr key={room.id} className="hover:bg-gray-100">
                <td className="py-3 px-6 border-b">{room.id}</td>
                <td className="py-3 px-6 border-b">{room.room_name}</td>
                <td className="py-3 px-6 border-b">{room.type}</td>
                <td className="py-3 px-6 border-b">Rp{room.price}</td>
                <td className="py-3 px-6 border-b space-x-2 flex">
                  <button onClick={() => handleEditRoom(room)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDeleteRoom(room.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50">Previous</button>
        <span className="px-4 py-1 bg-gray-300 rounded-lg">{currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}
