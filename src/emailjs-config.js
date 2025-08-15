// Configuración de EmailJS
// Para configurar EmailJS, sigue estos pasos:

// 1. Ve a https://www.emailjs.com/ y crea una cuenta gratuita

// 2. Configura tu servicio de email:
//    - Ve a "Email Services" y añade tu proveedor de email (Gmail, Outlook, etc.)
//    - Obtén tu Service ID

// 3. Crea dos templates de email:
//    a) Template para recibir mensajes (para ti):
//       - Subject: Nuevo mensaje de contacto de {{name}}
//       - Body: 
//         Nombre: {{name}}
//         Email: {{email}}
//         Mensaje: {{message}}
//       - Obtén el Template ID

//    b) Template de confirmación (para el usuario):
//       - Subject: Confirmación de mensaje recibido
//       - Body:
//         Hola {{name}},
//         
//         Gracias por contactarme. He recibido tu mensaje y te responderé a la brevedad.
//         
//         Saludos,
//         Matías Gracia
//       - Obtén el Template ID

// 4. Obtén tu Public Key en "Account" > "API Keys"

// 5. Reemplaza las siguientes constantes con tus credenciales reales:

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_zf7hy3c', // Reemplazar con tu Service ID
  TEMPLATE_ID: 'template_0up2c1h', // Reemplazar con tu Template ID (Auto-Reply)
  PUBLIC_KEY: 'CgKL8Z0sG_FyAaylE' // Reemplazar con tu Public Key
};

// Ejemplo de configuración completa:
// export const EMAILJS_CONFIG = {
//   SERVICE_ID: 'service_abc123',
//   TEMPLATE_ID: 'template_xyz789',
//   CONFIRMATION_TEMPLATE_ID: 'template_confirmation456',
//   PUBLIC_KEY: 'user_public_key_123'
// };
