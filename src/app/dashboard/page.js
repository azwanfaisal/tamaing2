"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Bell, Filter } from "lucide-react";

const dataBookings = [
  { day: "Sen", count: 3 },
  { day: "Sel", count: 5 },
  { day: "Rab", count: 2 },
  { day: "Kam", count: 8 },
  { day: "Jum", count: 6 },
];

const dataRevenue = [
  { day: "Sen", revenue: 500 },
  { day: "Sel", revenue: 700 },
  { day: "Rab", revenue: 400 },
  { day: "Kam", revenue: 1000 },
  { day: "Jum", revenue: 800 },
];

const dataFeedback = [
  { name: "Positif", value: 80 },
  { name: "Negatif", value: 20 },
];

const COLORS = ["#4CAF50", "#FF5733"];
const notifications = [
  "Booking baru diterima",
  "Pembayaran sukses dari pelanggan A",
  "Pelanggan B membatalkan reservasi",
  "Kamar 101 perlu dibersihkan",
];

export default function Dashboard() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600 flex items-center gap-2">
          📊 Dashboard Overview
        </h1>
        <div className="flex gap-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="p-2 border rounded-lg shadow-md"
          />
          <button className="bg-blue-500 text-white p-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold">Total Pengguna</h3>
          <p className="text-3xl">150</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold">Total Kamar</h3>
          <p className="text-3xl">25</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold">Booking Hari Ini</h3>
          <p className="text-3xl">10</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold">Pembayaran Tertunda</h3>
          <p className="text-3xl">5</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-2">📅 Booking Terbaru</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dataBookings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-2">💰 Pendapatan</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dataRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-2">🗣 Umpan Balik</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={dataFeedback} cx="50%" cy="50%" outerRadius={70} fill="#8884d8" dataKey="value">
                {dataFeedback.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          🔔 Notifikasi Terbaru
        </h3>
        <ul>
          {notifications.map((note, index) => (
            <li key={index} className="p-2 border-b last:border-none">{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}