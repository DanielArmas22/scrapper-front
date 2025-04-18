// filepath: /buscador-vehiculos/buscador-vehiculos/src/hooks/useChat.js
import { useState, useEffect } from 'react';

const useChat = (initialMessages = []) => {
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (message) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate sending a message and receiving a response
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(`Response to: ${message}`);
        }, 1000);
      });

      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
      setMessages((prevMessages) => [...prevMessages, { text: response, sender: 'bot' }]);
    } catch (err) {
      setError('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
  };
};

export default useChat;