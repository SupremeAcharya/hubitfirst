import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext } from "../context/ContextMine";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { myname, setName } = useContext(MyContext);

  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    setName("hubit@gmail.com");
  }, [setName]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("invalid email address").required("required"),
      password: yup.string().max(15, "must be fifteen characters or less"),
    }),
    // onSubmit: () => {
    //   // handleLogin();
    //   toast.success("successfully logged in");

    // },
    onSubmit: async (values) => {
      //     const formData = new FormData();
      // formData.append("email", values.email);
      // formData.append("password", values.password);

      try {
        const response = await fetch(
          "https://api.durlavparajuli.com.np/api/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );
        const data = await response.json();
        if (response.ok) {
          toast.success(data?.msg || "Registered successfully");
          formik.resetForm();
          localStorage.setItem("token", data?.token);
          setToken(data?.token);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <div className="bg-[#1a0430] text-white flex justify-center items-center h-screen w-screen">
      <form
        className="bg-[#411082] rounded-3xl p-3 h-1/2 w-1/3 flex flex-col justify-around"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <p className="text-3xl">Login Here</p>
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="bg-gray-100 rounded-2xl text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder={myname}
          ></input>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="bg-gray-100 rounded-2xl  text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          ></input>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="flex gap-3">
          <button
            className="px-3 py-1 bg-[rgba(13,110,253,255)] rounded-xl"
            type="submit"
          >
            login
          </button>
          <button
            className="px-3 py-1 bg-[#549a6f] rounded-xl"
            onClick={handleClick}
          >
            register now
          </button>
          {/* <Link to="/register" className="px-3 bg-yellow-100 rounded-3xl">
            register now
          </Link> */}
        </div>
        <div>
          <Link to={"/forgot"}>
            <button className="px-3 py-1 bg-[#dc3545] rounded-xl">
              forgot password
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
