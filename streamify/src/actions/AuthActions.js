
// Función de login
export const login = (email, password) => {
    return async (dispatch) => {
      try {
        // Simular una llamada a la API
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            if (email === 'usuario@ejemplo.com' && password === 'contraseña123') {
              resolve({ success: true, user: { email, name: 'Usuario Ejemplo' } });
            } else {
              throw new Error('Credenciales inválidas');
            }
          }, 1000);
        });
  
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.user,
        });
      } catch (error) {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: error.message,
        });
      }
    };
  };
  
  // Función de registro
  export const register = (name, email, birthdate, password) => {
    return async (dispatch) => {
      try {
        // Simular una llamada a la API
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true, user: { name, email, birthdate } });
          }, 1000);
        });
  
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: response.user,
        });
      } catch (error) {
        dispatch({
          type: 'REGISTER_FAILURE',
          payload: error.message,
        });
      }
    };
  };
  
  