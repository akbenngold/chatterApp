import React from "react";
import { readTime } from "../../../utils/helper";
import moment from "moment";
import SavedPost from "./Actions/SavedPost";
import { useBlog } from "../../../Context/Context";
import Actions from "./Actions/Actions";
import { useNavigate } from "react-router-dom";

// Define types for the post prop
interface Post {
  id: string;
  title: string;
  desc: string;
  created: Date;
  postImg?: string;
  userId: string;
  username: string;
  [key: string]: any; // Allow additional properties
}

interface PostsCardProps {
  post: Post | null;
}

const PostsCard: React.FC<PostsCardProps> = ({ post }) => {
  // Check if the post is undefined or null
  if (!post) {
    return null; // Or return a placeholder/fallback UI
  }

  // Destructure the post object safely
  const { title, desc, created, postImg, id: postId, userId, username } = post;
  const { currentUser } = useBlog();

  const navigate = useNavigate();

  return (
    <section>
      <div
        onClick={() => navigate(`/post/${postId}`)}
        className="flex flex-col sm:flex-row gap-4 cursor-pointer"
      >
        <div className="flex-[2.5]">
          <p className="pb-2 font-semibold capitalize">{username}</p>
          <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize">
            {title}
          </h2>
          <div
            className="py-1 text-gray-500 line-clamp-2 leading-5"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </div>
        {postImg && (
          <div className="flex-[1]">
            <img
              src={postImg}
              alt="postImg"
              className="w-[53rem] h-[8rem] object-cover"
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between w-full md:w-[70%] mt-[2rem] md:mt-0">
        <p className="text-xs text-gray-600">
          {readTime({ __html: desc })} min read .
          {moment(created).format("MMM DD")}
        </p>
        <div className="flex items-center gap-3">
          <SavedPost post={post} />
          {currentUser?.uid === userId && (
            <Actions postId={postId} title={title} desc={desc} />
          )}
        </div>
      </div>
    </section>
  );
};

export default PostsCard;
