"use client";

import { useSearchParams } from "next/navigation";

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const profilePic = searchParams.get("image") || "/p.jpg"; // Gambar default jika tidak ada

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">My Profile</h2>
        <div className="flex justify-center">
          <img 
            src={profilePic} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-pink-600 shadow-md object-cover"
          />
        </div>
        <p className="mt-4 text-pink-600">Welcome To My Profile Page!!!!</p>
      </div>
    </div>
  );
};

export default ProfilePage;
