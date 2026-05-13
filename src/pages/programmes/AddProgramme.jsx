import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";

import { delImg, uploadImg } from "../../features/upload/uploadSlice";
import CustomInput from "../../components/CustomInput";
import {
  createProgThunk,
  getSingleProgThunk,
  resetState,
  updateProgThunk,
} from "../../features/programme/programmeSlice";

// Validation schema matching the model
const Schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  species: yup.string().required("Species is required"),
  breed: yup.string(),
  age: yup.number().required("Age is required").min(0, "Age must be at least 0"),
  rescueStory: yup.string().required("Rescue story is required").max(1000),
  medicalCondition: yup.string(),
  monthlyCareCost: yup.number().required("Monthly care cost is required").min(0),
  status: yup.string().oneOf(["Available", "Sponsored"]),
  content: yup.string().required("Content is required"),
});

const AddProgramme = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const location = useLocation();
  const getProId = location.pathname.split("/")[3];
  const navigate = useNavigate();

  const imgState = useSelector((state) => state?.upload?.images);
  const newProgr = useSelector((state) => state?.programme);

  const {
    isSuccess,
    isError,
    isLoading,
    doneProgramme,
    proImages,
    progCont,
    progHeading,
    updatedProgramme,
    progData, // Assuming you have this in your redux slice for fetched data
  } = newProgr;

  useEffect(() => {
    if (getProId !== undefined) {
      dispatch(getSingleProgThunk(getProId));
    } else {
      dispatch(resetState());
    }
  }, [getProId]);

  useEffect(() => {
    if (isSuccess && doneProgramme) {
      toast.success("Data Added Successfully!");
    }
    if (isSuccess && updatedProgramme) {
      toast.success("Data Updated Successfully!");
      navigate("/admin/programmes__details__list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  // Prepare images for formik
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [imgState]);

  // Set initial values, using fetched data if editing
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: progData?.name || "",
      species: progData?.species || "",
      breed: progData?.breed || "",
      age: progData?.age || "",
      rescueStory: progData?.rescueStory || "",
      medicalCondition: progData?.medicalCondition || "",
      monthlyCareCost: progData?.monthlyCareCost || "",
      status: progData?.status || "Available",
      content: progData?.content || "",
      images: progData?.images || [],
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      if (getProId !== undefined) {
        const data = { id: getProId, progData: values };
        dispatch(updateProgThunk(data));
        dispatch(resetState());
      } else {
        dispatch(createProgThunk(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      ["clean"],
      [{ br: "" }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header", "font", "size",
    "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "indent",
    "link", "image", "video"
  ];

  return (
    <div>
      <h3 className="mb-4 title">
        {getProId !== undefined ? "Edit" : "Add"} Programme
      </h3>
      <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
        <div className="bg-white border-1 p-5 text-center">
          <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
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

        <CustomInput
          type="text"
          label="Name"
          name="name"
          onCh={formik.handleChange}
          val={formik.values.name}
          onBl={formik.handleBlur}
        />
        <div className="error">{formik.touched.name && formik.errors.name}</div>

        <CustomInput
          type="text"
          label="Species"
          name="species"
          onCh={formik.handleChange}
          val={formik.values.species}
          onBl={formik.handleBlur}
        />
        <div className="error">{formik.touched.species && formik.errors.species}</div>

        <CustomInput
          type="text"
          label="Breed"
          name="breed"
          onCh={formik.handleChange}
          val={formik.values.breed}
          onBl={formik.handleBlur}
        />
        <div className="error">{formik.touched.breed && formik.errors.breed}</div>

        <CustomInput
          type="number"
          label="Age"
          name="age"
          onCh={formik.handleChange}
          val={formik.values.age}
          onBl={formik.handleBlur}
        />
        <div className="error">{formik.touched.age && formik.errors.age}</div>

        <CustomInput
          type="text"
          label="Rescue Story"
          name="rescueStory"
          onCh={formik.handleChange}
          val={formik.values.rescueStory}
          onBl={formik.handleBlur}
        />
        <div className="error">{formik.touched.rescueStory && formik.errors.rescueStory}</div>

        <CustomInput
          type="text"
          label="Medical Condition"
          name="medicalCondition"
          onCh={formik.handleChange}
          val={formik.values.medicalCondition}
          onBl={formik.handleBlur}
        />
        <div className="error">{formik.touched.medicalCondition && formik.errors.medicalCondition}</div>

        <CustomInput
          type="number"
          label="Monthly Care Cost"
          name="monthlyCareCost"
          onCh={formik.handleChange}
          val={formik.values.monthlyCareCost}
          onBl={formik.handleBlur}
        />
        <div className="error">{formik.touched.monthlyCareCost && formik.errors.monthlyCareCost}</div>

        <select
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-select"
        >
          <option value="Available">Available</option>
          <option value="Sponsored">Sponsored</option>
        </select>
        <div className="error">{formik.touched.status && formik.errors.status}</div>

        <div>
          <ReactQuill
            name="content"
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder="Enter Content Here"
            onChange={(value) => formik.setFieldValue("content", value)}
            value={formik.values.content}
          />
          <div className="error">{formik.touched.content && formik.errors.content}</div>
        </div>

        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 my-5 w-100"
        >
          {getProId !== undefined ? "Edit" : "Add"} Programme
        </button>
      </form>
    </div>
  );
};

export default AddProgramme;
