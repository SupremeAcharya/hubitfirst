import React, { useEffect, useContext } from 'react'
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";




const EditProfile= () => {
    
    const { id } = useParams();
    const { token , user } = useContext(AuthContext);
    const navigate= useNavigate();
    

    const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      image: "null",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Description is required"),
      email: Yup.string().email("invalid email address").required("required"),
      phone: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be positive")
        .required("Price is required"),
        image: Yup
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

        const formData = new FormData();
  formData.append("username", values.username);
  formData.append("phone", values.phone);
  formData.append("email", values.email);
  if (values.image) formData.append("image", values.image);


      try {
        const response = await fetch(
          `https://api.durlavparajuli.com.np/api/auth/edit-profile/${id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
            const data = await response.json();
        if (response.ok) {
          toast.success("Profile updated successfully!" || data.message);
          const data = await response.json();
          formik.setValues({
            username: data.username || "",
            email: data.email || "",
            phone: data.phone || "",
          });
          // navigate('/dashboard/services');
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Update error:", error);
        toast.error("Update error:", error);
      }
    },
    enableReinitialize: true, // to allow refetching values
  });
  

    // const handleEdit = async () => {
    //     try {

    //         const response = await fetch(
    //             `https://api.durlavparajuli.com.np/api/admin/service/${id}`,
    //             {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             }
    //         );
    //         if (response.ok) {
    //             const res = await response.json();
        
    //         }
    //         } catch (error) {
    //         console.log(error);
    //         }
    // };

    // const fetchService = async () => {
    //   try {
    //     const response = await fetch(
    //       `https://api.durlavparajuli.com.np/api/admin/service/${id}`,
    //       {
    //         method: "GET",
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     if (response.ok) {
    //       const data = await response.json();
    //       formik.setValues({
    //         description: data.description || "",
    //         service: data.service || "",
    //         provider: data.provider || "",
    //         price: data.price || "",
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Fetch error:", error);
    //     toast.error("Fetch error:", error);
    //   }
    // };

    // useEffect(()=>{
    //     fetchService();
    // },[token]);
    
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col items-center bg-black text-white min-h-screen py-10">
        <h2 className="text-3xl font-bold mb-6">Update Profile</h2>

        <div className="flex flex-col w-1/2 mb-4">
          <label>username:</label>
          <input
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            className="p-3 border-2 rounded-xl text-black bg-white"
          />
          {formik.errors.username && (
            <span className="text-red-500 text-sm">{formik.errors.username}</span>
          )}
        </div>

        <div className="flex flex-col w-1/2 mb-4">
          <label>email:</label>
          <input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="p-3 border-2 rounded-xl text-black bg-white"
          />
          {formik.errors.email && (
            <span className="text-red-500 text-sm">{formik.errors.email}</span>
          )}
        </div>

        {/* <div className="flex flex-col w-1/2 mb-4">
          <label>Provider:</label>
          <input
            name="provider"
            value={formik.values.provider}
            onChange={formik.handleChange}
            className="p-3 border-2 rounded-xl text-black bg-white"
          />
          {formik.errors.provider && (
            <span className="text-red-500 text-sm">{formik.errors.provider}</span>
          )}
        </div> */}

        <div className="flex flex-col w-1/2 mb-4">
          <label>Phone:</label>
          <input
            name="phone"
            value={formik.values.p}
            onChange={formik.handleChange}
            className="p-3 border-2 rounded-xl text-black bg-white"
          />
          {formik.errors.phone && (
            <span className="text-red-500 text-sm">{formik.errors.phone}</span>
          )}
        </div>
        <div className="flex flex-col w-1/2 mb-4">
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

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full mt-4 text-white"
        >
          Update
        </button>
      </div>
    </form>
  )
}

export default EditProfile;