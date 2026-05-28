// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Dropzone from "react-dropzone";
// import { toast } from "react-hot-toast";
// import {
//     createRescueStoryThunk,
//     getSingleRescueStoryThunk,
//     updateRescueStoryThunk,
//     resetRescueStoryState,
// } from "../../features/rescuestory/rescuestoryslice";
// import { delImg, uploadImg } from "../../features/upload/uploadSlice";

// const validationSchema = yup.object().shape({
//     title: yup.string().required("Title is required"),
//     journey: yup
//         .array()
//         .of(yup.string().required("Journey step is required"))
//         .min(1, "At least one journey step is required"),
//     video: yup.string().url("Must be a valid URL"),
//     date: yup.date().required("Date is required"),
// });

// const AddRescueStory = () => {
//     const dispatch = useDispatch();
//     const { id: storyId } = useParams();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [journey, setJourney] = useState([""]);
//     const [localImages, setLocalImages] = useState([]);

//     const { isSuccess, isError, isLoading, singleStory, updatedRescueStory } = useSelector((state) => state.rescue);
//     const imgState = useSelector((state) => state.upload.images);

//     const formik = useFormik({
//         initialValues: {
//             title: "",
//             journey: [""],
//             video: "",
//             date: "",
//         },
//         validationSchema,
//         onSubmit: (values) => {
//             const uploadedImages = imgState.map((img) => ({ public_id: img.public_id, url: img.url }));
//             const payload = { ...values, images: [...localImages, ...uploadedImages] };

//             if (storyId) {
//                 dispatch(updateRescueStoryThunk({ id: storyId, data: payload }));
//             } else {
//                 dispatch(createRescueStoryThunk(payload));
//             }
//         },
//         enableReinitialize: true,
//     });

//     useEffect(() => {
//         if (storyId) {
//             dispatch(getSingleRescueStoryThunk(storyId));
//         } else {
//             dispatch(resetRescueStoryState());
//         }
//     }, [storyId]);

//     useEffect(() => {
//         if (singleStory) {
//             setJourney(singleStory.journey || [""]);
//             setLocalImages(singleStory.images || []);
//             formik.setValues({
//                 title: singleStory.title || "",
//                 journey: singleStory.journey || [""],
//                 video: singleStory.video || "",
//                 date: singleStory.date?.slice(0, 10) || "",
//             });
//         }
//     }, [singleStory]);

//     useEffect(() => {
//         if (isSuccess && storyId && updatedRescueStory) {
//             toast.success("Rescue story updated successfully!");
//             navigate("/admin/rescue__stories__list");
//             dispatch(resetRescueStoryState());
//         } else if (isSuccess && !storyId) {
//             toast.success("Rescue story added successfully!");
//             formik.resetForm();
//             setJourney([""]);
//             setLocalImages([]);
//             setTimeout(() => {
//                 dispatch(resetRescueStoryState());
//                 navigate("/admin/rescue__stories__list");
//             }, 500);
//         }
//         if (isError) {
//             toast.error("Something went wrong!");
//         }
//     }, [isSuccess, isError, isLoading, updatedRescueStory]);

//     useEffect(() => {
//         formik.setFieldValue("journey", journey);
//     }, [journey]);

//     const handleJourneyChange = (idx, value) => {
//         const updated = [...journey];
//         updated[idx] = value;
//         setJourney(updated);
//     };

//     const addJourneyStep = () => setJourney([...journey, ""]);
//     const removeJourneyStep = (idx) => {
//         const updated = journey.filter((_, i) => i !== idx);
//         setJourney(updated);
//     };

//     return (
//         <div>
//             <h3 className="mb-4 title">{storyId ? "Edit" : "Add"} Rescue Story</h3>
//             <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
//                 <label>Title</label>
//                 <input
//                     type="text"
//                     name="title"
//                     value={formik.values.title}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                 />
//                 <div className="error">{formik.touched.title && formik.errors.title}</div>

