import React, { use } from "react";
import logoImg from "../assets/logo.png";
import { Link, NavLink } from "react-router";
import MyLink from "./MyLink";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const links = (
    <>
      <MyLink to={"/"}>🏠 Home</MyLink>
      <MyLink to={"/profile"}>👤 My Profile</MyLink>
      <MyLink to={"/wishlist"}>💖 My Wishlist</MyLink>
    </>
  );

  const { user, logOut } = use(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.error("You have been logged out");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="navbar bg-white shadow-lg lg:px-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content rounded-box z-30 mt-3 w-52 p-2 shadow text-secondary bg-base-200 roboto-font space-y-2"
          >
            {links}
          </ul>
        </div>
        <Link>
          <img src={logoImg} alt="logo" className="w-22" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 roboto-font space-x-5 text-secondary">
          {links}
        </ul>
      </div>
      <div className="navbar-end space-x-2">
        <div
          className={
            user ? "tooltip tooltip-bottom tooltip-secondary z-50" : ""
          }
        >
          <div className="tooltip-content">
            <div className="text-white text-lg font-semibold roboto-font">
              {user?.displayName}
            </div>
          </div>
          <img
            src={`${
              user
                ? user.photoURL
                : "https://img.icons8.com/?size=50&id=23265&format=png"
            }`}
            alt="user image"
            className="rounded-full w-10 h-10 border-2 p-1 border-[#db5880] cursor-pointer"
          />
        </div>
        {user ? (
          <button
            onClick={handleLogout}
            className="btn roboto-font text-primary font-bold bg-accent text-lg px-5 hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        ) : (
          <Link to={"/login"}>
            <button className="btn roboto-font text-primary font-bold bg-accent text-lg px-5 hover:bg-green-500 hover:text-white">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
