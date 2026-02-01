// API Base URL - uses environment variable in production, falls back to proxy in development
export const API_URL = import.meta.env.VITE_API_URL || '';

// Helper function for API calls
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return response;
}
