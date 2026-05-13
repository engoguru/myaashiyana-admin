import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import { createAdmin } from "../../features/auth/authSlice";

let Schema = yup.object().shape({
  username: yup.string().required("Username Is Required."),
  phone: yup.number().required("Phone Number Is Required."),
  email: yup.string().email('Email should be valid').required('Email Is Required'),
  role: yup.string().required('Role Is Required'),
  password: yup.string().required('Password Is Required'),
});

const AddUsers = () => {
  const dispatch = useDispatch();


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: '',
      phone:'',
      role:'',
      email: '',
      password: '',
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      dispatch(createAdmin(values));
    },
  });
  
  
    return (
        <>
          <div>
          <h3 className="mb-4 title">
            Add User
          </h3>
          <div>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex gap-3 flex-column"
            >


        <CustomInput
            type="text"
            label="Enter Username"
            name="username"
            onCh={formik.handleChange("username")}
            val={formik.values.username}
            onBl={formik.handleBlur("username")}
          />

          <div className="error">
            {formik.touched.username && formik.errors.username}
          </div>

        <CustomInput
            type="text"
            label="Enter Emaiil"
            name="email"
            onCh={formik.handleChange("email")}
            val={formik.values.email}
            onBl={formik.handleBlur("email")}
          />

          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>


        <CustomInput
            type="number"
            label="Enter Phone"
            name="phone"
            onCh={formik.handleChange("phone")}
            val={formik.values.phone}
            onBl={formik.handleBlur("phone")}
          />

          <div className="error">
            {formik.touched.phone && formik.errors.phone}
          </div>


        <CustomInput
            type="text"
            label="Enter Password"
            name="password"
            onCh={formik.handleChange("password")}
            val={formik.values.password}
            onBl={formik.handleBlur("password")}
          />

          <div className="error">
            {formik.touched.password && formik.errors.password}
          </div>


        <CustomInput
            type="text"
            label="Enter Role - admin or user"
            name="role"
            onCh={formik.handleChange("role")}
            val={formik.values.role}
            onBl={formik.handleBlur("role")}
          />

          <div className="error">
            {formik.touched.role && formik.errors.role}
          </div> 
    
              
              <button
                type="submit"
                className="btn btn-success border-0 rounded-3 my-5 w-100"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
        </>
  )
}

export default AddUsers;