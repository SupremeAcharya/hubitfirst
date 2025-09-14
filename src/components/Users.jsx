import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Users = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);

  const userdata = async () => {
    try {
      const response = await fetch(
        "https://api.durlavparajuli.com.np/api/admin/users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const res = await response.json();
        setData(res);
      }
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    userdata();
  }, [token]);

  return (
    <div className="p-4">
  <table className="w-full table-auto shadow-lg rounded-2xl overflow-hidden">
    <thead className="bg-black text-white">
      <tr className="text-left">
        <th className="p-3">Image</th>
        <th className="p-3">Username</th>
        <th className="p-3">Email</th>
        <th className="p-3">Phone</th>
        <th className="p-3">Admin</th>
        <th className="p-3">Verified</th>
      </tr>
    </thead>
    <tbody className="text-sm text-gray-800">
      {data?.map((user, index) => (
        <tr
          key={user._id}
          className={`border-b hover:bg-blue-50 ${
            index % 2 === 0 ? "bg-white" : "bg-gray-100"
          }`}
        >
          <td className="p-3">
            <img
              className="h-10 w-10 object-cover rounded-full border border-gray-300"
              src={`https://api.durlavparajuli.com.np/public/${user.image}`}
              alt={`${user.username}`}
            />
          </td>
          <td className="p-3 font-medium">{user.username}</td>
          <td className="p-3">{user.email}</td>
          <td className="p-3">{user.phone}</td>
          <td className="p-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                user.isAdmin ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
              }`}
            >
              {user.isAdmin ? "Yes" : "No"}
            </span>
          </td>
          <td className="p-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                user.isVerified ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {user.isVerified ? "Yes" : "No"}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default Users;



{/* <div>
      <table className="w-full flex flex-col">
        <thead className="flex gap-3 justify-evenly">
          <th className="border-2">image</th>
          <th className="border-2">username</th>
          <th className="border-2">email</th>
          <th className="border-2">phone</th>
          <th className="border-2">is Admin</th>
          <th className="border-2">is Verified</th>
        </thead>
        <tbody className="w-full ">
          {data?.map((user) => (
            <tr key={user._id} className="w-full border-2 flex gap-3 justify-evenly items-start">
              <td className=" "><img className="h-7 w-7 rounded-4xl" src={`https://api.durlavparajuli.com.np/public/${user.image}`}/></td>
              <td className="border-2">{user.username}</td>
              <td className="border-2">{user.email}</td>
              <td className="border-2">{user.phone}</td>
              <td className="border-2">{user.isAdmin ? "Yes" : "No"}</td>
              <td className="border-2">{user.isVerified ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}
