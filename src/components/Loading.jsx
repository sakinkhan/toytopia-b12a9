import React from "react";
import logoImg from "../assets/logo.png";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-50">
      <img src={logoImg} alt="logo" className="w-20" />
      <p className="roboto-font text-4xl font-extrabold text-primary ml-7">
        L<span className="loading loading-spinner text-error"></span>
        ading
        <span className="loading loading-dots loading-xl mt-3"></span>
      </p>
    </div>
  );
};

export default Loading;
