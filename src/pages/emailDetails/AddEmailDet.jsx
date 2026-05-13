import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { createdEmail, getSingleEmail, resetState, updateEmail, } from "../../features/emails/emailSlice";

let Schema = yup.object().shape({
  title: yup.string().required("Email Id is Required"),
});

const AddEmailDet = () => {


  const dispatch = useDispatch();
      const location = useLocation();
      const getEmailId = location.pathname.split("/")[3];
      const navigate = useNavigate();

      const newEmail = useSelector((state) => state?.email);

    const {
      isSuccess,
      isError,
      isLoading,
      doneEmail,
      elTitle,
      updatedEmail,
    } = newEmail;

    useEffect(() => {
      if (getEmailId !== undefined) {
        dispatch(getSingleEmail(getEmailId));
      } else {
        dispatch(resetState());
      }
    }, [getEmailId]);



    useEffect(() => {
      if (isSuccess && doneEmail) {
        toast.success("Data Added Successfullly!");
      }
      if (isSuccess && updatedEmail) {
        toast.success("Data Updated Successfullly!");
        navigate("/admin/email__details__list");
      }
      if (isError) {
        toast.error("Something Went Wrong!");
      }
    }, [isSuccess, isError, isLoading]);

    // formik validation
    const formik = useFormik({
      initialValues: {
        title: elTitle || "",
      },
      validationSchema: Schema,
      onSubmit: (values) => {
        if (getEmailId !== undefined) {
          const data = { id: getEmailId, emailsData: values };
          dispatch(updateEmail(data));
          dispatch(resetState());
        } else {
          dispatch(createdEmail(values));
          formik.resetForm();
          setTimeout(() => {
            dispatch(resetState());
          }, 300);
        }
      },
    });

    return (
        <>
          <div>
          <h3 className="mb-4 title">
            {getEmailId !== undefined ? "Edit" : "Add"} Email
          </h3>
          <div>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex gap-3 flex-column"
            >
              
    
            <CustomInput
            type="email"
            label="Enter Email"
            name="title"
            onCh={formik.handleChange("title")}
            val={formik.values.title}
            onBl={formik.handleBlur("title")}
          />

          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

              <button
                type="submit"
                className="btn btn-success border-0 rounded-3 my-5 w-100"
              >
                {getEmailId !== undefined ? "Edit" : "Add"} Email
              </button>
            </form>
          </div>
        </div>
        </>

    )
}

export default AddEmailDet;