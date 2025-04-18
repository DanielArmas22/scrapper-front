import { useState } from "react";
import SearchTypeToggle from "@/components/common/SearchTypeToggle";

const MilanunciosSearchForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [isDeepSearch, setIsDeepSearch] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Preparar los parámetros fijos si son necesarios para Milanuncios
    const fixedParams = {
      // Añadir aquí parámetros fijos específicos para Milanuncios, si existen
    };

    // Combinar con los parámetros del formulario
    const allParams = {
      ...fixedParams,
      ...formData,
      // Quitamos el type de aquí, ya que se enviará como un campo separado
    };

    // Construir la cadena de consulta URL
    const queryParams = Object.entries(allParams)
      .filter(
        ([_, value]) => value !== null && value !== undefined && value !== ""
      )
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    // Añadir el signo de interrogación al inicio
    const queryString = `?${queryParams}`;

    // Enviar al componente padre
    onSubmit({
      query: queryString,
      type: isDeepSearch ? "deep" : "fast",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="bg-gray-100 px-4 py-3 border-b">
        <h5 className="text-lg font-semibold text-gray-700">
          Milanuncios Search
        </h5>
      </div>
      <div className="p-4">
        <form id="milanunciosSearchForm" onSubmit={handleSubmit}>
          <SearchTypeToggle
            isDeepSearch={isDeepSearch}
            onChange={() => setIsDeepSearch(!isDeepSearch)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label
                htmlFor="keywords"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Keywords
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="keywords"
                name="keywords"
                placeholder="e.g., toyota yaris"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Brand
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="brand"
                name="brand"
                placeholder="e.g., toyota"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Model
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="model"
                name="model"
                placeholder="e.g., yaris"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Additional form sections can be added here */}

          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MilanunciosSearchForm;
