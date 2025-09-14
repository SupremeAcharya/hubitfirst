import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Forgot = () => {
  

  const navigate = useNavigate();

  const goToResetPage = () => {
    const id = "68145562595bb62597d6982e";
    const token = "d067c0c2-3add-4b2a-877f-0d8c5e04093968145562595bb62597d6982e";
    navigate(`/reset?id=${id}&token=${token}`);
  };


  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("invalid email address").required("required"),
    }),
    onSubmit: async (values) => {
          //  handleSignUp();
          // toast.success("successxfull");
          try {
            const response = await fetch(
              "https://api.durlavparajuli.com.np/api/auth/forgot",
              {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }
            );
            const data = await response.json();
            if (response.ok) {
              formik.resetForm();
              toast.success(data.message);
              goToResetPage();
            }else {
              toast.error(data.message)
            }
          } catch (error) {}
        },
  });

  return (
    <div className="bg-[#1a0430] text-white flex justify-center items-center h-screen w-screen">
      <form
        className="bg-[#411082] rounded-3xl p-3 h-1/2 w-1/3 flex flex-col"
        onSubmit={formik.handleSubmit} >
          <div>
          <p className="text-3xl">Forgot Password</p>
        </div>
        <div className="flex flex-col my-5">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          className="bg-gray-100 rounded-2xl text-black"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        ></input>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-600">{formik.errors.email}</div>
        ) : null}
        <div className="flex gap-3 my-5 justify-center">
          <button className="px-3 py-1 bg-[rgba(13,110,253,255)] rounded-xl" type="submit">
            Send Verification Email
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forgot;
