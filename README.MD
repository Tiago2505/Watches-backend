# Watches Backend

Backend de la aplicación **Watches**, desarrollado con Node.js y Express. Este proyecto proporciona una API REST para la gestión de productos, autenticación, recuperación de contraseñas y funcionalidades relacionadas con la aplicación.

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/)
- npm (incluido con Node.js)
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

El proyecto utiliza **PostgreSQL** como base de datos y **Prisma** como ORM.

También necesitarás:

- Una cuenta de **Cloudinary** para almacenar las imágenes de los productos.
- Una cuenta de correo compatible con el servicio de envío de correos utilizado por el proyecto.

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar en la carpeta del proyecto:

```bash
cd <NOMBRE_DEL_PROYECTO>
```

---

### 2. Instalar las dependencias

Ejecutar:

```bash
npm install
```

Esto instalará todas las dependencias definidas en `package.json`.

---

## Configuración de variables de entorno

El proyecto incluye un archivo:

```text
.env.template
```

Este archivo contiene las variables de entorno necesarias para ejecutar el backend, pero **no contiene las credenciales reales**.

Crea una copia del archivo `.env.template` y llámala:

```text
.env
```

La estructura final debe ser:

```text
.env
.env.template
```

El archivo `.env` contiene las credenciales reales y **no debe subirse al repositorio**.

---

## Variables de entorno

El archivo `.env` debe contener las siguientes variables:

```env
POSTGRES_URL=
POSTGRES_USER=
POSTGRES_PASS=
POSTGRES_DB=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

JWT_SEED=

PUBLIC_PATH=public
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=
```

Cada variable se explica a continuación.

---

# Configuración de PostgreSQL

El proyecto utiliza **PostgreSQL** como base de datos y **Prisma** como ORM para comunicarse con ella.

La configuración de PostgreSQL se realiza mediante:

```env
POSTGRES_URL=
POSTGRES_USER=
POSTGRES_PASS=
POSTGRES_DB=
```

---

### `POSTGRES_USER`

Es el usuario de PostgreSQL que utilizará la aplicación.

Ejemplo:

```env
POSTGRES_USER=postgres
```

O utilizando un usuario personalizado:

```env
POSTGRES_USER=dany
```

Este valor debe coincidir con el usuario configurado en PostgreSQL o en el contenedor de Docker.

---

### `POSTGRES_PASS`

Es la contraseña del usuario de PostgreSQL.

Ejemplo:

```env
POSTGRES_PASS=tu_contraseña
```

Debe coincidir con la contraseña configurada para el usuario de PostgreSQL.

---

### `POSTGRES_DB`

Es el nombre de la base de datos que utilizará la aplicación.

Ejemplo:

```env
POSTGRES_DB=WATCHES
```

La base de datos será utilizada por Prisma para almacenar la información de la aplicación.

---

### `POSTGRES_URL`

Es la cadena de conexión que Prisma utiliza para conectarse a PostgreSQL.

La estructura general es:

```text
postgresql://USUARIO:CONTRASEÑA@HOST:PUERTO/NOMBRE_BASE_DE_DATOS
```

Por ejemplo:

```env
POSTGRES_URL="postgresql://postgres:tu_contraseña@localhost:5432/WATCHES"
```

Donde:

- `postgres` → usuario de PostgreSQL.
- `tu_contraseña` → contraseña del usuario.
- `localhost` → dirección del servidor de PostgreSQL.
- `5432` → puerto predeterminado de PostgreSQL.
- `WATCHES` → nombre de la base de datos.

> **Importante:** Si PostgreSQL se ejecuta dentro de Docker y el backend también se ejecuta dentro de un contenedor de la misma red Docker, el `HOST` de la conexión puede no ser `localhost`. En ese caso, debe utilizarse el nombre del servicio definido en `docker-compose.yml`.

---

# Configuración de PostgreSQL mediante Docker Compose

El proyecto incluye configuración de Docker Compose para levantar el contenedor de PostgreSQL utilizado por la aplicación.

Antes de iniciar el backend, debes asegurarte de que Docker Desktop esté ejecutándose.

Desde la raíz del proyecto, ejecuta:

```bash
docker compose up
```

Esto levantará los servicios definidos en:

```text
docker-compose.yml
```

Si deseas ejecutar los contenedores en segundo plano:

```bash
docker compose up -d
```

Para comprobar que los contenedores están ejecutándose:

```bash
docker compose ps
```

También puedes utilizar:

```bash
docker ps
```

Para detener los contenedores:

```bash
docker compose down
```

### Flujo recomendado

Una vez configurado el archivo `.env`, el flujo recomendado es:

```bash
npm install
```

Después, levantar los servicios de Docker:

```bash
docker compose up -d
```

Una vez que PostgreSQL esté ejecutándose, puedes ejecutar las operaciones necesarias de Prisma.

Por ejemplo, si el proyecto utiliza migraciones:

