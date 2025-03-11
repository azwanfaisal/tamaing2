"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<{ name: string; email: string; role: string }>(
    { name: "", email: "", role: "User" }
  );
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/user.json")
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      toast.error("Nama dan email harus valid!");
      return;
    }
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { id: newId, ...newUser }]);
    setNewUser({ name: "", email: "", role: "User" });
    toast.success("User berhasil ditambahkan! 🎉");
  };

  const handleDeleteUser = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      setUsers(users.filter((user) => user.id !== id));
      toast.error("User berhasil dihapus! ❌");
    }
  };

  const handleEditUser = (user: User) => setEditingUser(user);

  const filteredUsers = users.filter((user) =>
    (user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())) &&
    (filter ? user.role === filter : true)
  );

  return (
    <div className="container mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">User List</h1>

      <div className="bg-pink-600 shadow-md rounded-lg p-4 mb-6">
        <div className="mb-4 flex space-x-2 items-center">
          <input
            type="text"
            placeholder="Search user..."
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
              <option value="">All Roles</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        )}

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="p-2 border text-pink-600 rounded-lg flex-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="p-2 border text-pink-600 rounded-lg flex-1"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="p-2 border text-pink-600 rounded-lg"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <button onClick={handleAddUser} className="bg-white hover:bg-pink-200 text-pink-600 px-4 py-2 rounded-lg flex items-center">
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
              <th className="py-3 px-6 text-white border-b">Email</th>
              <th className="py-3 px-6 text-white border-b">Role</th>
              <th className="py-3 px-6 text-white border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-3 px-6 border-b">{user.id}</td>
                <td className="py-3 px-6 border-b">{user.name}</td>
                <td className="py-3 px-6 border-b">{user.email}</td>
                <td className="py-3 px-6 border-b">{user.role}</td>
                <td className="py-3 px-6 border-b space-x-2 flex">
                  <button onClick={() => handleEditUser(user)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg flex items-center">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center">
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
