import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { delImg, uploadImg } from "../../features/upload/uploadSlice";
import CustomInput from "../../components/CustomInput";
import { createServiceThunk, updateServiceThunk, resetState, getSingleServThunk } from "../../features/services/serSlice";

let Schema = yup.object().shape({
  heading: yup.string().required("Heading is Required"),
  content: yup.string().required("Content is Required"),
});


const AddService = () => {

  const dispatch = useDispatch();
    const [images, setImages] = useState([]);
    const location = useLocation();
    const getProId = location.pathname.split("/")[3];
    const navigate = useNavigate();
  
  
    const imgState = useSelector((state) => state?.upload?.images);
    const newService = useSelector((state) => state?.service);
  
    const {
      isSuccess,
      isError,
      isLoading,
      doneServ,
      servImg,
      servCont,
      servHead,
      updatedServ,
    } = newService;
  
    useEffect(() => {
      if (getProId !== undefined) {
        dispatch(getSingleServThunk(getProId));
        img?.push(servImg);
      } else {
        dispatch(resetState());
      }
    }, [getProId]);
  
    useEffect(() => {
      if (isSuccess && doneServ) {
        toast.success("Data Added Successfullly!");
      }
      if (isSuccess && updatedServ) {
        toast.success("Data Updated Successfullly!");
        navigate("/admin/service-list");
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
        heading: servHead || "",
        content: servCont || "",
      },
      validationSchema: Schema,
      onSubmit: (values) => {
        if (getProId !== undefined) {
          const data = { id: getProId, serData: values };
          dispatch(updateServiceThunk(data));
          dispatch(resetState());
        } else {
          const newSupHome = {
            heading: values?.heading,
            content: values?.content,
            images: [...img],
          };
          dispatch(createServiceThunk(newSupHome));
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
            {getProId !== undefined ? "Edit" : "Add"} Service
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

          <div className="">
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
              </div>

              <button
                type="submit"
                className="btn btn-success border-0 rounded-3 my-5 w-100"
              >
                {getProId !== undefined ? "Edit" : "Add"} Service
              </button>
            </form>
          </div>
        </div>
        </>
  )
}

export default AddService;