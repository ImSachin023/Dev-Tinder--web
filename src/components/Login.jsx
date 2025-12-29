import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [Error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went Wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
      
    } catch (error) {
      setError(error?.response?.data || "Something went Wrong");      
    }
  }

  return (
    <div className="flex justify-center my-30">
      <div className="card bg-base-300 w-120 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div className="p-2 my-4">
            {!isLoginForm && (
              <>
                <fieldset className="fieldset w-full my-2">
                  <legend className="fieldset-legend text-xl">
                    First Name
                  </legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full my-2"
                    placeholder="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset w-full my-2">
                  <legend className="fieldset-legend text-xl">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full my-2"
                    placeholder="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset w-full my-2">
              <legend className="fieldset-legend text-xl">Email ID</legend>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full my-2"
                placeholder="Email ID"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset w-full  my-2">
              <legend className="fieldset-legend text-xl">Password</legend>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full my-2"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{Error}</p>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary text-xl"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
