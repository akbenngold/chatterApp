import React from "react";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../../../Context/Context";

// Define the shape of post data
interface PostData {
  id: string;
  title?: string;
  desc?: string;
}

const Recommended: React.FC = () => {
  const { postData } = useBlog();
  const navigate = useNavigate();

  return (
    <div>
      {postData && postData.length > 0 ? (
        postData.map((post: PostData) => {
          // Check if post and post.id are defined
          if (post && post.id) {
            return (
              <div
                key={post.id}
                onClick={() => navigate(`/post/${post.id}`)}
                className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
              >
                <h2 className="line-clamp-1 capitalize text-sm font-bold">
                  {post.title || "Untitled Post"}
                </h2>
                <div
                  className="text-xs text-gray-500 line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: post.desc || "No description available.",
                  }}
                />
              </div>
            );
          } else {
            console.warn("Post or post.id is undefined", post);
            return null; // Skip rendering if post or post.id is undefined
          }
        })
      ) : (
        <p className="text-sm text-gray-500 p-3">No Posts Found</p>
      )}
    </div>
  );
};

export default Recommended;
