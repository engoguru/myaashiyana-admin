import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { delImg, uploadImg } from "../../features/upload/uploadSlice";
import CustomInput from '../../components/CustomInput';
import { createOurTeam, getSinOurTeam, updateOurTeam, resetState } from "../../features/ourTeam/ourTeamSlice";

let Schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  position: yup.string().required("Position is Required"),
  description: yup.string().required("description  is Required")
});

const AddOurTeam = () => {

  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const location = useLocation();
  const getTeamId = location.pathname.split("/")[3];
  const navigate = useNavigate();


  const imgState = useSelector((state) => state?.upload?.images);
  const newBoard = useSelector((state) => state?.ourTeam);

  const {
    isSuccess,
    isError,
    isLoading,
    doneOurTeam,
    otPosition,
    otName,
    otDescription,
    otImages,
    updatedOurTeam,
  } = newBoard;

  useEffect(() => {
    if (getTeamId !== undefined) {
      dispatch(getSinOurTeam(getTeamId));
      img?.push(otImages);
    } else {
      dispatch(resetState());
    }
  }, [getTeamId]);

  useEffect(() => {
    dispatch(resetState());
  }, []);

  useEffect(() => {
    if (isSuccess && doneOurTeam) {
      toast.success("Data Added Successfullly!");
    }
    if (isSuccess && updatedOurTeam) {
      toast.success("Data Updated Successfullly!");
      navigate("/admin/our__team___details__list");
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
      name: otName || "",
      position: otPosition || "",
      description: otDescription || "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      if (getTeamId !== undefined) {
        const data = { id: getTeamId, teamData: values };
        dispatch(updateOurTeam(data));
        dispatch(resetState());
      } else {
        const newDem = {
          images: [...img],
          position: values?.position,
          name: values?.name,
          description: values?.description,
        };
        dispatch(createOurTeam(newDem));
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
          {getTeamId !== undefined ? "Edit" : "Add"} Content
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
              label="Enter Name"
              name="name"
              onCh={formik.handleChange("name")}
              val={formik.values.name}
              onBl={formik.handleBlur("name")}
            />

            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>


            <CustomInput
              type="text"
              label="Enter Position"
              name="position"
              onCh={formik.handleChange("position")}
              val={formik.values.position}
              onBl={formik.handleBlur("position")}
            />

            <div className="error">
              {formik.touched.position && formik.errors.position}
            </div>

            <CustomInput
              type="text"
              label="Enter Description"
              name="description"
              onCh={formik.handleChange("description")}
              val={formik.values.description}
              onBl={formik.handleBlur("description")}
            />

            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>

            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 my-5 w-100"
            >
              {getTeamId !== undefined ? "Edit" : "Add"} Content
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddOurTeam;