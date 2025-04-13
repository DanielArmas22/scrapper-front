import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "@/services/api";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send message to API
      const response = await sendChatMessage(input);

      // Add response to chat
      const assistantMessage = {
        id: Date.now() + 1,
        text: response.message || "Sorry, I couldn't process your request.",
        sender: "assistant",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, an error occurred while processing your message.",
        sender: "system",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="bg-gray-100 px-4 py-3 border-b flex justify-between items-center">
        <h5 className="text-lg font-semibold text-gray-700">Chat Assistant</h5>
        {isLoading && (
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
            <span className="text-sm text-gray-500">Thinking...</span>
          </div>
        )}
      </div>

      <div className="p-4 h-96 overflow-y-auto flex flex-col space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-3/4 p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-100 ml-auto"
                  : message.sender === "assistant"
                  ? "bg-gray-100"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
