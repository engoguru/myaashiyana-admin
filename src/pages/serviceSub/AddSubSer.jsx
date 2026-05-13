import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { createSubServiceThunk, getSubSingleServThunk, updateSubServiceThunk, resetState } from "../../features/serviceSub/serSubSlice";

let Schema = yup.object().shape({
  content: yup.string().required("Content is Required"),
});

const AddSubSer = () => {


  const dispatch = useDispatch();
      const location = useLocation();
      const getSubSerId = location.pathname.split("/")[3];
      const navigate = useNavigate();

      const newEmail = useSelector((state) => state?.subServ);

    const {
      isSuccess,
      isError,
      isLoading,
      doneSubServ,
      servSubCont,
      updatedSubServ,
    } = newEmail;

    useEffect(() => {
      if (getSubSerId !== undefined) {
        dispatch(getSubSingleServThunk(getSubSerId));
      } else {
        dispatch(resetState());
      }
    }, [getSubSerId]);



    useEffect(() => {
      if (isSuccess && doneSubServ) {
        toast.success("Data Added Successfullly!");
      }
      if (isSuccess && updatedSubServ) {
        toast.success("Data Updated Successfullly!");
        navigate("/admin/sub-service-list");
      }
      if (isError) {
        toast.error("Something Went Wrong!");
      }
    }, [isSuccess, isError, isLoading]);

    // formik validation
    const formik = useFormik({
      initialValues: {
        content: servSubCont || "",
      },
      validationSchema: Schema,
      onSubmit: (values) => {
        if (getSubSerId !== undefined) {
          const data = { id: getSubSerId, serSubData: values };
          dispatch(updateSubServiceThunk(data));
          dispatch(resetState());
        } else {
          dispatch(createSubServiceThunk(values));
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
            {getSubSerId !== undefined ? "Edit" : "Add"} Sub Service
          </h3>
          <div>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex gap-3 flex-column"
            >
              
    
            <CustomInput
            type="text"
            label="Enter Content"
            name="content"
            onCh={formik.handleChange("content")}
            val={formik.values.content}
            onBl={formik.handleBlur("content")}
          />

          <div className="error">
            {formik.touched.content && formik.errors.content}
          </div>

              <button
                type="submit"
                className="btn btn-success border-0 rounded-3 my-5 w-100"
              >
                {getSubSerId !== undefined ? "Edit" : "Add"} Sub Service
              </button>
            </form>
          </div>
        </div>
        </>

    )
}

export default AddSubSer;