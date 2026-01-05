import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import ToyCard from "../components/ToyCard";
import { toast } from "react-toastify";
import { IoMdArrowBack } from "react-icons/io";
import { FaHeart } from "react-icons/fa";

const ToyDetails = () => {
  const navigate = useNavigate();
  const { toyId } = useParams();
  const data = useLoaderData();

  const [toyDetails, setToyDetails] = useState([]);

  useEffect(() => {
    const filteredToys = data.filter(
      (toy) => Number(toy.toyId) === Number(toyId)
    );
    setToyDetails(filteredToys);
  }, [toyId, data]);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      `Your “Try Now” request has been submitted successfully! We'll reach out shortly with the next steps.`
    );
    e.target.reset(); // ✅ Clears the form after submission
  };

  return (
    <div>
      {/* Back Button */}
      <div className="bg-base-200">
        <div className="pl-20 pt-5">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary roboto-font"
          >
            <IoMdArrowBack />
            Go Back
          </button>
        </div>

        {/* Toy Details */}
        {toyDetails.map((toy) => (
          <ToyCard key={toy.toyId} toy={toy} />
        ))}
      </div>
      <section className="bg-linear-to-l from-[#ffb347] via-[#e08d2f] to-[#ff6f61] py-20 px-5 md:px-20 flex flex-col items-center justify-center text-center">
        <h1 className="quicksand-font font-extrabold text-4xl md:text-5xl text-white drop-shadow-md mb-4">
          Ready, Set, Play! 🎈
        </h1>
        <p className="text-white/90 text-lg roboto-font max-w-2xl mb-10">
          Want to try out this awesome toy? Fill in your details below — we’ll
          send you the next steps to start playing!
        </p>
        <div className="card w-full max-w-md bg-white shadow-2xl rounded-3xl border-4 border-[#ffb347] hover:scale-[1.02] duration-300 transition-all">
          <div className="card-body p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="label block text-left text-[#ff6f61] font-bold roboto-font text-lg mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered w-full roboto-font"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="label block text-left text-[#ff6f61] font-bold roboto-font text-lg mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full roboto-font"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn w-full rounded-full text-white bg-[#ff6f61] hover:bg-[#ff4e3c] text-lg font-semibold roboto-font border-none transition-transform duration-200 hover:scale-105"
              >
                Try Now ✈️
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToyDetails;
