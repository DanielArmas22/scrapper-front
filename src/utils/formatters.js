// filepath: /buscador-vehiculos/buscador-vehiculos/src/utils/formatters.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

export const formatMileage = (mileage) => {
  return `${mileage.toLocaleString()} km`;
};