//                 <label>Upload Image</label>
//                 <div className="bg-white border-1 p-5 text-center">
//                     <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
//                         {({ getRootProps, getInputProps }) => (
//                             <section>
//                                 <div {...getRootProps()}>
//                                     <input {...getInputProps()} />
//                                     <p>Drag 'n' drop some files here, or click to select files</p>
//                                 </div>
//                             </section>
//                         )}
//                     </Dropzone>
//                 </div>
//                 <div className="showimages d-flex flex-wrap gap-3">
//                     {/* Existing Images */}
//                     {localImages?.map((i, j) => (
//                         <div className="position-relative" key={`local-${j}`}>
//                             <button
//                                 type="button"
//                                 onClick={() => setLocalImages(localImages.filter((_, idx) => idx !== j))}
//                                 className="btn-close position-absolute"
//                                 style={{ top: "10px", right: "10px", background: "white" }}
//                             ></button>
//                             <img src={i.url} alt="" width={200} height={200} className="object-cover rounded shadow-sm border" />
//                         </div>
//                     ))}
//                     {/* Newly Uploaded Images */}
//                     {imgState?.map((i, j) => (
//                         <div className="position-relative" key={`new-${j}`}>
//                             <button
//                                 type="button"
//                                 onClick={() => dispatch(delImg(i.public_id))}
//                                 className="btn-close position-absolute"
//                                 style={{ top: "10px", right: "10px", background: "white" }}
//                             ></button>
//                             <img src={i.url} alt="" width={200} height={200} className="object-cover rounded shadow-sm border" />
//                         </div>
//                     ))}
//                 </div>

//                 <label>Journey Steps</label>
//                 {journey.map((step, idx) => (
//                     <div key={idx} className="d-flex align-items-center mb-2">
//                         <input
//                             type="text"
//                             value={step}
//                             onChange={(e) => handleJourneyChange(idx, e.target.value)}
//                             className="flex-grow-1"
//                         />
//                         {journey.length > 1 && (
//                             <button type="button" onClick={() => removeJourneyStep(idx)} className="btn btn-danger ms-2">
//                                 Remove
//                             </button>
//                         )}
//                     </div>
//                 ))}
//                 <button type="button" onClick={addJourneyStep} className="btn btn-secondary mb-2">
//                     Add Step
//                 </button>
//                 <div className="error">{formik.errors.journey}</div>

//                 <label>Video Link</label>
//                 <input
//                     type="text"
//                     name="video"
//                     value={formik.values.video}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                 />
//                 <div className="error">{formik.touched.video && formik.errors.video}</div>

//                 <label>Date</label>
//                 <input
//                     type="date"
//                     name="date"
//                     value={formik.values.date}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                 />
//                 <div className="error">{formik.touched.date && formik.errors.date}</div>

//                 <button type="submit" className="btn btn-success border-0 rounded-3 my-5 w-100" disabled={isLoading}>
//                     {storyId ? "Edit" : "Add"} Rescue Story
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddRescueStory;





import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";
import {
    createRescueStoryThunk,
    getSingleRescueStoryThunk,
    updateRescueStoryThunk,
    resetRescueStoryState,
} from "../../features/rescuestory/rescuestoryslice";
import { delImg, uploadImg } from "../../features/upload/uploadSlice";

const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    journey: yup
        .array()
        .of(yup.string().required("Journey step is required"))
        .min(1, "At least one journey step is required"),
    video: yup.string().url("Must be a valid URL"),
    date: yup.date().required("Date is required"),
});

