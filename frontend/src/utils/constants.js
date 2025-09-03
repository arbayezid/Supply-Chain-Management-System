// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
export const API_ENDPOINTS = {
  ITEMS: '/api/items',
  HELLO: '/api/hello',
};

// Application Configuration
export const APP_CONFIG = {
  NAME: 'Supply Chain Management System',
  VERSION: '1.0.0',
  DESCRIPTION: 'A comprehensive supply chain management solution',
};

// Form Validation
export const VALIDATION_RULES = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_QUANTITY: 0,
  MIN_PRICE: 0,
};

// UI Configuration
export const UI_CONFIG = {
  ITEMS_PER_PAGE: 10,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
};
