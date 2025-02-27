"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface ProfileContextType {
  profilePic: string;
  setProfilePic: (url: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profilePic, setProfilePic] = useState<string>("/p.jpg");

  // Ambil gambar dari localStorage saat pertama kali load
  useEffect(() => {
    const storedPic = localStorage.getItem("profilePic");
    if (storedPic) setProfilePic(storedPic);
  }, []);

  // Simpan gambar ke localStorage saat diubah
  const updateProfilePic = (url: string) => {
    setProfilePic(url);
    localStorage.setItem("profilePic", url);
  };

  return (
    <ProfileContext.Provider value={{ profilePic, setProfilePic: updateProfilePic }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
};
