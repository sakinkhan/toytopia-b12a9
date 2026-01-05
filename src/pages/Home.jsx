import React, { use } from "react";
import MySlider from "../components/MySlider";
import Hero from "../components/Hero";
import ShopByBudget from "../components/ShopByBudget";
import NewsLetter from "../components/NewsLetter";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";

const Home = () => {
  const { loading } = use(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <section>
        <Hero></Hero>
      </section>
      <section className="my-15">
        <h1 className="quicksand-font text-5xl font-bold text-center text-purple-700">
          Popular Toys
        </h1>
        <MySlider></MySlider>
      </section>
      <section>
        <ShopByBudget></ShopByBudget>
      </section>
      <section>
        <NewsLetter></NewsLetter>
      </section>
    </div>
  );
};

export default Home;
