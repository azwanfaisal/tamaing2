"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  // URL gambar profil (bisa diganti dengan data dari API)
  const profilePic = "/p.jpg"; 

  const router = useRouter();

  return (
    <nav className="bg-pink-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image src="/z.jpg" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold">Pinky Boy</h1>
        </div>

        <ul className="hidden md:flex space-x-6">
          <li><Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
          <li><Link href="/users" className="hover:text-gray-300">User</Link></li>
          <li><Link href="/room" className="hover:text-gray-300">Room</Link></li>
          <li className="relative group">
            <button className="hover:text-gray-300">Transaction ▼</button>
            <ul className="absolute hidden group-hover:block bg-blue-700 mt-2 w-40">
              <li><Link href="/transaction/booking" className="block px-4 py-2 hover:bg-blue-800">Booking</Link></li>
            </ul>
          </li>
        </ul>

        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-2">
            <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white" />
          </button>
          {profileOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white text-pink-600 rounded-lg shadow-lg overflow-hidden">
              <li>
                <button onClick={() => router.push(`/profile?image=${profilePic}`)} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                  Profile
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
              </li>
            </ul>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>☰</button>
      </div>
    </nav>
  );
};

export default Navbar;