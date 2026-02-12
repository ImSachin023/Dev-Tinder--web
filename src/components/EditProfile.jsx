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
  const [skills, setSkills] = useState(user.skills || []);
  const [Error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

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
          skills,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  };

  return (
    <div className="flex justify-center my-10 flex-row items-center ">
    <div className="flex flex-row">
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
                {/* <input
                  type="text"
                  className="input input-bordered w-full my-2"
                  placeholder="Gender"
                  onChange={(e) => setGender(e.target.value)}
                /> */}
                <select
                  defaultValue="Pick a color"
                  className="select appearance-none w-full my-2"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled={true}>Select Gender</option>
                  <option>male</option>
                  <option>female</option>
                  <option>other</option>
                </select>
              </fieldset>

              <fieldset className="fieldset w-full my-2">
                <legend className="fieldset-legend text-xl">Skills</legend>
                <input
                  type="text"
                  value={skills}
                  className="input input-bordered w-full my-2"
                  placeholder="Skills (comma separated)"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset w-full my-2">
                <legend className="fieldset-legend text-xl">About</legend>
                <textarea
                  placeholder="About"
                  className="textarea w-full my-2"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
            </div>

            <div className="card-actions justify-center">
              <button className="btn btn-primary text-xl" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-96 mx-10">
        <UserCard
          className="mt-10"
          user={{ firstName, lastName, photoURL, age, gender, about, skills }}
        />
      </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
      {showError && (
        <div
          role="alert"
          className="alert alert-error toast toast-top toast-center absolute"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{Error}</span>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
