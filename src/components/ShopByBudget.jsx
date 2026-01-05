import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router";
import { Star } from "lucide-react";

const budgetRanges = [
  { label: "Under $20", min: 0, max: 20, color: "bg-pink-500" },
  { label: "$20-30", min: 20, max: 30, color: "bg-orange-400" },
  { label: "$30-50", min: 30, max: 50, color: "bg-green-400" },
  { label: "$50-100", min: 50, max: 100, color: "bg-blue-500" },
  { label: "$100+", min: 100, max: Infinity, color: "bg-purple-500" },
];

const ShopByBudget = () => {
  const [toys, setToys] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/toy-data.json")
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.log("Failed to load toy data:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredToys = selectedBudget
    ? toys.filter(
        (toy) =>
          toy.price >= selectedBudget.min && toy.price < selectedBudget.max
      )
    : [];

  return (
    <div className="py-12 bg-gray-100">
      <h2 className="mb-8 quicksand-font text-5xl font-bold text-center text-secondary">
        Shop by budget
      </h2>

      {/* Budget Buttons */}
      <div className="flex justify-center gap-6 mb-10 flex-wrap">
        {budgetRanges.map((range) => (
          <div
            key={range.label}
            className={`quicksand-font p-3 text-center flex items-center justify-center text-white font-bold text-lg md:text-2xl cursor-pointer rounded-full w-32 h-32 transition-transform transform hover:scale-110 duration-300 ${
              range.color
            } ${
              selectedBudget?.label === range.label
                ? "ring-4 ring-offset-2 ring-gray-300"
                : ""
            }`}
            onClick={() => setSelectedBudget(range)}
          >
            {range.label}
          </div>
        ))}
      </div>

      {/* Toy Cards */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loading />
        </div>
      ) : selectedBudget ? (
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-5 lg:px-10 py-5">
          {filteredToys.length > 0 ? (
            filteredToys.map((toy) => (
              <Link key={toy.toyId} to={`/toyDetails/${toy.toyId}`}>
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <div className="bg-white p-4 flex justify-center items-center">
                    <img
                      src={toy.pictureURL}
                      alt={toy.toyName}
                      className="w-full h-48 object-contain rounded-xl"
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://via.placeholder.com/400x300?text=No+image")
                      }
                    />
                  </div>
                  <div className="p-4 flex flex-col grow justify-between">
                    <div>
                      <h3 className="text-xl font-bold quicksand-font text-purple-700">
                        {toy.toyName}
                      </h3>
                      <p className="text-sm text-gray-500 roboto-font">
                        {toy.subCategory}
                      </p>
                      <p className="mt-2 text-green-700 font-bold text-lg roboto-font">
                        ${toy.price.toFixed(2)}
                      </p>
                      <p className="text-yellow-400 mt-1 roboto-font flex items-center gap-1 text-sm md:text-base">
                        Rating: {toy.rating}
                        <Star size={16} fill="#fa8a1c" />
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 roboto-font">
              No toys available in this budget.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ShopByBudget;
