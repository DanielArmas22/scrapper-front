/**
 * Sends a search request to the Wallapop scraper API
 * @param {Object} formData - The search parameters
 * @returns {Promise<Object>} - The search results
 */
export const searchWallapop = async (formData) => {
  try {
    // Format request data according to the expected structure
    const requestData = [{
      output: {
        keywords: formData.keywords || "",
        brand: formData.brand || "",
        model: formData.model || "",
        body_type: formData.body_type || "",
        engine: formData.engine || "",
        gearbox: formData.gearbox || "",
        category_ids: formData.category_ids || null,
        professional: formData.professional === "true" ? true : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        max_km: formData.max_km ? parseInt(formData.max_km) : null,
        filters_source: formData.filters_source || "",
        min_year: formData.min_year ? parseInt(formData.min_year) : null,
        max_year: formData.max_year ? parseInt(formData.max_year) : null,
        min_sale_price: formData.min_sale_price ? parseInt(formData.min_sale_price) : null,
        max_sale_price: formData.max_sale_price ? parseInt(formData.max_sale_price) : null,
        min_seats: formData.min_seats ? parseInt(formData.min_seats) : null,
        max_seats: formData.max_seats ? parseInt(formData.max_seats) : null,
        min_num_doors: formData.min_num_doors ? parseInt(formData.min_num_doors) : null,
        max_num_doors: formData.max_num_doors ? parseInt(formData.max_num_doors) : null,
        min_horse_power: formData.min_horse_power ? parseInt(formData.min_horse_power) : null,
        max_horse_power: formData.max_horse_power ? parseInt(formData.max_horse_power) : null
      }
    }];

    const response = await fetch('https://n8n.sitemaster.lat/webhook/scrap-wallapop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `Server responded with status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

/**
 * Sends a chat message to the API
 * @param {string} message - The message to send
 * @returns {Promise<Object>} - The response from the API
 */
export const sendChatMessage = async (message) => {
  try {
    const response = await fetch('https://n8n.sitemaster.lat/webhook-test/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `Server responded with status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Chat API call failed:', error);
    throw error;
  }
};