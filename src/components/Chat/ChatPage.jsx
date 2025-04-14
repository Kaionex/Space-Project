import React, { useState, useEffect, useContext, useRef } from "react";
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
import Navigation from "../Nav/Navigation";
import FooterContent from "../Nav/FooterContent";
import { motion } from "framer-motion";
import FooterBackground from "../Nav/FooterBackground";
import chatBackgroundImage from "../../assets/bkg/397989.jpg";
import InputEmoji from "react-input-emoji";
import Footer from "../Nav/Footer";

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop =
        scrollHeight - clientHeight - 100; // Adjusted scroll position
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages]);

  const handleSendMessage = async () => {
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="text-black bg-clip-bg bg-gradient-to-r from-[#000000] via-[#252728] to-[#000000]">
      <Navigation />
      <div >
        <div
          className="text-white bg-cover bg-center min-h-screen"
          style={{
            backgroundImage: "url('src/assets/bkg/earth-view.jpeg')",
          }}
        >
          <div className="flex justify-center items-center  ">
            <div className="container transform: scale-75 mt-0 mx-auto p-6 pt-6 text-2xl bg-gradient-to-r opacity-90 from-[#1c1e1e] via-[#046e73] to-[#12152b] rounded-2xl shadow-xl max-w-5xl w-full pb-14">
              <h1 className="flex justify-center items-center font-extrabold text-7xl pb-10 pt-1 text-white">
                <span className="bg-black rounded-full mr-6">
                  <img
                    src="src/assets/logo/STARHUB-cyan-logo.png"
                    alt="Starhub Logo"
                    className="w-24"
                  />
                </span>
                Live Chat
              </h1>
              <div className="bg-gray-800 bg-opacity-80 p-6 rounded-2xl shadow-md max-w-4xl mx-auto">
                <div
                  className="overflow-y-auto h-[700px] mb-4"
                  ref={messagesContainerRef}
                >
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ChatMessage key={msg.id} message={msg} />
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} className="pb-4" />
                </div>
                {user ? (
                  <div className="mt-4 flex items-center">
                    <div className="relative w-full">
                      <InputEmoji
                        value={newMessage}
                        onChange={setNewMessage}
                        cleanOnEnter
                        onEnter={(text) => {
                          if (text.trim() !== "") {
                            handleSendMessage();
                          }
                        }}
                        placeholder="Type your message..."
                        fontSize={20}
                        borderRadius={7}
                        borderColor="transparent"
                        className="custom-input bg-gray-800 text-gray-300 py-2 pl-10 pr-4 rounded-full focus:bg-gray-800 focus:ring-0 w-full"
                      />
                    </div>
                    <div className="relative inline-flex group ml-4">
                      <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                      <button
                        className="relative inline-flex items-center justify-center px-8 py-2 text-2xl font-bold text-white hover:text-3xl transition-all duration-200 bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        onClick={handleSendMessage}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center mt-4 text-white">
                    Please log in to send messages.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatPage;
