import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomInput from '../../components/CustomInput';
import { createUpTeamThunk, getSinUpTeamThunk, updateUpTeamThunk, resetState } from "../../features/upTeam/upTeamSlice";

let Schema = yup.object().shape({
  icon: yup.string().required("Font awesome Icon class is Required"),
  title: yup.string().required("Title is Required"),
});

const AddUnhome = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const getUpTeamId = location.pathname.split("/")[3];
  const navigate = useNavigate();

  const newBoard = useSelector((state) => state?.upTeam);

  const {
    isSuccess,
    isError,
    isLoading,
    doneUpTeam,
    upTmIn,
    upTmCont,
    updatedUpTeam,
  } = newBoard;

  useEffect(() => {
    if (getUpTeamId !== undefined) {
      dispatch(getSinUpTeamThunk(getUpTeamId));
    } else {
      dispatch(resetState());
    }
  }, [getUpTeamId]);

  useEffect(() => {
    dispatch(resetState());
  }, []);

  useEffect(() => {
    if (isSuccess && doneUpTeam) {
      toast.success("Data Added Successfullly!");
    }
    if (isSuccess && updatedUpTeam) {
      toast.success("Data Updated Successfullly!");
      navigate("/admin/up-team-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

 
  // formik validation
  const formik = useFormik({
    initialValues: {
      icon: upTmIn || "",
      title: upTmCont || "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      if (getUpTeamId !== undefined) {
        const data = { id: getUpTeamId, upTeamData: values };
        dispatch(updateUpTeamThunk(data));
        dispatch(resetState());
      } else {
        const newDem = {
          icon: values?.icon,
          title: values?.title,
        };
        dispatch(createUpTeamThunk(newDem));
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
            {getUpTeamId !== undefined ? "Edit" : "Add"} Data
          </h3>
          <div>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex gap-3 flex-column"
            >
              <CustomInput
                    type="text"
                    label="Enter Icon"
                    name="icon"
                    onCh={formik.handleChange("icon")}
                    val={formik.values.icon}
                    onBl={formik.handleBlur("icon")}
                />

              <div className="error">
                {formik.touched.icon && formik.errors.icon}
              </div>


              <CustomInput
                    type="text"
                    label="Enter Title"
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
                {getUpTeamId !== undefined ? "Edit" : "Add"} Data
              </button>
            </form>
          </div>
        </div>
        </>
  )
}
export default AddUnhome;
