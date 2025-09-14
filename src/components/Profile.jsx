import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { logout, isLoggedIn, Users } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      logout();
    }
  }, []);
  return (
    <div className=" flex flex-col w-1/2  text-xl">
      <Link to="/profile/edit">Edit Profile</Link>
      <Link to="/profile/change">Change Password</Link>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Profile;
