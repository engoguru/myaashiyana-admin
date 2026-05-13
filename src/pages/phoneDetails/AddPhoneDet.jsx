import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { createPhone, getSinglePhone, resetState, updatePhone } from "../../features/phone/phoneSlice";

let Schema = yup.object().shape({
  title: yup.string().required("Phone Number is Required"),
});

const AddPhoneDet = () => {

      const dispatch = useDispatch();
      const location = useLocation();
      const getPhId = location.pathname.split("/")[3];
      const navigate = useNavigate();

      const newPhone = useSelector((state) => state?.phone);

    const {
      isSuccess,
      isError,
      isLoading,
      donePhone,
      phTitle,
      updatedPhone,
    } = newPhone;

    useEffect(() => {
      if (getPhId !== undefined) {
        dispatch(getSinglePhone(getPhId));
      } else {
        dispatch(resetState());
      }
    }, [getPhId]);



    useEffect(() => {
      if (isSuccess && donePhone) {
        toast.success("Data Added Successfullly!");
      }
      if (isSuccess && updatedPhone) {
        toast.success("Data Updated Successfullly!");
        navigate("/admin/phone__details__list");
      }
      if (isError) {
        toast.error("Something Went Wrong!");
      }
    }, [isSuccess, isError, isLoading]);

    // formik validation
    const formik = useFormik({
      initialValues: {
        title: phTitle || "",
      },
      validationSchema: Schema,
      onSubmit: (values) => {
        if (getPhId !== undefined) {
          const data = { id: getPhId, phonesData: values };
          dispatch(updatePhone(data));
          dispatch(resetState());
        } else {
          dispatch(createPhone(values));
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
            {getPhId !== undefined ? "Edit" : "Add"} Phone
          </h3>
          <div>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex gap-3 flex-column"
            >
              
    
            <CustomInput
            type="number"
            label="Enter Phone"
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
                {getPhId !== undefined ? "Edit" : "Add"} Phone
              </button>
            </form>
          </div>
        </div>
        </>
  )
}


export default AddPhoneDet;