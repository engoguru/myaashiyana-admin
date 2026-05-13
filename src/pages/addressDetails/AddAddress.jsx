import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { createAddress, getSingleAddress, resetState, updateAddress } from "../../features/addressed/addressSlice";


let Schema = yup.object().shape({
  title: yup.string().required("Address is Required"),
});

const AddAddress = () => {

      const dispatch = useDispatch();
      const location = useLocation();
      const getAddId = location.pathname.split("/")[3];
      const navigate = useNavigate();

      const newAddress = useSelector((state) => state?.address);

    const {
      isSuccess,
      isError,
      isLoading,
      doneAddress,
      addTitle,
      updatedAddress,
    } = newAddress;

    useEffect(() => {
      if (getAddId !== undefined) {
        dispatch(getSingleAddress(getAddId));
      } else {
        dispatch(resetState());
      }
    }, [getAddId]);



    useEffect(() => {
      if (isSuccess && doneAddress) {
        toast.success("Data Added Successfullly!");
      }
      if (isSuccess && updatedAddress) {
        toast.success("Data Updated Successfullly!");
        navigate("/admin/address__details__list");
      }
      if (isError) {
        toast.error("Something Went Wrong!");
      }
    }, [isSuccess, isError, isLoading]);

    // formik validation
    const formik = useFormik({
      initialValues: {
        title: addTitle || "",
      },
      validationSchema: Schema,
      onSubmit: (values) => {
        if (getAddId !== undefined) {
          const data = { id: getAddId, addressData: values };
          dispatch(updateAddress(data));
          dispatch(resetState());
        } else {
          dispatch(createAddress(values));
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
            {getAddId !== undefined ? "Edit" : "Add"} Address
          </h3>
          <div>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex gap-3 flex-column"
            >
              
    
            <CustomInput
              type="text"
              label="Enter Address"
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
                
                {getAddId !== undefined ? "Edit" : "Add"} Address
              </button>
            </form>
          </div>
        </div>
        </>
  )
}

export default AddAddress;