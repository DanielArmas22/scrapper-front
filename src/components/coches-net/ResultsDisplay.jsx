import React from "react";

const ResultsDisplay = ({ results }) => {
  if (!results || !results.data || results.data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No se encontraron resultados para tu búsqueda.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Resultados de la búsqueda</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.data.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={
                  item.imageUrl ||
                  "https://via.placeholder.com/300x200?text=Sin+imagen"
                }
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h5 className="font-medium text-gray-900 mb-2">{item.title}</h5>
              <p className="text-2xl font-bold text-green-600 mb-2">
                {item.price}
              </p>
              <p className="text-gray-600 mb-3">
                {item.location || "Ubicación no disponible"}
              </p>

              {item.details && item.details.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.details.map((detail, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              )}

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded border border-blue-300 text-sm hover:bg-blue-200 transition"
              >
                Ver anuncio
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
