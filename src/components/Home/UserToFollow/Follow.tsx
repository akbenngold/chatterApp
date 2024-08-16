import React, { useState } from "react";
import { useBlog } from "../../../Context/Context";
import FollowBtn from "./FollowBtn";
import { useNavigate } from "react-router-dom";

interface User {
  userId: string;
  uid: string;
  username: string;
  bio?: string;
  userImg?: string;
}

const Follow: React.FC = () => {
  const { currentUser, allUsers } = useBlog();
  const [count, setCount] = useState<number>(5);

  const users = allUsers
    ?.filter((user: User) => user.userId !== currentUser?.uid)
    .slice(0, count);

  const navigate = useNavigate();

  return (
    <>
      {users?.map((user, i) => {
        const { username, bio, userImg, userId } = user;
        return (
          <div key={i} className="flex items-start gap-2 my-4">
            <div
              onClick={() => navigate(`/profile/${userId}`)}
              className="flex-1 flex items-center gap-2 cursor-pointer"
            >
              <img
                className="w-[3rem] h-[3rem] object-cover gap-2 cursor-pointer rounded-full"
                src={userImg}
                alt="userImg"
              />
              <div className="flex flex-col gap-1">
                <h2 className="font-bold capitalize">{username}</h2>
                <span className="leading-4 text-gray-500 text-sm line-clamp-2">
                  {bio || "This user has no bio"}
                </span>
              </div>
            </div>
            <FollowBtn userId={userId} />
          </div>
        );
      })}
      {allUsers && allUsers.length > count && (
        <button
          onClick={() => setCount((prev) => prev + 3)}
          className="mb-3 text-green-900 text-sm hover:underline"
        >
          Load more users
        </button>
      )}
    </>
  );
};

export default Follow;
