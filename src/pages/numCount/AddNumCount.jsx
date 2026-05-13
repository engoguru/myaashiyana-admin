import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { delImg, uploadImg } from "../../features/upload/uploadSlice";
import CustomInput from "../../components/CustomInput";
import { createNumThunk, getSinNumThunk ,resetState, updateNumCountThunk} from "../../features/numCount/numSlice";


let Schema = yup.object().shape({
  icons: yup.string().required("images is required"),
  number: yup.string().required("Number is Required"),
  content: yup.string().required("Content is Required"),
});

const AddNumCount = () => {


      const dispatch = useDispatch();
      const location = useLocation();
      const getCountId = location.pathname.split("/")[3];
      const navigate = useNavigate();

      const newCounter = useSelector((state) => state?.numCount);

    const {
      isSuccess,
      isError,
      isLoading,
      doneNumCnts,
      ncIcons,
      ncNum,
      ncCont,
      updatedNumCnts,
    } = newCounter;

    useEffect(() => {
      if (getCountId !== undefined) {
        dispatch(getSinNumThunk(getCountId));
      } else {
        dispatch(resetState());
      }
    }, [getCountId]);

    useEffect(() => {
      if (isSuccess && doneNumCnts) {
        toast.success("Data Added Successfullly!");
      }
      if (isSuccess && updatedNumCnts) {
        toast.success("Data Updated Successfullly!");
        navigate("/admin/number_counter_list");
      }
      if (isError) {
        toast.error("Something Went Wrong!");
      }
    }, [isSuccess, isError, isLoading]);

    
    // formik validation
    const formik = useFormik({
      initialValues: {
        icons: ncIcons ||"",
        number: ncNum || "",
        content: ncCont || "",
      },
      validationSchema: Schema,
      onSubmit: (values) => {
        if (getCountId !== undefined) {
          const data = { id: getCountId, countData: values };
          dispatch(updateNumCountThunk(data));
          dispatch(resetState());
        } else {
          const newSupHome = {
            number: values?.number,
            content: values?.content,
            icons: values?.icons,
          
          };
          dispatch(createNumThunk(newSupHome));
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
            {getCountId !== undefined ? "Edit" : "Add"} Content
          </h3>
          <div>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex gap-3 flex-column"
            >

                   
              
    
              <CustomInput
                  type="number"
                  label="Enter Number"
                  name="number"
                  onCh={formik.handleChange("number")}
                  val={formik.values.number}
                  onBl={formik.handleBlur("number")}
              />

              <div className="error">
                  {formik.touched.number && formik.errors.number}
              </div>

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
              <CustomInput
                type="text"
                label="Enter icons"
                name="icons"
                onCh={formik.handleChange("icons")}
                val={formik.values.icons}
                onBl={formik.handleBlur("icons")}
              />

              <div className="error">
                {formik.touched.icons && formik.errors.icons}
              </div>

              <button
                type="submit"
                className="btn btn-success border-0 rounded-3 my-5 w-100"
              >
                {getCountId !== undefined ? "Edit" : "Add"} Content
              </button>
            </form>
          </div>
        </div>
        </>

    )
}

export default AddNumCount;