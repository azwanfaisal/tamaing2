"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
}

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [newEmployee, setNewEmployee] = useState<{ name: string; position: string; salary: number }>(
    { name: "", position: "Staff", salary: 0 }
  );
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const generatedEmployees = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Employee ${i + 1}`,
      position: i % 2 === 0 ? "Manager" : "Staff",
      salary: (i + 1) * 500000,
    }));
    setEmployees(generatedEmployees);
  }, []);

  const handleAddEmployee = () => {
    if (!newEmployee.name.trim() || newEmployee.salary <= 0) {
      toast.error("Nama dan gaji harus valid!");
      return;
    }
    const newId = employees.length ? employees[employees.length - 1].id + 1 : 1;
    setEmployees([...employees, { id: newId, ...newEmployee }]);
    setNewEmployee({ name: "", position: "Staff", salary: 0 });
    toast.success("Karyawan berhasil ditambahkan! 🎉");
  };

  const handleDeleteEmployee = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus karyawan ini?")) {
      setEmployees(employees.filter((employee) => employee.id !== id));
      toast.error("Karyawan berhasil dihapus! ❌");
    }
  };

  const handleEditEmployee = (employee: Employee) => setEditingEmployee(employee);

  const filteredEmployees = employees.filter((employee) =>
    (employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.position.toLowerCase().includes(search.toLowerCase())) &&
    (filter ? employee.position === filter : true)
  );

  return (
    <div className="container mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">Employee List</h1>

      <div className="bg-pink-600 shadow-md rounded-lg p-4 mb-6">
        <div className="mb-4 flex space-x-2 items-center">
          <input
            type="text"
            placeholder="Search employee..."
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
              <option value="">All Positions</option>
              <option value="Staff">Staff</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
        )}

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            className="p-2 border text-pink-600 rounded-lg flex-1"
          />
          <select
            value={newEmployee.position}
            onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
            className="p-2 border text-pink-600 rounded-lg"
          >
            <option value="Staff">Staff</option>
            <option value="Manager">Manager</option>
          </select>
          <input
            type="number"
            placeholder="Salary"
            value={newEmployee.salary}
            onChange={(e) => setNewEmployee({ ...newEmployee, salary: Number(e.target.value) })}
            className="p-2 border text-pink-600 rounded-lg flex-1"
          />
          <button onClick={handleAddEmployee} className="bg-white hover:bg-pink-200 text-pink-600 px-4 py-2 rounded-lg flex items-center">
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-pink-600">
              <th className="py-3 px-6 text-white border-b">ID</th>
              <th className="py-3 px-6 text-white border-b">Name</th>
              <th className="py-3 px-6 text-white border-b">Position</th>
              <th className="py-3 px-6 text-white border-b">Salary</th>
              <th className="py-3 px-6 text-white border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-100">
                <td className="py-3 px-6 border-b">{employee.id}</td>
                <td className="py-3 px-6 border-b">{employee.name}</td>
                <td className="py-3 px-6 border-b">{employee.position}</td>
                <td className="py-3 px-6 border-b">{employee.salary}</td>
                <td className="py-3 px-6 border-b space-x-2 flex">
                  <button onClick={() => handleEditEmployee(employee)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg flex items-center">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDeleteEmployee(employee.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}