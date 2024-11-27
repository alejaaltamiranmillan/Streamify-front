import React, { useState, useEffect } from "react";
import { Play, Mail, Lock, User, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { login, registro, isAuthenticated } from '../../services/Api';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({ email: "", password: "", name: "", birthdate: "" });
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    birthdate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
    }
  }, [navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ email: "", password: "", name: "", birthdate: "" });
    setSuccessMessage('');

    let newErrors = { email: "", password: "", name: "", birthdate: "" };
    let hasErrors = false;

    if (!form.email) {
      newErrors.email = "El correo es obligatorio.";
      hasErrors = true;
    } else if (!validateEmail(form.email)) {
      newErrors.email = "El formato del correo es incorrecto.";
      hasErrors = true;
    }

    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria.";
      hasErrors = true;
    } else if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
      hasErrors = true;
    }

    if (!isLogin) {
      if (!form.name) {
        newErrors.name = "El nombre es obligatorio.";
        hasErrors = true;
      }
      if (!form.birthdate) {
        newErrors.birthdate = "La fecha de nacimiento es obligatoria.";
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const result = await login(form.email, form.password);
        if (result.token) {
          navigate('/UserPage');
        }
      } else {
        const result = await registro({
          name: form.name,
          email: form.email,
          birthdate: form.birthdate,
          password: form.password
        });
        if (result.success) {
          setSuccessMessage('Registro exitoso. Por favor, inicia sesión.');
          setIsLogin(true);
          setForm({ ...form, name: '', birthdate: '' });
        }
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      setErrors({
        ...newErrors,
        email: error.message || "Error en la autenticación",
        password: "Por favor, verifica tus credenciales"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-pink-100 to-blue-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden"
      >
        <div className="p-8 sm:p-12">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-8 text-center"
          >
            <Play className="text-blue-500 w-16 h-16 mb-4 mx-auto" />
            <h1 className="text-4xl font-bold text-blue-800 mb-2">Streamify</h1>
            <p className="text-blue-600">Accede a tu cuenta o regístrate</p>
          </motion.div>
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-1/2 pb-2 font-semibold text-blue-600 ${
                  isLogin ? "border-b-2 border-blue-500 text-blue-700" : ""
                }`}
                onClick={() => setIsLogin(true)}
              >
                Iniciar Sesión
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-1/2 pb-2 font-semibold text-blue-600 ${
                  !isLogin ? "border-b-2 border-blue-500 text-blue-700" : ""
                }`}
                onClick={() => setIsLogin(false)}
              >
                Registrarse
              </motion.button>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "register"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {successMessage && (
                  <div className="mb-4 text-green-600 text-center">{successMessage}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {!isLogin && (
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-blue-700">
                        Nombre
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Tu nombre"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                      </div>
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                  )}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-blue-700">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  {!isLogin && (
                    <div className="space-y-2">
                      <label htmlFor="birthdate" className="block text-sm font-medium text-blue-700">
                        Fecha de Nacimiento
                      </label>
                      <div className="relative">
                        <input
                          id="birthdate"
                          name="birthdate"
                          type="date"
                          value={form.birthdate}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                      </div>
                      {errors.birthdate && <p className="text-red-500 text-xs mt-1">{errors.birthdate}</p>}
                    </div>
                  )}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-blue-700">
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="********"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-400 to-pink-400 hover:from-blue-500 hover:to-pink-500 text-white font-medium py-2 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50"
                  >
                    {isLoading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
                  </motion.button>
                </form>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

