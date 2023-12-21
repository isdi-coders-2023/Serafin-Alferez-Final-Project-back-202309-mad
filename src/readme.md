# Proyecto Final de Serafin Alferez Alferez - CLASSIC CARS - Backend

## Descripción

Este proyecto es una red social especializada en coches clásicos. El backend está construido utilizando Node.js, Express.js y MongoDB.

### Puntos finales (Endpoints)

1. **User:**
  - **Registro:** Los usuarios pueden registrarse proporcionando la información necesaria.
  - **Login:** Los usuarios registrados pueden iniciar sesión para acceder a funcionalidades adicionales.

2. **Car:**
  - **Lista Global de Coches:** Todos los usuarios pueden acceder a la lista global de coches clásicos.
  - **Crear Entrada de Coches:** Solo los usuarios registrados pueden crear nuevas entradas para coches clásicos.
  - **Editar y Eliminar:** Los usuarios registrados pueden editar o eliminar sus propias entradas de coches, pero no las creadas por otros usuarios.

### Tecnologías Utilizadas:

- **Node.js:** El backend está construido con Node.js para el tiempo de ejecución de JavaScript en el lado del servidor.
- **Express.js:** Se utiliza Express.js como el marco de aplicación web para simplificar la gestión de rutas y middleware.
- **MongoDB:** MongoDB sirve como la base de datos para almacenar la información de usuarios y coches.

### Listado de Endpoints

- Lista global de usuarios. [GET] /users
- Registro de usuarios. [POST] /users/register
- Inicio de sesión de usuarios. [POST] /users/login
- Lista global de coches. [GET] /cars
- Lista de coches por página. [GET] /cars/page/:page
- Detalles de un coche. [GET] /cars/:id
- Crear entrada de coche. [POST] /cars
- Actualizar detalles de un coche. [PATCH] /cars/:id
- Eliminar un coche. [DELETE] /cars/:id

### Instalación:

1. **Clonar el repositorio:**

  ```bash
  git clone https://github.com/isdi-coders-2023/Serafin-Alferez-Final-Project-back-202309-mad

1. Navegar al directorio del proyecto:
  cd Serafin-Alferez-Final-Project-back-202309-mad

2. Instalar las dependencias:
  npm install

3. Configurar las variables de entorno:

Cree un archivo .env en el directorio raíz del proyecto y configure las variables de entorno necesarias. Consulte el archivo .env.sample para obtener una lista de las variables requeridas.

4. Iniciar el servidor:
  npm run start:dev

5. Compilar el proyecto:
  npm run build
