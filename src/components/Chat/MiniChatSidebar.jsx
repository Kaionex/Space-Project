import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import ChatMessage from "./ChatMessage";

const MiniChatSidebar = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const unsubscribe = listenToMessages();
    return () => unsubscribe();
  }, []);

  const listenToMessages = () => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    return onSnapshot(q, (querySnapshot) => {
      const newMessages = [];
      querySnapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(newMessages);
    });
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
    await addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: new Date(),
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default behavior of Enter key (submitting a form)
      sendMessage();
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg max-w-sm mx-auto">
      <div className="h-60 overflow-y-auto">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>
      {user && (
        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 bg-gray-600 rounded-l-lg"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="relative inline-flex group">
            <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
            <button
              className="relative inline-flex items-center justify-center px-4 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
      {!user && (
        <p className="text-center mt-4 text-white">
          Please log in to send messages.
        </p>
      )}
    </div>
  );
};

export default MiniChatSidebar;
