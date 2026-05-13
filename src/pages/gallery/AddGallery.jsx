import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { delImg, uploadImg } from "../../features/upload/uploadSlice";
import CustomInput from "../../components/CustomInput";
import { createGallery, getSingleGallery, resetState, updateGallery } from "../../features/gallery/gallerySlice";

const Schema = yup.object().shape({
  heading: yup.string(),
  video: yup.string().url("Must be a valid URL").nullable(),
});

const AddGallery = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const location = useLocation();
  const getProId = location.pathname.split("/")[3];
  const navigate = useNavigate();

  const imgState = useSelector((state) => state?.upload?.images);
  const newProgr = useSelector((state) => state?.gallery);

  const {
    isSuccess,
    isError,
    isLoading,
    doneGallery,
    gyImages,
    gyHeading,
    gyVideo,
    updatedGallery,
  } = newProgr;

  useEffect(() => {
    if (getProId !== undefined) {
      dispatch(getSingleGallery(getProId));
    } else {
      dispatch(resetState());
    }
  }, [getProId]);

  useEffect(() => {
    if (isSuccess && doneGallery) {
      toast.success("Data Added Successfully!");
    }
    if (isSuccess && updatedGallery) {
      toast.success("Data Updated Successfully!");
      navigate("/admin/gallery_list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, updatedGallery]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  // formik validation
  const formik = useFormik({
    initialValues: {
      heading: gyHeading || "",
      video: gyVideo || "",
    },
    validationSchema: Schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (getProId !== undefined) {
        const data = { id: getProId, galleryData: { ...values, images: img } };
        dispatch(updateGallery(data));
        dispatch(resetState());
      } else {
        const newGallery = {
          heading: values.heading,
          images: [...img],
          video: values.video,
        };
        dispatch(createGallery(newGallery));
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
          {getProId !== undefined ? "Edit" : "Add"} gallery
        </h3>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex gap-3 flex-column"
          >
            <div className="bg-white border-1 p-5 text-center">
              <Dropzone
                onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="showimages d-flex flex-wrap gap-3">
              {imgState?.map((i, j) => (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              ))}
            </div>

            <label>Video Link</label>
            <input
              type="text"
              name="video"
              value={formik.values.video}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.touched.video && formik.errors.video}</div>

            <CustomInput
              type="text"
              label="Enter Heading"
              name="heading"
              onCh={formik.handleChange("heading")}
              val={formik.values.heading}
              onBl={formik.handleBlur("heading")}
            />

            <div className="error">
              {formik.touched.heading && formik.errors.heading}
            </div>

            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 my-5 w-100"
              disabled={isLoading}
            >
              {getProId !== undefined ? "Edit" : "Add"} gallery
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddGallery;
