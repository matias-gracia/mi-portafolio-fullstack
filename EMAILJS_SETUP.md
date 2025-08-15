# Configuración de EmailJS para el Formulario de Contacto

## 📧 Pasos para Configurar EmailJS

### 1. Crear Cuenta en EmailJS
- Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
- Crea una cuenta gratuita
- Confirma tu email

### 2. Configurar Servicio de Email
1. Ve a **"Email Services"** en el dashboard
2. Haz click en **"Add New Service"**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Conecta tu cuenta de email
5. **Guarda el Service ID** que se genera

### 3. Configurar Template "Auto-Reply" (Para recibir mensajes)
1. Ve a **"Email Templates"**
2. Selecciona el template **"Auto-Reply"**
3. Modifica el template para que funcione como notificación:

**Subject:**
```
Nuevo mensaje de contacto de {{name}}
```

**Body:**
```
Hola Matías,

Has recibido un nuevo mensaje de contacto desde tu portafolio web:

Nombre: {{name}}
Email: {{email}}
Mensaje: {{message}}

---
Enviado desde tu portafolio web
```

4. **Guarda el Template ID**

### 4. Template de Confirmación (Opcional)
Si deseas enviar un email de confirmación automática al usuario, puedes crear un segundo template. Sin embargo, para la configuración básica solo necesitas el template "Auto-Reply".

### 5. Obtener Public Key
1. Ve a **"Account"** > **"API Keys"**
2. **Copia tu Public Key**

### 6. Configurar el Código
1. Abre el archivo `src/emailjs-config.js`
2. Reemplaza las credenciales:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'tu_service_id_aqui',
  TEMPLATE_ID: 'tu_template_id_auto_reply',
  PUBLIC_KEY: 'tu_public_key_aqui'
};
```

## 🚀 Funcionalidades Implementadas

### ✅ Características del Formulario:
- **Validación de campos:** Nombre, email y mensaje requeridos
- **Estado de envío:** Botón muestra "Enviando..." durante el proceso
- **Mensajes de éxito/error:** Feedback visual para el usuario
- **Limpieza automática:** Formulario se limpia después del envío exitoso

### ✅ Emails Automáticos:
1. **Email para ti:** Con toda la información del usuario

### ✅ Experiencia de Usuario:
- **Botón deshabilitado:** Durante el envío para evitar duplicados
- **Animaciones:** Feedback visual durante el proceso
- **Mensajes claros:** Éxito o error con explicaciones

## 🔧 Variables Disponibles en Templates

En los templates puedes usar estas variables:
- `{{name}}` - Nombre del usuario
- `{{email}}` - Email del usuario  
- `{{message}}` - Mensaje del usuario

## 📱 Plan Gratuito de EmailJS

- **200 emails por mes** (suficiente para un portafolio personal)
- **2 templates** (perfecto para esta implementación)
- **1 servicio de email** (Gmail, Outlook, etc.)

## 🎯 Resultado Final

Una vez configurado, el formulario:
1. Recibe los datos del usuario
2. Envía un email a tu correo con la información
3. Muestra mensaje de éxito en el formulario
4. Limpia los campos automáticamente
