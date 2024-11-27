import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:3000/v1';

// Crea una instancia de Axios
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la petición:", error.response || error.message || error);
    throw error.response?.data?.message || 'Error desconocido';
  }
);

// Función para iniciar sesión
export const login = async (email, password) => {
  try {
    const response = await api.post('/LoginUser', { email, password });
    const { token, user } = response.data;
    console.log("Datos de login recibidos:", response.data);
    localStorage.setItem('token', token);
    return { token, user };
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

// Función para registrar un nuevo usuario
export const registro = async (userData) => {
  try {
    console.log("Datos de registro:", userData);
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem("token");
  console.log("Sesión cerrada y token eliminado.");
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export { api };

