import InputButton from "../components/auth/inputButton";
import SplitScreen from "../components/auth/splitScreen";
import { SIGN_UP } from "../constants/authConstants";
import { Link } from "react-router-dom";
import { registerSchema } from "../validations/userValidation";
import { useFormik } from "formik";
import { register as authServiceRegister } from "../auth/authServices";
import { useAuth } from "../auth/authContext";
import { useState, useEffect } from "react";
import Footer from "../components/footer";

export default function Register() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      // User is already logged in, don't show register form
      return;
    }
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,

    onSubmit: async (values) => {
      const newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      try {
        setIsLoading(true);
        setError(null);

        // Call the auth service to get the response
        const response = await authServiceRegister(newUser);

        if (response.status === "success") {
          // Use the auth context login function to update the context
          await login(response.token, response.data.user);
        } else if (response.status === "error") {
          throw new Error(response.message);
        }
      } catch (error) {
        setError(error.message);
        console.error("Registration error:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <SplitScreen sign={SIGN_UP}>
      <div className="w-full h-full flex justify-center items-center px-24">
        <div className="w-4/5">
          <h1 className="font-bold text-[32px] text-textPrimary dark:text-white mb-8">
            Create an account
          </h1>

          <form onSubmit={formik.handleSubmit}>
            <InputButton
              type="text"
              value={formik.values.name}
              title="Name"
              placeholder="Enter your name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              error={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : null
              }
            />
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
            <InputButton
              type="password"
              value={formik.values.confirmPassword}
              title="Confirm Password"
              placeholder="Confirm your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="confirmPassword"
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : null
              }
            />

            {error && (
              <p className="mb-4 text-red-600 dark:text-red-400">{error}</p>
            )}

            <div className="flex flex-row gap-2 mb-2 mt-12">
              <p className="text-textGray dark:text-gray-300 text-[14px] font-openSans">
                By signing in, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary dark:bg-secondary text-white dark:text-primary font-bold p-3 rounded-md w-full text-[18px] hover:bg-primaryHover dark:hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:ring-opacity-50 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  <span className="ml-2">Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="flex flex-row gap-2 mb-8">
              <p className="text-textGray dark:text-gray-300 text-[14px] font-openSans">
                Already have an account?
              </p>
              <Link
                to="/login"
                className="text-primary dark:text-secondary text-[16px] font-openSans hover:text-primaryHover dark:hover:text-accent"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </SplitScreen>
  );
}
