import React, { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const Profile = () => {
  const { user, updateUser, loading } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);

  if (loading || updating || !user) {
    return <Loading />;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const updatedData = { displayName: name };

      if (photoURL && photoURL !== user.photoURL) {
        updatedData.photoURL = photoURL;
      }

      await updateUser(updatedData);

      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-linear-to-r from-[#FFDEE9] via-[#B5FFFC] to-[#FFF6B7] shadow-xl rounded-2xl py-20 m-5 md:m-20">
      <title>ToyTopia - My Profile</title>
      <img
        src={
          user?.photoURL ||
          "https://img.icons8.com/?size=50&id=23265&format=png"
        }
        alt="user"
        className="rounded-full w-40 h-40 border-4 border-[#db5880] object-cover p-2"
      />

      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold quicksand-font text-purple-700">
          Name: {user.displayName || "Not available"}
        </h2>
        <p className="text-primary roboto-font">
          Email: {user.email || "Not available"}
        </p>
      </div>

      {!editing ? (
        <button
          onClick={() => setEditing(true)}
          className="btn bg-[#db5880] text-white mt-6 roboto-font hover:bg-secondary"
        >
          Edit Profile
        </button>
      ) : (
        <form
          onSubmit={handleUpdate}
          className="mt-8 flex flex-col gap-4 w-full max-w-sm px-8"
        >
          <label className="-mb-3 text-left roboto-font">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="input input-bordered w-full roboto-font"
          />

          <label className="-mb-3 text-left roboto-font">Photo URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Photo URL (optional)"
            className="input input-bordered w-full roboto-font"
          />

          <div className="flex justify-center gap-4 mt-4 px-2">
            <button
              type="submit"
              className="btn bg-[#60b454] text-white hover:bg-red-600 roboto-font"
              disabled={updating}
            >
              {updating ? "Updating..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="btn bg-gray-400 text-white roboto-font"
              disabled={updating}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
