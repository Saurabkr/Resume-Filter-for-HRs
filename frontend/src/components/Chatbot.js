import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // optional for styling

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot/search", {
        query: input,
      });

      console.log("Response from server:", res.results);

      const data = res.data;

      const botMessage = {
        text: data.results || "No matches found.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong.", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {Array.isArray(msg.text) ? (
              <ul style={{ paddingLeft: "20px" }}>
                {msg.text.map((item, i) => {
                  const { score, resume } = item;
                  const fileUrl = `http://localhost:5000/${resume.filePath.replace(
                    /\\/g,
                    "/"
                  )}`;
                  return (
                    <li key={i} style={{ marginBottom: "8px" }}>
                      ✅{" "}
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "blue", textDecoration: "underline" }}
                      >
                        {resume.originalName}
                      </a>{" "}
                      (Score: {score.toFixed(2)})
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          placeholder="Ask something..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
