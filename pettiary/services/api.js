import axios from 'axios';

// Configure o endereço IP do seu computador para testar no dispositivo físico
// No emulador, use 'localhost' ou '10.0.2.2' (Android) ou 'localhost' (iOS)
const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para log de requisições (útil para debug)
api.interceptors.request.use(
  (config) => {
    console.log(`📡 ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ Erro na API:', error.message);
    return Promise.reject(error);
  }
);

export default api;
