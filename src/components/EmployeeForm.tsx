"use client";

import { useState } from "react";
import { useEmployeeStore, Employee } from "../store/employeeStore";

interface EmployeeFormProps {
  employee?: Employee;
  onClose: () => void;
}

export default function EmployeeForm({ employee, onClose }: EmployeeFormProps) {
  const { addEmployee, updateEmployee } = useEmployeeStore();
  const [formData, setFormData] = useState<Employee>(
    employee || { id: Date.now(), name: "", position: "", status: true }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "status" ? value === "true" : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employee) {
      updateEmployee(formData);
    } else {
      addEmployee(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl mb-4">{employee ? "Edit Karyawan" : "Tambah Karyawan"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama"
            className="border p-2 w-full mb-2 rounded"
            required
          />
         <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
            required
            >
            <option value="">Pilih Jabatan</option>
            <option value="Manager">Manager</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Kasir">Kasir</option>
            <option value="Pelayan">Pelayan</option>
            <option value="Koki">Koki</option>
            </select>
          <select
            name="status"
            value={formData.status.toString()}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="true">Aktif</option>
            <option value="false">Tidak Aktif</option>
          </select>
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Batal</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
