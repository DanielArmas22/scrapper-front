"use client";
import React, { useState, useEffect, useRef } from "react";
import { sendMilanunciosChatMessage } from "@/services/api";
import SearchTypeToggle from "@/components/common/SearchTypeToggle";
import PaginationSelector from "@/components/common/PaginationSelector";

export default function MilanunciosChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDeepSearch, setIsDeepSearch] = useState(false);
  const [step, setStep] = useState(1);
  const messagesEndRef = useRef(null);

  // Scroll al último mensaje cuando se añaden nuevos mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Añadimos el mensaje del usuario
    const userMessage = { type: "user", text: newMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");
    setLoading(true);

    try {
      // Enviamos el mensaje y obtenemos la respuesta
      const response = await sendMilanunciosChatMessage(
        newMessage,
        isDeepSearch ? "deep" : "fast",
        step
      );

      // Añadimos la respuesta del asistente
      const assistantMessage = { type: "assistant", text: response.message };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error en el chat:", error);
      // Añadimos mensaje de error
      const errorMessage = {
        type: "error",
        text: "Lo siento, ha ocurrido un error al procesar tu mensaje.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] border border-gray-300 rounded-lg overflow-hidden">
      {/* Cabecera */}
      <div className="bg-yellow-500 text-white p-4">
        <h2 className="text-lg font-semibold">Chat Asistente de Milanuncios</h2>
        <p className="text-sm opacity-80">
          Pregúntame cualquier cosa sobre vehículos en Milanuncios
        </p>
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="mb-2">
              👋 ¡Hola! Soy tu asistente para buscar coches en Milanuncios.
            </p>
            <p>Puedes preguntarme cosas como:</p>
            <ul className="text-left max-w-md mx-auto mt-2">
              <li className="py-1">
                • "¿Qué marcas de coches tienen menos averías?"
              </li>
              <li className="py-1">
                • "Busca coches diésel con menos de 100.000 km"
              </li>
              <li className="py-1">
                • "Quiero comprar un vehículo comercial, ¿qué opciones tengo?"
              </li>
              <li className="py-1">
                • "¿Cuáles son los trámites para transferir un coche de segunda
                mano?"
              </li>
            </ul>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.type === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.type === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : message.type === "error"
                    ? "bg-red-100 text-red-700 rounded-bl-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="p-3 rounded-lg max-w-[80%] bg-gray-200 text-gray-800 rounded-bl-none">
              <div className="flex items-center">
                <div className="mr-2">Pensando</div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulario de entrada */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-300 p-4 bg-white"
      >
        <div className="flex justify-between items-center mb-3">
          <PaginationSelector step={step} onChange={setStep} />
          <SearchTypeToggle
            isDeepSearch={isDeepSearch}
            onChange={() => setIsDeepSearch(!isDeepSearch)}
          />
        </div>
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded-r-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
            disabled={loading || !newMessage.trim()}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
