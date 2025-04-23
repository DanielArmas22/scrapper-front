import { useState } from "react";
import SearchTypeToggle from "@/components/common/SearchTypeToggle";
import CarDetails from "./form-sections/CarDetails";
import PriceRange from "./form-sections/PriceRange";
import VehicleSpecs from "./form-sections/VehicleSpecs";
import PaginationSelector from "../common/PaginationSelector";

const MilanunciosSearchForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    cat: "Coches",
    marca: null,
    location: "Toda España",
    vendedor: "Todos",
    financedPrice: "Contado",
    desde: null,
    hasta: null,
    hasWarranty: false,
    kilometersFrom: null,
    kilometersTo: null,
    anod: null,
    anoh: null,
    engineHpFrom: null,
    engineHpTo: null,
    cajacambio: "Todos",
    environmentalLabel: "Todas las etiquetas ambientales",
    seats: "Todas las plazas",
    combustible: "Todos los combustibles",
    color: "Todos los colores",
    isCertified: false,
    puertas: null,
    demanda: "Todos",
    orden: "relevance",
    fromSearch: 1,
    hitOrigin: "listing"
  });
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
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
      s: searchTerm,
      type: isDeepSearch ? "deep" : "fast",
      step: step,
    };

    // Añadir todos los parámetros del formulario al objeto de búsqueda
    Object.entries(formData).forEach(([key, value]) => {
      // Solo añadir los parámetros que tienen valor (no son nulos, vacíos o "Todos")
      if (value !== null && value !== "" && 
          (key === "cat" || key === "location" || key === "hitOrigin" || key === "fromSearch" || 
           key === "orden" || value !== "Todos")) {
        searchParams[key] = value;
      }
    });

    // Añadir parámetros fijos necesarios
    searchParams.fromSearch = "1";
    searchParams.fromSuggester = "1";
    searchParams.suggestionUsed = "0";
    searchParams.hitOrigin = "listing";
    searchParams.recentSearchShowed = "0";
    searchParams.recentSearchUsed = "0";

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
          <div className="flex justify-between items-start mb-6">
            <SearchTypeToggle
              isDeepSearch={isDeepSearch}
              onChange={() => setIsDeepSearch(!isDeepSearch)}
            />
            <PaginationSelector step={step} onChange={setStep} />
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="cat"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Categoría
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="cat"
                name="cat"
                value={formData.cat}
                onChange={handleChange}
              >
                <option value="Todas las categorías">Todas las categorías</option>
                <option value="Todo Motor">Todo Motor</option>
                <option value="Coches">Coches</option>
                <option value="Todoterreno">Todoterreno</option>
                <option value="Coches clásicos">Coches clásicos</option>
                <option value="Coches sin carnet">Coches sin carnet</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="marca"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Marca
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="marca"
                name="marca"
                value={formData.marca || ""}
                onChange={handleChange}
              >
                <option value="">Todas las marcas</option>
                <option value="1">ABARTH</option>
                <option value="2">ALFA ROMEO</option>
                <option value="3">ARO</option>
                <option value="4">ASIA</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ubicación
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="location"
                name="location"
                placeholder="Toda España"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  id="hasWarranty"
                  name="hasWarranty"
                  checked={formData.hasWarranty}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="hasWarranty" className="ml-2 block text-sm text-gray-700">
                  Con garantía
                </label>
              </div>
              <div className="flex items-center mt-3">
                <input
                  type="checkbox"
                  id="isCertified"
                  name="isCertified"
                  checked={formData.isCertified}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isCertified" className="ml-2 block text-sm text-gray-700">
                  Certificado por la marca
                </label>
              </div>
            </div>
          </div>

          {/* Componente para el rango de precios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="financedPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de precio
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="financedPrice"
                name="financedPrice"
                value={formData.financedPrice}
                onChange={handleChange}
              >
                <option value="Contado">Contado</option>
                <option value="Financiado">Financiado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rango de precios
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="desde"
                  name="desde"
                  placeholder="Desde"
                  value={formData.desde || ""}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="hasta"
                  name="hasta"
                  placeholder="Hasta"
                  value={formData.hasta || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Componentes para kilómetros, años y potencia */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kilómetros
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="kilometersFrom"
                  name="kilometersFrom"
                  placeholder="Desde"
                  value={formData.kilometersFrom || ""}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="kilometersTo"
                  name="kilometersTo"
                  placeholder="Hasta"
                  value={formData.kilometersTo || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Año
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="anod"
                  name="anod"
                  placeholder="Desde"
                  value={formData.anod || ""}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="anoh"
                  name="anoh"
                  placeholder="Hasta"
                  value={formData.anoh || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Potencia (CV)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="engineHpFrom"
                  name="engineHpFrom"
                  placeholder="Desde"
                  value={formData.engineHpFrom || ""}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="engineHpTo"
                  name="engineHpTo"
                  placeholder="Hasta"
                  value={formData.engineHpTo || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label
                htmlFor="cajacambio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de cambio
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="cajacambio"
                name="cajacambio"
                value={formData.cajacambio}
                onChange={handleChange}
              >
                <option value="Todos">Todos</option>
                <option value="manual">Manual</option>
                <option value="auto">Automático</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="puertas"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Número de puertas
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="puertas"
                name="puertas"
                value={formData.puertas || ""}
                onChange={handleChange}
              >
                <option value="">Todas</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="seats"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Plazas
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="seats"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
              >
                <option value="Todas las plazas">Todas las plazas</option>
                <option value="TWO_SEATS">2 plazas</option>
                <option value="THREE_SEATS">3 plazas</option>
                <option value="FOUR_SEATS">4 plazas</option>
                <option value="FIVE_SEATS">5 plazas</option>
                <option value="SIX_SEATS">6 plazas</option>
                <option value="SEVEN_SEATS">7 plazas</option>
                <option value="EIGHT_SEATS">8 plazas</option>
                <option value="NINE_SEATS">9 plazas</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label
                htmlFor="combustible"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Combustible
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="combustible"
                name="combustible"
                value={formData.combustible}
                onChange={handleChange}
              >
                <option value="Todos los combustibles">Todos los combustibles</option>
                <option value="Diesel">Diesel</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Eléctrico">Eléctrico</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Gas licuado (GLP)">Gas licuado (GLP)</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Color
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
              >
                <option value="Todos los colores">Todos los colores</option>
                <option value="amarillo">Amarillo</option>
                <option value="azul">Azul</option>
                <option value="beige">Beige</option>
                <option value="blanco">Blanco</option>
                <option value="dorado">Dorado</option>
                <option value="granate">Granate</option>
                <option value="gris">Gris</option>
                <option value="lila">Lila</option>
                <option value="marron">Marrón</option>
                <option value="naranja">Naranja</option>
                <option value="negro">Negro</option>
                <option value="plata">Plata</option>
                <option value="rojo">Rojo</option>
                <option value="verde">Verde</option>
                <option value="violeta">Violeta</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="environmentalLabel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Etiqueta medioambiental
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="environmentalLabel"
                name="environmentalLabel"
                value={formData.environmentalLabel}
                onChange={handleChange}
              >
                <option value="Todas las etiquetas ambientales">Todas las etiquetas ambientales</option>
                <option value="0">Etiqueta CERO</option>
                <option value="ECO">Etiqueta ECO</option>
                <option value="C">Etiqueta C</option>
                <option value="B">Etiqueta B</option>
                <option value="NO_LABEL">Etiqueta A</option>
              </select>
            </div>
          </div>

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
                value={formData.demanda}
                onChange={handleChange}
              >
                <option value="Todos">Todos</option>
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
                value={formData.vendedor}
                onChange={handleChange}
              >
                <option value="Todos">Todos</option>
                <option value="part">Particular</option>
                <option value="prof">Profesional</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
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
                value={formData.orden}
                onChange={handleChange}
              >
                <option value="relevance">Relevancia</option>