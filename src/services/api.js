const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:1337';

// Funciones para Wallapop
export const searchWallapop = async (params) => {
  try {
    // Extraemos la cadena de consulta, el tipo de búsqueda y la paginación
    const { query, type = 'fast', step = 1 } = params;

    const response = await fetch(`${API_URL}/search/wallapop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        type: type,
        step: step
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la búsqueda de Wallapop');
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
    console.error('Error buscando en Wallapop:', error);
    throw error;
  }
};

// Funciones para Milanuncios
export const searchMilanuncios = async (params) => {
  try {
    // URL del backend local para Milanuncios
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:1337';
    
    // Extraemos la cadena de consulta y el tipo de búsqueda
    const { query, type = 'fast', step=1, ...otherParams} = params;

    const response = await fetch(`${BACKEND_URL}/milanuncios/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        type,
        step,
        ...otherParams
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la búsqueda de Milanuncios');
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
    console.error('Error buscando en Milanuncios:', error);
    throw error;
  }
};

// Funciones para Coches.net
export const searchCochesNet = async (params) => {
  try {
    // Extraemos la cadena de consulta, el tipo de búsqueda y la paginación
    const { query, type = 'fast', step = 1 } = params;

    const response = await fetch(`${BACKEND_URL}/cochesnet/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        type: type,
        step: step
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la búsqueda de Coches.net');
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
    console.error('Error buscando en Coches.net:', error);
    throw error;
  }
};

// Funciones para chats
export const sendWallapopChatMessage = async (message, type = 'fast', step = 1) => {
  return sendChatMessage('wallapop', message, type, step);
};

export const sendMilanunciosChatMessage = async (message, type = 'fast', step = 1) => {
  return sendChatMessage('milanuncios', message, type, step);
};

export const sendCochesNetChatMessage = async (message, type = 'fast', step = 1) => {
  return sendChatMessage('cochesnet', message, type, step);
};

const sendChatMessage = async (platform, message, type = 'fast', step = 1) => {
  try {
    // Enviamos el mensaje directamente en el cuerpo de la solicitud
    const response = await fetch(`${API_URL}/chat/${platform}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        type: type,
        step: step
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la comunicación con el chat de ${platform}`);
    }
    console.log('Respuesta del chat:', response);
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