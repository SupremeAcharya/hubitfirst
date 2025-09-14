import React, { useContext } from "react";
import Comp1 from "../components/Comp1";
import { MyContext } from "../context/ContextMine";
const Home = () => {

  const {myname, setName} = useContext(MyContext);
   setName('hubit');


  return (
        <div className="flex flex-col bg-black w-full h-[100vh] text-green-700 justify-center items-center text-5xl">
            <p><Comp1/></p>
            {/* <p>{myname}</p> */}
        </div>
)    
};

export default Home;
