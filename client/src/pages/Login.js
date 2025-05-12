import SplitScreen from "../components/auth/splitScreen";
import { SIGN_IN } from "../constants/authConstants";
import InputButton from "../components/auth/inputButton";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../validations/userValidation";
import { login } from "../auth/authServices";
// import { useAuth } from "../auth/authContext";

export default function Login() {
  const navigate = useNavigate();
  // const { isAuthenticated, isAdmin } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const user = {
        email: values.email,
        password: values.password,
      };

      try {
        const response = await login(user);
        if (response) {
          console.log(response);
          localStorage.setItem("token", response.token);
          navigate("/");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
      // const response = await login(user);
    },
  });

  // if (isAuthenticated) {
  //   return navigate("/");
  // }
  return (
    <SplitScreen sign={SIGN_IN}>
      <div className="w-full h-full flex justify-center items-center px-24">
        <div className="w-4/5">
          <h1 className="font-bold text-[42px] text-textPrimary mb-8">Login</h1>

          <form onSubmit={formik.handleSubmit}>
            <InputButton
              type="email"
              value={formik.values.email}
              title="Email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
            />
            <InputButton
              type="password"
              value={formik.values.password}
              title="Password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null
              }
            />

            <div className="flex flex-row justify-between mb-8">
              <a
                href="/forgot-password"
                className="text-textGray text-[16px] font-openSans hover:text-primary ml-auto"
              >
                Forgot password?
              </a>
            </div>

            {/* <div className="flex flex-row gap-2 mb-8">
              <p className="text-textGray text-[16px] font-openSans">
                By signing in, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div> */}

            {/* <Button
              type="submit"
              textContent={"Login"}
              onClick={handleSubmit}
            /> */}

            <button
              type="submit"
              className="bg-primary text-white font-bold p-4 rounded-md w-full text-[20px] hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 mb-7"
            >
              Login
            </button>

            <div className="flex flex-row gap-2 mb-8">
              <p className="text-textGray text-[16px] font-openSans">
                Don't have an account?
              </p>
              <Link
                to="/register"
                className="text-primary text-[16px] font-openSans hover:text-primaryHover"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </SplitScreen>
  );
}
