// filepath: /buscador-vehiculos/buscador-vehiculos/src/utils/validators.js
export const validateSearchForm = (formData) => {
  const errors = {};

  if (!formData.keywords) {
    errors.keywords = "Keywords are required.";
  }

  if (!formData.brand) {
    errors.brand = "Brand is required.";
  }

  if (!formData.model) {
    errors.model = "Model is required.";
  }

  if (formData.min_sale_price && formData.max_sale_price && formData.min_sale_price > formData.max_sale_price) {
    errors.priceRange = "Minimum sale price cannot be greater than maximum sale price.";
  }

  return errors;
};

export const validateChatInput = (input) => {
  if (!input || input.trim() === "") {
    return "Chat input cannot be empty.";
  }
  return null;
};