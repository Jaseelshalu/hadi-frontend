import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from '../controllers/axiosInstance'
import "./Chat.css"
import { useAuth } from "../context/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const socket = io("https://hadi-backend.onrender.com");
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Fetch previous messages from backend
    const fetchMessages = async () => {
      const response = await axios.get("/chat");
      setMessages(response.data);
    };

    fetchMessages();

    return () => {
      socket.off("receive_message"); // Clean up listeners
    };
  }, []);

  const handleSend = () => {
    const message = { content: newMessage, sender: user.username };
    socket.emit("send_message", message);
    setNewMessage("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === user.username ? "my-message" : "other-message"
            }`}
          >
            <p className="sender">{msg.sender}</p>
            <p className="content">{msg.content}</p>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
