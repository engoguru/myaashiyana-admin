import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import {
  createFaq,
  getSingleFaq,
  resetState,
  updateFaq,
} from "../../features/faq/Faqslice";


const Schema = yup.object().shape({
  question: yup.string().required("Question is required"),
  answer: yup.string().required("Answer is required"),
});

const AddFaq = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const faqId = location.pathname.split("/")[3];
  const navigate = useNavigate();

  const faqState = useSelector((state) => state.faq || {});
  const {
    isSuccess,
    isError,
    isLoading,
    doneFaq,
    elQuestion,
    elAnswer,
    updatedFaq,
    message,
  } = faqState;

  useEffect(() => {
    if (faqId) {
      dispatch(getSingleFaq(faqId));
    } else {
      dispatch(resetState());
    }
  }, [faqId]);

  useEffect(() => {
    if (isSuccess && doneFaq) {
      toast.success("FAQ Added Successfully!");
    }
    if (isSuccess && updatedFaq) {
      toast.success("FAQ Updated Successfully!");
      navigate("/admin/Faq_list");
    }
    if (isError) {
      toast.error(message || "Something went wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: elQuestion || "",
      answer: elAnswer || "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      if (faqId) {
        const data = { id: faqId, faqData: values };
        dispatch(updateFaq(data));
        dispatch(resetState());
      } else {
        dispatch(createFaq(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">{faqId ? "Edit" : "Add"} FAQ</h3>
      <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
        <CustomInput
          type="text"
          label="Enter question"
          name="question"
          onCh={formik.handleChange}
          val={formik.values.question}
          onBl={formik.handleBlur}
        />
        <div className="error">{formik.touched.question && formik.errors.question}</div>

        <CustomInput
          type="text"
          label="Enter answer"
          name="answer"
          onCh={formik.handleChange}
          val={formik.values.answer}
          onBl={formik.handleBlur}
        />
        <div className="error">{formik.touched.answer && formik.errors.answer}</div>

        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 my-5 w-100"
        >
          {faqId ? "Update" : "Add"} FAQ
        </button>
      </form>
    </div>
  );
};

export default AddFaq;
