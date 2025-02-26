"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [newUser, setNewUser] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      fetch("/user.json")
        .then((res) => res.json())
        .then((data: User[]) => {
          setUsers(data);
          localStorage.setItem("users", JSON.stringify(data));
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return alert("Isi semua field!");
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    const updatedUsers = [...users, { id: newId, ...newUser }];
    setUsers(updatedUsers);
    setNewUser({ name: "", email: "" });
    toast.success("User berhasil ditambahkan! 🎉");
  };

  const handleDeleteUser = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    toast.error("User berhasil dihapus! ❌");
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );
    setUsers(updatedUsers);
    setEditingUser(null);
    toast.info("User berhasil diperbarui! ✏️");
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">User List</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
      </div>

      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="p-2 border rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="p-2 border rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
        <button
          onClick={handleAddUser}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-6 border-b">ID</th>
              <th className="py-3 px-6 border-b">Name</th>
              <th className="py-3 px-6 border-b">Email</th>
              <th className="py-3 px-6 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-3 px-6 border-b">{user.id}</td>
                  <td className="py-3 px-6 border-b">
                    {editingUser?.id === user.id ? (
                      <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) =>
                          setEditingUser({ ...editingUser, name: e.target.value })
                        }
                        className="p-1 border rounded"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="py-3 px-6 border-b">
                    {editingUser?.id === user.id ? (
                      <input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) =>
                          setEditingUser({ ...editingUser, email: e.target.value })
                        }
                        className="p-1 border rounded"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="py-3 px-6 border-b space-x-2">
                    {editingUser?.id === user.id ? (
                      <button
                        onClick={handleSaveEdit}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditUser(user)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
