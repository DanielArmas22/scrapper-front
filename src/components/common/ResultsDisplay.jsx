import React from 'react';

const ResultsDisplay = ({ results }) => {
  // Verificar que tenemos resultados y determinar la estructura correcta
  if (!results) {
    return <p>No se encontraron resultados.</p>;
  }

  // Determinar dónde están los datos reales según la estructura
  const items = Array.isArray(results) ? results : 
               results.data && Array.isArray(results.data) ? results.data : 
               [];

  if (items.length === 0) {
    return <p>No se encontraron vehículos que coincidan con tu búsqueda.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Resultados de la búsqueda</h2>
      <p className="mb-4">Se encontraron {items.length} vehículos:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-yellow-600">{item.price}</span>
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
                  className="inline-block px-3 py-1 bg-yellow-100 text-yellow-600 rounded border border-yellow-300 text-sm hover:bg-yellow-200 transition"
                >
                  Ver anuncio
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;