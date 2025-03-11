"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useProfile } from "../context/ProfileContext"; // Import useProfile

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { profilePic } = useProfile(); // Gunakan foto profil dari context
  const router = useRouter();

  // Ref untuk mendeteksi klik di luar dropdown
  const profileRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk menangani klik di luar dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
      setProfileOpen(false);
    }
  };

  // Tambahkan event listener saat komponen dipasang
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-pink-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image src="/o.png" alt="Logo" width={90} height={90} />
          <h1 className="text-xl font-bold">Pinky Boy</h1>
        </div>

        <ul className="hidden md:flex space-x-6">
          <li><Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
          <li><Link href="/tasbeh" className="hover:text-gray-300">Tasbeh Digital</Link></li>
          <li><Link href="/users" className="hover:text-gray-300">User</Link></li>
          <li><Link href="/employees" className="hover:text-gray-300">Karyawan</Link></li>
          <li><Link href="/room" className="hover:text-gray-300">Room</Link></li>
          <li><Link href="/booking" className="hover:text-gray-300">Booking</Link></li>
        </ul>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-2">
            <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white" />
          </button>
          {profileOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white text-pink-600 rounded-lg shadow-lg overflow-hidden">
              <li>
                <button onClick={() => router.push(`/profile`)} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
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
