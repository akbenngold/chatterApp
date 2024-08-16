import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.js";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
import { useBlog } from "../../../Context/Context";
import FollowBtn from "../../Home/UserToFollow/FollowBtn";
import { readTime } from "../../../utils/helper";
import moment from "moment/moment";
import Actions from "./Actions/Actions";
import Like from "./Actions/Like";
import Comment from "./Actions/Comment";
import SharePost from "./Actions/SharePost";
import SavedPost from "./Actions/SavedPost";
import Recommended from "./Recommended";
import Comments from "../Comments/Comments";

// Define the shape of post data
interface PostData {
  id: string;
  title: string;
  desc: string;
  postImg?: string;
  username: string;
  created: number;
  userImg?: string;
  userId: string;
}

const SinglePost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useBlog();

  // increment page views
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      const incrementPageView = async () => {
        try {
          if (postId) {
            const ref = doc(db, "posts", postId);
            await updateDoc(ref, {
              pageViews: increment(1),
            });
          }
        } catch (error: any) {
          toast.error(error.message);
        }
      };
      incrementPageView();
    }
    isInitialRender.current = false;
  }, [postId]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        if (postId) {
          const postRef = doc(db, "posts", postId);
          const getPost = await getDoc(postRef);

          if (getPost.exists()) {
            const postData = getPost.data();
            if (postData?.userId) {
              const userRef = doc(db, "users", postData.userId);
              const getUser = await getDoc(userRef);

              if (getUser.exists()) {
                const { created, ...rest } = getUser.data();
                setPost({ ...postData, ...rest, id: postId });
              }
            }
          }
        }
        setLoading(false);
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
            <h2 className="text-4xl font-extrabold capitalize">
              {post?.title}
            </h2>
            <div className="flex items-center gap-2 py-[2rem]">
              <img
                onClick={() => navigate(`/profile/${post?.userId}`)}
                className="w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer"
                src={post?.userImg}
                alt="user-img"
              />
              <div>
                <div className="capitalize">
                  <span>{post?.username} .</span>
                  {currentUser && currentUser?.uid !== post?.userId && (
                    <FollowBtn userId={post?.userId} />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {post && readTime({ __html: post.desc })} min read .
                  <span className="ml-1">
                    {moment(post?.created).fromNow()}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-t border-gray-200 py-[0.5rem]">
              <div className="flex items-center gap-5">
                <Like postId={postId!} />
                <Comment />
              </div>
              <div className="flex items-center pt-2 gap-5">
                {post && <SavedPost post={post} />}
                <SharePost />
                {currentUser && currentUser?.uid === post?.userId && (
                  <Actions
                    postId={postId!}
                    title={post?.title}
                    desc={post?.desc}
                  />
                )}
              </div>
            </div>
            <div className="mt-[3rem]">
              {post?.postImg && (
                <img
                  className="w-full h-[400px] object-cover"
                  src={post.postImg}
                  alt="post-img"
                />
              )}
              <div
                className="mt-6"
                dangerouslySetInnerHTML={{ __html: post?.desc }}
              />
            </div>
          </section>
          {post && <Recommended post={post} />}
          <Comments postId={postId!} />
        </>
      )}
    </>
  );
};

export default SinglePost;
