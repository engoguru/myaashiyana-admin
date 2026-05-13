import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { createSocMediaThunk, getSingleSocMediaThunk, resetState, updateSocMediaThunk } from "../../features/socialMedia/socialSlice";


let Schema = yup.object().shape({
  facebook: yup.string().required("facebook is Required"),
  instagram: yup.string().required("instagram is Required"),
  youtube: yup.string().required("youtube is Required"),
  twitter: yup.string().required("twitter is Required")
});


const AddSocialMedia = () => {

  const dispatch = useDispatch();
    const location = useLocation();
    const getProId = location.pathname.split("/")[3];
    const navigate = useNavigate();
  
    const newSocMedia = useSelector((state) => state?.socMedia);
  
    const {
      isSuccess,
      isError,
      isLoading,
      doneSocMedia,
      socFacebook,
      socInsta,
      socYoutube,
      socTwitter,
      updatedSocMedia,
    } = newSocMedia;
  
    useEffect(() => {
      if (getProId !== undefined) {
        dispatch(getSingleSocMediaThunk(getProId));
      } else {
        dispatch(resetState());
      }
    }, [getProId]);
  
    useEffect(() => {
      if (isSuccess && doneSocMedia) {
        toast.success("Data Added Successfullly!");
      }
      if (isSuccess && updatedSocMedia) {
        toast.success("Data Updated Successfullly!");
        navigate("/admin/links_list");
      }
      if (isError) {
        toast.error("Something Went Wrong!");
      }
    }, [isSuccess, isError, isLoading]);
  
  
  
    // formik validation
    const formik = useFormik({
      initialValues: {
        facebook: socFacebook || "",
        instagram: socInsta || "",
        youtube: socYoutube || "",
        twitter: socTwitter || "",
      },
      validationSchema: Schema,
      onSubmit: (values) => {
        if (getProId !== undefined) {
          const data = { id: getProId, socMediaData: values };
          dispatch(updateSocMediaThunk(data));
          dispatch(resetState());
        } else {
          dispatch(createSocMediaThunk(values));
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
            {getProId !== undefined ? "Edit" : "Add"} Links
          </h3>
          <div>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex gap-3 flex-column"
            >
    
                <CustomInput
                    type="text"
                    label="Enter Facebook Link"
                    name="facebook"
                    onCh={formik.handleChange("facebook")}
                    val={formik.values.facebook}
                    onBl={formik.handleBlur("facebook")}
                />

                <div className="error">
                    {formik.touched.facebook && formik.errors.facebook}
                </div>

                <CustomInput
                    type="text"
                    label="Enter Instagram Link"
                    name="instagram"
                    onCh={formik.handleChange("instagram")}
                    val={formik.values.instagram}
                    onBl={formik.handleBlur("instagram")}
                />

                <div className="error">
                    {formik.touched.instagram && formik.errors.instagram}
                </div>

                <CustomInput
                    type="text"
                    label="Enter Youtube Link"
                    name="youtube"
                    onCh={formik.handleChange("youtube")}
                    val={formik.values.youtube}
                    onBl={formik.handleBlur("youtube")}
                />

                <div className="error">
                    {formik.touched.youtube && formik.errors.youtube}
                </div>

                <CustomInput
                    type="text"
                    label="Enter Twitter Link"
                    name="twitter"
                    onCh={formik.handleChange("twitter")}
                    val={formik.values.twitter}
                    onBl={formik.handleBlur("twitter")}
                />

                <div className="error">
                    {formik.touched.twitter && formik.errors.twitter}
                </div>
    
    
              <button
                type="submit"
                className="btn btn-success border-0 rounded-3 my-5 w-100"
              >
                {getProId !== undefined ? "Edit" : "Add"} Links
              </button>
            </form>
          </div>
        </div>
        </>
  )
}

export default AddSocialMedia;