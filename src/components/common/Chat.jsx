import React from 'react';

const Chat = () => {
  return (
    <div className="chat-container">
      <h2 className="text-lg font-semibold">Chat</h2>
      <div className="messages">
        {/* Aquí se mostrarán los mensajes del chat */}
      </div>
      <input
        type="text"
        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Escribe un mensaje..."
      />
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Enviar
      </button>
    </div>
  );
};

export default Chat;