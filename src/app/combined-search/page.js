"use client";
import { useState } from "react";
import Link from "next/link";
import CombinedSearchForm from "@/components/combined-search/CombinedSearchForm";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
import CombinedResultsDisplay from "@/components/combined-search/CombinedResultsDisplay";
import { searchWallapop, searchMilanuncios, searchCochesNet } from "@/services/api";

export default function CombinedSearchPage() {
  const [loading, setLoading] = useState({
    wallapop: false,
    milanuncios: false,
    cochesnet: false
  });
  const [results, setResults] = useState({
    wallapop: null,
    milanuncios: null,
    cochesnet: null
  });
  const [error, setError] = useState({
    wallapop: null,
    milanuncios: null,
    cochesnet: null
  });

  const isAnyLoading = () => {
    return loading.wallapop || loading.milanuncios || loading.cochesnet;
  };

  const handleSearch = async (searchParams) => {
    // Resetear resultados y errores
    setResults({
      wallapop: null,
      milanuncios: null,
      cochesnet: null
    });
    setError({
      wallapop: null,
      milanuncios: null,
      cochesnet: null
    });
    
    // Indicar que todas las búsquedas están cargando
    setLoading({
      wallapop: true,
      milanuncios: true,
      cochesnet: true
    });

    try {
      // Realizar las tres búsquedas en paralelo
      const wallapopPromise = searchWallapop({
        query: searchParams.query,
        type: searchParams.type,
        step: searchParams.step
      });
      
      // Para Milanuncios necesitamos adaptar los parámetros al formato que espera la API
      const milanunciosParams = {
        s: searchParams.query,  // Milanuncios usa 's' en lugar de 'query'
        type: searchParams.type,
        step: searchParams.step,
        // Parámetros obligatorios para Milanuncios
        fromSearch: "1",
        fromSuggester: "1", 
        suggestionUsed: "0",
        hitOrigin: "listing",
        recentSearchShowed: "0",
        recentSearchUsed: "0",
        orden: "relevance" // Orden predeterminado
      };
      
      const milanunciosPromise = searchMilanuncios(milanunciosParams);
      
      const cochesNetPromise = searchCochesNet({
        query: searchParams.query,
        type: searchParams.type,
        step: searchParams.step
      });

      // Esperar a que todas las promesas se resuelvan
      const [wallapopData, milanunciosData, cochesNetData] = await Promise.allSettled([
        wallapopPromise,
        milanunciosPromise,
        cochesNetPromise
      ]);

      // Actualizar estados según los resultados
      setResults({
        wallapop: wallapopData.status === 'fulfilled' ? wallapopData.value : null,
        milanuncios: milanunciosData.status === 'fulfilled' ? milanunciosData.value : null,
        cochesnet: cochesNetData.status === 'fulfilled' ? cochesNetData.value : null
      });

      // Actualizar errores si corresponde
      setError({
        wallapop: wallapopData.status === 'rejected' ? wallapopData.reason.message : null,
        milanuncios: milanunciosData.status === 'rejected' ? milanunciosData.reason.message : null,
        cochesnet: cochesNetData.status === 'rejected' ? cochesNetData.reason.message : null
      });
    } catch (err) {
      console.error("Error general en la búsqueda combinada:", err);
    } finally {
      // Finalizar la carga
      setLoading({
        wallapop: false,
        milanuncios: false,
        cochesnet: false
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 pt-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &lt; Volver al inicio
      </Link>

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Búsqueda Combinada de Vehículos
      </h1>
      
      <CombinedSearchForm onSubmit={handleSearch} />

      {isAnyLoading() && <Loader />}

      {/* Mostrar errores si existen */}
      {(error.wallapop || error.milanuncios || error.cochesnet) && (
        <div className="mb-6">
          {error.wallapop && <ErrorMessage message={`Wallapop: ${error.wallapop}`} />}
          {error.milanuncios && <ErrorMessage message={`Milanuncios: ${error.milanuncios}`} />}
          {error.cochesnet && <ErrorMessage message={`Coches.net: ${error.cochesnet}`} />}
        </div>
      )}

      {/* Mostrar resultados combinados */}
      <CombinedResultsDisplay 
        results={results} 
        loading={loading}
      />
    </div>
  );
}