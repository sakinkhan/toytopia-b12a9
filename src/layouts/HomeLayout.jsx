import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const HomeLayout = () => {
  const { state } = useNavigation();
  return (
    <div>
      <Navbar></Navbar>
      <div>{state === "loading" ? <Loading></Loading> : <Outlet></Outlet>}</div>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
