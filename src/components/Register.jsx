import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

const Register = () => {
  const [captchaValue, setCaptchaValue] = useState(null);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone: "",
      username: "",
      confirm_password: "",
      image: "null",
    },
    validationSchema: yup.object({
      username: yup.string().min(3).required("* required"),
      email: yup.string().email().required("* required"),
      phone: yup.string().matches(/^[0-9]{10}$/).required("* required"),
      password: yup.string().min(6).max(15).required("* required"),
      confirm_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("* required"),
      image: yup
        .mixed()
        .nullable()
        .test("fileSize", "File too large", value =>
          !value || value.size <= 5 * 1024 * 1024
        )
        .test("fileType", "Unsupported File Format", value =>
          !value || ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        ),
    }),
    

    onSubmit: async (values) => {
      if (!captchaValue) {
        toast.error("Please complete the reCAPTCHA");
        return;
      }


      const formData = new FormData();
  formData.append("username", values.username);
  formData.append("email", values.email);
  formData.append("phone", values.phone);
  formData.append("password", values.password);
  if (values.image) formData.append("image", values.image);


      try {

        const response = await fetch(
          "https://api.durlavparajuli.com.np/api/auth/register",
          {
            method: "post",
            body: formData,
          }
        );
        const data = await response.json();
        if (response.ok) {
          toast.success(data?.msg || "Registered successfully");
          formik.resetForm();
          setCaptchaValue(null);
          navigate("/login");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("error:", error);
      }
    },
  });

  return (
    <div className="bg-[#130229] text-white flex justify-center items-center h-screen w-screen">
      <form
        className="bg-[#411082] rounded-3xl p-3 w-fit flex flex-col justify-around"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <p className="text-3xl">Register Now</p>
        </div>
        <div className="flex flex-col my-1">
          <label>User Name</label>
          <input
            type="text"
            name="username"
            className="bg-gray-100 rounded-2xl  text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          ></input>
          {formik.touched.username && formik.errors.username ? (
            <div className="text-[rgb(255,0,0)]">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="flex flex-col my-1">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="bg-gray-100 rounded-2xl  text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          ></input>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-[rgb(255,0,0)]">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="flex flex-col my-1">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            className="bg-gray-100 rounded-2xl text-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          ></input>
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-[rgb(255,0,0)]">{formik.errors.phone}</div>
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
            <div className="text-[rgb(255,0,0)]">{formik.errors.password}</div>
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
            <div className="text-[rgb(255,0,0)]">
              {formik.errors.confirm_password}
            </div>
          ) : null}
          <div className="flex flex-col my-1">
  <label>Profile Picture</label>
  <input
    type="file"
    name="image"
    accept="image/*"
    onChange={(event) => {
      formik.setFieldValue("image", event.currentTarget.files[0]);
    }}    
    className="bg-gray-100 rounded-2xl text-black"
  />
  {formik.errors.image && (
    <div className="text-[rgb(255,0,0)]">{formik.errors.image}</div>
  )}
</div>

        </div>
        <div className="flex gap-3 my-3 justify-center">
          <div className="my-3">
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={(value) => setCaptchaValue(value)}
            />
          </div>
          <div className="flex gap-3 justify-center items-center">
            <div>
              <button
                className="px-3 py-1 bg-[#0c933b] rounded-xl"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <div>
              <Link to={"/login"}>
                <button
                  className="px-3 py-1 bg-[rgba(13,110,253,255)] rounded-xl"
                >
                  login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
