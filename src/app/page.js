"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const platforms = [
    {
      name: "Búsqueda Combinada",
      description: "Busca simultáneamente en todas las plataformas",
      logo: "/combined-search.svg", // Nuevo icono para la búsqueda combinada
      path: "/combined-search",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-500",
      featured: true
    },
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

  // Separar la búsqueda combinada destacada y las plataformas individuales
  const featuredPlatform = platforms.find(p => p.featured);
  const regularPlatforms = platforms.filter(p => !p.featured);

  return (
    <div className="max-w-6xl mx-auto p-4 pt-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Buscador de Caravanas 
      </h1>

      <p className="text-center text-gray-600 mb-12">
        Selecciona una plataforma para comenzar tu búsqueda
      </p>

      {/* Opción destacada para búsqueda combinada */}
      {featuredPlatform && (
        <div 
          className={`border-2 ${featuredPlatform.borderColor} rounded-lg ${featuredPlatform.bgColor} p-6 mb-12 cursor-pointer transition-transform hover:scale-105 hover:shadow-xl`}
          onClick={() => router.push(featuredPlatform.path)}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 mr-4 relative">
                <Image
                  src={featuredPlatform.logo}
                  alt={`${featuredPlatform.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{featuredPlatform.name}</h2>
                <p className="text-gray-600">{featuredPlatform.description}</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium transition-colors">
              Comenzar búsqueda unificada
            </button>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-6 text-center">O selecciona una plataforma específica</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {regularPlatforms.map((platform) => (
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
