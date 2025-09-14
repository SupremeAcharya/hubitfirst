import { useRef } from "react";

const CustomInput = () => {
  const username = useRef();
  const password = useRef();
  const handleSubmit = () => {
    console.log(username.current.value);
    console.log(password.current.value);
  };
  return (
    <div className="w-30">
      <div className="flex flex-col">
        <label htmlFor="">Username</label>
        <input
          ref={username}
          className="border border-black"
          id="username"
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="">Email</label>
        <input
          ref={password}
          className="border border-black"
          id="password"
          type="text"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="border border-black"
        type="submit"
      >
        Save
      </button>
    </div>
  );
};

export default CustomInput;
