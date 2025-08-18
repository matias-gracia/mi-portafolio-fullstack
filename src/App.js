import React, { useState, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './emailjs-config';
// Deploy trigger - EmailJS variables fix
import './App.css';

// Importar imágenes del proyecto de dron
import droneLogo from './img/dron/dronevision-logo.png';
import drone1 from './img/dron/1.png';
import drone2 from './img/dron/2.png';
import drone3 from './img/dron/3.png';
import drone4 from './img/dron/4.png';
import drone5 from './img/dron/5.png';
import drone6 from './img/dron/6.png';
import drone7 from './img/dron/7.png';
import drone8 from './img/dron/8.png';
import drone9 from './img/dron/9.png';
import drone10 from './img/dron/10.png';
import drone11 from './img/dron/11.png';

// Importar imágenes del proyecto Dimol
import dimol1 from './img/dimol1.png';
import dimol2 from './img/dimol2.png';
import dimol3 from './img/dimol3.png';
import dimol4 from './img/dimol4.png';

// Importar otras imágenes
import perfil from './img/Perfil.png';
import logoDimol from './img/logo-dimol.png';
import logoCs from './img/logo-cs.png';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectImages, setCurrentProjectImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openImageModal = (imageSrc, imageAlt, projectImages, imageIndex) => {
    setCurrentProjectImages(projectImages);
    setCurrentImageIndex(imageIndex);
    setSelectedImage({ src: imageSrc, alt: imageAlt });
    setShowModal(true);
  };

  const closeImageModal = useCallback(() => {
    setShowModal(false);
    setSelectedImage(null);
    setCurrentImageIndex(0);
    setCurrentProjectImages([]);
  }, []);

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeImageModal();
    }
  };

  const nextImage = useCallback(() => {
    if (currentProjectImages.length > 0) {
      const nextIndex = (currentImageIndex + 1) % currentProjectImages.length;
      const nextImage = currentProjectImages[nextIndex];
      setCurrentImageIndex(nextIndex);
      setSelectedImage({ src: nextImage.src, alt: nextImage.alt });
    }
  }, [currentImageIndex, currentProjectImages]);

  const previousImage = useCallback(() => {
    if (currentProjectImages.length > 0) {
      const prevIndex = currentImageIndex === 0 ? currentProjectImages.length - 1 : currentImageIndex - 1;
      const prevImage = currentProjectImages[prevIndex];
      setCurrentImageIndex(prevIndex);
      setSelectedImage({ src: prevImage.src, alt: prevImage.alt });
    }
  }, [currentImageIndex, currentProjectImages]);



  // Arrays de imágenes por proyecto
  const droneImages = [
    { src: drone1, alt: "DroneVision - Interfaz Principal" },
    { src: drone2, alt: "DroneVision - Control de Vuelo" },
    { src: drone3, alt: "DroneVision - Monitoreo en Tiempo Real" },
    { src: drone4, alt: "DroneVision - Análisis de Datos" },
    { src: drone5, alt: "DroneVision - Configuración Avanzada" },
    { src: drone6, alt: "DroneVision - Dashboard de Control" },
    { src: drone7, alt: "DroneVision - Sistema de Navegación" },
    { src: drone8, alt: "DroneVision - Interfaz de Usuario" },
    { src: drone9, alt: "DroneVision - Monitoreo de Sensores" },
    { src: drone10, alt: "DroneVision - Reportes Automáticos" },
    { src: drone11, alt: "DroneVision - Configuración de Vuelo" }
  ];

  const dimolImages = [
    { src: dimol1, alt: "Sistema Dimol - Dashboard Principal" },
    { src: dimol2, alt: "Sistema Dimol - Gestión de Inventarios" },
    { src: dimol3, alt: "Sistema Dimol - Control de Producción" },
    { src: dimol4, alt: "Sistema Dimol - Reportes Gerenciales" }
  ];

  // Agregar event listener para teclas
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (showModal) {
        if (e.key === 'Escape') {
          closeImageModal();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'ArrowLeft') {
          previousImage();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, currentImageIndex, currentProjectImages, closeImageModal, nextImage, previousImage]);

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Enviar email a Matías
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Image Modal */}
      {showModal && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 image-modal overflow-auto"
          onClick={handleModalClick}
        >
          <div className="relative w-full h-full flex items-center justify-center min-h-full pt-20">
            {/* Botón cerrar */}
            <button
              onClick={closeImageModal}
              className="fixed top-20 right-4 bg-red-600 text-white font-bold flex items-center justify-center hover:bg-red-700 transition-all duration-200 z-50 shadow-2xl border-2 border-white rounded-full w-12 h-12 close-button"
              title="Cerrar (ESC)"
            >
              ✕
            </button>

            {/* Botón anterior */}
            {currentProjectImages.length > 1 && (
              <button
                onClick={previousImage}
                className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full modal-nav-button z-20"
                style={{ marginTop: '20px' }}
              >
                ‹
              </button>
            )}

            {/* Imagen principal */}
            <div className="flex flex-col items-center w-full h-full overflow-auto py-8">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-auto h-auto object-contain rounded-lg shadow-2xl"
                style={{ 
                  minWidth: 'auto', 
                  minHeight: 'auto',
                  maxWidth: '92%',
                  maxHeight: '92%'
                }}
              />
              <div className="mt-4 text-center">
                <p className={`text-lg font-semibold ${
                  darkMode ? 'text-gray-300' : 'text-white'
                }`}>
                  {selectedImage.alt}
                </p>
                {currentProjectImages.length > 1 && (
                  <p className={`text-sm mt-2 image-counter ${
                    darkMode ? 'text-gray-400' : 'text-gray-300'
                  }`}>
                    {currentImageIndex + 1} de {currentProjectImages.length}
                  </p>
                )}
              </div>
            </div>

            {/* Botón siguiente */}
            {currentProjectImages.length > 1 && (
              <button
                onClick={nextImage}
                className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full modal-nav-button z-20"
                style={{ marginTop: '20px' }}
              >
                ›
              </button>
            )}

            {/* Indicadores de navegación */}
            {currentProjectImages.length > 1 && (
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {currentProjectImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setSelectedImage({ src: currentProjectImages[index].src, alt: currentProjectImages[index].alt });
                    }}
                    className={`w-3 h-3 rounded-full modal-indicator ${
                      index === currentImageIndex 
                        ? 'bg-white' 
                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header/Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        darkMode ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'
      } shadow-lg`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-indigo-600">MG</div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'skills', 'frameworks', 'cv', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === section
                      ? 'text-indigo-600 font-semibold'
                      : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {section === 'home' ? 'Inicio' : 
                   section === 'about' ? 'Sobre Mí' :
                   section === 'projects' ? 'Proyectos' :
                   section === 'skills' ? 'Habilidades' :
                   section === 'frameworks' ? 'Frameworks' :
                   section === 'cv' ? 'CV' : 'Contacto'}
                </button>
              ))}
            </div>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 dark-mode-toggle ${
                darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 hero-title ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Matías Gracia
            </h1>
            <h2 className={`text-2xl md:text-3xl font-semibold mb-8 hero-subtitle ${
              darkMode ? 'text-indigo-400' : 'text-indigo-600'
            }`}>
              Desarrollador Full Stack
            </h2>
            <p className={`text-xl mb-12 max-w-2xl mx-auto hero-description ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Apasionado por crear soluciones innovadoras y experiencias digitales excepcionales. 
              Especializado en desarrollo web moderno y tecnologías emergentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center hero-buttons">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 btn-primary"
              >
                Ver Proyectos
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`border-2 border-indigo-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 btn-primary ${
                  darkMode 
                    ? 'text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-gray-900' 
                    : 'text-indigo-600 hover:bg-indigo-600 hover:text-white'
                }`}
              >
                Contactar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-16 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Sobre Mí
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <img 
                src={perfil} 
                alt="Matías Gracia" 
                className="w-64 h-64 rounded-full mx-auto md:mx-0 mb-8 object-cover shadow-xl"
              />
            </div>
            <div>
              <p className={`text-lg mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Soy un desarrollador full stack apasionado por la tecnología y la innovación. 
                Me especializo en crear aplicaciones web modernas, escalables y centradas en el usuario.
              </p>
              <p className={`text-lg mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Con experiencia en el desarrollo de soluciones complejas, desde aplicaciones web 
                hasta sistemas de control de drones, siempre busco la excelencia técnica y la 
                innovación en cada proyecto.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  React & Node.js
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  Python & Django
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  Sistemas Embebidos
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  IoT & Drones
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-16 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Proyectos Destacados
          </h2>
          
          {/* DroneVision Platform */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <div className="flex items-center mb-6">
                  <div className="project-logo">
                    <img src={droneLogo} alt="DroneVision Logo" className="w-16 h-16 mr-4 object-contain" />
                  </div>
                  <h3 className={`text-3xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    DroneVision Platform
                  </h3>
                </div>
                <p className={`text-lg mb-6 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Plataforma integral de control y monitoreo de drones para aplicaciones comerciales 
                  y de seguridad. Sistema completo que incluye interfaz web, control remoto, 
                  procesamiento de video en tiempo real y análisis de datos.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">WebRTC</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Arduino</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">IoT</span>
                </div>
                <div className="space-y-2">
                  <h4 className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Características principales:
                  </h4>
                  <ul className={`space-y-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <li>• Control remoto de drones en tiempo real</li>
                    <li>• Transmisión de video HD con baja latencia</li>
                    <li>• Sistema de navegación autónoma</li>
                    <li>• Análisis de datos y reportes automáticos</li>
                    <li>• Interfaz web responsive y intuitiva</li>
                    <li>• Integración con sensores y cámaras</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={drone1} 
                  alt="DroneVision Screenshot 1" 
                  className="rounded-lg shadow-lg drone-image cursor-pointer" 
                  onClick={() => openImageModal(drone1, "DroneVision - Interfaz Principal", droneImages, 0)}
                />
                <img 
                  src={drone2} 
                  alt="DroneVision Screenshot 2" 
                  className="rounded-lg shadow-lg drone-image cursor-pointer" 
                  onClick={() => openImageModal(drone2, "DroneVision - Control de Vuelo", droneImages, 1)}
                />
                <img 
                  src={drone3} 
                  alt="DroneVision Screenshot 3" 
                  className="rounded-lg shadow-lg drone-image cursor-pointer" 
                  onClick={() => openImageModal(drone3, "DroneVision - Monitoreo en Tiempo Real", droneImages, 2)}
                />
                <img 
                  src={drone4} 
                  alt="DroneVision Screenshot 4" 
                  className="rounded-lg shadow-lg drone-image cursor-pointer" 
                  onClick={() => openImageModal(drone4, "DroneVision - Análisis de Datos", droneImages, 3)}
                />
              </div>
            </div>
            
            {/* Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { src: drone5, alt: "DroneVision - Configuración Avanzada" },
                { src: drone6, alt: "DroneVision - Dashboard de Control" },
                { src: drone7, alt: "DroneVision - Sistema de Navegación" },
                { src: drone8, alt: "DroneVision - Interfaz de Usuario" },
                { src: drone9, alt: "DroneVision - Monitoreo de Sensores" },
                { src: drone10, alt: "DroneVision - Reportes Automáticos" },
                { src: drone11, alt: "DroneVision - Configuración de Vuelo" }
              ].map((img, index) => (
                <img 
                  key={index}
                  src={img.src} 
                  alt={img.alt} 
                  className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer drone-image"
                  onClick={() => openImageModal(img.src, img.alt, droneImages, index + 4)}
                />
              ))}
            </div>
          </div>

          {/* Sistema Dimol */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <div className="flex items-center mb-6">
                  <div className="project-logo">
                    <img src={logoDimol} alt="Dimol Logo" className="w-16 h-16 mr-4 object-contain" />
                  </div>
                  <h3 className={`text-3xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Sistema Dimol
                  </h3>
                </div>
                <p className={`text-lg mb-6 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Gestión de Tickets - Dimol Spa
                  Sistema de gestión de incidencias similar a Jira, desarrollado para Dimol Spa. 
                  Incluye login seguro, roles, panel de administración y seguimiento de tickets. 
                  Tech: React, Node.js, MySQL.
                  Acceso interno
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">MySQL</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">JWT</span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">REST API</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Jira-like</span>
                </div>
                <div className="space-y-2">
                  <h4 className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Características principales:
                  </h4>
                  <ul className={`space-y-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <li>• Sistema de login seguro con roles</li>
                    <li>• Panel de administración completo</li>
                    <li>• Gestión y seguimiento de tickets</li>
                    <li>• Interfaz similar a Jira</li>
                    <li>• Control de incidencias en tiempo real</li>
                    <li>• Acceso interno para Dimol Spa</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={dimol1} 
                  alt="Sistema Dimol - Dashboard Principal" 
                  className="rounded-lg shadow-lg drone-image cursor-pointer" 
                  onClick={() => openImageModal(dimol1, "Sistema Dimol - Dashboard Principal", dimolImages, 0)}
                />
                <img 
                  src={dimol2} 
                  alt="Sistema Dimol - Gestión de Inventarios" 
                  className="rounded-lg shadow-lg drone-image cursor-pointer" 
                  onClick={() => openImageModal(dimol2, "Sistema Dimol - Gestión de Inventarios", dimolImages, 1)}
                />
                <img 
                  src={dimol3} 
                  alt="Sistema Dimol - Control de Producción" 
                  className="rounded-lg shadow-lg drone-image cursor-pointer" 
                  onClick={() => openImageModal(dimol3, "Sistema Dimol - Control de Producción", dimolImages, 2)}
                />
                <img 
                  src={dimol4} 
                  alt="Sistema Dimol - Reportes Gerenciales" 
                  className="rounded-lg shadow-lg drone-image cursor-pointer" 
                  onClick={() => openImageModal(dimol4, "Sistema Dimol - Reportes Gerenciales", dimolImages, 3)}
                />
              </div>
            </div>
          </div>

          {/* CS Project */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <div className="flex items-center mb-6">
                  <div className="project-logo">
                    <img src={logoCs} alt="CS Logo" className="w-16 h-16 mr-4 object-contain" />
                  </div>
                  <h3 className={`text-3xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    CarStation
                  </h3>
                </div>
                <p className={`text-lg mb-6 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Plataforma web de gestión vehicular con registro de autos, pagos Webpay, 
                  chat en vivo y control de mantenciones. Construida con WordPress, Node.js, 
                  AWS y DynamoDB.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">WordPress</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">AWS</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">DynamoDB</span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Webpay</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Chat Live</span>
                </div>
                <div className="space-y-2">
                  <h4 className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Características principales:
                  </h4>
                  <ul className={`space-y-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <li>• Registro y gestión de vehículos</li>
                    <li>• Integración con Webpay para pagos</li>
                    <li>• Chat en vivo para soporte</li>
                    <li>• Control de mantenciones programadas</li>
                    <li>• Panel de administración vehicular</li>
                    <li>• Base de datos en la nube (AWS)</li>
                  </ul>
                </div>
              </div>
              <div className="lg:order-1">
                <div className={`p-8 rounded-xl shadow-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <div className="text-center">
                    <div className="project-logo">
                      <img src={logoCs} alt="CarStation Logo" className="w-24 h-24 mx-auto mb-4 object-contain" />
                    </div>
                    <h4 className={`text-xl font-bold mb-4 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Visitar Sitio Web
                    </h4>
                    <p className={`mb-6 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Explora la plataforma en vivo
                    </p>
                    <a
                      href="https://carstation.cl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl external-link-button"
                    >
                      <span className="mr-2">🌐</span>
                      Ir a CarStation.cl
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-16 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Habilidades Técnicas
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className={`p-6 rounded-xl shadow-lg skill-card ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Frontend
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'React', level: 'Intermedio - Avanzado' },
                  { name: 'Vue.js', level: 'Intermedio - Avanzado' },
                  { name: 'JavaScript', level: 'Intermedio - Avanzado' },
                  { name: 'TypeScript', level: 'Intermedio - Avanzado' },
                  { name: 'Tailwind CSS', level: 'Intermedio - Avanzado' },
                  { name: 'HTML/CSS', level: 'Intermedio - Avanzado' }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className={`font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {skill.name}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        skill.level === 'Intermedio - Avanzado' 
                          ? 'bg-blue-100 text-blue-800' 
                          : skill.level === 'Intermedio'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className={`p-6 rounded-xl shadow-lg skill-card ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Backend
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Node.js', level: 'Intermedio - Avanzado' },
                  { name: 'Python', level: 'Intermedio - Avanzado' },
                  { name: 'PHP', level: 'Intermedio - Avanzado' },
                  { name: 'Django', level: 'Intermedio - Avanzado' },
                  { name: 'Express.js', level: 'Intermedio - Avanzado' },
                  { name: 'Laravel', level: 'Intermedio - Avanzado' },
                  { name: 'REST APIs', level: 'Intermedio - Avanzado' }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className={`font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {skill.name}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        skill.level === 'Intermedio - Avanzado' 
                          ? 'bg-green-100 text-green-800' 
                          : skill.level === 'Intermedio'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Especialidades */}
            <div className={`p-6 rounded-xl shadow-lg skill-card ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Especialidades
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Sistemas Embebidos', level: 'Intermedio' },
                  { name: 'IoT & Drones', level: 'Intermedio - Avanzado' },
                  { name: 'Arduino', level: 'Intermedio' },
                  { name: 'WebRTC', level: 'Intermedio' },
                  { name: 'Machine Learning', level: 'Intermedio - Avanzado' },
                  { name: 'DevOps', level: 'Intermedio - Avanzado' }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className={`font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {skill.name}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        skill.level === 'Intermedio - Avanzado' 
                          ? 'bg-purple-100 text-purple-800' 
                          : skill.level === 'Intermedio'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frameworks Section */}
      <section id="frameworks" className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-16 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Frameworks y Tecnologías
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Frontend Frameworks */}
            <div className={`p-6 rounded-xl shadow-lg skill-card ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Frontend
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">⚛️</span>
                  </div>
                  <p className={`font-medium text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    React
                  </p>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">
                    Frontend
                  </span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🟢</span>
                  </div>
                  <p className={`font-medium text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Vue.js
                  </p>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-1">
                    Frontend
                  </span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <p className={`font-medium text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Tailwind CSS
                  </p>
                  <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full mt-1">
                    CSS
                  </span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">📱</span>
                  </div>
                  <p className={`font-medium text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Responsive
                  </p>
                  <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full mt-1">
                    UI/UX
                  </span>
                </div>
              </div>
            </div>

            {/* Backend Frameworks */}
            <div className={`p-6 rounded-xl shadow-lg skill-card ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Backend
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🟢</span>
                  </div>
                  <p className={`font-medium text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Node.js
                  </p>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-1">
                    Backend
                  </span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🐍</span>
                  </div>
                  <p className={`font-medium text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Django
                  </p>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">
                    Backend
                  </span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🐘</span>
                  </div>
                  <p className={`font-medium text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Laravel
                  </p>
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full mt-1">
                    Backend
                  </span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <p className={`font-medium text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Express.js
                  </p>
                  <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full mt-1">
                    Backend
                  </span>
                </div>
              </div>
            </div>

            {/* Databases & Cloud */}
            <div className={`p-6 rounded-xl shadow-lg skill-card ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Base de Datos & Cloud
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🗄️</span>
                  </div>
                  <p className={`font-medium text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    MySQL
                  </p>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">
                    Database
                  </span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">☁️</span>
                  </div>
                  <p className={`font-medium text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    AWS
                  </p>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-1">
                    Cloud
                  </span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">📊</span>
                  </div>
                  <p className={`font-medium text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    DynamoDB
                  </p>
                  <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full mt-1">
                    NoSQL
                  </span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <p className={`font-medium text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    MongoDB
                  </p>
                  <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full mt-1">
                    NoSQL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CV Download Section */}
      <section id="cv" className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-8 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              ¿Te interesa contratarme?
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Puedes descargar mi currículum actualizado en PDF haciendo clic en el botón.
            </p>
            <div className="flex justify-center">
              <a
                href="/CV_Matias_Gracia.pdf"
                download="CV_Matias_Gracia.pdf"
                className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cv-download-button"
              >
                <span className="mr-3 text-2xl">📄</span>
                <span>Descargar CV en PDF</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-16 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Contacto
          </h2>
          
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
            {/* Información de Contacto */}
            <div className="lg:col-span-1">
              <h3 className={`text-2xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                ¡Trabajemos juntos!
              </h3>
              <p className={`text-lg mb-8 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                ¿Tienes un proyecto en mente? Me encantaría escuchar sobre él. 
                Estoy siempre abierto a nuevas oportunidades y colaboraciones interesantes.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white">📧</span>
                  </div>
                  <div>
                    <p className={`font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Email
                    </p>
                    <a 
                      href="mailto:matiasgraciadelpino@gmail.com"
                      className={`hover:text-indigo-600 transition-colors duration-200 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      matiasgraciadelpino@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white">📱</span>
                  </div>
                  <div>
                    <p className={`font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Teléfono
                    </p>
                    <a 
                      href="tel:+56983400342"
                      className={`hover:text-indigo-600 transition-colors duration-200 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      +56 9 8340 0342
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white">📍</span>
                  </div>
                  <div>
                    <p className={`font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Ubicación
                    </p>
                    <p className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Santiago, Chile
                    </p>
                  </div>
                </div>

                {/* Redes Sociales */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white">🔗</span>
                  </div>
                  <div>
                    <p className={`font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Redes Sociales
                    </p>
                    <div className="flex space-x-4">
                      <a 
                        href="https://github.com/matias-gracia" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`hover:text-indigo-600 transition-colors duration-200 ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        GitHub
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/matias-gracia-del-pino-630590235/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`hover:text-indigo-600 transition-colors duration-200 ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                {/* CV */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white">📄</span>
                  </div>
                  <div>
                    <p className={`font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Currículum Vitae
                    </p>
                    <div className="flex space-x-4">
                      <a 
                        href="/CV_Matias_Gracia.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`hover:text-green-600 transition-colors duration-200 ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        Ver CV
                      </a>
                      <a 
                        href="/CV_Matias_Gracia.pdf" 
                        download
                        className={`hover:text-green-600 transition-colors duration-200 ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        Descargar CV
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Formulario de Contacto */}
            <div className={`p-8 rounded-xl shadow-lg ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border contact-input ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border contact-input ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg border contact-input ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder="Cuéntame sobre tu proyecto..."
                  ></textarea>
                </div>

                {/* Mensajes de estado */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg form-status-message">
                    ✅ ¡Mensaje enviado exitosamente! He recibido tu mensaje y te contactaré pronto.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg form-status-message">
                    ❌ Error al enviar el mensaje. Por favor, intenta nuevamente.
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 btn-primary ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-2">⏳</span>
                      Enviando...
                    </span>
                  ) : (
                    'Enviar Mensaje'
                  )}
                </button>
              </form>
            </div>

            {/* Calendario de Reservas */}
            <div className={`p-8 rounded-xl shadow-lg ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Agenda una Reunión
              </h3>
              <p className={`text-lg mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                ¿Te gustaría discutir un proyecto o colaboración? 
                Agenda una reunión de 45 minutos por Zoom.
              </p>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h4 className={`font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    📅 Consulta Gratuita
                  </h4>
                  <p className={`text-sm mb-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    45 minutos • Por Zoom
                  </p>
                  <ul className={`text-sm space-y-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <li>• Análisis de tu proyecto</li>
                    <li>• Propuesta de solución</li>
                    <li>• Estimación de tiempo y costo</li>
                  </ul>
                </div>

                <a
                  href="https://calendly.com/matias_gracia/45min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors duration-200"
                >
                  📅 Agendar Consulta
                </a>

                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h4 className={`font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    💼 Reunión de Proyecto
                  </h4>
                  <p className={`text-sm mb-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    45 minutos • Por Zoom
                  </p>
                  <ul className={`text-sm space-y-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <li>• Revisión técnica detallada</li>
                    <li>• Planificación del proyecto</li>
                    <li>• Definición de entregables</li>
                  </ul>
                </div>

                <a
                  href="https://calendly.com/matias_gracia/45min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors duration-200"
                >
                  📅 Agendar Reunión
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-6 ${
        darkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-600'
      }`}>
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Matías Gracia. Todos los derechos reservados.</p>
          <p className="mt-2">Desarrollado con ❤️</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
