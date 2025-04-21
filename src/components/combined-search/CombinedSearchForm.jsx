import React, { useState } from "react";
import SearchTypeToggle from "@/components/common/SearchTypeToggle";
import PaginationSelector from "@/components/common/PaginationSelector";

const CombinedSearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const [isDeepSearch, setIsDeepSearch] = useState(false);
  const [step, setStep] = useState(1);
  const [vehicleType, setVehicleType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      alert("Por favor, introduce un texto para la búsqueda");
      return;
    }

    // Construir la consulta combinando los parámetros
    let fullQuery = query.trim();

    // Añadir criterios adicionales si están presentes
    if (vehicleType) {
      fullQuery += ` ${vehicleType}`;
    }
    
    if (fuelType) {
      fullQuery += ` ${fuelType}`;
    }
    
    if (transmission) {
      fullQuery += ` ${transmission}`;
    }
    
    if (minPrice && maxPrice) {
      fullQuery += ` entre ${minPrice}€ y ${maxPrice}€`;
    } else if (minPrice) {
      fullQuery += ` desde ${minPrice}€`;
    } else if (maxPrice) {
      fullQuery += ` hasta ${maxPrice}€`;
    }
    
    if (minYear && maxYear) {
      fullQuery += ` entre año ${minYear} y ${maxYear}`;
    } else if (minYear) {
      fullQuery += ` desde año ${minYear}`;
    } else if (maxYear) {
      fullQuery += ` hasta año ${maxYear}`;
    }

    // Enviar parámetros de búsqueda
    onSubmit({
      query: fullQuery,
      type: isDeepSearch ? "deep" : "fast",
      step: step
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Búsqueda en Todas las Plataformas</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-start mb-4">
          <PaginationSelector step={step} onChange={setStep} />
          <SearchTypeToggle
            isDeepSearch={isDeepSearch}
            onChange={() => setIsDeepSearch(!isDeepSearch)}
          />
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="query" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            ¿Qué estás buscando?
          </label>
          <input
            type="text"
            id="query"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej. Autocaravana Fiat, Ford Transit, Seat Ibiza diesel..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">
            Escribe el tipo de vehículo, marca, modelo o cualquier especificación relevante
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <label 
              htmlFor="vehicleType" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tipo de vehículo
            </label>
            <select
              id="vehicleType"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Cualquiera</option>
              <option value="coche">Coche</option>
              <option value="suv">SUV/Todoterreno</option>
              <option value="furgoneta">Furgoneta</option>
              <option value="autocaravana">Autocaravana</option>
              <option value="caravana">Caravana</option>
              <option value="remolque">Remolque</option>
            </select>
          </div>
          
          <div>
            <label 
              htmlFor="fuelType" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Combustible
            </label>
            <select
              id="fuelType"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option value="">Cualquiera</option>
              <option value="diesel">Diesel</option>
              <option value="gasolina">Gasolina</option>
              <option value="hibrido">Híbrido</option>
              <option value="electrico">Eléctrico</option>
              <option value="glp">GLP/Gas</option>
            </select>
          </div>
          
          <div>
            <label 
              htmlFor="transmission" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Transmisión
            </label>
            <select
              id="transmission"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
            >
              <option value="">Cualquiera</option>
              <option value="manual">Manual</option>
              <option value="automatico">Automático</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rango de precios
            </label>
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mín €"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Máx €"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Año
            </label>
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Desde"
                  min="1970"
                  max={new Date().getFullYear()}
                  value={minYear}
                  onChange={(e) => setMinYear(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Hasta"
                  min="1970"
                  max={new Date().getFullYear()}
                  value={maxYear}
                  onChange={(e) => setMaxYear(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Buscar en Todas las Plataformas
          </button>
        </div>
      </form>
    </div>
  );
};

export default CombinedSearchForm;