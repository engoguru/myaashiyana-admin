import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { delImg, uploadImg } from "../../features/upload/uploadSlice";
import CustomInput from "../../components/CustomInput";
import { createTestimonialThunk, updateTestimonialThunk, resetState, getSingleTestimonialThunk } from "../../features/testimonial/testimonialSlice";

let Schema = yup.object().shape({
  comment: yup.string().required("comment is Required"),
  name: yup.string().required("comment is Required"),
});


const AddTestimonial = () => {

  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const location = useLocation();
  const getDonId = location.pathname.split("/")[3];
  const navigate = useNavigate();


  const imgState = useSelector((state) => state?.upload?.images);
  const newContent = useSelector((state) => state?.testimonial);

  const {
    isSuccess,
    isError,
    isLoading,
    doneTestimonial,
    clImages,
    clNmae,
    clComment,
    updatedTestimonial,
  } = newContent;

  useEffect(() => {
    if (getDonId !== undefined) {
      dispatch(getSingleTestimonialThunk(getDonId));
      img?.push(clImages);
    } else {
      dispatch(resetState());
    }
  }, [getDonId]);

  useEffect(() => {
    if (isSuccess && doneTestimonial) {
      toast.success("Data Added Successfullly!");
    }
    if (isSuccess && updatedTestimonial) {
      toast.success("Data Updated Successfullly!");
      navigate("/admin/testimonials--list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);



  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [images]);

  // formik validation
  const formik = useFormik({
    initialValues: {
      name: clNmae || "",
      comment: clComment || "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      if (getDonId !== undefined) {
        const data = { id: getDonId, clientData: values };
        dispatch(updateTestimonialThunk(data));
        dispatch(resetState());
      } else {
        const newSupHome = {
          name: values?.name,
          comment: values?.comment,
          images: [...img],
        };
        dispatch(createTestimonialThunk(newSupHome));
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
            {getDonId !== undefined ? "Edit" : "Add"} Client 
          </h3>
          <div>
            <form
              action=""
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
                {imgState?.map((i, j) => {
                  return ( 
                    <div className=" position-relative" 
                    key={j}
                    >
                      <button
                        type="button"
                        onClick={() => dispatch(delImg(i.public_id))}
                        className="btn-close position-absolute"
                        style={{ top: "10px", right: "10px" }}
                      ></button>
                      <img src={i.url} alt="" width={200} height={200} />
                    </div>
                   ); 
                 })}
              </div>
    
    
    

                <CustomInput
                    type="text"
                    label="Enter Comment"
                    name="comment"
                    onCh={formik.handleChange("comment")}
                    val={formik.values.comment}
                    onBl={formik.handleBlur("comment")}
                />

              <div className="error">
                {formik.touched.comment && formik.errors.comment}
              </div>
                <CustomInput
                    type="text"
                    label="Enter name"
                    name="name"
                    onCh={formik.handleChange("name")}
                    val={formik.values.name}
                    onBl={formik.handleBlur("name")}
                />

              <div className="error">
                {formik.touched.name && formik.errors.name}
              </div>


              <button
                type="submit"
                className="btn btn-success border-0 rounded-3 my-5 w-100"
              >
                {getDonId !== undefined ? "Edit" : "Add"} Client
              </button>
            </form>
          </div>
        </div>
        </>
  )
}

export default AddTestimonial;