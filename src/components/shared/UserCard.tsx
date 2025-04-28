import React from "react";

interface UserCardProps {
  user: {
    id: string;
    name: string;
    username: string;
    imageUrl: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-black rounded-xl p-4 flex flex-col items-center text-white shadow-md w-60">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt={user.name}
        className="rounded-full w-20 h-20 mb-3 object-cover"
      />
      <p className="text-lg font-semibold">{user.name}</p>
      <p className="text-sm text-gray-400">@{user.username}</p>
      <button className="mt-3 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
        Follow
      </button>
    </div>
  );
};

export default UserCard;