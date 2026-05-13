import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Dropzone from "react-dropzone";
import { toast } from "react-hot-toast";
import {
    createProductThunk,
    getSingleProductThunk,
    updateProductThunk,
    resetProductState,
} from "../../features/products/ProductSlice";
import { delImg, uploadImg } from "../../features/upload/uploadSlice";

const validationSchema = yup.object().shape({
    name: yup.string().required("Product name is required"),
    description: yup.string().required("Description is required"),
    price: yup
        .number()
        .typeError("Price must be a number")
        .required("Price is required")
        .min(1, "Price must be at least 1"),
});

const AddProduct = () => {
    const dispatch = useDispatch();
    const { id: productId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [localImages, setLocalImages] = useState([]);

    const { isSuccess, isError, isLoading, singleProduct, updated } = useSelector(
        (state) => state.product
    );
    const imgState = useSelector((state) => state.upload.images);

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const uploadedImages = imgState.map((img) => ({ public_id: img.public_id, url: img.url }));
            const payload = { ...values, images: [...localImages, ...uploadedImages] };

            if (productId) {
                dispatch(updateProductThunk({ id: productId, data: payload }));
            } else {
                dispatch(createProductThunk(payload));
            }
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        dispatch(resetProductState());
        if (productId) {
            dispatch(getSingleProductThunk(productId));
        }
    }, [productId]);

    useEffect(() => {
        if (singleProduct) {
            setLocalImages(singleProduct.images || []);
            formik.setValues({
                name: singleProduct.name || "",
                description: singleProduct.description || "",
                price: singleProduct.price || "",
            });
        }
    }, [singleProduct]);

    useEffect(() => {
        if (isSuccess && productId && updated) {
            toast.success("Product updated successfully!");
            navigate("/admin/productadmin");
            dispatch(resetProductState());
        } else if (isSuccess && !productId) {
            toast.success("Product added successfully!");
            formik.resetForm();
            setLocalImages([]);
            setTimeout(() => {
                dispatch(resetProductState());
                navigate("/admin/productadmin");
            }, 500);
        }
        if (isError) {
            toast.error("Something went wrong!");
        }
    }, [isSuccess, isError, isLoading, updated]);

    return (
        <div>
            <h3 className="mb-4 title">{productId && productId !== "undefined" ? "Edit" : "Add"} Product</h3>
            <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
                <label>Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className="error">{formik.touched.name && formik.errors.name}</div>

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
                    {/* New Uploads */}
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

                <label>Description</label>
                <textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={4}
                />
                <div className="error">{formik.touched.description && formik.errors.description}</div>

                <label>Price (₹)</label>
                <input
                    type="number"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className="error">{formik.touched.price && formik.errors.price}</div>

                <button
                    type="submit"
                    className="btn btn-success border-0 rounded-3 my-5 w-100"
                    disabled={isLoading}
                >
                    {productId ? "Edit" : "Add"} Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
