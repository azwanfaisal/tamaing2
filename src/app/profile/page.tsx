"use client";
import { useRef } from "react";
import { useProfile } from "../../context/ProfileContext"; // ✅ Coba pakai path relatif


const ProfilePage = () => {
  const { profilePic, setProfilePic } = useProfile();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setProfilePic(reader.result);
          localStorage.setItem("profilePic", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">My Profile</h2>
        <div className="flex justify-center">
          <img
            src={profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-pink-600 shadow-md object-cover cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
        <p className="mt-4 text-pink-600">Click on the profile picture to change it!</p>
      </div>
    </div>
  );
};

export default ProfilePage;
