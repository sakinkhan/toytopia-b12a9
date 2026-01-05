import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loading from "./Loading";
import { Link } from "react-router";
import { Star } from "lucide-react";

const MySlider = () => {
  const [topToys, setTopToys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/toy-data.json")
      .then((res) => res.json())
      .then((data) =>
        setTopToys(data.sort((a, b) => b.rating - a.rating).slice(0, 6))
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  if (!topToys.length) {
    return (
      <div className="py-8 text-center">
        <p>No featured toys to show.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
      >
        {topToys.map((toy) => (
          <SwiperSlide key={toy.toyId}>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-center gap-5 py-10 px-20">
              <div className="w-full md:w-2/3 shrink-0">
                <img
                  src={toy.pictureURL || ""}
                  alt={toy.toyName}
                  loading="lazy"
                  className="object-cover w-60 h-60 md:w-120 md:h-120 rounded-2xl shadow-xl"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=No+image";
                  }}
                />
              </div>

              <div className="w-full md:w-1/3">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 quicksand-font text-[#ff5c8d]">
                  {toy.toyName}
                </h3>
                <p className="text-sm md:text-base my-3 text-gray-700 roboto-font">
                  {toy.description}
                </p>
                <p className="roboto-font font-semibold text-[#fa8a1c] my-2 flex items-center">
                  Rating: {toy.rating}{" "}
                  <Star size={18} fill="#fa8a1c" className="ml-1"></Star>
                </p>
                <p className="text-sm md:text-base mb-3 text-secondary roboto-font">
                  <span className="font-semibold">Quanitity Available:</span>{" "}
                  {toy.availableQuantity}
                </p>

                <div className="flex items-center justify-between md:justify-start gap-4">
                  <div>
                    <div className="font-bold roboto-font text-2xl text-primary">
                      ${toy.price?.toFixed(2)}
                    </div>
                  </div>
                </div>
                <Link
                  to={`/toyDetails/${toy.toyId}`}
                  className="btn bg-linear-to-r from-[#fa8a1c] to-[#db5880] border-none text-white text-lg px-8 py-3 shadow-lg hover:scale-105 transition-transform duration-300 mt-9 roboto-font"
                >
                  View More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MySlider;
