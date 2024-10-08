import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import { useBlog } from "../../../Context/Context";

// Define the types for the context
interface BlogContextType {
  updateData?: { title: string; description: string };
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

const EditPost: React.FC = () => {
  const { updateData, title, setTitle, description, setDescription } =
    useBlog() as BlogContextType;

  useEffect(() => {
    if (updateData) {
      setTitle(updateData.title);
      setDescription(updateData.description);
    }
  }, [updateData, setTitle, setDescription]);

  return (
    <section className="write w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
      <input
        type="text"
        placeholder="Title..."
        className="text-4xl outline-none w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill
        placeholder="Description..."
        className="!text-[4rem] my-3"
        theme="bubble"
        value={description}
        onChange={setDescription}
      />
    </section>
  );
};

export default EditPost;
