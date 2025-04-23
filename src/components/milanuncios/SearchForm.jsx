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

  // Manejador para cambios en checkboxes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked.toString(),
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

    // Añadir categoría
    if (formData.cat) searchParams.cat = formData.cat;

    // Añadir marca
    if (formData.marca) searchParams.marca = formData.marca;

    // Añadir ubicación
    if (formData.location) searchParams.location = formData.location;

    // Añadir parámetros de rango de precios
    if (formData.desde) searchParams.desde = formData.desde;
    if (formData.hasta) searchParams.hasta = formData.hasta;

    // Añadir tipo de precio (contado/financiado)
    if (formData.financedPrice)
      searchParams.financedPrice = formData.financedPrice;

    // Añadir garantía
    if (formData.hasWarranty) searchParams.hasWarranty = formData.hasWarranty;

    // Añadir kilometraje
    if (formData.kilometersFrom)
      searchParams.kilometersFrom = formData.kilometersFrom;
    if (formData.kilometersTo)
      searchParams.kilometersTo = formData.kilometersTo;

    // Añadir año
    if (formData.anod) searchParams.anod = formData.anod;
    if (formData.anoh) searchParams.anoh = formData.anoh;

    // Añadir potencia
    if (formData.engineHpFrom)
      searchParams.engineHpFrom = formData.engineHpFrom;
    if (formData.engineHpTo) searchParams.engineHpTo = formData.engineHpTo;

    // Añadir tipo de cambio
    if (formData.cajacambio) searchParams.cajacambio = formData.cajacambio;

    // Añadir etiqueta medioambiental
    if (formData.environmentalLabel)
      searchParams.environmentalLabel = formData.environmentalLabel;

    // Añadir plazas
    if (formData.seats) searchParams.seats = formData.seats;

    // Añadir combustible
    if (formData.combustible) searchParams.combustible = formData.combustible;

    // Añadir color
    if (formData.color) searchParams.color = formData.color;

    // Añadir certificado de marca
    if (formData.isCertified) searchParams.isCertified = formData.isCertified;

    // Añadir número de puertas
    if (formData.puertas) searchParams.puertas = formData.puertas;

    // Añadir filtros de tipo de anuncio y vendedor
    if (formData.demanda) searchParams.demanda = formData.demanda;
    if (formData.vendedor) searchParams.vendedor = formData.vendedor;

    // Ordenamiento
    if (formData.orden) searchParams.orden = formData.orden;
    else searchParams.orden = "relevance"; // Orden predeterminado

    // Añadir parámetros fijos necesarios según el archivo test.js
    searchParams.fromSearch = "1";
    searchParams.hitOrigin = "listing";

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
          <div className="flex justify-between items-start mb-4">
            <PaginationSelector step={step} onChange={setStep} />
            <SearchTypeToggle
              isDeepSearch={isDeepSearch}
              onChange={() => setIsDeepSearch(!isDeepSearch)}
            />
          </div>

          {/* Categoría y Marca */}
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
                onChange={handleChange}
                defaultValue="Coches"
              >
                <option>Todas las categorías</option>
                <option>Todo Motor</option>
                <option>Coches</option>
                <option>Todoterreno</option>
                <option>Coches clásicos</option>
                <option>Coches sin carnet</option>
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
                onChange={handleChange}
                defaultValue=""
              >
                <option value="">Todas las marcas</option>
                <option value="1">ABARTH</option>
                <option value="2">ALFA ROMEO</option>
                <option value="3">ARO</option>
                <option value="4">ASIA</option>
              </select>
            </div>
          </div>

          {/* Ubicación y Vendedor */}
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
                placeholder="Ej: Madrid, Barcelona..."
                onChange={handleChange}
                defaultValue="Toda España"
              />
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
                defaultValue=""
              >
                <option value="">Todos</option>
                <option value="part">Particular</option>
                <option value="prof">Profesional</option>
              </select>
            </div>
          </div>

          {/* Término de búsqueda */}
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

          {/* Tipo de precio y Garantía */}
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
                onChange={handleChange}
                defaultValue="Contado"
              >
                <option>Contado</option>
                <option>Financiado</option>
              </select>
            </div>
            <div className="flex items-center mt-8">
              <input
                type="checkbox"
                id="hasWarranty"
                name="hasWarranty"
                onChange={handleCheckboxChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="hasWarranty"
                className="ml-2 block text-sm text-gray-700"
              >
                Con garantía
              </label>
            </div>
          </div>

          {/* Rangos de precio */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rango de precio
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="desde"
                  name="desde"
                  placeholder="Desde"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="hasta"
                  name="hasta"
                  placeholder="Hasta"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Kilometraje */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kilometraje
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="kilometersFrom"
                  name="kilometersFrom"
                  placeholder="Desde"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="kilometersTo"
                  name="kilometersTo"
                  placeholder="Hasta"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Año */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Año
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="anod"
                  name="anod"
                  placeholder="Desde"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="anoh"
                  name="anoh"
                  placeholder="Hasta"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Potencia */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Potencia (CV)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="engineHpFrom"
                  name="engineHpFrom"
                  placeholder="Desde"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  id="engineHpTo"
                  name="engineHpTo"
                  placeholder="Hasta"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Características del vehículo */}
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
                onChange={handleChange}
                defaultValue=""
              >
                <option value="">Todos</option>
                <option value="manual">Manual</option>
                <option value="auto">Automático</option>
              </select>
            </div>
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
                onChange={handleChange}
                defaultValue=""
              >
                <option value="">Todos los combustibles</option>
                <option>Diesel</option>
                <option>Gasolina</option>
                <option>Eléctrico</option>
                <option>Híbrido</option>
                <option>Gas licuado (GLP)</option>
                <option>Otros</option>
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
                onChange={handleChange}
                defaultValue=""
              >
                <option value="">Todos los colores</option>
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
          </div>

          {/* Etiqueta y Puertas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                onChange={handleChange}
                defaultValue=""
              >
                <option value="">Todas las etiquetas ambientales</option>
                <option value="0">Etiqueta CERO</option>
                <option value="ECO">Etiqueta ECO</option>
                <option value="C">Etiqueta C</option>
                <option value="B">Etiqueta B</option>
                <option value="NO_LABEL">Etiqueta A</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="seats"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Número de plazas
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="seats"
                name="seats"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="">Todas las plazas</option>
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
                onChange={handleChange}
                defaultValue=""
              >
                <option value="">Todas</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          {/* Ordenación y Certificado */}
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
                defaultValue="relevance"
              >
                <option value="relevance">Relevancia</option>
                <option value="date">Fecha</option>
                <option value="price">Precio</option>
                <option value="price-asc">Precio más bajo primero</option>
                <option value="price-desc">Precio más alto primero</option>
              </select>
            </div>
            <div className="flex items-center mt-8">
              <input
                type="checkbox"
                id="isCertified"
                name="isCertified"
                onChange={handleCheckboxChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isCertified"
                className="ml-2 block text-sm text-gray-700"
              >
                Con certificado de marca
              </label>
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
