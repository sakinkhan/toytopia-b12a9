import React from "react";
import { toast } from "react-toastify";
import { FaPaperPlane } from "react-icons/fa";

const NewsLetter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("You've been subscribed! 🧸✨");
    e.target.reset();
  };

  return (
    <section className="relative overflow-hidden py-24 bg-linear-to-r from-[#FFDEE9] via-[#B5FFFC] to-[#FFF6B7]">
      <div className="absolute -top-10 -left-10 w-56 h-56 bg-[#ffb3c6]/50 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-[#9be7ff]/50 rounded-full blur-3xl"></div>
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* Text Section */}
        <div className="text-center lg:text-left space-y-4 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold quicksand-font text-[#ff5c8d] px-10">
            Be the first to know about toys 🎁
          </h1>
          <p className="roboto-font text-lg md:text-xl text-gray-700 leading-relaxed px-10">
            Get the latest toy drops, fun activities, and exclusive discounts
            delivered straight to your inbox!
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-3xl shadow-xl border-4 border-[#ffb6c1] p-8 w-full max-w-md transition-all hover:scale-[1.02] duration-300">
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div>
              <label className="label roboto-font text-[#ff5c8d] font-semibold text-lg">
                Name
              </label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full roboto-font rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff5c8d]/50"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="label roboto-font text-[#ff5c8d] font-semibold text-lg">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full roboto-font rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff5c8d]/50"
                placeholder="Your Email"
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-full bg-linear-to-r from-[#ff5c8d] to-[#ff9a76] text-white text-lg roboto-font rounded-full border-none shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              Subscribe <FaPaperPlane className="text-white" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
