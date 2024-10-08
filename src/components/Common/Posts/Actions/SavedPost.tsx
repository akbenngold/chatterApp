import React, { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { useBlog } from "../../../../Context/Context";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase.js";
import { toast } from "react-toastify";
import useSingleFetch from "../../../hooks/useSingleFetch";

// Define types for the post and context
interface Post {
  id: string;
  userId: string;
  [key: string]: any; // Allow any other properties
}

interface SavedPostProps {
  post: Post;
}

interface BlogContextType {
  currentUser: { uid: string } | null;
  setAuthModel: (show: boolean) => void;
}

interface SaveData {
  id: string;
}

const SavedPost: React.FC<SavedPostProps> = ({ post }) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { currentUser, setAuthModel } = useBlog() as BlogContextType;
  const { data } = useSingleFetch<SaveData[]>(
    "users",
    post?.userId,
    "savePost"
  );

  useEffect(() => {
    setIsSaved(data && data.findIndex((item) => item.id === post?.id) !== -1);
  }, [data, post?.id]);

  const handleSave = async () => {
    try {
      if (currentUser) {
        const saveRef = doc(
          db,
          "users",
          currentUser?.uid,
          "savePost",
          post?.id
        );

        if (isSaved) {
          await deleteDoc(saveRef);
          toast.success("Post has been unsaved");
        } else {
          await setDoc(saveRef, {
            ...post,
          });
          toast.success("Post has been saved");
        }
      } else {
        setAuthModel(true);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <button onClick={handleSave} className="hover:opacity-60">
        <CiSaveDown2
          className={`text-2xl pointer-event-none ${
            isSaved ? "text-yellow-600" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default SavedPost;
