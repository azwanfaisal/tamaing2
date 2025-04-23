// components/Navbar.tsx
'use client'

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useProfile } from "../context/ProfileContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { profilePic } = useProfile();
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, logout } = useAuth();

  

  function handleClickOutside(event: MouseEvent) {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
      setProfileOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fallback image jika profilePic tidak ada
  const displayProfilePic = profilePic || '/default-profile.png';
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-pink-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo dan Brand */}
        <div className="flex items-center space-x-3">
          <Image src="/o.png" alt="Logo" width={90} height={90} />
          <h1 className="text-xl font-bold">Pinky Boy</h1>
        </div>

        {/* Desktop Menu */}
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
          <button 
            onClick={() => setProfileOpen(!profileOpen)} 
            className="flex items-center space-x-2 focus:outline-none"
            aria-label="Profile menu"
          >
            <img 
              src={displayProfilePic} 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-profile.png'
              }}
            />
          </button>
          
          {profileOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white text-pink-600 rounded-lg shadow-lg overflow-hidden z-50">
              <li>
                <button 
                  onClick={() => {
                    router.push('/profile')
                    setProfileOpen(false)
                  }} 
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Profile
                </button>
              </li>
              <li>
                <button 
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-pink-700 mt-2 p-4 rounded-lg">
          <ul className="space-y-3">
            <li><Link href="/dashboard" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
            <li><Link href="/tasbeh" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Tasbeh Digital</Link></li>
            <li><Link href="/users" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>User</Link></li>
            <li><Link href="/employees" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Karyawan</Link></li>
            <li><Link href="/room" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Room</Link></li>
            <li><Link href="/booking" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Booking</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;