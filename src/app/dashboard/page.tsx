"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell, 
  ResponsiveContainer, Legend, CartesianGrid 
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Bell, Filter } from "lucide-react";

interface BookingData {
  day: string;
  count: number;
}

interface RevenueData {
  day: string;
  revenue: number;
}

interface FeedbackData {
  name: string;
  value: number;
}

const dataBookings: BookingData[] = [
  { day: "Sen", count: 3 },
  { day: "Sel", count: 5 },
  { day: "Rab", count: 2 },
  { day: "Kam", count: 8 },
  { day: "Jum", count: 6 },
];

const dataRevenue: RevenueData[] = [
  { day: "Sen", revenue: 500 },
  { day: "Sel", revenue: 700 },
  { day: "Rab", revenue: 400 },
  { day: "Kam", revenue: 1000 },
  { day: "Jum", revenue: 800 },
];

const dataFeedback: FeedbackData[] = [
  { name: "Positif", value: 80 },
  { name: "Negatif", value: 20 },
];

const COLORS: string[] = ["#4CAF50", "#FF5733"];

const notifications: string[] = [
  "Booking baru diterima",
  "Pembayaran sukses dari pelanggan A",
  "Pelanggan B membatalkan reservasi",
  "Kamar 101 perlu dibersihkan",
];

export default function Dashboard() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  // Proteksi halaman
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
          <p>Memeriksa status autentikasi</p>
        </div>
      </div>
    );
  }

 

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600 flex items-center gap-2">
          📊 Dashboard Overview
        </h1>
        <div className="flex gap-4">
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            className="p-2 border rounded-lg shadow-md"
          />
         
          <button className="bg-blue-500 text-white p-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
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
      
      {/* Charts Section */}
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
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-2">🗣 Umpan Balik</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie 
                data={dataFeedback} 
                cx="50%" 
                cy="50%" 
                outerRadius={70} 
                innerRadius={40}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {dataFeedback.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Persentase"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Bell className="text-pink-600" /> Notifikasi Terbaru
          </h3>
          <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
            {notifications.length} Baru
          </span>
        </div>
        <ul className="divide-y">
          {notifications.map((note, index) => (
            <li key={index} className="py-3 px-2 hover:bg-gray-50 transition">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-pink-500 mt-0.5">
                  {index === 0 ? (
                    <span className="inline-flex items-center justify-center h-3 w-3 rounded-full bg-pink-500 animate-pulse"></span>
                  ) : null}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{note}</p>
                  <p className="text-xs text-gray-500">10 menit yang lalu</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}