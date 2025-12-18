import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoURL, setPhotoUrl] = useState(user.photoURL || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [Error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //Clear previous error
    setError("");

    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex justify-center my-10 flex-row items-center">
      <div className="flex justify-center mx-10 ">
        <div className="card bg-base-300 w-120 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-3xl">Edit Profile</h2>
            <div className="p-2 my-4">
              <fieldset className="fieldset w-full my-2">
                <legend className="fieldset-legend text-xl">FirstName</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full my-2"
                  placeholder="first Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset w-full my-2">
                <legend className="fieldset-legend text-xl">LastName</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full my-2"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset w-full my-2">
                <legend className="fieldset-legend text-xl">PhotoUrl</legend>
                <input
                  type="text"
                  value={photoURL}
                  className="input input-bordered w-full my-2"
                  placeholder="Photo URL"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset w-full my-2">
                <legend className="fieldset-legend text-xl">Age</legend>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full my-2"
                  placeholder="Age"
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset w-full my-2">
                <legend className="fieldset-legend text-xl">Gender</legend>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered w-full my-2"
                  placeholder="Gender"
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset w-full my-2">
                <legend className="fieldset-legend text-xl">About</legend>
                <input
                  type="text"
                  value={about}
                  className="input input-bordered w-full my-2"
                  placeholder="About"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
            </div>
            <p className="text-red-500">{Error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary text-xl" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoURL, age, gender, about }} />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
