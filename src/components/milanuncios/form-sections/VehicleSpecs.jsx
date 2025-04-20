import React from "react";

const VehicleSpecs = ({ onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-gray-700 mb-3 border-b pb-2">
        Especificaciones técnicas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="fuel"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Combustible
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="fuel"
            name="fuel"
            onChange={onChange}
          >
            <option value="">Todos</option>
            <option value="diesel">Diésel</option>
            <option value="gasolina">Gasolina</option>
            <option value="hibrido">Híbrido</option>
            <option value="electrico">Eléctrico</option>
            <option value="glp">GLP / Gas</option>
            <option value="gnc">GNC</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="transmission"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cambio
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="transmission"
            name="transmission"
            onChange={onChange}
          >
            <option value="">Todos</option>
            <option value="manual">Manual</option>
            <option value="automatico">Automático</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="caract"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Características
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="caract"
            name="caract"
            onChange={onChange}
          >
            <option value="">Todas</option>
            <option value="aire">Aire acondicionado</option>
            <option value="llantas">Llantas de aleación</option>
            <option value="bluetooth">Bluetooth</option>
            <option value="gps">GPS/Navegador</option>
            <option value="camara">Cámara trasera</option>
            <option value="techo">Techo solar</option>
            <option value="xenon">Faros Xenon/LED</option>
            <option value="cuero">Tapicería de cuero</option>
            <option value="control">Control de crucero</option>
            <option value="park">Sensores de aparcamiento</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div>
          <label
            htmlFor="doors"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Puertas
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="doors"
            name="doors"
            onChange={onChange}
          >
            <option value="">Todas</option>
            <option value="2">2 puertas</option>
            <option value="3">3 puertas</option>
            <option value="4">4 puertas</option>
            <option value="5">5 puertas</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tipo de carrocería
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="body"
            name="body"
            onChange={onChange}
          >
            <option value="">Todos</option>
            <option value="berlina">Berlina</option>
            <option value="familiar">Familiar</option>
            <option value="coupe">Coupé</option>
            <option value="cabrio">Cabrio</option>
            <option value="suv">SUV/Todoterreno</option>
            <option value="pickup">Pickup</option>
            <option value="furgoneta">Furgoneta</option>
            <option value="autocaravana">Autocaravana</option>
            <option value="camion">Camión</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecs;