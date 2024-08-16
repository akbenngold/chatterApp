import React from "react";
import { FaRegComment } from "react-icons/fa";
import { useBlog } from "../../../../Context/Context";
import { formatNum } from "../../../../utils/helper";

// Define the types for the context
interface BlogContextType {
  setShowComment: (show: boolean) => void;
  commentLength: number;
}

const Comment: React.FC = () => {
  const { setShowComment, commentLength } = useBlog() as BlogContextType;

  return (
    <button
      onClick={() => setShowComment(true)}
      className="flex items-center gap-1 text-sm"
    >
      <FaRegComment className="text-lg" />
      <span>{formatNum(commentLength)}</span>
    </button>
  );
};

export default Comment;
