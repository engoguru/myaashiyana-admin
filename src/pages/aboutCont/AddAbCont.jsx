import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { delImg, uploadImg } from "../../features/upload/uploadSlice";
import CustomInput from "../../components/CustomInput";
import { createaboutThunk, getSingleaboutThunk, resetState, updateaboutThunk } from "../../features/aboutCont/aboutContSlice";
// import { lazy, Suspense } from "react";

// const ReactQuill = lazy(() => import("react-quill"));

let Schema = yup.object().shape({
  content: yup.string().required("Content is Required")
});


const AddAbCont = () => {

  const dispatch = useDispatch();

    const location = useLocation();
    const [images, setImages] = useState([]);
    const getProId = location.pathname.split("/")[3];
    const navigate = useNavigate();
  
  
    const imgState = useSelector((state) => state?.upload?.images);
    const newProgr = useSelector((state) => state?.about);
  
    const {
      isSuccess,
      isError,
      isLoading,
      aboutimg,
      doneabout,
      aboutcont,
      updatedabout,
    } = newProgr;
  
    useEffect(() => {
      if (getProId !== undefined) {
        dispatch(getSingleaboutThunk(getProId));
        img?.push(aboutimg);
      } else {
        dispatch(resetState());
      }
    }, [getProId]);
  
    useEffect(() => {
      if (isSuccess && doneabout) {
        toast.success("Data Added Successfullly!");
      }
      if (isSuccess && updatedabout) {
        toast.success("Data Updated Successfullly!");
        navigate("/admin/about--us--list");
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
        content: aboutcont || "",
      },
      validationSchema: Schema,
      onSubmit: (values) => {
        if (getProId !== undefined) {
          const data = { id: getProId, aboutData: values };
          dispatch(updateaboutThunk(data));
          dispatch(resetState());
        } else {
          const newSupHome = {
            content: values?.content,
            images: [...img],
          };
          dispatch(createaboutThunk(newSupHome));
          formik.resetForm();
          setTimeout(() => {
            dispatch(resetState());
          }, 300);
        }
      },
    });

    const modules = {
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean'],
        [{ 'br': '' }]
      ],
      clipboard: {
        matchVisual: false,
      }
    };
  
    const formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ];


    return (
        <>
          <div>
          <h3 className="mb-4 title">
            {getProId !== undefined ? "Edit" : "Add"} Content
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
                  {imgState?.map((i, j) =>  {
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

    
              <div className="">
              {/* <Suspense fallback={<div>Loading Editor...</div>}> */}
                <ReactQuill
                  name="content"
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  placeholder="Enter Content Here"
                  onChange={formik.handleChange("content")}
                  value={formik.values.content}
                />
    
                <div className="error">
                  {formik.touched.content && formik.errors.content}
                </div>
                {/* </Suspense> */}
              </div> 

    
              <button
                type="submit"
                className="btn btn-success border-0 rounded-3 my-5 w-100"
              >
                {getProId !== undefined ? "Edit" : "Add"} Content              
                </button>
            </form>
          </div>
        </div>
        </>
  )
}

export default AddAbCont;