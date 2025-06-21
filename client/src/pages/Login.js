import SplitScreen from "../components/auth/splitScreen";
import { SIGN_IN } from "../constants/authConstants";
import InputButton from "../components/auth/inputButton";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../validations/userValidation";
import { login as authServiceLogin } from "../auth/authServices";
import { useAuth } from "../auth/authContext";
import { useState, useEffect } from "react";
import Footer from "../components/footer";

export default function Login() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      // User is already logged in, don't show login form
      return;
    }
  }, [isAuthenticated]);

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
        setIsLoading(true);
        setError(null);

        // Call the auth service to get the response
        const response = await authServiceLogin(user);

        if (response.status === "success") {
          // Use the auth context login function to update the context
          await login(response.token, response.user);
        } else if (response.status === "fail") {
          throw new Error(response.message);
        }
      } catch (error) {
        setError(error.message);
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <SplitScreen sign={SIGN_IN}>
        <div className="w-full h-full flex justify-center items-center px-24">
          <div className="w-4/5">
            <h1 className="font-bold text-[32px] text-textPrimary dark:text-white mb-8">
              Login
            </h1>

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

              {error && (
                <p className="text-red-600 dark:text-red-400">{error}</p>
              )}

              <div className="flex flex-row justify-between mb-8">
                <a
                  href="/forgot-password"
                  className="text-textGray dark:text-gray-300 text-[16px] font-openSans hover:text-primary dark:hover:text-secondary ml-auto"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary dark:bg-secondary text-white dark:text-primary font-bold p-3 rounded-md w-full text-[18px] hover:bg-primaryHover dark:hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:ring-opacity-50 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    <span className="ml-2">Logging in...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>

              <div className="flex flex-row gap-2 mb-8">
                <p className="text-textGray dark:text-gray-300 text-[16px] font-openSans">
                  Don't have an account?
                </p>
                <Link
                  to="/register"
                  className="text-primary dark:text-secondary text-[16px] font-openSans hover:text-primaryHover dark:hover:text-accent"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </SplitScreen>
      <Footer />
    </div>
  );
}
