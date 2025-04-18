const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Funciones para Wallapop
export const searchWallapop = async (params) => {
  try {
    // Extraemos la cadena de consulta y el tipo de búsqueda
    const { query, type = 'fast' } = params;

    const response = await fetch(`${API_URL}/search/wallapop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        type: type
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la búsqueda de Wallapop');
    }

    return await response.json();
  } catch (error) {
    console.error('Error buscando en Wallapop:', error);
    throw error;
  }
};

// Funciones para Milanuncios
export const searchMilanuncios = async (params) => {
  try {
    // Extraemos la cadena de consulta y el tipo de búsqueda
    const { query, type = 'fast' } = params;

    const response = await fetch(`${API_URL}/search/milanuncios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        type: type
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la búsqueda de Milanuncios');
    }

    return await response.json();
  } catch (error) {
    console.error('Error buscando en Milanuncios:', error);
    throw error;
  }
};

// Funciones para Coches.net
export const searchCochesNet = async (params) => {
  try {
    // Extraemos la cadena de consulta y el tipo de búsqueda
    const { query, type = 'fast' } = params;

    const response = await fetch(`${API_URL}/search/cochesnet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        type: type
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la búsqueda de Coches.net');
    }

    return await response.json();
  } catch (error) {
    console.error('Error buscando en Coches.net:', error);
    throw error;
  }
};

// Funciones para chats
export const sendWallapopChatMessage = async (message, type = 'fast') => {
  return sendChatMessage('wallapop', message, type);
};

export const sendMilanunciosChatMessage = async (message, type = 'fast') => {
  return sendChatMessage('milanuncios', message, type);
};

export const sendCochesNetChatMessage = async (message, type = 'fast') => {
  return sendChatMessage('cochesnet', message, type);
};

const sendChatMessage = async (platform, message, type = 'fast') => {
  try {
    // Enviamos el mensaje como parámetro de consulta y el tipo como campo separado
    const queryParams = `?message=${encodeURIComponent(message)}`;
    
    const response = await fetch(`${API_URL}/chat/${platform}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query: queryParams,
        type: type
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la comunicación con el chat de ${platform}`);
    }
    
    // Verificar el tipo de contenido de la respuesta
    const contentType = response.headers.get('content-type');
    
    // Si la respuesta no es JSON o está vacía, devolver un objeto predeterminado
    if (!contentType || !contentType.includes('application/json') || response.status === 204) {
      return { success: true, message: "Solicitud procesada correctamente" };
    }
    
    // Si hay contenido JSON, procesarlo normalmente
    return await response.json();
  } catch (error) {
    console.error(`Error en chat de ${platform}:`, error);
    throw error;
  }
};