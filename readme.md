FINAL PROJECT Serafín Alférez Alférez

Web/Red Social dedicada a los aficionados a los coches clásicos.

El backend de esta aplicación es responsable de proporcionar la lógica y funcionalidad necesaria para el correcto funcionamiento de la aplicación. Está construido utilizando tecnologías como Node.js, Express.js y MongoDB.

##Caracteristicas

Gestión de usuarios: El backend permite realizar el registro y autenticación de usuarios. Asimismo proporciona endpoints para la gestión de perfiles de usuario.
Gestión: El backend permite la creación, lectura, actualización y eliminación de coches. También proporciona endpoints para el paginado de puclicaciones de coches.

Gestión de peticiones: El backend permite la creación y lectura de peticiones.

##Configuracion

Antes de ejecutar el backend de la aplicación, asegúrese de tener instaladas las siguientes dependencias:

Node.js: Descargar e instalar Node.js
MongoDB: Descargar e instalar MongoDB
Una vez que haya instalado las dependencias, siga estos pasos para configurar y ejecutar el backend:

Clone el repositorio: git clone https://github.com/isdi-coders-2023/Serafin-Alferez-Final-Project-Back-202309-mad.git
Navegue al directorio del proyecto: cd Serafin-Alferez-Final-Project-Back-202309-mad

Instale las dependencias: npm install

Configure las variables de entorno: Cree un archivo .env en el directorio raíz del proyecto y configure las variables de entorno necesarias. 

Consulte el archivo .env.example para obtener una lista de las variables requeridas.

Inicie el servidor: npm start

#Rutas para la entidad user:

[GET] /  Retorna listado de usuarios
[POST] /register    Registra un nuevo usuario.
[POST] /login  Inici0 de sesión de usuario.
[PATCH]/login   Actualiza la información de inicio de sesión.
[DELETE] /delete/:id   Elimina un usuario por su ID.

#Rutas para la entidad car:

[GET] /: Devuelve el listado de todos coches.
[GET] /:id: Obtiene la informacion detallada de un coche.
[POST] /: Crea un nuevo fcoche.
[PATCH] /:id: Permite editar la informacion de un coche.
[DELETE] /:id: Elimina un coche.
