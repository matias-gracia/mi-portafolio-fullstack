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
import perfil from './img/LinkedIn.JPG';
import logoDimol from './img/logo-dimol.png';
import logoCs from './img/logo-cs.png';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectImages, setCurrentProjectImages] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleDates, setVisibleDates] = useState(new Set());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef();
  const timelineRefs = useRef({});

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
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
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = useCallback(() => {
    setShowModal(false);
    setSelectedImage(null);
    setCurrentImageIndex(0);
    setCurrentProjectImages([]);
    // Restaurar scroll del body
    document.body.style.overflow = 'unset';
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

  // Agregar event listener para teclas y limpiar cuando el componente se desmonte
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (showModal) {
        if (e.key === 'Escape') {
          closeImageModal();
        } else if (e.key === 'ArrowRight' && window.innerWidth >= 768) {
          nextImage();
        } else if (e.key === 'ArrowLeft' && window.innerWidth >= 768) {
          previousImage();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Asegurar que el scroll se restaure al desmontar
      document.body.style.overflow = 'unset';
    };
  }, [showModal, currentImageIndex, currentProjectImages, closeImageModal, nextImage, previousImage]);

  // Intersection Observer para revelar fechas al hacer scroll
  React.useEffect(() => {
    const observers = [];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    };

    Object.keys(timelineRefs.current).forEach((key) => {
      const element = timelineRefs.current[key];
      if (element) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleDates((prev) => new Set([...prev, key]));
            }
          });
        }, observerOptions);
        
        observer.observe(element);
        observers.push({ observer, element });
      }
    });

    return () => {
      observers.forEach(({ observer, element }) => {
        observer.unobserve(element);
      });
    };
  }, []);

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
          className="fixed inset-0 bg-black bg-opacity-95 z-[9998] image-modal"
          onClick={handleModalClick}
        >
          {/* Botón cerrar - Siempre visible y fácil de usar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeImageModal();
            }}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 bg-red-600 text-white font-bold flex items-center justify-center hover:bg-red-700 active:bg-red-800 transition-all duration-200 z-[9999] shadow-2xl border-3 border-white rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 close-button text-xl sm:text-2xl md:text-3xl"
            title="Cerrar (ESC o tocar fuera)"
            aria-label="Cerrar"
            style={{ 
              minWidth: '3.5rem',
              minHeight: '3.5rem',
              boxShadow: '0 4px 20px rgba(220, 38, 38, 0.8), 0 0 0 3px rgba(255, 255, 255, 0.3)',
              zIndex: 99999,
              position: 'fixed',
              pointerEvents: 'auto'
            }}
          >
            ✕
          </button>

          {/* Modal para móviles - Layout vertical con scroll */}
          <div 
            className="md:hidden w-full h-full overflow-y-auto relative" 
            onClick={(e) => e.stopPropagation()}
            style={{ touchAction: 'pan-y pinch-zoom' }}
          >
            <div className="flex flex-col items-center py-4 px-2 space-y-8 pb-32">
              {currentProjectImages.map((img, index) => (
                <div 
                  key={index}
                  className="w-full flex flex-col items-center px-2"
                  id={`mobile-image-${index}`}
                >
                  <div 
                    className="w-full flex justify-center image-zoom-container"
                    style={{
                      touchAction: 'pan-x pan-y pinch-zoom',
                      WebkitTouchCallout: 'default',
                      WebkitUserSelect: 'none',
                      userSelect: 'none'
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full max-w-full h-auto object-contain rounded-lg shadow-2xl zoomable-image"
                      style={{ 
                        maxHeight: '80vh',
                        display: 'block',
                        touchAction: 'pan-x pan-y pinch-zoom',
                        WebkitUserDrag: 'none',
                        userSelect: 'none'
                      }}
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                  <div className="mt-4 text-center px-2 w-full max-w-md mx-auto">
                    <p className={`text-sm font-semibold ${
                      darkMode ? 'text-gray-300' : 'text-white'
                    }`}>
                      {img.alt}
                    </p>
                    <p className={`text-xs mt-2 image-counter inline-block px-3 py-1 rounded-full ${
                      darkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-300 bg-gray-900'
                    }`}>
                      {index + 1} de {currentProjectImages.length}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal para desktop/tablet - Layout tradicional */}
          <div className="hidden md:flex items-center justify-center w-full h-full">
            <div className="relative w-full h-full flex items-center justify-center px-4">
              {/* Botón anterior */}
              {currentProjectImages.length > 1 && (
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-4 rounded-full modal-nav-button z-20 text-3xl lg:text-4xl transition-all duration-200"
                  aria-label="Imagen anterior"
                >
                  ‹
                </button>
              )}

              {/* Imagen principal */}
              <div className="flex flex-col items-center max-w-5xl w-full">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-auto h-auto object-contain rounded-lg shadow-2xl max-w-full"
                  style={{ 
                    maxHeight: '85vh',
                    maxWidth: '90vw'
                  }}
                />
                <div className="mt-4 text-center px-4">
                  <p className={`text-base lg:text-lg font-semibold ${
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
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-4 rounded-full modal-nav-button z-20 text-3xl lg:text-4xl transition-all duration-200"
                  aria-label="Siguiente imagen"
                >
                  ›
                </button>
              )}

              {/* Indicadores de navegación */}
              {currentProjectImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                  {currentProjectImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setSelectedImage({ src: currentProjectImages[index].src, alt: currentProjectImages[index].alt });
                      }}
                      className={`w-3 h-3 rounded-full modal-indicator transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'bg-white scale-125' 
                          : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header/Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        darkMode ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'
      } shadow-lg`}>
        <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl sm:text-2xl font-bold text-indigo-600">MG</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {['home', 'about', 'timeline', 'projects', 'skills', 'frameworks', 'cv', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-200 text-sm lg:text-base ${
                    activeSection === section
                      ? 'text-indigo-600 font-semibold'
                      : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {section === 'home' ? 'Inicio' : 
                   section === 'about' ? 'Sobre Mí' :
                   section === 'timeline' ? 'Línea de Tiempo' :
                   section === 'projects' ? 'Proyectos' :
                   section === 'skills' ? 'Habilidades' :
                   section === 'frameworks' ? 'Frameworks' :
                   section === 'cv' ? 'CV' : 'Contacto'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-200 dark-mode-toggle ${
                  darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden mt-4 pb-4 border-t ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex flex-col space-y-2 pt-4">
                {['home', 'about', 'timeline', 'projects', 'skills', 'frameworks', 'cv', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-colors duration-200 text-left px-4 py-2 rounded-lg ${
                      activeSection === section
                        ? 'text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-900/20'
                        : darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {section === 'home' ? 'Inicio' : 
                     section === 'about' ? 'Sobre Mí' :
                     section === 'timeline' ? 'Línea de Tiempo' :
                     section === 'projects' ? 'Proyectos' :
                     section === 'skills' ? 'Habilidades' :
                     section === 'frameworks' ? 'Frameworks' :
                     section === 'cv' ? 'CV' : 'Contacto'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 hero-title ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Matías Gracia
            </h1>
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 hero-subtitle ${
              darkMode ? 'text-indigo-400' : 'text-indigo-600'
            }`}>
              Desarrollador Full Stack
            </h2>
            <p className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto hero-description ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Apasionado por crear soluciones innovadoras y experiencias digitales excepcionales. 
              Especializado en desarrollo web moderno y tecnologías emergentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center hero-buttons">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors duration-200 btn-primary text-sm sm:text-base"
              >
                Ver Proyectos
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`border-2 border-indigo-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors duration-200 btn-primary text-sm sm:text-base ${
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
              <div className="w-64 h-64 rounded-full mx-auto md:mx-0 mb-8 shadow-xl profile-image-container overflow-hidden">
                <img 
                  src={perfil} 
                  alt="Matías Gracia" 
                  className="w-full h-full object-cover profile-image"
                  style={{
                    objectPosition: 'center 25%',
                    transform: 'scale(1.4)',
                    transformOrigin: 'center center'
                  }}
                />
              </div>
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
              <p className={`text-lg mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <strong className={darkMode ? 'text-white' : 'text-gray-900'}>Actualmente</strong> trabajo en <strong className={darkMode ? 'text-white' : 'text-gray-900'}>BDO Chile</strong> desde el 19 de agosto de 2025 hasta la actualidad, 
                donde aplico mis conocimientos en desarrollo full stack y metodologías ágiles. 
                Estoy abierto a nuevas oportunidades laborales que me permitan seguir creciendo profesionalmente.
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
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  Git & Azure DevOps
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  Agile Scrum
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-16 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Línea de Tiempo de Proyectos
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Línea vertical con fechas dinámicas */}
              <div className={`absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 sm:w-1 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}></div>


              {/* Proyectos en la línea de tiempo */}
              <div className="space-y-8 sm:space-y-10 md:space-y-12">
                {/* Proyecto 1 - BDO Chile (Más reciente) */}
                <div 
                  ref={(el) => { if (el) timelineRefs.current['bdo'] = el; }}
                  className="relative flex items-start timeline-item"
                >
                  {/* Fecha en la línea - Izquierda */}
                  <div className={`absolute left-4 sm:left-6 md:left-8 transform -translate-x-full -translate-y-1/2 timeline-date ${visibleDates.has('bdo') ? 'timeline-date-visible' : ''}`} style={{ left: '0' }}>
                    <div className={`whitespace-nowrap ${
                      darkMode ? 'text-indigo-400' : 'text-indigo-600'
                    } font-semibold text-xs sm:text-sm`}>
                      <div className={`flex flex-col items-end px-2 py-1 rounded-lg ${
                        darkMode ? 'bg-gray-800/90' : 'bg-white/90'
                      } shadow-lg backdrop-blur-sm`}>
                        <span>Agosto</span>
                        <span>2025</span>
                      </div>
                    </div>
                  </div>
                  <div className={`absolute left-2 sm:left-4 md:left-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 ${
                    darkMode ? 'bg-indigo-600 border-gray-800' : 'bg-indigo-600 border-white'
                  }`}></div>
                  <div className="ml-8 sm:ml-12 md:ml-16 flex-1">
                    <div className={`p-4 sm:p-5 md:p-6 rounded-xl shadow-lg ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                        <h3 className={`text-xl sm:text-2xl font-bold ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          BDO Chile
                        </h3>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto ${
                          darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                        }`}>
                          Actual
                        </span>
                      </div>
                      <p className={`text-base sm:text-lg mb-3 sm:mb-4 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Desarrollador Full Stack trabajando en proyectos empresariales utilizando 
                        metodologías Agile Scrum, Git y Azure DevOps para gestión de código y CI/CD.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Full Stack</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Agile Scrum</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Azure DevOps</span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Git</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proyecto 2 - DroneVision Platform */}
                <div 
                  ref={(el) => { if (el) timelineRefs.current['drone'] = el; }}
                  className="relative flex items-start timeline-item"
                >
                  {/* Fecha en la línea - Izquierda */}
                  <div className={`absolute left-4 sm:left-6 md:left-8 transform -translate-x-full -translate-y-1/2 timeline-date ${visibleDates.has('drone') ? 'timeline-date-visible' : ''}`} style={{ left: '0' }}>
                    <div className={`whitespace-nowrap ${
                      darkMode ? 'text-indigo-400' : 'text-indigo-600'
                    } font-semibold text-xs sm:text-sm`}>
                      <div className={`flex flex-col items-end px-2 py-1 rounded-lg ${
                        darkMode ? 'bg-gray-800/90' : 'bg-white/90'
                      } shadow-lg backdrop-blur-sm`}>
                        <span>Marzo</span>
                        <span>2025</span>
                      </div>
                    </div>
                  </div>
                  <div className={`absolute left-2 sm:left-4 md:left-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 ${
                    darkMode ? 'bg-indigo-600 border-gray-800' : 'bg-indigo-600 border-white'
                  }`}></div>
                  <div className="ml-8 sm:ml-12 md:ml-16 flex-1">
                    <div className={`p-4 sm:p-5 md:p-6 rounded-xl shadow-lg ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                        <h3 className={`text-xl sm:text-2xl font-bold ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          DroneVision Platform
                        </h3>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          Completado
                        </span>
                      </div>
                      <p className={`text-base sm:text-lg mb-3 sm:mb-4 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Plataforma integral de control y monitoreo de drones para aplicaciones comerciales 
                        y de seguridad. Sistema completo con interfaz web, control remoto, procesamiento 
                        de video en tiempo real y análisis de datos.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Node.js</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">WebRTC</span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Python</span>
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Arduino</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">IoT</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proyecto 3 - Sistema Dimol */}
                <div 
                  ref={(el) => { if (el) timelineRefs.current['dimol'] = el; }}
                  className="relative flex items-start timeline-item"
                >
                  {/* Fecha en la línea - Izquierda */}
                  <div className={`absolute left-4 sm:left-6 md:left-8 transform -translate-x-full -translate-y-1/2 timeline-date ${visibleDates.has('dimol') ? 'timeline-date-visible' : ''}`} style={{ left: '0' }}>
                    <div className={`whitespace-nowrap ${
                      darkMode ? 'text-purple-400' : 'text-purple-600'
                    } font-semibold text-xs sm:text-sm`}>
                      <div className={`flex flex-col items-end px-2 py-1 rounded-lg ${
                        darkMode ? 'bg-gray-800/90' : 'bg-white/90'
                      } shadow-lg backdrop-blur-sm`}>
                        <span>Enero</span>
                        <span>2025</span>
                      </div>
                    </div>
                  </div>
                  <div className={`absolute left-2 sm:left-4 md:left-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 ${
                    darkMode ? 'bg-purple-600 border-gray-800' : 'bg-purple-600 border-white'
                  }`}></div>
                  <div className="ml-8 sm:ml-12 md:ml-16 flex-1">
                    <div className={`p-4 sm:p-5 md:p-6 rounded-xl shadow-lg ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                        <h3 className={`text-xl sm:text-2xl font-bold ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Sistema Dimol
                        </h3>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          Completado
                        </span>
                      </div>
                      <p className={`text-base sm:text-lg mb-3 sm:mb-4 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Sistema de gestión de incidencias similar a Jira, desarrollado para Dimol Spa. 
                        Incluye login seguro, roles, panel de administración y seguimiento de tickets.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Node.js</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">MySQL</span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">JWT</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Jira-like</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proyecto 4 - CarStation (Más antiguo) */}
                <div 
                  ref={(el) => { if (el) timelineRefs.current['car'] = el; }}
                  className="relative flex items-start timeline-item"
                >
                  {/* Fecha en la línea - Izquierda */}
                  <div className={`absolute left-4 sm:left-6 md:left-8 transform -translate-x-full -translate-y-1/2 timeline-date ${visibleDates.has('car') ? 'timeline-date-visible' : ''}`} style={{ left: '0' }}>
                    <div className={`whitespace-nowrap ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    } font-semibold text-xs sm:text-sm`}>
                      <div className={`flex flex-col items-end px-2 py-1 rounded-lg ${
                        darkMode ? 'bg-gray-800/90' : 'bg-white/90'
                      } shadow-lg backdrop-blur-sm`}>
                        <span>Junio</span>
                        <span>2024</span>
                      </div>
                    </div>
                  </div>
                  <div className={`absolute left-2 sm:left-4 md:left-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 ${
                    darkMode ? 'bg-blue-600 border-gray-800' : 'bg-blue-600 border-white'
                  }`}></div>
                  <div className="ml-8 sm:ml-12 md:ml-16 flex-1">
                    <div className={`p-4 sm:p-5 md:p-6 rounded-xl shadow-lg ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                        <h3 className={`text-xl sm:text-2xl font-bold ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          CarStation
                        </h3>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          Completado
                        </span>
                      </div>
                      <p className={`text-base sm:text-lg mb-3 sm:mb-4 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Plataforma web de gestión vehicular con registro de autos, pagos Webpay, 
                        chat en vivo y control de mantenciones. Desarrollada con WordPress, Node.js, 
                        AWS y DynamoDB.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">WordPress</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Node.js</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">AWS</span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">DynamoDB</span>
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Webpay</span>
                      </div>
                    </div>
                  </div>
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
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-8 md:mb-12">
              <div className="order-2 lg:order-1">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="project-logo">
                    <img src={droneLogo} alt="DroneVision Logo" className="w-12 h-12 sm:w-16 sm:h-16 mr-3 sm:mr-4 object-contain" />
                  </div>
                  <h3 className={`text-2xl sm:text-3xl font-bold ${
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 order-1 lg:order-2">
                <img 
                  src={drone1} 
                  alt="DroneVision Screenshot 1" 
                  className="w-full h-auto rounded-lg shadow-lg drone-image cursor-pointer object-cover" 
                  onClick={() => openImageModal(drone1, "DroneVision - Interfaz Principal", droneImages, 0)}
                />
                <img 
                  src={drone2} 
                  alt="DroneVision Screenshot 2" 
                  className="w-full h-auto rounded-lg shadow-lg drone-image cursor-pointer object-cover" 
                  onClick={() => openImageModal(drone2, "DroneVision - Control de Vuelo", droneImages, 1)}
                />
                <img 
                  src={drone3} 
                  alt="DroneVision Screenshot 3" 
                  className="w-full h-auto rounded-lg shadow-lg drone-image cursor-pointer object-cover" 
                  onClick={() => openImageModal(drone3, "DroneVision - Monitoreo en Tiempo Real", droneImages, 2)}
                />
                <img 
                  src={drone4} 
                  alt="DroneVision Screenshot 4" 
                  className="w-full h-auto rounded-lg shadow-lg drone-image cursor-pointer object-cover" 
                  onClick={() => openImageModal(drone4, "DroneVision - Análisis de Datos", droneImages, 3)}
                />
              </div>
            </div>
            
            {/* Gallery */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
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
                  className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer drone-image object-cover"
                  onClick={() => openImageModal(img.src, img.alt, droneImages, index + 4)}
                />
              ))}
            </div>
          </div>

          {/* Sistema Dimol */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-8 md:mb-12">
              <div className="order-2 lg:order-1">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="project-logo">
                    <img src={logoDimol} alt="Dimol Logo" className="w-12 h-12 sm:w-16 sm:h-16 mr-3 sm:mr-4 object-contain" />
                  </div>
                  <h3 className={`text-2xl sm:text-3xl font-bold ${
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 order-1 lg:order-2">
                <img 
                  src={dimol1} 
                  alt="Sistema Dimol - Dashboard Principal" 
                  className="w-full h-auto rounded-lg shadow-lg drone-image cursor-pointer object-cover" 
                  onClick={() => openImageModal(dimol1, "Sistema Dimol - Dashboard Principal", dimolImages, 0)}
                />
                <img 
                  src={dimol2} 
                  alt="Sistema Dimol - Gestión de Inventarios" 
                  className="w-full h-auto rounded-lg shadow-lg drone-image cursor-pointer object-cover" 
                  onClick={() => openImageModal(dimol2, "Sistema Dimol - Gestión de Inventarios", dimolImages, 1)}
                />
                <img 
                  src={dimol3} 
                  alt="Sistema Dimol - Control de Producción" 
                  className="w-full h-auto rounded-lg shadow-lg drone-image cursor-pointer object-cover" 
                  onClick={() => openImageModal(dimol3, "Sistema Dimol - Control de Producción", dimolImages, 2)}
                />
                <img 
                  src={dimol4} 
                  alt="Sistema Dimol - Reportes Gerenciales" 
                  className="w-full h-auto rounded-lg shadow-lg drone-image cursor-pointer object-cover" 
                  onClick={() => openImageModal(dimol4, "Sistema Dimol - Reportes Gerenciales", dimolImages, 3)}
                />
              </div>
            </div>
          </div>

          {/* CS Project */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 lg:order-2">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="project-logo">
                    <img src={logoCs} alt="CS Logo" className="w-12 h-12 sm:w-16 sm:h-16 mr-3 sm:mr-4 object-contain" />
                  </div>
                  <h3 className={`text-2xl sm:text-3xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    CarStation
                  </h3>
                </div>
                <p className={`text-lg mb-6 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Plataforma web de gestión vehicular desarrollada con registro de autos, pagos Webpay, 
                  chat en vivo y control de mantenciones. Construida con WordPress, Node.js, 
                  AWS y DynamoDB. Este proyecto fue completado exitosamente, aunque actualmente 
                  el dominio ya no está activo.
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
              <div className="order-1 lg:order-1">
                <div className={`p-4 sm:p-6 md:p-8 rounded-xl shadow-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <div className="text-center">
                    <div className="project-logo">
                      <img src={logoCs} alt="CarStation Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4 object-contain" />
                    </div>
                    <h4 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Proyecto Completado
                    </h4>
                    <p className={`text-sm sm:text-base mb-4 sm:mb-6 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Este proyecto fue desarrollado y desplegado exitosamente. 
                      Actualmente el dominio ya no está activo.
                    </p>
                    <div className={`px-3 sm:px-4 py-2 rounded-lg ${
                      darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <span className="text-xs sm:text-sm">Proyecto finalizado</span>
                    </div>
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
                  { name: 'DevOps', level: 'Intermedio - Avanzado' },
                  { name: 'Git', level: 'Intermedio - Avanzado' },
                  { name: 'Azure DevOps', level: 'Intermedio - Avanzado' },
                  { name: 'Agile Scrum', level: 'Intermedio - Avanzado' }
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
