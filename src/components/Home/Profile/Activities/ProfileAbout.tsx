import React from "react";
import { useBlog } from "../../../../Context/Context";

// Define types for props
interface ProfileAboutProps {
  getUserData: {
    bio?: string;
    username: string;
    userId: string;
  } | null; // Allow null to handle cases where getUserData might be null
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileAbout: React.FC<ProfileAboutProps> = ({
  getUserData,
  setEditModal,
}) => {
  const { currentUser } = useBlog();

  // Handle case where getUserData is null
  if (!getUserData) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="w-full">
      <p className="text-2xl first-letter:uppercase">
        {getUserData.bio || `${getUserData.username} has no bio`}
      </p>
      <div className="text-right">
        {currentUser?.uid === getUserData.userId && (
          <button
            onClick={() => setEditModal(true)}
            className="border border-black py-2 px-5 rounded-full text-black mt-[3rem]"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileAbout;
