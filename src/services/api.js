const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Funciones para Wallapop
export const searchWallapop = async (params) => {
  try {
    // Si no se especifica type, utilizamos 'fast' por defecto
    const searchParams = {
      ...params,
      type: params.type || 'fast'
    };

    const response = await fetch(`${API_URL}/search/wallapop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchParams),
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
    // Si no se especifica type, utilizamos 'fast' por defecto
    const searchParams = {
      ...params,
      type: params.type || 'fast'
    };

    const response = await fetch(`${API_URL}/search/milanuncios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchParams),
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
    // Si no se especifica type, utilizamos 'fast' por defecto
    const searchParams = {
      ...params,
      type: params.type || 'fast'
    };

    const response = await fetch(`${API_URL}/search/cochesnet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchParams),
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
    const response = await fetch(`${API_URL}/chat/${platform}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, type }),
    });

    if (!response.ok) {
      throw new Error(`Error en la comunicación con el chat de ${platform}`);
    }
    console.log('Respuesta del chat:', response);
    return await response.json();
  } catch (error) {
    console.error(`Error en chat de ${platform}:`, error);
    throw error;
  }
};