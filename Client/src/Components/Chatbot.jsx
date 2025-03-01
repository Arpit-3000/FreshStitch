import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane, FaRobot, FaUser, FaComments } from "react-icons/fa";
import Draggable from "react-draggable";

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "Hello! How can I help?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const API_KEY = "AIzaSyBYkd3CyN-ICuaM5yvqbO2lZE3RiS1sLcw"; 

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
        { contents: [{ parts: [{ text: input }] }] }
      );

      let botReply =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn’t understand that.";

      // Format response as a list if applicable
      if (botReply.includes("\n")) {
        botReply = botReply
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line) // Remove empty lines
          .map((line, index) => <li key={index} className="ml-4 list-disc">{line}</li>);
      }

      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { text: "Error connecting to AI.", sender: "bot" }]);
    }
  };


  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-cadetblue hover:bg-cadetdark text-white p-3 rounded-full shadow-md transition-all duration-300"
      >
        <FaComments size={24} />
      </button>

      {/* Draggable Chat Container */}
      {isOpen && (
        <Draggable handle=".drag-handle">
          <div className="fixed right-6 top-1/2 transform -translate-y-1/2 w-96 bg-white shadow-xl rounded-lg border border-gray-300">
            {/* Draggable Header */}
            <div className="drag-handle bg-cadetdark text-white p-3 flex justify-between items-center cursor-move">
              <h3 className="text-lg font-semibold">AI Chatbot</h3>
              <button onClick={() => setIsOpen(false)} className="text-white text-lg">×</button>
            </div>

            {/* Chat Messages */}
            <div className="p-3 h-64 overflow-y-auto space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-2 ${
                    msg.sender === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  {msg.sender === "bot" && <FaRobot className="text-gray-500 mt-1" />}
                  <div
                    className={`p-2 rounded-lg text-sm ${
                      msg.sender === "bot"
                        ? "bg-gray-200 text-gray-900"
                        : "bg-cadetdark text-white"
                    }`}
                  >
                    {Array.isArray(msg.text) ? <ul>{msg.text}</ul> : msg.text}
                  </div>
                  {msg.sender === "user" && <FaUser className="text-cadetdark mt-1" />}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={sendMessage} className="flex border-t p-2 bg-gray-100">
              <input
                type="textt"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-cadetblue text-white px-4 py-2 rounded-md ml-2 hover:bg-cadetdark"
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default Chatbot;