const AddRescueStory = () => {
    const dispatch = useDispatch();
    const { id: storyId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [journey, setJourney] = useState([""]);
    const [localImages, setLocalImages] = useState([]);

    const { isSuccess, isError, isLoading, singleStory, updatedRescueStory } = useSelector((state) => state.rescue);
    const imgState = useSelector((state) => state.upload.images);
    const { isError: uploadError, message: uploadMessage } = useSelector((state) => state.upload);

    // Show upload error toast
    useEffect(() => {
        if (uploadError && uploadMessage) {
            const msg = typeof uploadMessage === "string"
                ? uploadMessage
                : "Image is too large. Please upload a smaller image (max 5MB).";
            toast.error(msg);
        }
    }, [uploadError, uploadMessage]);

    const formik = useFormik({
        initialValues: {
            title: "",
            journey: [""],
            video: "",
            date: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const uploadedImages = imgState.map((img) => ({ public_id: img.public_id, url: img.url }));
            const payload = { ...values, images: [...localImages, ...uploadedImages] };

            if (storyId) {
                dispatch(updateRescueStoryThunk({ id: storyId, data: payload }));
            } else {
                dispatch(createRescueStoryThunk(payload));
            }
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (storyId) {
            dispatch(getSingleRescueStoryThunk(storyId));
        } else {
            dispatch(resetRescueStoryState());
        }
    }, [storyId]);

    useEffect(() => {
        if (singleStory) {
            setJourney(singleStory.journey || [""]);
            setLocalImages(singleStory.images || []);
            formik.setValues({
                title: singleStory.title || "",
                journey: singleStory.journey || [""],
                video: singleStory.video || "",
                date: singleStory.date?.slice(0, 10) || "",
            });
        }
    }, [singleStory]);

    useEffect(() => {
        if (isSuccess && storyId && updatedRescueStory) {
            toast.success("Rescue story updated successfully!");
            navigate("/admin/rescue__stories__list");
            dispatch(resetRescueStoryState());
        } else if (isSuccess && !storyId) {
            toast.success("Rescue story added successfully!");
            formik.resetForm();
            setJourney([""]);
            setLocalImages([]);
            setTimeout(() => {
                dispatch(resetRescueStoryState());
                navigate("/admin/rescue__stories__list");
            }, 500);
        }
        if (isError) {
            toast.error("Something went wrong!");
        }
    }, [isSuccess, isError, isLoading, updatedRescueStory]);

    useEffect(() => {
        formik.setFieldValue("journey", journey);
    }, [journey]);

    const handleJourneyChange = (idx, value) => {
        const updated = [...journey];
        updated[idx] = value;
        setJourney(updated);
    };

    const addJourneyStep = () => setJourney([...journey, ""]);
    const removeJourneyStep = (idx) => {
        const updated = journey.filter((_, i) => i !== idx);
        setJourney(updated);
    };

    return (
        <div>
            <h3 className="mb-4 title">{storyId ? "Edit" : "Add"} Rescue Story</h3>
            <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className="error">{formik.touched.title && formik.errors.title}</div>

                <label>Upload Image</label>
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
                    {/* Existing Images */}
                    {localImages?.map((i, j) => (
                        <div className="position-relative" key={`local-${j}`}>
                            <button
                                type="button"
                                onClick={() => setLocalImages(localImages.filter((_, idx) => idx !== j))}
                                className="btn-close position-absolute"
                                style={{ top: "10px", right: "10px", background: "white" }}
                            ></button>
                            <img src={i.url} alt="" width={200} height={200} className="object-cover rounded shadow-sm border" />
                        </div>
                    ))}
                    {/* Newly Uploaded Images */}
                    {imgState?.map((i, j) => (
                        <div className="position-relative" key={`new-${j}`}>
                            <button
                                type="button"
                                onClick={() => dispatch(delImg(i.public_id))}
                                className="btn-close position-absolute"
                                style={{ top: "10px", right: "10px", background: "white" }}
                            ></button>
                            <img src={i.url} alt="" width={200} height={200} className="object-cover rounded shadow-sm border" />
                        </div>
                    ))}
                </div>

                <label>Journey Steps</label>
                {journey.map((step, idx) => (
                    <div key={idx} className="d-flex align-items-center mb-2">
                        <input
                            type="text"
                            value={step}
                            onChange={(e) => handleJourneyChange(idx, e.target.value)}
                            className="flex-grow-1"
                        />
                        {journey.length > 1 && (
                            <button type="button" onClick={() => removeJourneyStep(idx)} className="btn btn-danger ms-2">
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addJourneyStep} className="btn btn-secondary mb-2">
                    Add Step
                </button>
                <div className="error">{formik.errors.journey}</div>

                <label>Video Link</label>
                <input
                    type="text"
                    name="video"
                    value={formik.values.video}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className="error">{formik.touched.video && formik.errors.video}</div>

                <label>Date</label>
                <input
                    type="date"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className="error">{formik.touched.date && formik.errors.date}</div>

                <button type="submit" className="btn btn-success border-0 rounded-3 my-5 w-100" disabled={isLoading}>
                    {storyId ? "Edit" : "Add"} Rescue Story
                </button>
            </form>
        </div>
    );
};

export default AddRescueStory;