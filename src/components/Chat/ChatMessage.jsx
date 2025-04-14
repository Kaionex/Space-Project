import React from "react";

const ChatMessage = ({ message }) => {
  const { text, displayName, photoURL } = message;
  return (
    <div className="flex items-start my-3">
      <img
        src={photoURL}
        alt={displayName}
        className="w-10 h-10 rounded-full mr-3"
      />
      <div className="bg-cyan-500 bg-opacity-80 p-3 rounded-lg shadow-md">
        <p className="text-sm font-semibold">{displayName}</p>
        <p className="text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;