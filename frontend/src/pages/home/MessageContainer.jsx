

import React, { useEffect, useRef } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ recieverId: selectedUser?._id }));
    }
  }, [selectedUser]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
       {!selectedUser ? (
        <div className="w-full flex items-center justify-center flex-col gap-5">
          <h2>Welcome to GUP SHUP</h2>
          <p className="text-xl">Please select a person to continue your chat!!</p>
          </div>
      ) : (
        <div className="h-screen w-full flex flex-col bg-gradient-to-br from-gray-900 to-black">
          {/* Chat header */}
          <div className="p-4 border-b border-white/10">
            <User userDetails={selectedUser} />
          </div>

          {/* Chat body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-white">
            {messages?.map((messageDetails) => (
              <Message key={messageDetails?._id} messageDetails={messageDetails} />
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-3">
            <SendMessage />
          </div>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
