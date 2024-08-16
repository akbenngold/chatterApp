import React, { useState } from "react";
import { useBlog } from "../../../Context/Context";
import moment from "moment";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import DropDown from "../../../utils/DropDown";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { toast } from "react-toastify";

// Type for Comment Props
interface CommentProps {
  item: {
    id: string;
    userId: string;
    commentText: string;
    created: number;
  };
  postId: string;
}

// Type for User
interface User {
  id: string;
  username: string;
  userImg?: string;
}

// Component
const Comment: React.FC<CommentProps> = ({ item: comment, postId }) => {
  const { allUsers, currentUser } = useBlog();
  const [drop, setDrop] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<string>("");

  const getUserData = allUsers.find(
    (user: User) => user.id === comment?.userId
  );

  const { userId, commentText, created } = comment;

  const removeComment = async () => {
    try {
      const ref = doc(db, "posts", postId, "comments", comment?.id);
      await deleteDoc(ref);
      setDrop(false);
      toast.success("Comment has been removed");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const editCommentText = () => {
    setIsEdit(true);
    setDrop(false);
    setEditComment(commentText);
  };

  const handleEdit = async () => {
    if (!editComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const ref = doc(db, "posts", postId, "comments", comment.id);
      await updateDoc(ref, {
        commentText: editComment,
        created: Date.now(),
        userId: currentUser?.uid,
      });
      setEditComment("");
      setIsEdit(false);
      setDrop(false);
      toast.success("Comment has been updated");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-b">
      {!isEdit ? (
        <>
          <div className="flex items-center gap-5">
            <img
              className="w-[2rem] h-[2rem] object-cover rounded-full"
              src={getUserData?.userImg || "/profile.jpg"}
              alt="user-img"
            />
            <div className="flex-1 flex justify-between">
              <div>
                <h2 className="text-sm capitalize">{getUserData?.username}</h2>
                <p className="text-sm text-gray-400">
                  {moment(created).fromNow()}
                </p>
              </div>
              <div className="relative">
                {currentUser && currentUser?.uid === userId && (
                  <>
                    <button
                      onClick={() => setDrop(!drop)}
                      className="text-2xl hover:opacity-70"
                    >
                      <BiDotsHorizontalRounded />
                    </button>
                    <DropDown
                      showDrop={drop}
                      setShowDrop={setDrop}
                      size="w-[10rem]"
                    >
                      <Button
                        click={editCommentText}
                        title="Edit this response"
                      />
                      <Button click={removeComment} title="Delete" />
                    </DropDown>
                  </>
                )}
              </div>
            </div>
          </div>
          <p className="py-4 text-sm">
            {more ? commentText : commentText.substring(0, 100)}
            {commentText.length > 100 && (
              <button onClick={() => setMore(!more)}>
                {more ? "...less" : "...more"}
              </button>
            )}
          </p>
        </>
      ) : (
        <div className="bg-white shadows p-4">
          <textarea
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            placeholder="Write your update text..."
            className="w-full resize-none outline-none text-sm"
          ></textarea>
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => setIsEdit(false)} className="w-fit text-sm">
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="btn !text-white !bg-green-700 !rounded-full !text-xs"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Comment;

// Button Component with TypeScript
interface ButtonProps {
  click: () => void;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ click, title }) => {
  return (
    <button
      onClick={click}
      className="p-2 hover:bg-gray-200 text-black/80 w-full text-sm text-left"
    >
      {title}
    </button>
  );
};
