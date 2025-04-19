import { useState } from "react";
import SearchTypeToggle from "@/components/common/SearchTypeToggle";

const SearchForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [isDeepSearch, setIsDeepSearch] = useState(false);
  const [showDirectSearch, setShowDirectSearch] = useState(false);
  const [directQuery, setDirectQuery] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construir la consulta en formato natural para enviar a la IA
    let query = "";

    if (formData.vehicleType) {
      if (formData.vehicleType === "3821") query += "autocaravana ";
      else if (formData.vehicleType === "3820") query += "caravana ";
      else if (formData.vehicleType === "3822") query += "remolque ";
    }

    if (formData.makeModel) {
      query += formData.makeModel + " ";
    }

    if (formData.minPrice && formData.maxPrice) {
      query += `entre ${formData.minPrice} y ${formData.maxPrice} euros`;
    } else if (formData.minPrice) {
      query += `desde ${formData.minPrice} euros`;
    } else if (formData.maxPrice) {
      query += `hasta ${formData.maxPrice} euros`;
    }

    // Si hay una consulta, realizar la búsqueda
    if (query.trim()) {
      onSubmit({ query: query.trim() });
    } else {
      alert("Por favor, introduce al menos un criterio de búsqueda");
    }
  };

  const handleDirectSearch = () => {
    if (directQuery.trim()) {
      onSubmit({ query: directQuery.trim() });
    } else {
      alert("Por favor, escribe una consulta de búsqueda");
    }
  };

  const toggleDirectSearch = () => {
    setShowDirectSearch(!showDirectSearch);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 p-6">
      <form id="searchForm" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label
              htmlFor="vehicleType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo de vehículo
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              id="vehicleType"
              name="vehicleType"
              onChange={handleChange}
            >
              <option value="">Todos</option>
              <option value="3821">Autocaravana</option>
              <option value="3820">Caravana</option>
              <option value="3822">Remolques</option>
            </select>
          </div>
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
              placeholder="Ej: Mercedes Benz, Fiat Ducato..."
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Precio desde
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              id="minPrice"
              name="minPrice"
              onChange={handleChange}
            >
              <option value="">Sin mínimo</option>
              <option value="1000">1.000 €</option>
              <option value="2000">2.000 €</option>
              <option value="3000">3.000 €</option>
              <option value="4000">4.000 €</option>
              <option value="5000">5.000 €</option>
              <option value="6000">6.000 €</option>
              <option value="7000">7.000 €</option>
              <option value="8000">8.000 €</option>
              <option value="9000">9.000 €</option>
              <option value="10000">10.000 €</option>
              <option value="11000">11.000 €</option>
              <option value="12000">12.000 €</option>
              <option value="13000">13.000 €</option>
              <option value="14000">14.000 €</option>
              <option value="15000">15.000 €</option>
              <option value="16000">16.000 €</option>
              <option value="17000">17.000 €</option>
              <option value="18000">18.000 €</option>
              <option value="19000">19.000 €</option>
              <option value="20000">20.000 €</option>
              <option value="21000">21.000 €</option>
              <option value="22000">22.000 €</option>
              <option value="23000">23.000 €</option>
              <option value="24000">24.000 €</option>
              <option value="25000">25.000 €</option>
              <option value="30000">30.000 €</option>
              <option value="35000">35.000 €</option>
              <option value="40000">40.000 €</option>
              <option value="50000">50.000 €</option>
              <option value="60000">60.000 €</option>
              <option value="70000">70.000 €</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Precio hasta
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              id="maxPrice"
              name="maxPrice"
              onChange={handleChange}
            >
              <option value="">Sin máximo</option>
              <option value="1000">1.000 €</option>
              <option value="2000">2.000 €</option>
              <option value="3000">3.000 €</option>
              <option value="4000">4.000 €</option>
              <option value="5000">5.000 €</option>
              <option value="6000">6.000 €</option>
              <option value="7000">7.000 €</option>
              <option value="8000">8.000 €</option>
              <option value="9000">9.000 €</option>
              <option value="10000">10.000 €</option>
              <option value="11000">11.000 €</option>
              <option value="12000">12.000 €</option>
              <option value="13000">13.000 €</option>
              <option value="14000">14.000 €</option>
              <option value="15000">15.000 €</option>
              <option value="16000">16.000 €</option>
              <option value="17000">17.000 €</option>
              <option value="18000">18.000 €</option>
              <option value="19000">19.000 €</option>
              <option value="20000">20.000 €</option>
              <option value="21000">21.000 €</option>
              <option value="22000">22.000 €</option>
              <option value="23000">23.000 €</option>
              <option value="24000">24.000 €</option>
              <option value="25000">25.000 €</option>
              <option value="30000">30.000 €</option>
              <option value="35000">35.000 €</option>
              <option value="40000">40.000 €</option>
              <option value="50000">50.000 €</option>
              <option value="60000">60.000 €</option>
              <option value="70000">70.000 €</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Buscar
          </button>
          <button
            type="button"
            onClick={toggleDirectSearch}
            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Búsqueda en texto libre
          </button>
        </div>
      </form>

      {showDirectSearch && (
        <div className="mt-4">
          <div className="flex space-x-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe tu búsqueda: ej. autocaravana mercedes menos de 40000"
              value={directQuery}
              onChange={(e) => setDirectQuery(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleDirectSearch}
            >
              Buscar
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Ejemplos: "autocaravana fiat menos de 30000", "caravana ford transit
            entre 10000 y 50000", "mercedes benz marco polo"
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
