import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { motion, useMotionValue, useTransform } from "framer-motion";

const UserCard = ({ user, index }) => {
  const { _id, photoURL, firstName, lastName, age, gender, about, skills } =
    user;
  const dispatch = useDispatch();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const isFront = index === 0;
  const likeOpacity = useTransform(x, [0, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, 0], [1, 0]);
  const cardOpacity = useTransform(
  x,
  [-250, -120, 0, 120, 250],
  [0, 0.6, 1, 0.6, 0]
);

  const handleSendRequest = async (direction) => {
    const status = direction === "right" ? "interested" : "ignored";
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <motion.div
      className="absolute w-96"
      style={{
        x,
        rotate,
        zIndex: isFront ? 2 : 1,
        scale: isFront ? 1 : 0.95,
        y: isFront ? 0 : 10,
        opacity: isFront ? cardOpacity : 0.9,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: isFront ? 1 : 0.95, opacity: 1 }}
      exit={{
        x: x.get() > 0 ? 500 : -500,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
      onDragEnd={(e, info) => {
        if (!isFront) return;

        if (info.offset.x > 150) handleSendRequest("right");
        if (info.offset.x < -150) handleSendRequest("left");
      }}
    >
      {/* LIKE */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-8 left-6 z-20
             border-4 border-green-500 text-green-500
             px-4 py-2 rounded-xl text-2xl font-bold
             rotate-[-20deg]"
      >
        LIKE
      </motion.div>

      {/* NOPE */}
      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-8 right-6 z-20
             border-4 border-red-500 text-red-500
             px-4 py-2 rounded-xl text-2xl font-bold
             rotate-[20deg]"
      >
        NOPE
      </motion.div>

      <div className="card bg-base-300 w-96 shadow-sm overflow-hidden">
        <figure>
          <img
            src={photoURL}
            alt="Photo"
            className="h-72 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {skills && <p>Skills: {skills}</p>}
          {age && gender && <p>Age : {age} , Gender : {gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-end">
            {/* <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
