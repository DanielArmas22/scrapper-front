// filepath: /buscador-vehiculos/buscador-vehiculos/src/app/coches-net/page.js
"use client";
import { useState } from "react";
import Link from "next/link";
import SearchForm from "@/components/coches-net/SearchForm";
import CochesNetChat from "@/components/coches-net/CochesNetChat";
import Loader from "@/components/coches-net/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import ResultsDisplay from "@/components/coches-net/ResultsDisplay";
import TabsNavigation from "@/components/common/TabsNavigation";
import { searchCochesNet } from "@/services/api";

export default function CochesNetPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("search"); // 'search' o 'chat'

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log("Datos enviados:", formData.query);

      // Utilizar la función searchCochesNet del servicio API
      const data = await searchCochesNet({
        query: formData.query,
        type: formData.type || 'fast'
      });

      if (!data.success) {
        throw new Error(data.error || 'Error al procesar la búsqueda');
      }

      setResults(data);
    } catch (err) {
      setError(err.message || "Ha ocurrido un error al buscar datos");
      console.error("Error de búsqueda:", err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "search", label: "Formulario de búsqueda" },
    { id: "chat", label: "Asistente de chat" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 pt-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &lt; Volver al inicio
      </Link>

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Buscador de Autocaravanas y Remolques
      </h1>

      <TabsNavigation
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Contenido basado en la pestaña activa */}
      {activeTab === "search" ? (
        <>
          <SearchForm onSubmit={handleSubmit} />

          {loading && <Loader />}

          {error && <ErrorMessage message={error} />}

          {results && <ResultsDisplay results={results} />}
        </>
      ) : (
        <CochesNetChat />
      )}
    </div>
  );
}