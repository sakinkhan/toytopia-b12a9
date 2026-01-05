import { sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.config";

const ForgetPassword = () => {
  const location = useLocation();
  const emailRef = useRef();

  useEffect(() => {
    if (location.state?.email) {
      emailRef.current.value = location.state.email;
    }
  }, [location.state]);

  const handleReset = (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value.trim();

    if (!emailValue) {
      toast.warn("Please enter your email address.");
      return;
    }

    sendPasswordResetEmail(auth, emailValue)
      .then(() => {
        toast.info(
          `Password reset link sent to ${emailValue}. Check your inbox or spam folder!`
        );
        window.open("https://mail.google.com", "_blank");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to send password reset email. Please try again.");
      });
    console.log(emailValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 quicksand-font">
          Reset Password
        </h2>
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full text-white p-3 rounded btn btn-secondary text-[16px] roboto-font"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
