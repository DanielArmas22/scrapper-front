"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const platforms = [
    {
      name: "Wallapop",
      description: "Búsqueda de vehículos en Wallapop",
      logo: "/globe.svg", // Usando un ícono existente, reemplazar con el logo real cuando esté disponible
      path: "/wallapop",
      bgColor: "bg-green-100",
      borderColor: "border-green-500"
    },
    {
      name: "Milanuncios",
      description: "Búsqueda de vehículos en Milanuncios",
      logo: "/file.svg", // Usando un ícono existente, reemplazar con el logo real cuando esté disponible
      path: "/milanuncios",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-500"
    },
    {
      name: "Coches.net",
      description: "Búsqueda de vehículos en Coches.net",
      logo: "/window.svg", // Usando un ícono existente, reemplazar con el logo real cuando esté disponible
      path: "/coches-net",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-500"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 pt-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Buscador de Caravanas 
      </h1>

      <p className="text-center text-gray-600 mb-12">
        Selecciona una plataforma para comenzar tu búsqueda
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className={`border ${platform.borderColor} rounded-lg ${platform.bgColor} p-6 cursor-pointer transition-transform hover:scale-105 hover:shadow-lg`}
            onClick={() => router.push(platform.path)}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4 relative">
                <Image
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl font-semibold mb-2">{platform.name}</h2>
              <p className="text-gray-600">{platform.description}</p>
              <button className="mt-6 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 font-medium">
                Ir a {platform.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
