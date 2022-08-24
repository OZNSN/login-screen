import React, { useContext, useState, createContext } from "react";
export const UserContext = createContext();
export const useProfile = () => useContext(UserContext);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    company_name: "",
    msg: "",
    name: "",
    success: true,
  });

  function changeProfile(newProfile) {
    setProfile(newProfile);
  }

  return (
    <UserContext.Provider
      value={{
        profile,
        changeProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
