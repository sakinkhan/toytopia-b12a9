import React, { use } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { MdDeleteForever } from "react-icons/md";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, loading } = use(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }

  const handleRemove = (toyId, toyName) => {
    removeFromWishlist(toyId);
    toast.info(`${toyName} has been removed from your wishlist.`);
  };

  return (
    <div className="mx-auto py-10 bg-base-200 min-h-screen">
      <title>ToyTopia - My Wishlist</title>
      <h2 className="text-4xl font-extrabold text-center quicksand-font text-purple-700 mb-6">
        My Wishlist ({wishlist.length})
      </h2>
      <p className="text-center text-lg text-gray-600 mb-10 roboto-font">
        Your favorite toys all in one place!
      </p>

      {!wishlist || wishlist.length === 0 ? (
        <p className="text-center text-gray-500 roboto-font">
          Your wishlist is empty! Start adding your favorite toys.
        </p>
      ) : (
        <div className="flex flex-col gap-8 px-20">
          {wishlist.map((toy) => (
            <div
              key={toy.toyId}
              className="flex flex-col md:flex-row items-center justify-between bg-linear-to-r from-pink-100 via-yellow-100 to-blue-100 rounded-2xl shadow-xl relative"
            >
              <div className="flex flex-col md:flex-row items-center">
                <img
                  src={toy.pictureURL}
                  alt={toy.toyName}
                  className="h-45 w-50 md:w-60 object-contain rounded-2xl m-4 p-2 bg-white shadow-inner"
                />
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="font-extrabold text-2xl quicksand-font text-purple-700">
                    {toy.toyName}
                  </h3>
                  <p className="text-gray-700 font-semibold roboto-font text-sm">
                    {toy.subCategory}
                  </p>
                  <p className="text-xl roboto-font font-bold text-primary">
                    ${toy.price.toFixed(2)}
                  </p>
                  <p className="flex items-center gap-1 text-yellow-500 font-semibold roboto-font">
                    Rating: {toy.rating} <Star size={18} fill="#fa8a1c" />
                  </p>

                  <Link
                    to={`/toyDetails/${toy.toyId}`}
                    className="btn bg-purple-500 text-white w-full md:w-50 mt-2 hover:bg-pink-500 hover:scale-105 transform transition-all roboto-font"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              <button
                onClick={() => handleRemove(toy.toyId, toy.toyName)}
                className="text-red-500 hover:text-red-700 text-4xl md:text-5xl hover:scale-125 duration-300 transform transition-all p-7 cursor-pointer "
                title="Remove from wishlist"
              >
                <MdDeleteForever />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
