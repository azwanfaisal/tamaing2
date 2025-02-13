"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

const dataBookings = [
  { day: "Mon", count: 3 },
  { day: "Tue", count: 5 },
  { day: "Wed", count: 2 },
  { day: "Thu", count: 8 },
  { day: "Fri", count: 6 },
];

const dataRevenue = [
  { day: "Mon", revenue: 500 },
  { day: "Tue", revenue: 700 },
  { day: "Wed", revenue: 400 },
  { day: "Thu", revenue: 1000 },
  { day: "Fri", revenue: 800 },
];

const dataFeedback = [
  { name: "Positive", value: 80 },
  { name: "Negative", value: 20 },
];

const COLORS = ["#4CAF50", "#FF5733"];

export default function Dashboard() {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">Dashboard Overview</h1>
      {/* Kotak Data */}
      <div className="grid grid-cols-1 md-grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
          <h3 className="text-xl font-bold">Total Users</h3>
          <p className="text-3xl">150</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
          <h3 className="text-xl font-bold">Total Rooms</h3>
          <p className="text-3xl">25</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
          <h3 className="text-xl font-bold">Bookings Today</h3>
          <p className="text-3xl">10</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
          <h3 className="text-xl font-bold">Pending Payments</h3>
          <p className="text-3xl">5</p>
        </div>
      </div>

      {/* Cart dengan Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
          <h3 className="text-lg font-bold mb-2 text-gray-700">Recent Bookings</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dataBookings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fill: "#4B5563" }} />
              <YAxis tick={{ fill: "#4B5563" }} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
          <h3 className="text-lg font-bold mb-2 text-gray-700">Revenue</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dataRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fill: "#4B5563" }} />
              <YAxis tick={{ fill: "#4B5563" }} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
          <h3 className="text-lg font-bold mb-2 text-gray-700">Customer Feedback</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={dataFeedback} cx="50%" cy="50%" outerRadius={70} fill="#8884d8" dataKey="value" label>
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
    </div>
  );
}
