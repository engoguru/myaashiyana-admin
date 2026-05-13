import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { delImg, uploadImg } from "../../features/upload/uploadSlice";
import CustomInput from "../../components/CustomInput";
import { createBlogThunk, getSingleBlogThunk, resetState, updateBlogThunk } from "../../features/blog/BlogSlice";

let Schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  excerpt: yup.string().required("Excerpt is Required"),
  content: yup.string().required("Content is Required"),
  author: yup.string(),
  date: yup.string(),
  quote: yup.string()
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  const navigate = useNavigate();

  const imgState = useSelector((state) => state?.upload?.images);
  const blogState = useSelector((state) => state?.blog);

  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    blogImages,
    blogTitle,
    blogExcerpt,
    blogContent,
    blogAuthor,
    blogDate,
    blogQuote,
    updatedBlog,
  } = blogState;

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getSingleBlogThunk(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      console.log("Blog created successfully:", createdBlog);
      toast.success("Blog Added Successfully!");
      navigate("/admin/Blogs__list");
    }
    if (isSuccess && updatedBlog) {
      console.log("Blog updated successfully:", updatedBlog);
      toast.success("Blog Updated Successfully!");
      navigate("/admin/Blogs__list");
    }
    if (isError) {
      console.error("Error in blog operation:", blogState);
      toast.error("Something Went Wrong! Please check console for details.");
    }
  }, [isSuccess, isError, isLoading, createdBlog, updatedBlog]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogTitle || "",
      excerpt: blogExcerpt || "",
      content: blogContent || "",
      author: blogAuthor || "",
      date: blogDate || "",
      quote: blogQuote || "",
      images: img,
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;
      
      console.log("Form values:", values);
      console.log("Images:", img);
      console.log("User:", user);
      console.log("User ID:", userId);
      
      if (getBlogId !== undefined) {
        const data = { 
          id: getBlogId, 
          progData: {
            title: values.title,
            excerpt: values.excerpt,
            content: values.content,
            author: values.author,
            date: values.date,
            quote: values.quote,
            images: img,
          }
        };
        console.log("Updating blog with data:", data);
        dispatch(updateBlogThunk(data));
        dispatch(resetState());
      } else {
        const newBlog = {
          title: values.title,
          excerpt: values.excerpt,
          content: values.content,
          author: values.author || (user?.firstname ? `${user.firstname} ${user.lastname || ''}`.trim() : 'Admin'),
          date: values.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          quote: values.quote,
          images: img,
          user: userId,
          status: 'published'
        };
        console.log("Creating new blog with data:", newBlog);
        dispatch(createBlogThunk(newBlog));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue('images', img);
  }, [imgState]);

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
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
          {getBlogId !== undefined ? "Edit" : "Add"} Blog
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
              label="Enter Title"
              name="title"
              onCh={formik.handleChange("title")}
              val={formik.values.title}
              onBl={formik.handleBlur("title")}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>

            <CustomInput
              type="text"
              label="Enter Excerpt (Short Description)"
              name="excerpt"
              onCh={formik.handleChange("excerpt")}
              val={formik.values.excerpt}
              onBl={formik.handleBlur("excerpt")}
            />
            <div className="error">
              {formik.touched.excerpt && formik.errors.excerpt}
            </div>

            <CustomInput
              type="text"
              label="Enter Author Name"
              name="author"
              onCh={formik.handleChange("author")}
              val={formik.values.author}
              onBl={formik.handleBlur("author")}
            />
            <div className="error">
              {formik.touched.author && formik.errors.author}
            </div>

            <CustomInput
              type="text"
              label="Enter Date (e.g., March 10, 2026)"
              name="date"
              onCh={formik.handleChange("date")}
              val={formik.values.date}
              onBl={formik.handleBlur("date")}
            />
            <div className="error">
              {formik.touched.date && formik.errors.date}
            </div>

            <div className="">
              <ReactQuill
                name="content"
                theme="snow"
                modules={modules}
                formats={formats}
                placeholder="Enter Content Here"
                onChange={(value) => formik.setFieldValue("content", value)}
                value={formik.values.content}
              />
              <div className="error">
                {formik.touched.content && formik.errors.content}
              </div>
            </div>

            <CustomInput
              type="text"
              label="Enter Quote (Optional)"
              name="quote"
              onCh={formik.handleChange("quote")}
              val={formik.values.quote}
              onBl={formik.handleBlur("quote")}
            />
            <div className="error">
              {formik.touched.quote && formik.errors.quote}
            </div>
            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 my-5 w-100"
            >
              {getBlogId !== undefined ? "Edit" : "Add"} Blog
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddBlog;