import React, { use, useRef, useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const { user, logInUser, loginWithGoogle } = use(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    logInUser(email, password)
      .then(() => {
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("You have successfully signed in");
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(`Oops, following error happened: ${errorCode}`);
      });
  };

  // Google Sign in
  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then(() => {
        toast.success("Signed in with Google successfully!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google sign-in failed. Please try again.");
      });
  };

  // Forget Password
  const emailRef = useRef();
  const handleForgetPassword = () => {
    const emailValue = emailRef.current.value;
    navigate("/forget-password", { state: { email: emailValue } });
  };
  return (
    <div>
      {user ? (
        <div>
          <p className="quicksand-font text-5xl text-center font-bold py-50 text-secondary">
            You are already Logged in!
          </p>
          <title>ToyTopia - Register</title>
        </div>
      ) : (
        <div className="hero bg-base-200 min-h-screen">
          <title>ToyTopia - Login</title>
          <div className="hero-content flex-col">
            <div className="card bg-blue-100 w-full shrink-0 shadow-2xl py-5 px-5">
              <h1 className="text-3xl font-bold quicksand-font text-center text-secondary">
                Login now!
              </h1>
              <div className="card-body roboto-font">
                <form onSubmit={handleLogin}>
                  <fieldset className="fieldset">
                    {/* Email */}
                    <label className="label text-[16px] roboto-font">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      ref={emailRef}
                      className="input text-[16px] roboto-font"
                      placeholder="Email"
                    />
                    {/* Password */}
                    <label className="label text-[16px] roboto-font">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="input text-[16px] z-0 roboto-font"
                        placeholder="Password"
                      />
                      <button
                        onClick={handleTogglePassword}
                        className="absolute z-10 right-3 top-3 rounded-full"
                      >
                        {showPassword ? (
                          <IoIosEyeOff size={18} />
                        ) : (
                          <IoMdEye size={18} />
                        )}
                      </button>
                    </div>
                    <div onClick={handleForgetPassword}>
                      <a className="link link-hover text-[16px] roboto-font">
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-neutral bg-primary mt-4 text-[16px] roboto-font hover:bg-green-500 border-0"
                    >
                      Login
                    </button>
                    <p className="py-3 font-semibold text-[16px] roboto-font">
                      Don't have an account? Please{" "}
                      <Link
                        to={"/register"}
                        className="text-secondary hover:underline"
                      >
                        Register
                      </Link>
                    </p>
                    {/* Google */}
                    <div className=" border-t-2 border-gray-400 pt-5">
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="btn bg-white text-black border-[#e5e5e5] w-full roboto-font hover:bg-black hover:text-white"
                      >
                        <svg
                          aria-label="Google logo"
                          width="16"
                          height="16"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path
                              fill="#34a853"
                              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                            ></path>
                            <path
                              fill="#4285f4"
                              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                            ></path>
                            <path
                              fill="#fbbc02"
                              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                            ></path>
                            <path
                              fill="#ea4335"
                              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                            ></path>
                          </g>
                        </svg>
                        Login with Google
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
