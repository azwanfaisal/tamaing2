"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, Edit, Trash2, Filter } from "lucide-react";

interface Booking {
  id: number;
  customer: string;
  room: string;
  checkIn: string;
  checkOut: string;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [newBooking, setNewBooking] = useState<{ customer: string; room: string; checkIn: string; checkOut: string }>(
    { customer: "", room: "", checkIn: "", checkOut: "" }
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false); // state to control the modal visibility
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/booking.json")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch(() => toast.error("Gagal mengambil data!"));
  }, []);

  const handleAddBooking = () => {
    if (!newBooking.customer.trim() || !newBooking.room.trim() || !newBooking.checkIn || !newBooking.checkOut) {
      toast.error("Semua field harus diisi!");
      return;
    }
    const newId = bookings.length ? bookings[bookings.length - 1].id + 1 : 1;
    setBookings([...bookings, { id: newId, ...newBooking }]);
    setNewBooking({ customer: "", room: "", checkIn: "", checkOut: "" });
    toast.success("Booking berhasil ditambahkan! 🎉");
    setShowModal(false); // close the modal after adding the booking
  };

  const handleDeleteBooking = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus booking ini?")) {
      setBookings(bookings.filter((booking) => booking.id !== id));
      toast.error("Booking berhasil dihapus! ❌");
    }
  };

  const filteredBookings = bookings.filter((booking) => 
    booking.customer.toLowerCase().includes(search.toLowerCase()) || 
    booking.room.toLowerCase().includes(search.toLowerCase())
  );
  
  const filteredAndPaginatedBookings = filteredBookings.filter((booking) =>
    filter ? booking.room.toLowerCase().includes(filter.toLowerCase()) : true
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredAndPaginatedBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndPaginatedBookings.length / itemsPerPage);

  return (
    <div className="container mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">Booking List</h1>

      <div className="bg-pink-600 shadow-md rounded-lg p-4 mb-6">
        <div className="mb-4 flex space-x-2 items-center">
          <input
            type="text"
            placeholder="Search booking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border text-pink-600 rounded-lg flex-1"
          />
          <button onClick={() => setShowFilter(!showFilter)} className="bg-white hover:bg-pink-200 text-pink-600 px-4 py-2 rounded-lg flex items-center">
            <Filter size={20} />
          </button>
        </div>

        {showFilter && (
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border text-pink-600 rounded-lg w-full mb-4"
          >
            <option value="">Semua Room</option>
            {[...new Set(bookings.map((b) => b.room))].map((room) => (
              <option key={room} value={room}>{room}</option>
            ))}
          </select>
        )}

        {/* Add Booking Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-white hover:bg-pink-200 text-pink-600 px-4 py-2 rounded-lg flex items-center"
          >
            <Plus size={20} />
            Add Booking
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-pink-600">
              <th className="py-3 px-6 text-white border-b">ID</th>
              <th className="py-3 px-6 text-white border-b">Customer</th>
              <th className="py-3 px-6 text-white border-b">Room</th>
              <th className="py-3 px-6 text-white border-b">Check-In</th>
              <th className="py-3 px-6 text-white border-b">Check-Out</th>
              <th className="py-3 px-6 text-white border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-100">
                <td className="py-3 px-6 border-b">{booking.id}</td>
                <td className="py-3 px-6 border-b">{booking.customer}</td>
                <td className="py-3 px-6 border-b">{booking.room}</td>
                <td className="py-3 px-6 border-b">{booking.checkIn}</td>
                <td className="py-3 px-6 border-b">{booking.checkOut}</td>
                <td className="py-3 px-6 border-b space-x-2 flex">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg flex items-center">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDeleteBooking(booking.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50">Previous</button>
        <span className="px-4 py-1 bg-gray-300 rounded-lg">{currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50">Next</button>
      </div>

      {/* Add Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Booking</h2>
            <input
              type="text"
              placeholder="Customer Name"
              value={newBooking.customer}
              onChange={(e) => setNewBooking({ ...newBooking, customer: e.target.value })}
              className="p-2 border text-pink-600 rounded-lg mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Room"
              value={newBooking.room}
              onChange={(e) => setNewBooking({ ...newBooking, room: e.target.value })}
              className="p-2 border text-pink-600 rounded-lg mb-4 w-full"
            />
            <input
              type="date"
              value={newBooking.checkIn}
              onChange={(e) => setNewBooking({ ...newBooking, checkIn: e.target.value })}
              className="p-2 border text-pink-600 rounded-lg mb-4 w-full"
            />
            <input
              type="date"
              value={newBooking.checkOut}
              onChange={(e) => setNewBooking({ ...newBooking, checkOut: e.target.value })}
              className="p-2 border text-pink-600 rounded-lg mb-4 w-full"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBooking}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg"
              >
                Add Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
