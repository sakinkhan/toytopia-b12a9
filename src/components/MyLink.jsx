import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "font-bold border-b-2 text-lg roboto-font"
          : `${className} text-lg`
      }
    >
      <li>{children}</li>
    </NavLink>
  );
};

export default MyLink;
