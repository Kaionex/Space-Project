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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import InputEmoji from "react-input-emoji";

const ChatWindow = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [triggerClicked, setTriggerClicked] = useState(false);

  useEffect(() => {
    if (messagesEndRef.current) {
      const scrollContainer = messagesEndRef.current.parentElement;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages, triggerClicked]);

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

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    await addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: new Date(),
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    setNewMessage("");
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="h-auto w-auto border rounded-md border-gray-300 p-4"
    >
      <AccordionItem value="chat-1" className="animate-accordion-down">
        <AccordionTrigger
          className="font-bold text-2xl text-white"
          onClick={() => setTriggerClicked(!triggerClicked)}
        >
          Live Chat
        </AccordionTrigger>
        <AccordionContent>
          <div
            className="h-96 overflow-y-auto"
            style={{ scrollBehavior: "smooth" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                ref={index === messages.length - 1 ? messagesEndRef : null}
              >
                <div className="flex items-center mt-2">
                  <img
                    src={message.photoURL}
                    alt="User"
                    className="w-8 h-8 pt-1 pl-1 rounded-full"
                  />
                  <div className="font-bold ml-2 text-white">
                    {message.displayName}:
                  </div>
                </div>
                <div className="text-white mt-2 mb-2 pl-2 pb-1">
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <InputEmoji
              background="black"
              color="white"
              borderRadius={5}
              placeholder="Type your message..."
              cleanOnEnter
              value={newMessage}
              onChange={setNewMessage}
              onEnter={(text) => {
                if (text.trim() !== "") {
                  handleSendMessage();
                }
              }}
            />
            <button
              className="mb-1 ml-1 px-2 py-1 buttonMain rounded-r"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ChatWindow;
