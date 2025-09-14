import React, { createContext, useState } from "react";

export const MyContext = createContext();

const ContextMine = ({children}) => {
  const [myname, setName] = useState("supreme");
  return (
    <div>
      <MyContext.Provider value={{ myname, setName }}>
        {children}
      </MyContext.Provider>
    </div>
  );
};

export default ContextMine;
