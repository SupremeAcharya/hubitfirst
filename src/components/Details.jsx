import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Details = () => {
  const { token, user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="flex flex-col  bg-gray-900 text-green-600 w-1/3 p-6 rounded-lg shadow-lg">
        <div className="flex ">
            <img
              className="h-9 w-9 object-cover rounded-full border border-gray-300"
              src={`https://api.durlavparajuli.com.np/public/${user.image}`}
              alt={`${user.username}`}
            />
            <h2 className="text-xl font-semibold mb-4 ml-2">Profile Details</h2>
        </div>

      <div className="flex ml-5 gap-2 w-full mb-2">
        <div className="font-medium">Username :</div>
        <div>{user.username}</div>
      </div>

      <div className="flex ml-5 gap-2 w-full mb-2">
        <div className="font-medium">Email :</div>
        <div>{user.email}</div>
      </div>

      <div className="flex ml-5 gap-2 w-full mb-2">
        <div className="font-medium">Phone :</div>
        <div>{user.phone}</div>
      </div>

      <div className="flex ml-5 gap-2 w-full mb-2">
        <div className="font-medium">Subscription :</div>
        <div>gjghu</div>
      </div>
    </div>
  );
};

export default Details;
