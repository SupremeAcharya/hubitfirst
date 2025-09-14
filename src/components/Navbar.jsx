import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, isLoggedIn, user } = useContext(AuthContext);
  //   const navigate = useNavigate();
  //   const handleClick = () => {
  //     navigate("/service");
  //   };
  return (
    <ul className="bg-black flex text-white py-5 gap-5 px-4 justify-end sticky top-0">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/service">Service</Link>
      </li>

      {isLoggedIn ? (
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <button onClick={logout}>logout</button>
          </li>
          <li className="ml-5">
            <Link to="/profile/details">
            <img
              className="h-7 w-7 object-cover rounded-full border border-gray-300"
              src={`https://api.durlavparajuli.com.np/public/${user.image}`}
              alt={`${user.username}`}
            />
            </Link>
          </li>
            <Link to="/profile/details">{user.username}</Link>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/reset">reset</Link>
          </li>
        </>
      )}

      {/* <button onClick={handleClick}>Hi</button> */}
    </ul>
  );
};

export default Navbar;
