import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [username,setUsername]= useState();
    const [isAdminLogin,setAdminLogin]=useState(false);
   const [isUserLogin,setUserLogin]=useState(false);
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await fetch('https://backend.codeingjudge.online/auth/admin/me', {
          method: 'GET',
          headers: { 'Authorization': `${localStorage.getItem('token')}` }
        });

        const data = await response.json();
        callbackAdmin(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchData2 = async () => {
      try {
        const response = await fetch('https://backend.codeingjudge.online/auth/user/me', {
          method: 'GET',
          headers: { 'Authorization': `${localStorage.getItem('token')}` }
        });

        const data = await response.json();
        callbackUser(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const callbackAdmin = (data) => {
      if (data.username) {
        setUsername(data.username);
        setAdminLogin(true);
      }
    };
    const callbackUser = (data) => {
      if (data.username) {
        setUsername(data.username);
        setUserLogin(true);
      }
    };
    fetchData1();
    fetchData2();
  }, []);
  const loginAdmin = () => {
    setAdminLogin(true);
  };

  const logoutAdmin = () => {
    setAdminLogin(false);
  };
  const loginUser = () => {
    setUserLogin(true);
  };

  const logoutUser = () => {
    setUserLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdminLogin, isUserLogin ,username,loginAdmin,logoutAdmin,logoutUser,loginUser}}>
      {children}
    </AuthContext.Provider>
  );
};
