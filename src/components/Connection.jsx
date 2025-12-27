import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connection = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections?.length === 0)
    return (
      <h1 className="text-center font-bold text-2xl ">No Connections Found</h1>
    );

  return (
    <div className=" text-center my-10">
      <h1 className="font-bold text-4xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoURL, about, age, gender } =
          connection;
        return (
          <div key={_id} className="flex m-4 p-4 bg-base-300 rounded-lg w-1/2 mx-auto">
            <div className="">
              <img
                alt="Photo"
                src={photoURL}
                className="w-20 h-20 rounded-full "
              />
            </div>
            <div className="text-left ml-4">
              <h1 className="font-bold text-xl">{firstName + " " + lastName}</h1>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
