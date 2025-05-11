import { useState } from "react";
import SplitScreen from "../components/auth/splitScreen";
import { SIGN_IN } from "../constants/authConstants";
import InputButton from "../components/auth/inputButton";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <SplitScreen sign={SIGN_IN}>
      <div className="w-full h-full flex justify-center items-center px-24">
        <div className="w-4/5">
          <h1 className="font-bold text-[42px] text-textPrimary mb-8">Login</h1>

          <form onSubmit={handleSubmit}>
            <InputButton
              field={email}
              title="Email"
              setField={setEmail}
              placeholder="Enter your email"
            />
            <InputButton
              field={password}
              title="Password"
              setField={setPassword}
              placeholder="Enter your password"
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
