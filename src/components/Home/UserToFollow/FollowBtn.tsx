import React, { useEffect, useState } from "react";
import { useBlog } from "../../../Context/Context";
import { db } from "../../../firebase/firebase.js";
import { toast } from "react-toastify";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import useSingleFetch from "../../hooks/useSingleFetch";
import { useLocation } from "react-router-dom";

interface FollowBtnProps {
  userId: string;
}

const FollowBtn: React.FC<FollowBtnProps> = ({ userId }) => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const { currentUser } = useBlog();

  const { data } = useSingleFetch("users", currentUser?.uid, "follows");

  useEffect(() => {
    if (data) {
      setIsFollowed(
        data.findIndex((item: { id: string }) => item.id === userId) !== -1
      );
    }
  }, [data, userId]);

  const handleFollow = async () => {
    try {
      if (currentUser) {
        const followRef = doc(db, "users", currentUser?.uid, "follows", userId);
        const followerRef = doc(
          db,
          "users",
          userId,
          "followers",
          currentUser?.uid
        );

        if (isFollowed) {
          await deleteDoc(followRef);
          await deleteDoc(followerRef);
          toast.success("User is unfollowed");
        } else {
          await setDoc(followRef, { userId });
          await setDoc(followerRef, { userId });
          toast.success("User is followed");
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const { pathname } = useLocation();

  return (
    <button
      onClick={handleFollow}
      className={`${
        pathname === "/" ? "border border-black" : ""
      } px-3 py-[0.2rem] rounded-full ${
        isFollowed ? "text-gray-500 border-none" : ""
      }`}
    >
      {isFollowed ? "Following" : "Follow"}
    </button>
  );
};

export default FollowBtn;
