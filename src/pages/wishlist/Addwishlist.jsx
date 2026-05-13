import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  createWishlistThunk,
  getSingleWishlistThunk,
  updateWishlistThunk,
  resetWishlistState,
} from "../../features/wishlist/wishlistSlice";

const validationSchema = yup.object().shape({
  item: yup.string().required("Item name is required"),
  need: yup.string().required("Need is required"),
  cost: yup.string().required("Cost is required"),
  amazon: yup.string().url("Must be a valid URL").required("Amazon link is required"),
});

const AddWishlist = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const wishlistId = location.pathname.split("/")[3];

  const { isSuccess, isError, isLoading, singleItem } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    if (wishlistId) {
      dispatch(getSingleWishlistThunk(wishlistId));
    } else {
      dispatch(resetWishlistState());
    }
  }, [wishlistId, dispatch]);

  useEffect(() => {
    if (isSuccess && wishlistId) {
      toast.success("Wishlist item updated successfully!");
      navigate("/admin/wishlist-list");
    }
    if (isSuccess && !wishlistId) {
      toast.success("Wishlist item added successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading, wishlistId, navigate]);

  const formik = useFormik({
    initialValues: {
      item: singleItem?.item || "",
      need: singleItem?.need || "",
      cost: singleItem?.cost || "",
      amazon: singleItem?.amazon || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (wishlistId) {
        dispatch(updateWishlistThunk({ id: wishlistId, data: values }));
      } else {
        dispatch(createWishlistThunk(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetWishlistState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">{wishlistId ? "Edit" : "Add"} Wishlist Item</h3>
      <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
        <label>Item Name</label>
        <input
          type="text"
          name="item"
          value={formik.values.item}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="error">{formik.touched.item && formik.errors.item}</div>

        <label>Monthly Need</label>
        <input
          type="text"
          name="need"
          value={formik.values.need}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="error">{formik.touched.need && formik.errors.need}</div>

        <label>Cost</label>
        <input
          type="text"
          name="cost"
          value={formik.values.cost}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="error">{formik.touched.cost && formik.errors.cost}</div>

        <label>Amazon Link</label>
        <input
          type="text"
          name="amazon"
          value={formik.values.amazon}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="error">{formik.touched.amazon && formik.errors.amazon}</div>

        <button type="submit" className="btn btn-success border-0 rounded-3 my-5 w-100">
          {wishlistId ? "Edit" : "Add"} Wishlist Item
        </button>
      </form>
    </div>
  );
};

export default AddWishlist;
