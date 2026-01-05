import React, { use } from "react";
import heroBg from "../assets/hero-bg.jpg";
import logoImg from "../assets/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Hero = () => {
  const { user } = use(AuthContext);

  const heroTitle = user
    ? `Welcome${user.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}!`
    : "Join the fun — create your account today!";

  const heroSubtitle = user
    ? "Discover fun new toys, sign up to try the latest ones, build your wishlist, and stay in the loop with our newsletter — everything you love, all right here."
    : "Register today to enjoy exclusive offers, test new toys, save your favorites to your wishlist, and be the first to know about new releases!";

  return (
    <div className="relative h-auto md:h-[70vh] w-full flex items-center justify-center py-10">
      <img
        src={heroBg}
        alt="Hero Background"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      <div className="relative z-20 container mx-auto flex flex-col md:flex-row items-center justify-between gap-5 md:gap-16 px-8 md:px-20">
        {/* Left Side*/}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5 max-w-xl">
          <img src={logoImg} alt="Logo" className="w-50 md:w-80 lg:w-100" />
        </div>
        {/* Right Side */}
        <div className="text-center md:text-left space-y-6 max-w-xl">
          <h1 className="text-white quicksand-font text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {heroTitle}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl leading-relaxed roboto-font">
            {heroSubtitle}
          </p>

          {!user && (
            <Link to="/register">
              <button className="btn bg-linear-to-r from-[#fa8a1c] to-[#db5880] border-none text-white text-lg px-8 py-3 shadow-lg hover:scale-105 transition-transform duration-300 roboto-font">
                Register Now
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
