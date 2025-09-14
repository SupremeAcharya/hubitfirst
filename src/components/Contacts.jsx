import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Contacts = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState(true);
  const { token , user } = useContext(AuthContext);
  console.log(user)
  const handleDelete = async (id) => {
    const confirm = window.confirm("are you sure to delete this contact");
    if(!confirm) return;
    try {
      const response = await fetch(
        `https://api.durlavparajuli.com.np/api/admin/contacts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        // setState(!state);
        userdata();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userdata = async () => {
    try {
      const response = await fetch(
        "https://api.durlavparajuli.com.np/api/admin/contacts",
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
        console.log(data);
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    userdata();
  }, []);

  return (
    <div className="p-4">
      <table className="w-full table-auto shadow-lg rounded-2xl overflow-hidden">
        <thead className="bg-black text-white">
          <tr className="text-left">
            <th className="p-3">User Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Message</th>
            <th className="p-3">Action</th>
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
              {/* <td className="p-3">
            <img
              className="h-10 w-10 object-cover rounded-full border border-gray-300"
              src={`https://api.durlavparajuli.com.np/public/${user.image}`}
              alt={`${user.username}`}
            />
          </td> */}
              <td className="p-3 font-medium">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.message}</td>
              <td className="p-1">
                <button
                  className="px-3 py-2 bg-red-600 rounded-3xl"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
