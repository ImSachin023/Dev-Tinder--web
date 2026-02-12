import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { AnimatePresence } from "framer-motion";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length <= 0)
    return (
      <h1 className="flex justify-center my-10 font-bold text-3xl">
        No more users Found
      </h1>
    );

  return (
    <div className="flex justify-center my-10">
      <AnimatePresence>
        {feed.slice(0, 2).map((user, index) => (
          <UserCard key={user._id} user={user} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Feed;
