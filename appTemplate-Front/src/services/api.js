// ========================================
// 📡 SERVIÇO DE API (AXIOS)
// ========================================
// Configuração central para TODAS as chamadas HTTP
// Cuida de adicionar o token automaticamente a toda requisição

import axios from 'axios';

// Cria instância do Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000, // 10 segundos
});

// ========================================
// INTERCEPTOR DE REQUISIÇÃO
// ========================================
// Adiciona o token JWT a TODA requisição automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    // Adiciona token no header Authorization
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ========================================
// INTERCEPTOR DE RESPOSTA
// ========================================
// Trata erros (especialmente 401 - token expirado)
api.interceptors.response.use(
  // Sucesso: retorna a resposta normalmente
  (response) => response,

  // Erro: trata diferentes status HTTP
  (error) => {
    if (error.response?.status === 401) {
      // Token expirou ou é inválido
      console.error('Token expirado, redirecionando para login');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
