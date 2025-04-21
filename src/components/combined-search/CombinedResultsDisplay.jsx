import React, { useState } from "react";

const CombinedResultsDisplay = ({ results, loading }) => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Determinar si hay resultados en cualquiera de las fuentes
  const hasAnyResults = () => {
    return (
      (results.wallapop && (results.wallapop.data?.length > 0 || Array.isArray(results.wallapop) && results.wallapop.length > 0)) ||
      (results.milanuncios && (results.milanuncios.data?.length > 0 || Array.isArray(results.milanuncios) && results.milanuncios.length > 0)) ||
      (results.cochesnet && (results.cochesnet.data?.length > 0 || Array.isArray(results.cochesnet) && results.cochesnet.length > 0))
    );
  };
  
  // Si no hay resultados y no está cargando, mostrar mensaje
  if (!hasAnyResults() && !loading.wallapop && !loading.milanuncios && !loading.cochesnet) {
    if (results.wallapop === null && results.milanuncios === null && results.cochesnet === null) {
      return null; // No mostrar nada si aún no se ha realizado ninguna búsqueda
    }
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No se encontraron resultados en ninguna plataforma.
        </div>
      </div>
    );
  }
  
  // Extraer los datos de resultados según la estructura
  const getItems = (source) => {
    if (!source) return [];
    if (Array.isArray(source)) return source;
    if (source.data && Array.isArray(source.data)) return source.data;
    return [];
  };
  
  const wallapopItems = getItems(results.wallapop);
  const milanunciosItems = getItems(results.milanuncios);
  const cochesnetItems = getItems(results.cochesnet);
  
  // Función para renderizar una tarjeta de resultado
  const renderCard = (item, platform) => {
    // Asignar colores según la plataforma
    let bgColor, textColor, borderColor;
    switch (platform) {
      case 'wallapop':
        bgColor = "bg-green-100";
        textColor = "text-green-600";
        borderColor = "border-green-300";
        break;
      case 'milanuncios':
        bgColor = "bg-yellow-100";
        textColor = "text-yellow-600";
        borderColor = "border-yellow-300";
        break;
      case 'cochesnet':
        bgColor = "bg-blue-100";
        textColor = "text-blue-600";
        borderColor = "border-blue-300";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-600";
        borderColor = "border-gray-300";
    }
    
    return (
      <div key={item.id || `${platform}-${item.url || Math.random()}`} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-4">
        <div className="h-48 bg-gray-200 relative overflow-hidden">
          {item.imageUrl ? (
            <img 
              src={item.imageUrl} 
              alt={item.title || "Vehículo"} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.jpg";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">Sin imagen</span>
            </div>
          )}
          <div className={`absolute top-0 right-0 ${bgColor} ${textColor} px-2 py-1 text-xs font-semibold m-2 rounded-full`}>
            {platform === 'wallapop' ? 'Wallapop' : platform === 'milanuncios' ? 'Milanuncios' : 'Coches.net'}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
          <div className="flex justify-between items-center mb-2">
            <span className={`font-bold ${textColor}`}>{item.price}</span>
            <span className="text-sm text-gray-600">{item.location}</span>
          </div>
          <div className="text-sm text-gray-700 mb-3">
            {item.details && Array.isArray(item.details) 
              ? item.details.join(" • ") 
              : item.details}
          </div>
          <div className="flex justify-end">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block px-3 py-1 ${bgColor} ${textColor} rounded border ${borderColor} text-sm hover:opacity-80 transition`}
            >
              Ver anuncio
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  // Contadores de resultados
  const wallapopCount = wallapopItems.length;
  const milanunciosCount = milanunciosItems.length;
  const cochesnetCount = cochesnetItems.length;
  const totalCount = wallapopCount + milanunciosCount + cochesnetCount;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Resultados de la búsqueda</h2>
      
      {/* Pestañas para filtrar resultados */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab("all")}
            className={`mr-4 py-2 px-1 ${
              activeTab === "all"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Todos ({totalCount})
          </button>
          <button
            onClick={() => setActiveTab("wallapop")}
            className={`mr-4 py-2 px-1 ${
              activeTab === "wallapop"
                ? "border-b-2 border-green-500 text-green-600"
                : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Wallapop ({wallapopCount})
          </button>
          <button
            onClick={() => setActiveTab("milanuncios")}
            className={`mr-4 py-2 px-1 ${
              activeTab === "milanuncios"
                ? "border-b-2 border-yellow-500 text-yellow-600"
                : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Milanuncios ({milanunciosCount})
          </button>
          <button
            onClick={() => setActiveTab("cochesnet")}
            className={`py-2 px-1 ${
              activeTab === "cochesnet"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Coches.net ({cochesnetCount})
          </button>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mostrar resultados según la pestaña activa */}
        {activeTab === "all" || activeTab === "wallapop" ? (
          wallapopItems.map(item => renderCard(item, 'wallapop'))
        ) : null}
        
        {activeTab === "all" || activeTab === "milanuncios" ? (
          milanunciosItems.map(item => renderCard(item, 'milanuncios'))
        ) : null}
        
        {activeTab === "all" || activeTab === "cochesnet" ? (
          cochesnetItems.map(item => renderCard(item, 'cochesnet'))
        ) : null}
        
        {/* Mostrar mensaje si no hay resultados en la pestaña seleccionada */}
        {activeTab === "wallapop" && wallapopItems.length === 0 && !loading.wallapop && (
          <div className="col-span-full text-center py-6 text-gray-500">
            No se encontraron resultados en Wallapop.
          </div>
        )}
        
        {activeTab === "milanuncios" && milanunciosItems.length === 0 && !loading.milanuncios && (
          <div className="col-span-full text-center py-6 text-gray-500">
            No se encontraron resultados en Milanuncios.
          </div>
        )}
        
        {activeTab === "cochesnet" && cochesnetItems.length === 0 && !loading.cochesnet && (
          <div className="col-span-full text-center py-6 text-gray-500">
            No se encontraron resultados en Coches.net.
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedResultsDisplay;