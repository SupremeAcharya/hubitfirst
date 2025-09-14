import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Users from "./Users";

const Dashboard = () => {
  const { token, isLoggedIn, logout } = useContext(AuthContext);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     logout();
  //   }
  // }, [token]);
  
  return (
    <div className="dashboard flex flex-col w-1/3">
      <Link to="/dashboard/users">Users</Link>
      <Link to="/dashboard/contacts">Contacts</Link>
      <Link to="/dashboard/services">Services</Link>
    </div>
  );
};

export default Dashboard;
