import React, { useEffect, useState } from "react";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { useBlog } from "../../../../Context/Context";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase.js";
import { toast } from "react-toastify";
import useSingleFetch from "../../../hooks/useSingleFetch";
import { formatNum } from "../../../../utils/helper";

// Define the types for the props
interface LikeProps {
  postId: string;
}

// Define the types for the context
interface BlogContextType {
  currentUser: { uid: string } | null;
  setAuthModel: (show: boolean) => void;
}

// Define the types for the like data
interface LikeData {
  id: string;
}

const Like: React.FC<LikeProps> = ({ postId }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { currentUser, setAuthModel } = useBlog() as BlogContextType;

  const { data } = useSingleFetch<LikeData[]>("posts", postId, "likes");

  useEffect(() => {
    setIsLiked(
      data && data.findIndex((item) => item.id === currentUser?.uid) !== -1
    );
  }, [data, currentUser]);

  const handleLike = async () => {
    try {
      if (currentUser) {
        const likeRef = doc(db, "posts", postId, "likes", currentUser.uid);
        if (isLiked) {
          await deleteDoc(likeRef);
        } else {
          await setDoc(likeRef, {
            userId: currentUser.uid,
          });
        }
      } else {
        setAuthModel(true);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <button onClick={handleLike} className="flex items-center gap-1 text-sm">
      <PiHandsClappingDuotone
        className={`text-xl ${isLiked ? "text-black" : "text-gray-500"}`}
      />
      <span>{formatNum(data?.length || 0)}</span>
    </button>
  );
};

export default Like;
