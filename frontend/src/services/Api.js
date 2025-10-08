
import axios from 'axios';

/**
 * URL base do backend NestJS
 * - Em desenvolvimento: http://localhost:62404
 * - Em produção: alterar para URL do servidor

 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:62404';

/**
 * Instância configurada do Axios
 * 
 * Configurações:
 * - baseURL: Define a URL base para todas as requisições
 * - timeout: Tempo máximo de espera (10 segundos)
 * - headers: Headers padrão enviados em todas as requisições
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor de Requisições
 * 
 * Adiciona o token de autenticação (JWT)
 * em todas as requisições no localStorage
 */
api.interceptors.request.use(
  (config) => {
    // Busca o token armazenado localmente
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`[API] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API] Erro na requisição:', error);
    return Promise.reject(error);
  }
);

/**
 * Tratamento de erros gerais:
 * - 401: Token expirado/inválido (redireciona para login)
 * - 403: Sem permissão
 * - 500: Erro no servidor
 */
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Resposta recebida:`, response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          console.error('[API] Não autorizado - Token inválido');
          // Remove token inválido
          localStorage.removeItem('authToken');
          // Redireciona para login (implementar depois)
          // window.location.href = '/login';
          break;
          
        case 403:
          console.error('[API] Acesso negado');
          break;
          
        case 404:
          console.error('[API] Não encontrado');
          break;
          
        case 500:
          console.error('[API] Erro no servidor');
          break;
          
        default:
          console.error(`[API] Erro ${status}:`, data);
      }
    } else if (error.request) {
      console.error('[API] Sem resposta do servidor:', error.request);
    } else {
      console.error('[API] Erro:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;