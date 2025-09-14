import React from "react";
import { useState, useEffect } from "react";
import HomePage from "../components/HomePage";
import Comp1 from "../components/Comp1";
import Comp2 from "../components/Comp2";
import Comp3 from "../components/Comp3";
import Navbar from "../components/Navbar";
const Service = () => {
  const [counter, setCounter] = useState("home");
  const [data, setData] = useState();
  const [rand, setRand] = useState(0);
  const FetchData = async () => {
    try {
      const response = await fetch(
        "https://api.durlavparajuli.com.np/api/data/service",
        {
          method: "GET",
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
    FetchData();
  }, []);

  console.log(data);

  function handleClick() {
    // setCounter(counter+1);
    setRand(Math.floor(Math.random() * 100));
    setCounter(counter + 1);
  }

  function handleHome() {
    setCounter("home");
  }
  function handleContact() {
    setCounter("contact");
  }
  return (
    <>
      <div className="bg-[rgb(215,216,186)] flex flex-wrap justify-center items-center h-screen w-screen gap-5 p-3 overflow-auto">
        {data?.map((name, index) => (
          <div
            className=" h-1/2 w-1/4 p-auto bg-amber-100 text-center rounded-4xl"
            key={name._id}
          >
            <div className="p-3  rounded-t-4xl">
              <div className="flex mx-auto my-3 bg-[rgb(223,179,103)] h-30 w-30 rounded-full items-center justify-center">
                <div>logo</div>
              </div>
              <div>{name.service}</div>
              <div>{name.description}</div>
            </div>
            <div>
              <div>{name.provider}</div>
              <div>{name.price}</div>
            </div>
          </div>
        ))}
        {/* <div className=" flex flex-col justify-evenly bg-amber-100 h-1/2 w-auto  text-3xl rounded-4xl " key={index}>
        <HomePage/>
        {data ==0 && <Comp1/>}
          {data==1 && <Comp2/>}
          {data==3 && <Comp3/>}
        <div className="flex gap-5 justify-center p-3">
        <button className=" bg-amber-200 hover:bg-amber-400 rounded-4xl p-5 cursor-pointer active:bg-amber-600 active:opacity-85" onClick={handleHome}>
          Home
        </button>
        <button className=" bg-amber-200 hover:bg-amber-400 rounded-4xl p-5 cursor-pointer
        active:bg-amber-600 active:opacity-85 " onClick={handleContact}>
          contact
        </button>
        </div >
        <div className="flex justify-center">
          {counter == "home" && <Comp1 />}
          {counter == "contact" && <Comp2 />}
        </div>
        </div> */}
      </div>
    </>
  );
};

export default Service;
