import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const request = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id))
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!request) return;
  if (request?.length === 0)
    return (
      <h1 className="text-center font-bold text-2xl my-10">No Requests Found</h1>
    );

  return (
    <div className=" text-center my-10">
      <h1 className="font-bold text-4xl">Connection Requests</h1>
      {request.map((request) => {
        const { _id, firstName, lastName, photoURL, about, age, gender } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex items-center m-4 p-4 bg-base-300 rounded-lg w-2/3 mx-auto"
          >
            <div>
              <img
                alt="Photo"
                src={photoURL}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left ml-4">
              <h1 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h1>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex flex-row ml-auto">
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
