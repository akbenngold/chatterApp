import { onAuthStateChanged, User } from "firebase/auth";
import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  ReactNode,
} from "react";
import { auth, db } from "../firebase/firebase.js";
import Loading from "../components/Loading/Loading";
import { collection, onSnapshot, query } from "firebase/firestore";
import useFetch from "../components/hooks/useFetch";

// Define types for the context state
interface BlogContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  allUsers: any[];
  userLoading: boolean;
  publish: boolean;
  setPublish: React.Dispatch<React.SetStateAction<boolean>>;
  showComment: boolean;
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>;
  commentLength: number;
  setCommentLength: React.Dispatch<React.SetStateAction<number>>;
  updateData: Record<string, any>;
  setUpdateData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  postData: any[];
  postLoading: boolean;
  authModel: boolean;
  setAuthModel: React.Dispatch<React.SetStateAction<boolean>>;
}

// Set initial context value
const BlogContext = createContext<BlogContextType | undefined>(undefined);

interface ContextProps {
  children: ReactNode;
}

const Context: React.FC<ContextProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [showComment, setShowComment] = useState(false);
  const [commentLength, setCommentLength] = useState(0);
  const [authModel, setAuthModel] = useState(false);

  const [updateData, setUpdateData] = useState<Record<string, any>>({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [publish, setPublish] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Get users
  useEffect(() => {
    const getUsers = () => {
      const postRef = query(collection(db, "users"));
      onSnapshot(postRef, (snapshot) => {
        setAllUsers(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        setUserLoading(false);
      });
    };
    getUsers();
  }, []);

  const { data: postData, loading: postLoading } = useFetch("posts");

  if (loading) {
    return <Loading />;
  }

  return (
    <BlogContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        allUsers,
        userLoading,
        publish,
        setPublish,
        showComment,
        setShowComment,
        commentLength,
        setCommentLength,
        updateData,
        setUpdateData,
        title,
        setTitle,
        description,
        setDescription,
        postData,
        postLoading,
        authModel,
        setAuthModel,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default Context;

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a ContextProvider");
  }
  return context;
};
