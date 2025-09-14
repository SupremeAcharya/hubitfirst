import React from "react";
import { useFormik } from "formik";

const FormikContact = () => {
  const handleSubmit = (formData) => {
    console.log(formData);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      user: "",
      message: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col  items-center bg-amber-100 h-screen">
        <div className="flex flex-col w-1/2">
          <label>username:</label>
          <input
            value={formik.values.user}
            name="user"
            type="text"
            className="border-2 bg-amber-300 border-amber-400 rounded-2xl"
            onChange={formik.handleChange}
          ></input>
        </div>
        <div className="flex flex-col w-1/2">
          <label>email:</label>
          <input
            value={formik.values.email}
            name="email"
            type="email"
            className="border-2 bg-amber-300 border-amber-400 rounded-2xl"
            onChange={formik.handleChange}
          ></input>
        </div>
        <div className="flex flex-col w-1/2 ">
          <label>message:</label>
          <input
            value={formik.values.message}
            type="text"
            name="message"
            className="border-2 border-amber-300 bg-amber-300  rounded-2xl"
            onChange={formik.handleChange}
          ></input>
        </div>
        <button className="bg-amber-300 rounded-3xl mt-3 p-3">submit</button>
      </div>
    </form>
  );
};

export default FormikContact;
