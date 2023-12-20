#Proyecto Final de Serafin Alferez Alferez-CLASSIC CARS-Backend

##Descripción
El proyecto se trata de una red social especializada en coches clásicos. Este backend está construido utilizando Node.js, Express.js y MongoDB.

###Puntos finales (Endpoints)

1. User:

Registro: Los usuarios pueden registrarse proporcionando la información necesaria.

Login: Los usuarios registrados pueden iniciar sesión para acceder a funcionalidades adicionales.

2. Car:

Lista Global de Coches: Todos los usuarios pueden acceder a la lista global de coches clásicos.
Crear Entrada de Coches: Solo los usuarios registrados pueden crear nuevas entradas para coches clásicos.
Editar y Eliminar: Los usuarios registrados pueden editar o eliminar sus propias entradas de coches, pero no las creadas por otros usuarios.
Tecnologías Utilizadas:

Node.js: El backend está construido con Node.js para el tiempo de ejecución de JavaScript en el lado del servidor.
Express.js: Se utiliza Express.js como el marco de aplicación web para simplificar la gestión de rutas y middleware.
MongoDB: MongoDB sirve como la base de datos para almacenar la información de usuarios y coches.

###Instalación:

1.Clonar el repositorio: 
  git clone https://github.com/isdi-coders-2023/Serafin-Alferez-Final-Project-back-202309-mad

2.Navegar al directorio del proyecto: 
  cd Serafin-Alferez-Final-Project-back-202309-mad

3.Instalar las dependencias:
  npm install

4.Configure las variables de entorno: Cree un archivo .env en el directorio raíz del proyecto y configure las variables de entorno necesarias. Consulte el archivo .env.sample para obtener una lista de las variables requeridas.

Iniciar el servidor: npm run start:dev

Iniciar el compilador: npm run build
