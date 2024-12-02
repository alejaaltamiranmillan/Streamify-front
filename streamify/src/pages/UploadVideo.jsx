import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, X, Check, Film, AlignLeft } from 'lucide-react';
import { UploadVideo as uploadVideoAPI } from '../services/Api'; 

const UploadVideo = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1GB

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
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      alert('El archivo supera el límite de 1GB.');
    } else {
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name.trim() || !description.trim()) {
      alert('Por favor, completa todos los campos y selecciona un archivo.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('video', file);
    formData.append('name', name);
    formData.append('description', description);

    try {
      await uploadVideoAPI(formData, (progress) => {
        setUploadProgress(progress);
      });
      alert('Video subido exitosamente.');
      navigate('/UserPage');
    } catch (error) {
      console.error('Error al subir el video:', error);
      alert('Error al subir el video. Por favor, intenta de nuevo.');
    } finally {
      setUploading(false);
    }
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
                <label htmlFor="name" className="text-blue-800 block mb-1">Título del Video</label>
                <div className="relative">
                  <Film className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                  <input
                    id="name"
                    className="pl-10 w-full border rounded-lg p-2"
                    placeholder="Ingresa un título atractivo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{width: `${uploadProgress}%`}}
                ></div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/UserPage')}
                className="bg-white hover:bg-red-50 text-red-500 border border-red-300 px-4 py-2 rounded-lg flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </button>
              <button
                type="submit"
                className={`bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg flex items-center ${
                  uploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Subir Video
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadVideo;

