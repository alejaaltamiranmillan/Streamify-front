import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, X, Check, Film, AlignLeft, Clock } from 'lucide-react';

const UploadVideo = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-6">Sube tu Video</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="video-upload"
                className="hidden"
                onChange={handleChange}
                accept="video/*"
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center"
                >
                  <Upload className="w-16 h-16 text-blue-500 mb-4" />
                  <p className="text-lg font-medium text-blue-800">
                    {file ? file.name : 'Arrastra y suelta tu video aquí o haz clic para seleccionar'}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">MP4, WebM o Ogg (Max. 1GB)</p>
                </motion.div>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="text-blue-800 block mb-1">Título del Video</label>
                <div className="relative">
                  <Film className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                  <input
                    id="title"
                    className="pl-10 w-full border rounded-lg p-2"
                    placeholder="Ingresa un título atractivo"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="text-blue-800 block mb-1">Descripción</label>
                <div className="relative">
                  <AlignLeft className="absolute left-3 top-3 text-blue-500" />
                  <textarea
                    id="description"
                    className="pl-10 w-full border rounded-lg p-2"
                    placeholder="Describe tu video"
                    rows={4}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="duration" className="text-blue-800 block mb-1">Duración</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                  <input
                    id="duration"
                    className="pl-10 w-full border rounded-lg p-2"
                    placeholder="Duración del video (ej: 10:30)"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Link to="/UserPage">
                <button
                  type="button"
                  className="bg-white hover:bg-red-50 text-red-500 border-red-300 px-4 py-2 rounded-lg flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </button>
              </Link>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Check className="w-4 h-4 mr-2" />
                Subir Video
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadVideo;
