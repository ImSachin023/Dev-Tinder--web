import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("sachinabx@gmail.com");
  const [password, setPassword] = useState("Sachin@123");
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
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center my-30">
      <div className="card bg-base-300 w-120 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">Login</h2>
          <div className="p-2 my-4">
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
                type="text"
                value={password}
                className="input input-bordered w-full my-2"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary text-xl" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
