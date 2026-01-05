import { Star } from "lucide-react";
import React, { use, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const ToyCard = ({ toy }) => {
  const { addToWishlist, wishlist } = use(AuthContext);
  const [added, setAdded] = useState(
    Boolean(wishlist?.find((item) => item.toyId === toy.toyId))
  );
  const {
    toyName,
    description,
    pictureURL,
    availableQuantity,
    price,
    rating,
    sellerEmail,
    sellerName,
    subCategory,
  } = toy;

  const handleAddToWishlist = () => {
    addToWishlist(toy);
    setAdded(true);
    toast.success(`${toy.toyName} has been added to your wishlist!`);
  };

  return (
    <div className="hero bg-base-200 px-16 pb-8">
      <title>{toyName}</title>
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <img src={pictureURL} className="md:max-w-lg rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-3xl font-bold quicksand-font text-purple-700">
            {toyName}
          </h1>
          <p className="roboto-font my-3">{description}</p>
          <p className="roboto-font font-bold mb-1 mt-8 text-2xl text-primary">
            Price: ${price.toFixed(2)}
          </p>
          <p className="roboto-font font-semibold my-1 text-secondary">
            Quantity Available: {availableQuantity}
          </p>
          <p className="roboto-font font-semibold text-[#fa8a1c] my-2 flex items-center">
            Rating: {rating}{" "}
            <Star size={18} fill="#fa8a1c" className="ml-1"></Star>
          </p>
          <p className="roboto-font font-semibold my-2">
            Category:{" "}
            <span className="border rounded-full py-1 px-3 text-white bg-gray-400">
              {subCategory}
            </span>
          </p>
          <p className="roboto-font my-2">
            <span className="font-semibold">Seller Name:</span> {sellerName}
          </p>
          <p className="roboto-font my-2">
            <span className="font-semibold ">Seller Email:</span>{" "}
            <a
              href={`mailto:${sellerEmail}`}
              className="text-blue-600 hover:underline"
            >
              {sellerEmail}
            </a>
          </p>
          <div className="py-5">
            <button
              onClick={handleAddToWishlist}
              disabled={added}
              className={`btn roboto-font text-[16px] flex items-center gap-2 hover:scale-105 duration-300 transition-all ${
                added
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-pink-500 text-white"
              }`}
            >
              <FaHeart />
              {added ? "Added to Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToyCard;
