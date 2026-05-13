import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";
import { Select, Switch } from "antd"; // Using Ant Design components for better UX
import {
    createneedsThunk,
    getSingleneedsThunk,
    updateneedsThunk,
    resetneedsState,
} from "../../features/needs/needSlice";
import { getAllProductsThunk } from "../../features/products/ProductSlice";
import { delImg, uploadImg, resetUploadState } from "../../features/upload/uploadSlice";

const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    fundingGoal: yup.number().when("isCampaign", {
        is: true,
        then: (schema) => schema.required("Funding goal is required for campaigns").min(1),
        otherwise: (schema) => schema.notRequired(),
    }),
});

const AddNeed = () => {
    const dispatch = useDispatch();
    const { id: needId } = useParams();
    const navigate = useNavigate();
    const [localImages, setLocalImages] = useState([]);

    const { isSuccess, isError, isLoading, singleNeeds } = useSelector((state) => state.needs);
    const { products } = useSelector((state) => state.product);
    const imgState = useSelector((state) => state.upload.images);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            isCampaign: false,
            fundingGoal: 0,
            status: "active",
            neededProducts: [],
            youtubeUrl: "",
            content: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const uploadedImages = imgState.map((img) => ({ public_id: img.public_id, url: img.url }));
            const payload = { ...values, images: [...localImages, ...uploadedImages] };

            if (needId) {
                dispatch(updateneedsThunk({ id: needId, data: payload }));
            } else {
                dispatch(createneedsThunk(payload));
            }
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        dispatch(getAllProductsThunk());
        dispatch(resetneedsState());
        if (needId) {
            dispatch(getSingleneedsThunk(needId));
        }
    }, [needId]);

    useEffect(() => {
        if (singleNeeds) {
            setLocalImages(singleNeeds.images || []);
            formik.setValues({
                title: singleNeeds.title || "",
                description: singleNeeds.description || "",
                isCampaign: singleNeeds.isCampaign || false,
                fundingGoal: singleNeeds.fundingGoal || 0,
                status: singleNeeds.status || "active",
                neededProducts: singleNeeds.neededProducts?.map(p => p._id) || [],
                youtubeUrl: singleNeeds.youtubeUrl || "",
                content: singleNeeds.content || "",
            });
        }
    }, [singleNeeds]);

    useEffect(() => {
        if (isSuccess && needId) {
            toast.success("Need updated successfully!");
            navigate("/admin/needadmin");
            dispatch(resetneedsState());
        } else if (isSuccess && !needId) {
            toast.success("Need added successfully!");
            formik.resetForm();
            setLocalImages([]);
            dispatch(resetUploadState()); // Clear the Redux image state
            setTimeout(() => {
                dispatch(resetneedsState());
                navigate("/admin/needadmin");
            }, 500);
        }
        if (isError) {
            toast.error("Something went wrong!");
        }
    }, [isSuccess, isError, isLoading]);

    return (
        <div>
            <h3 className="mb-4 title">{needId ? "Edit" : "Add"} Need / Campaign</h3>
            <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
                <div className="row g-4">
                    <div className="col-lg-8">
                        <label className="fw-bold mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control mb-2"
                            placeholder="Enter Campaign Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                        <div className="error mb-3">{formik.touched.title && formik.errors.title}</div>

                        <label className="fw-bold mb-1">Description</label>
                        <textarea
                            name="description"
                            rows={6}
                            className="form-control mb-2"
                            placeholder="Enter the story and why this is a need..."
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        <div className="error mb-3">{formik.touched.description && formik.errors.description}</div>

                        <label className="fw-bold mb-1 mt-3">YouTube Video URL</label>
                        <input
                            type="text"
                            name="youtubeUrl"
                            className="form-control mb-2"
                            placeholder="e.g., https://www.youtube.com/watch?v=..."
                            value={formik.values.youtubeUrl}
                            onChange={formik.handleChange}
                        />
                        <p className="text-muted small">You can paste a standard YouTube video link here.</p>
                    </div>

                    <div className="col-lg-4 mb-4">
                        <div className="card p-3 shadow-sm">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <label className="fw-bold m-0">Is this a Goal-based Campaign?</label>
                                <Switch
                                    checked={formik.values.isCampaign}
                                    onChange={(checked) => formik.setFieldValue("isCampaign", checked)}
                                />
                            </div>

                            {formik.values.isCampaign && (
                                <div className="mb-3">
                                    <label className="fw-bold mb-1">Funding Goal (₹)</label>
                                    <input
                                        type="number"
                                        name="fundingGoal"
                                        className="form-control"
                                        value={formik.values.fundingGoal}
                                        onChange={formik.handleChange}
                                    />
                                    <div className="error">{formik.touched.fundingGoal && formik.errors.fundingGoal}</div>
                                </div>
                            )}



                            <div className="mb-3">
                                <label className="fw-bold mb-1">Status</label>
                                <Select
                                    className="w-100"
                                    value={formik.values.status}
                                    onChange={(value) => formik.setFieldValue("status", value)}
                                    options={[
                                        { value: "active", label: "Active" },
                                        { value: "urgent", label: "Urgent" },
                                        { value: "completed", label: "Completed" },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card p-3 shadow-sm mt-3">
                    <label className="fw-bold mb-2">Associate Products (Donation Items)</label>
                    <Select
                        mode="multiple"
                        allowClear
                        className="w-100"
                        placeholder="Select products donors can buy for this campaign"
                        value={formik.values.neededProducts}
                        onChange={(value) => formik.setFieldValue("neededProducts", value)}
                    >
                        {products?.map((prod) => (
                            <Select.Option key={prod._id} value={prod._id}>
                                {prod.name} (₹{prod.price})
                            </Select.Option>
                        ))}
                    </Select>
                    <p className="text-muted small mt-2">These products will be displayed as options for donors on the campaign page.</p>
                </div>

                <div className="card p-3 shadow-sm mt-3">
                    <label className="fw-bold mb-2">Detailed Content (Full Story)</label>
                    <ReactQuill
                        theme="snow"
                        value={formik.values.content}
                        onChange={(value) => formik.setFieldValue("content", value)}
                        placeholder="Write the full detailed story of the campaign here..."
                        modules={{
                            toolbar: [
                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                [{ size: [] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                { 'indent': '-1' }, { 'indent': '+1' }],
                                ['link', 'image', 'video'],
                                ['clean']
                            ],
                        }}
                    />
                    <p className="text-muted small mt-2">This content will be displayed below the video on the campaign page.</p>
                </div>

                <div className="mt-4">
                    <label className="fw-bold">Upload Gallery Images</label>
                    <div className="bg-white border-dashed p-5 text-center mt-2 rounded border-secondary border-1">
                        <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p className="m-0">Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3 mt-3">
                        {localImages?.map((i, j) => (
                            <div className="position-relative" key={`local-${j}`}>
                                <button
                                    type="button"
                                    onClick={() => setLocalImages(localImages.filter((_, idx) => idx !== j))}
                                    className="btn-close position-absolute"
                                    style={{ top: "10px", right: "10px", background: "white" }}
                                ></button>
                                <img src={i.url} alt="" width={150} height={150} className="object-cover rounded shadow-sm border" />
                            </div>
                        ))}
                        {imgState?.map((i, j) => (
                            <div className="position-relative" key={`new-${j}`}>
                                <button
                                    type="button"
                                    onClick={() => dispatch(delImg(i.public_id))}
                                    className="btn-close position-absolute"
                                    style={{ top: "10px", right: "10px", background: "white" }}
                                ></button>
                                <img src={i.url} alt="" width={150} height={150} className="object-cover rounded shadow-sm border" />
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-success border-0 rounded-3 my-5 py-3 w-100 fw-bold" disabled={isLoading}>
                    {needId ? "Update Campaign" : "Create Campaign"}
                </button>
            </form>
        </div>
    );
};

export default AddNeed;
