import React, { useState, useMemo } from 'react';
import { Search, Menu, Play, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -10 }}
    whileTap={{ scale: 0.95 }}
    className="bg-gradient-to-br from-blue-100 to-pink-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
  >
    <div className="relative">
      <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
      <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.8 }}
        >
          <Play className="text-blue-500 w-12 h-12" />
        </motion.div>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">{video.title}</h3>
      <p className="text-sm text-blue-600">1.2M vistas • hace 2 días</p>
    </div>
  </motion.div>
);

const SidebarItem = ({ icon: Icon, text }) => (
  <motion.li
    whileHover={{ scale: 1.05, x: 5 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors duration-200"
  >
    <Icon className="text-blue-500" />
    <span className="text-blue-700">{text}</span>
  </motion.li>
);

const HeroSection = () => {
  const navigate = useNavigate();

  const handleUploadRedirect = () => {
    navigate('/UploadVideo');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-blue-200 to-pink-200 text-blue-800 py-20 px-4 rounded-3xl mb-8 shadow-xl"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          Descubre. Crea. Comparte.
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl mb-8 text-blue-600"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
        >
          Tu plataforma para explorar y compartir contenido increíble.
        </motion.p>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
        >
          <button
            onClick={handleUploadRedirect}
            className="px-6 py-2 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            ¡Sube un video ahora!
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const UserPage = () => {
  const navigate = useNavigate();
  const [videos] = useState([
    { id: 1, title: 'Cómo hacer un pastel', thumbnail: '/placeholder.svg?height=120&width=200' },
    { id: 2, title: 'Tutorial de React', thumbnail: '/placeholder.svg?height=120&width=200' },
    { id: 3, title: 'Viaje a Machu Picchu', thumbnail: '/placeholder.svg?height=120&width=200' },
  ]);

  const videoCards = useMemo(() => {
    return videos.map((video) => <VideoCard key={video.id} video={video} />);
  }, [videos]);

  const handleLogout = () => {
    navigate('/HomePage');
  };

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900">
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Menu className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-200" aria-label="Menu" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500">
              Streamify
            </h1>
          </motion.div>
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Buscar"
                className="pl-10 pr-4 py-2 w-full border rounded-full focus:ring-2 focus:ring-blue-300 bg-blue-50 text-blue-800 placeholder-blue-400"
                aria-label="Buscar videos"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
            </div>
          </div>
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => navigate('/UploadVideo')}
              className="px-6 py-2 text-sm bg-gradient-to-r from-blue-400 to-pink-400 text-white rounded-lg hover:from-blue-500 hover:to-pink-500 transition-colors duration-200"
            >
              Sube un video
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <LogOut size={16} />
              <span>Cerrar sesión</span>
            </button>
          </motion.div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 flex">
        <aside className="w-64 hidden md:block">
          <nav>
            <ul className="space-y-2">
              <SidebarItem icon={User} text="Mi perfil" />
            </ul>
          </nav>
        </aside>
        <main className="flex-1">
          <HeroSection />
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {videoCards}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default UserPage;
