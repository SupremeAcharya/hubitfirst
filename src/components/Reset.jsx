import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
// import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const Reset = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  console.log(id);
  console.log(token)

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirm_password: "",
    },
    validationSchema: yup.object({
      newPassword: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(15, "Password must be fifteen characters or less")
        .required("* required"),

        confirm_password: yup
                .string()
                .oneOf([yup.ref("newPassword"), null], "Passwords must match")
                .required("* required"),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          newPassword: values.newPassword,
          resetString: token,
          userId: id,
        };
        const response = await fetch(
          "https://api.durlavparajuli.com.np/api/auth/reset",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const data = await response.json();
        if (response.ok) {
          toast.success(data?.msg || "Registered successfully");
          formik.resetForm();
          navigate("/login");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    },
  });
  return (
    <div className="bg-[#130229] text-white flex justify-center items-center h-screen w-screen">
      <form
        className="bg-[#411082] rounded-3xl p-3 w-fit flex flex-col justify-around"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            name="newPassword"
            className="bg-gray-100 rounded-2xl  text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
          ></input>
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="text-[rgb(255,0,0)]">
              {formik.errors.newPassword}
            </div>
          ) : null}
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            className="bg-gray-100 rounded-2xl text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirm_password}
          ></input>
          {formik.touched.confirm_password && formik.errors.confirm_password ? (
            <div className="text-[rgb(255,0,0)]">{formik.errors.confirm_password}</div>
          ) : null}
          <button
            className="px-3 py-1 my-3 bg-[rgba(13,110,253,255)] rounded-xl"
            type="submit"
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reset;
