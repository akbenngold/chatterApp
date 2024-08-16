import React from "react";
import Loading from "../../Loading/Loading";
import PostsCard from "./PostsCard";
import { useBlog } from "../../../Context/Context";

// Define the types for the post data
interface Post {
  id: string;
  title: string;
  description: string;
  [key: string]: any; // Allow additional properties
}

interface BlogContextType {
  postData: Post[] | null;
  postLoading: boolean;
}

const Posts: React.FC = () => {
  const { postData, postLoading } = useBlog() as BlogContextType;

  return (
    <section className="flex flex-col gap-[2.5rem]">
      {postLoading ? (
        <Loading />
      ) : (
        postData && postData.map((post, i) => <PostsCard post={post} key={i} />)
      )}
    </section>
  );
};

export default Posts;