```bash
npx prisma migrate dev
```

Para generar el cliente de Prisma:

```bash
npx prisma generate
```

> Los comandos específicos de Prisma pueden variar dependiendo de la configuración y los scripts definidos en `package.json`.

Finalmente, ejecutar el backend:

```bash
npm run dev
```

---

# Configuración de Prisma

El proyecto utiliza **Prisma** como ORM para trabajar con PostgreSQL.

Prisma utiliza la variable:

```env
POSTGRES_URL=
```

para establecer la conexión con la base de datos.

Antes de utilizar Prisma, asegúrate de que:

1. Docker Desktop esté ejecutándose.
2. El contenedor de PostgreSQL esté levantado.
3. Las variables `POSTGRES_*` estén correctamente configuradas.
4. `POSTGRES_URL` apunte correctamente a la base de datos.

Para levantar PostgreSQL:

```bash
docker compose up -d
```

Para generar el cliente de Prisma:

```bash
npx prisma generate
```

Para ejecutar las migraciones en desarrollo:

```bash
npx prisma migrate dev
```

Para consultar visualmente la base de datos mediante Prisma Studio:

```bash
npx prisma studio
```

---

# Configuración de Cloudinary

El proyecto utiliza **Cloudinary** para almacenar y administrar las imágenes de los productos.

Para obtener las credenciales:

1. Crear una cuenta en Cloudinary.
2. Iniciar sesión.
3. Acceder al **Dashboard**.
4. Buscar las credenciales de la cuenta.
5. Copiar los valores necesarios.

Las variables utilizadas son:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Puedes acceder al panel de Cloudinary desde:

https://console.cloudinary.com/

---

### `CLOUDINARY_CLOUD_NAME`

Es el nombre o identificador de tu Cloudinary Cloud.

Ejemplo:

```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name
```

---

### `CLOUDINARY_API_KEY`

Es la API Key proporcionada por Cloudinary.

```env
CLOUDINARY_API_KEY=tu_api_key
```

---

### `CLOUDINARY_API_SECRET`

Es el API Secret proporcionado por Cloudinary.

```env
CLOUDINARY_API_SECRET=tu_api_secret
```

> **Importante:** `CLOUDINARY_API_SECRET` es información sensible. Nunca debe publicarse en GitHub ni compartirse públicamente.

---

# Configuración de JWT

El proyecto utiliza JWT para la autenticación de usuarios.

Debes configurar:

```env
JWT_SEED=
```

Esta variable contiene una clave secreta utilizada para firmar y validar los tokens JWT.

Ejemplo:

```env
JWT_SEED=una_cadena_secreta_segura
```

Se recomienda utilizar una cadena larga, aleatoria y difícil de adivinar.

> No utilices la misma clave secreta en diferentes proyectos o ambientes de producción.

---

# Configuración del servicio de correo

El proyecto utiliza un servicio de correo para enviar mensajes relacionados con la aplicación, como códigos de recuperación o verificación.

Debes configurar:

```env
MAILER_EMAIL=
MAILER_SECRET_KEY=
```

---

### `MAILER_EMAIL`

Es la dirección de correo electrónico utilizada por la aplicación para enviar correos.

Ejemplo:

```env
MAILER_EMAIL=correo@ejemplo.com
```

Debes utilizar una dirección válida y compatible con el proveedor de correo utilizado por el proyecto.

---

### `MAILER_SECRET_KEY`

Es la clave secreta utilizada por el servicio de correo.

El valor dependerá del proveedor utilizado por el proyecto.

Ejemplo:

```env
MAILER_SECRET_KEY=tu_secret_key
```

Si el proveedor de correo utiliza una API Key, contraseña de aplicación o Secret Key, debes obtenerla desde el panel correspondiente del proveedor.

> **Importante:** Nunca publiques `MAILER_SECRET_KEY` en GitHub.

---

# Configuración del servidor

Las variables relacionadas con el servidor son:

```env
PUBLIC_PATH=public
PORT=3000
```

---

### `PUBLIC_PATH`

Indica la carpeta utilizada para archivos públicos o estáticos.

Por defecto:

```env
PUBLIC_PATH=public
```

---

### `PORT`

Indica el puerto donde se ejecutará el backend.

Por defecto:

```env
PORT=3000
```

Por lo tanto, el backend estará disponible normalmente en:

```text
http://localhost:3000
```

---

# Ejemplo de archivo `.env`

Crea un archivo `.env` en la raíz del proyecto con una estructura similar a la siguiente:

```env
POSTGRES_URL="postgresql://USUARIO:CONTRASEÑA@localhost:5432/WATCHES"
POSTGRES_USER=USUARIO
POSTGRES_PASS=CONTRASEÑA
POSTGRES_DB=WATCHES

CLOUDINARY_CLOUD_NAME=TU_CLOUD_NAME
CLOUDINARY_API_KEY=TU_API_KEY
CLOUDINARY_API_SECRET=TU_API_SECRET

JWT_SEED=TU_SECRETO_JWT

PUBLIC_PATH=public
PORT=3000

MAILER_EMAIL=correo@ejemplo.com
MAILER_SECRET_KEY=TU_SECRET_KEY
```

