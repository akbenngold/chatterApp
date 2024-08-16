import React from "react";
import Loading from "../../../Loading/Loading";
import PostsCard from "../../../Common/Posts/PostsCard";
import { useBlog } from "../../../../Context/Context";

// Define types for props
interface ProfileHomeProps {
  getUserData: {
    userId: string;
    username: string;
  };
}

const ProfileHome: React.FC<ProfileHomeProps> = ({ getUserData }) => {
  const { postData, postLoading } = useBlog();

  const userPost = postData?.filter(
    (post) => post?.userId === getUserData?.userId
  );

  return (
    <div className="flex flex-col gap-5 mb-[4rem]">
      {userPost?.length === 0 && (
        <p className="text-gray-500">
          <span className="capitalize">{getUserData?.username}</span> has no
          posts
        </p>
      )}
      {postLoading ? (
        <Loading />
      ) : (
        userPost?.map((post, i) => <PostsCard post={post} key={i} />)
      )}
    </div>
  );
};

export default ProfileHome;
