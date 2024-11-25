'use client'

import { useState } from 'react'
import { Play, Mail, Lock, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)

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
                {isLogin ? (
                  <form className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-blue-700">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          required
                          className="w-full pl-10 pr-3 py-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-blue-700">
                        Contraseña
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type="password"
                          placeholder="********"
                          required
                          className="w-full pl-10 pr-3 py-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-400 to-pink-400 hover:from-blue-500 hover:to-pink-500 text-white font-medium py-2 rounded-lg transition shadow-md hover:shadow-lg"
                    >
                      Iniciar Sesión
                    </motion.button>
                  </form>
                ) : (
                  <form className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-blue-700">
                        Nombre
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          type="text"
                          placeholder="Tu nombre"
                          required
                          className="w-full pl-10 pr-3 py-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-blue-700">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          required
                          className="w-full pl-10 pr-3 py-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-blue-700">
                        Contraseña
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type="password"
                          placeholder="********"
                          required
                          className="w-full pl-10 pr-3 py-2 border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-400 to-pink-400 hover:from-blue-500 hover:to-pink-500 text-white font-medium py-2 rounded-lg transition shadow-md hover:shadow-lg"
                    >
                      Registrarse
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

