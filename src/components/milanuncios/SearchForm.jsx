import { useState } from "react";
import SearchTypeToggle from "@/components/common/SearchTypeToggle";
import CarDetails from "./form-sections/CarDetails";
import PriceRange from "./form-sections/PriceRange";
import VehicleSpecs from "./form-sections/VehicleSpecs";
import PaginationSelector from "../common/PaginationSelector";

const MilanunciosSearchForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [isDeepSearch, setIsDeepSearch] = useState(false);
  const [showDirectSearch, setShowDirectSearch] = useState(false);
  const [directQuery, setDirectQuery] = useState("");
  const [step, setStep] = useState(10); // Añadido el estado para la paginación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Determinar el término de búsqueda principal
    let searchTerm = "";
    if (formData.s) {
      searchTerm = formData.s;
    } else if (formData.makeModel) {
      searchTerm = formData.makeModel;
    }

    // Verificar que hay al menos un criterio válido de búsqueda
    if (!searchTerm) {
      alert("Por favor, introduce al menos un término de búsqueda");
      return;
    }

    // Crear un objeto con todos los parámetros de búsqueda según el formato original
    const searchParams = {
      s: searchTerm, // Término de búsqueda principal (parámetro 's' en lugar de 'query')
      type: isDeepSearch ? "deep" : "fast",
    };

    // Añadir parámetros de rango de precios
    if (formData.desde) searchParams.desde = formData.desde;
    if (formData.hasta) searchParams.hasta = formData.hasta;

    // Añadir filtros de tipo de anuncio y vendedor
    if (formData.demanda) searchParams.demanda = formData.demanda;
    if (formData.vendedor) searchParams.vendedor = formData.vendedor;

    // Ordenamiento
    if (formData.orden) searchParams.orden = formData.orden;
    else searchParams.orden = "relevance"; // Orden predeterminado

    // Añadir parámetros fijos necesarios según el archivo test.js
    searchParams.fromSearch = "1";
    searchParams.fromSuggester = "1";
    searchParams.suggestionUsed = "0";
    searchParams.hitOrigin = "listing";
    searchParams.recentSearchShowed = "0";
    searchParams.recentSearchUsed = "0";

    // Añadir los parámetros adicionales de los que disponemos
    if (formData.year) searchParams.year = formData.year;
    if (formData.kms) searchParams.kms = formData.kms;
    if (formData.color) searchParams.color = formData.color;
    if (formData.fuel) searchParams.fuel = formData.fuel;
    if (formData.transmission)
      searchParams.transmission = formData.transmission;
    if (formData.doors) searchParams.doors = formData.doors;
    if (formData.body) searchParams.body = formData.body;
    if (formData.caract) searchParams.caract = formData.caract;

    // Enviar al componente padre
    onSubmit(searchParams);
  };

  const handleDirectSearch = () => {
    if (directQuery.trim()) {
      // Enviar la URL directa al componente padre
      onSubmit({ query: directQuery.trim() });
    } else {
      alert("Por favor, escribe una consulta de búsqueda");
    }
  };

  const toggleDirectSearch = () => {
    setShowDirectSearch(!showDirectSearch);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="bg-gray-100 px-4 py-3 border-b">
        <h5 className="text-lg font-semibold text-gray-700">
          Buscador en Milanuncios
        </h5>
      </div>
      <div className="p-6">
        <form id="milanunciosSearchForm" onSubmit={handleSubmit}>
          <SearchTypeToggle
            isDeepSearch={isDeepSearch}
            onChange={() => setIsDeepSearch(!isDeepSearch)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="makeModel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Marca y modelo
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="makeModel"
                name="makeModel"
                placeholder="Ej: Hyundai Negro, Fiat Ducato..."
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="s"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Búsqueda avanzada
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="s"
                name="s"
                placeholder="Texto completo de búsqueda"
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Si se especifica, tiene prioridad sobre Marca y modelo
              </p>
            </div>
          </div>

          {/* Componente para el rango de precios */}
          <PriceRange onChange={handleChange} />

          {/* Componente para detalles del vehículo */}
          <CarDetails onChange={handleChange} />

          {/* Componente para especificaciones técnicas */}
          <VehicleSpecs onChange={handleChange} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="demanda"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de anuncio
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="demanda"
                name="demanda"
                onChange={handleChange}
              >
                <option value="">Todos</option>
                <option value="n">Venta</option>
                <option value="s">Compra</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="vendedor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de vendedor
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="vendedor"
                name="vendedor"
                onChange={handleChange}
              >
                <option value="">Todos</option>
                <option value="part">Particular</option>
                <option value="prof">Profesional</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="orden"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ordenar por
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="orden"
                name="orden"
                onChange={handleChange}
              >
                <option value="relevance">Relevancia</option>
                <option value="date-desc">Más recientes primero</option>
                <option value="date-asc">Más antiguos primero</option>
                <option value="price-asc">Precio más bajo primero</option>
                <option value="price-desc">Precio más alto primero</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            <button
              type="submit"
              className="px-6 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={toggleDirectSearch}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Búsqueda directa por URL
            </button>
          </div>
        </form>

        {showDirectSearch && (
          <div className="mt-4">
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Pega la URL completa de Milanuncios aquí"
                value={directQuery}
                onChange={(e) => setDirectQuery(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                onClick={handleDirectSearch}
              >
                Buscar
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Ejemplo:
              https://www.milanuncios.com/motor/?s=hyundai+negro&desde=1010&hasta=20200&orden=relevance
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MilanunciosSearchForm;