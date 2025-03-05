"use client";

import { useState } from "react";
import { useEmployeeStore, Employee } from "../store/employeeStore";
import EmployeeForm from "../components/EmployeeForm";

export default function EmployeeTable() {
  const { employees, removeEmployee } = useEmployeeStore();
  const [search, setSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Cari karyawan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={() => { setEditEmployee(null); setModalOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Tambah Karyawan
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nama</th>
            <th className="border p-2">Jabatan</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id} className="text-center">
              <td className="border p-2">{emp.name}</td>
              <td className="border p-2">{emp.position}</td>
              <td className="border p-2">{emp.status ? "Aktif" : "Tidak Aktif"}</td>
              <td className="border p-2">
                <button onClick={() => { setEditEmployee(emp); setModalOpen(true); }} className="bg-yellow-500 text-white px-3 py-1 rounded mx-1">
                  Edit
                </button>
                <button onClick={() => removeEmployee(emp.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <EmployeeForm
          employee={editEmployee ?? undefined}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
