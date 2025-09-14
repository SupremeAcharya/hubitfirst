import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const Contact = () => {
  // const [formData, setFormData] = useState({});

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };

  // const handleInput = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .max(15, "name must be fifteen characters or less ")
        .required("required"),
      email: yup.string().email("invalid email address").required("required"),
      message: yup
        .string()
        .max(15, "must be fifteen characters or less")
        .required("required"),
    }),
    onSubmit: async (values) => {
      //  handleSignUp();
      // toast.success("successxfull");
      try {
        const response = await fetch(
          "https://api.durlavparajuli.com.np/api/form/contact",
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
          toast.success(data?.msg);
        }
      } catch (error) {}
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col  items-center bg-amber-100 h-screen">
        <div className="flex flex-col w-1/2">
          <label>Name:</label>
          <input
            value={formik.values.name}
            name="name"
            type="text"
            className="border-2 bg-amber-300 rounded-2xl"
            onChange={formik.handleChange}
          ></input>
        </div>
        <div className="flex flex-col w-1/2">
          <label>Email:</label>
          <input
            value={formik.values.email}
            name="email"
            type="text"
            className="border-2 bg-amber-300  rounded-2xl"
            onChange={formik.handleChange}
          ></input>
        </div>
        <div className="flex flex-col w-1/2 ">
          <label>Message:</label>
          <input
            value={formik.values.message}
            type="text"
            name="message"
            className="border-2  bg-amber-300  rounded-2xl"
            onChange={formik.handleChange}
          ></input>
        </div>
        <button className="bg-amber-300 rounded-3xl mt-3 p-3 active:bg-amber-800" type="submit">
          submit
        </button>
      </div>
    </form>
  );
};

export default Contact;
