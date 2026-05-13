import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { createdMapThunk, getSingleMapThunk, updateMapThunk,resetState } from "../../features/map/mapSlice";


let Schema = yup.object().shape({
  link: yup.string().required("Link is Required"),
});

const AddMap = () => {

      const dispatch = useDispatch();
      const location = useLocation();
      const getMapId = location.pathname.split("/")[3];
      const navigate = useNavigate();

      const newMap = useSelector((state) => state?.map);

    const {
      isSuccess,
      isError,
      isLoading,
      doneLink,
      mpLink,
      updatedLink,
    } = newMap;

    useEffect(() => {
      if (getMapId !== undefined) {
        dispatch(getSingleMapThunk(getMapId));
      } else {
        dispatch(resetState());
      }
    }, [getMapId]);



    useEffect(() => {
      if (isSuccess && doneLink) {
        toast.success("Data Added Successfullly!");
      }
      if (isSuccess && updatedLink) {
        toast.success("Data Updated Successfullly!");
        navigate("/admin/map--list");
      }
      if (isError) {
        toast.error("Something Went Wrong!");
      }
    }, [isSuccess, isError, isLoading]);

    // formik validation
    const formik = useFormik({
      initialValues: {
        link: mpLink || "",
      },
      validationSchema: Schema,
      onSubmit: (values) => {
        if (getMapId !== undefined) {
          const data = { id: getMapId, mapData: values };
          dispatch(updateMapThunk(data));
          dispatch(resetState());
        } else {
          dispatch(createdMapThunk(values));
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
            {getMapId !== undefined ? "Edit" : "Add"} Map
          </h3>
          <div>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex gap-3 flex-column"
            >
              
    
            <CustomInput
              type="text"
              label="Enter Map Link"
              name="link"
              onCh={formik.handleChange("link")}
              val={formik.values.link}
              onBl={formik.handleBlur("link")}
            />

            <div className="error">
              {formik.touched.link && formik.errors.link}
            </div>

              <button
                type="submit"
                className="btn btn-success border-0 rounded-3 my-5 w-100"
              >
                
                {getMapId !== undefined ? "Edit" : "Add"} Map
              </button>
            </form>
          </div>
        </div>
        </>
  )
}

export default AddMap