Los valores utilizados en este ejemplo son únicamente ilustrativos.

---

# Ejecutar el proyecto

Una vez clonado el proyecto y configurado el archivo `.env`, seguir los siguientes pasos.

### 1. Instalar dependencias

```bash
npm install
```

### 2. Levantar PostgreSQL con Docker

```bash
docker compose up -d
```

### 3. Generar el cliente de Prisma

```bash
npx prisma generate
```

### 4. Ejecutar las migraciones

Si el proyecto utiliza migraciones de Prisma:

```bash
npx prisma migrate dev
```

### 5. Ejecutar el backend

Para desarrollo:

```bash
npm run dev
```

El backend debería quedar disponible en:

```text
http://localhost:3000
```

---

# Compilar el proyecto

Para generar una versión de producción:

```bash
npm run build
```

Después de compilar, ejecutar el comando de producción definido en `package.json`.

Por ejemplo:

```bash
npm start
```

---

# Ejecución con Docker

Si el proyecto incluye configuración para Docker, asegúrate de tener instalado:

- Docker Desktop
- Docker Compose

Para levantar los servicios:

```bash
docker compose up
```

O para ejecutarlos en segundo plano:

```bash
docker compose up -d
```

Para detener los servicios:

```bash
docker compose down
```

Para consultar el estado:

```bash
docker compose ps
```

Consulta el archivo:

```text
docker-compose.yml
```

para conocer los servicios configurados y sus respectivas opciones.

---

# Seguridad

Nunca subir al repositorio:

- `.env`
- Contraseñas de PostgreSQL
- API Keys
- API Secrets
- JWT Secrets
- Secret Keys del servicio de correo
- Tokens de autenticación
- Credenciales de servicios externos

El archivo `.env` debe estar incluido en `.gitignore`.

El archivo `.env.template` **sí debe mantenerse en el repositorio** para indicar a futuros desarrolladores qué variables necesitan configurar.

El `.env.template` debe contener únicamente los nombres de las variables, sin credenciales reales.

Por ejemplo:

```env
POSTGRES_URL=
POSTGRES_USER=
POSTGRES_PASS=
POSTGRES_DB=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

JWT_SEED=

PUBLIC_PATH=public
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=
```

---

# Estructura básica

La estructura del proyecto puede variar, pero de forma general:

```text
backend/
├── src/
├── prisma/
├── public/
├── .env
├── .env.template
├── .gitignore
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

---

# Flujo rápido para nuevos desarrolladores

Después de clonar el proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

Instalar las dependencias:

```bash
npm install
```

Crear el archivo `.env` a partir de `.env.template`.

Después:

1. Configurar las variables `POSTGRES_*`.
2. Verificar que Docker Desktop esté ejecutándose.
3. Levantar PostgreSQL mediante Docker Compose:

```bash
docker compose up -d
```

4. Generar el cliente de Prisma:

```bash
npx prisma generate
```

5. Ejecutar las migraciones de Prisma:

```bash
npx prisma migrate dev
```

6. Crear o utilizar una cuenta de Cloudinary.
7. Configurar `CLOUDINARY_CLOUD_NAME`.
8. Configurar `CLOUDINARY_API_KEY`.
9. Configurar `CLOUDINARY_API_SECRET`.
10. Generar un `JWT_SEED` seguro.
11. Configurar `MAILER_EMAIL`.
12. Configurar `MAILER_SECRET_KEY`.
13. Verificar que `PORT` sea `3000`.
14. Ejecutar el proyecto:

```bash
npm run dev
```

El backend debería quedar disponible en:

```text
http://localhost:3000
```

---

# Notas

- No compartas las credenciales del archivo `.env`.
- Cada desarrollador debe utilizar sus propias credenciales para servicios externos cuando sea necesario.
- En ambientes de producción se recomienda utilizar variables de entorno administradas por la plataforma de despliegue.
- Verifica que Docker Desktop esté ejecutándose antes de levantar PostgreSQL.
- Verifica que el contenedor de PostgreSQL esté activo antes de ejecutar las operaciones de Prisma.
- Si utilizas Docker Compose, puedes consultar el estado de los servicios mediante:

```bash
docker compose ps
```

- Para detener los servicios de Docker:

```bash
docker compose down
```

- Si modificas el esquema de Prisma durante el desarrollo, recuerda crear una nueva migración utilizando:

```bash
npx prisma migrate dev
```

- Si el proyecto utiliza una base de datos PostgreSQL existente, asegúrate de que `POSTGRES_URL` apunte correctamente a dicha base de datos.
