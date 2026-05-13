import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { createLogin, resetState } from "../features/auth/authSlice";
import CustomInput from "../components/CustomInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";

let Schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      dispatch(createLogin(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 300);
    },
  });

  const authState = useSelector((state) => state.auth);
  const { user, isSuccess, message } = authState;

  useEffect(() => {
    if (isSuccess && user) {
      console.log("Login successful, user data:", user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login Successfully.");
      navigate("/admin");
    } else if (isSuccess && !user) {
      toast.error("Login failed. Please try again.");
    }
  }, [user, isSuccess, message, navigate]);

  return (
    <>
      <div
        className="py-5 px-3"
        style={{ background: "#1677FF", minHeight: "100vh" }}
      >
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="col-11 col-sm-8 col-md-5 col-lg-3 bg-white rounded-3 p-4 shadow">
            <h3 className="text-center fw-bold">Sign In</h3>
            <p className="text-center text-muted">
              Login to your account to continue
            </p>
            <div className="error text-center">
              {message.message == "Rejected" ? "Yor are not an Admin" : ""}
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
              <CustomInput
                type="email"
                name="email"
                label="Email Address"
                id="email"
                val={formik.values.email}
                onCh={formik.handleChange("email")}
              />
              <div className="error">
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="position-relative">
                <CustomInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  id="pass"
                  val={formik.values.password}
                  onCh={formik.handleChange("password")}
                />
                <span
                  className="position-absolute translate-middle-y cursor-pointer"
                  style={{
                    top: "37px",
                    right: "15px",
                    zIndex: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} color="#777" />
                  ) : (
                    <FaEye size={20} color="#777" />
                  )}
                </span>
              </div>
              <div className="error">
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>
              <button
                className="border-0 px-3 mt-3 py-2 text-light fw-bold w-100 text-center text-decoration-none"
                style={{ background: "#1677FF" }}
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
