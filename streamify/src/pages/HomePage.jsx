'use client'

import { useState, useMemo } from 'react'
import { Search, Upload, User, Bell, Menu, Play, Tv, Compass, Clock, ThumbsUp } from 'lucide-react'
import { motion } from 'framer-motion'

const VideoCard = ({ video }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
  >
    <div className="relative">
      <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <Play className="text-white w-12 h-12" />
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{video.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">1.2M vistas • hace 2 días</p>
    </div>
  </motion.div>
)

const SidebarItem = ({ icon: Icon, text }) => (
  <motion.li
    whileHover={{ scale: 1.05, x: 5 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
  >
    <Icon className="text-gray-600 dark:text-gray-400" />
    <span className="text-gray-800 dark:text-gray-200">{text}</span>
  </motion.li>
)

export default function HomePage() {
  const [videos] = useState([
    { id: 1, title: 'Cómo hacer un pastel', thumbnail: '/placeholder.svg?height=120&width=200' },
    { id: 2, title: 'Tutorial de React', thumbnail: '/placeholder.svg?height=120&width=200' },
    { id: 3, title: 'Viaje a Machu Picchu', thumbnail: '/placeholder.svg?height=120&width=200' },
    { id: 4, title: 'Concierto en vivo', thumbnail: '/placeholder.svg?height=120&width=200' },
    { id: 5, title: 'Recetas veganas', thumbnail: '/placeholder.svg?height=120&width=200' },
    { id: 6, title: 'Yoga para principiantes', thumbnail: '/placeholder.svg?height=120&width=200' },
    { id: 7, title: 'Trucos de magia', thumbnail: '/placeholder.svg?height=120&width=200' },
    { id: 8, title: 'Curso de fotografía', thumbnail: '/placeholder.svg?height=120&width=200' },
  ]);

  const videoCards = useMemo(() => {
    return videos.map((video) => <VideoCard key={video.id} video={video} />);
  }, [videos]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Menu className="text-gray-600 dark:text-gray-400 cursor-pointer" aria-label="Menu" />
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"
            >
              Streamify
            </motion.h1>
          </div>
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Buscar"
                className="pl-10 pr-4 py-2 w-full border rounded-full focus:ring-2 focus:ring-purple-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                aria-label="Buscar videos"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Upload className="text-gray-600 dark:text-gray-400 cursor-pointer" aria-label="Subir video" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Bell className="text-gray-600 dark:text-gray-400 cursor-pointer" aria-label="Notificaciones" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <User className="text-gray-600 dark:text-gray-400 cursor-pointer" aria-label="Perfil" />
            </motion.div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 flex">
        <aside className="w-64 hidden md:block">
          <nav>
            <ul className="space-y-2">
              <SidebarItem icon={Tv} text="Inicio" />
              <SidebarItem icon={Compass} text="Explorar" />
              <SidebarItem icon={Clock} text="Historial" />
              <SidebarItem icon={ThumbsUp} text="Favoritos" />
            </ul>
          </nav>
        </aside>
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {videoCards}
          </motion.div>
        </main>
      </div>
    </div>
  )
}