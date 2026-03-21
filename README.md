# 📦 Proyecto AdoptMe - Sistema de Adopción de Mascotas

## 👤 Información del Proyecto

**Alumna:** Delfina Caradonna  
**Curso:** Backend III - CoderHouse  
**Entrega:** Entrega Final - Dockerización y Testing  
**Fecha:** Marzo 2026

---

## 🐳 Imagen Docker

### DockerHub

**Link a la imagen:**  
🔗 **[https://hub.docker.com/r/delfinacaradonna/adoptme-backend](https://hub.docker.com/r/delfinacaradonna/adoptme-backend)**

### Uso Rápido

```bash
# Descargar la imagen
docker pull delfinacaradonna/adoptme-backend:latest

# Ejecutar con MongoDB local
docker run -p 8080:8080 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/adoptme \
  delfinacaradonna/adoptme-backend:latest

# O usar docker-compose (incluye MongoDB)
docker-compose up
```

---

## 📋 Descripción del Proyecto

Sistema backend completo para adopción de mascotas que incluye:

- ✅ API RESTful con Express
- ✅ Base de datos MongoDB
- ✅ Sistema de mocking con Faker.js
- ✅ Documentación con Swagger
- ✅ Tests funcionales con Mocha, Chai y Supertest
- ✅ Dockerización completa

---

## 🎯 Entrega Final - Objetivos Cumplidos

### ✅ 1. Documentación con Swagger

**Módulo documentado:** Users

**Endpoints documentados:**

- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:uid` - Obtener un usuario por ID
- `PUT /api/users/:uid` - Actualizar un usuario
- `DELETE /api/users/:uid` - Eliminar un usuario

**Acceso a la documentación:**

```
http://localhost:8080/apidocs
```

**Archivo de documentación:**

- `src/docs/Users/Users.yaml`

---

### ✅ 2. Tests Funcionales

**Router testeado:** `adoption.router.js`

**Endpoints testeados:**

- ✅ `GET /api/adoptions` - Obtener todas las adopciones
- ✅ `GET /api/adoptions/:aid` - Obtener una adopción por ID
- ✅ `POST /api/adoptions/:uid/:pid` - Crear adopción

**Casos de prueba implementados:**

- Tests de éxito (200, 201)
- Tests de error (400, 404, 500)
- Validaciones de datos
- Casos edge (mascota ya adoptada, usuario no existe, etc.)

**Total de tests:** 10 tests funcionales

**Ejecutar tests:**

```bash
npm test
```

**Archivo de tests:**

- `test/adoptions.test.js`

---

### ✅ 3. Dockerización

**Dockerfile creado:** ✅

**Construir imagen:**

```bash
docker build -t adoptme-backend .
```

---

### ✅ 4. Imagen en DockerHub

**Repositorio:** [delfinacaradonna/adoptme-backend](https://hub.docker.com/r/delfinacaradonna/adoptme-backend)

---

## 🚀 Endpoints de la API

### Users

- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:uid` - Obtener usuario por ID
- `PUT /api/users/:uid` - Actualizar usuario
- `DELETE /api/users/:uid` - Eliminar usuario

### Pets

- `GET /api/pets` - Obtener todas las mascotas
- `GET /api/pets/:pid` - Obtener mascota por ID
- `POST /api/pets` - Crear mascota
- `PUT /api/pets/:pid` - Actualizar mascota
- `DELETE /api/pets/:pid` - Eliminar mascota

### Adoptions

- `GET /api/adoptions` - Obtener todas las adopciones
- `GET /api/adoptions/:aid` - Obtener adopción por ID
- `POST /api/adoptions/:uid/:pid` - Crear adopción

### Mocks (Sistema de Generación de Datos)

- `GET /api/mocks/mockingusers` - Generar 50 usuarios
- `GET /api/mocks/users` - Ver usuarios con mascotas
- `GET /api/mocks/pets` - Ver mascotas con resumen
- `POST /api/mocks/generateData` - Crear usuarios y mascotas

### Documentación

- `GET /apidocs` - Swagger UI

---

## 🔧 Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **@faker-js/faker** - Generación de datos aleatorios
- **bcrypt** - Encriptación de contraseñas
- **swagger-jsdoc** - Generación de specs Swagger
- **swagger-ui-express** - Interfaz de Swagger
- **mocha** - Framework de testing
- **chai** - Librería de aserciones
- **supertest** - Testing de APIs HTTP
- **Docker** - Containerización

---

## 📦 Instalación Local

### Prerequisitos

- Node.js 18+
- MongoDB 6+
- Docker (opcional)

### Setup

1. **Clonar el repositorio**

```bash
git clone https://github.com/DelfinaCaradonna/entrega-1-backend-3.git
cd entrega-1-backend-3
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
# Crear archivo .env
PORT=8080
MONGO_URI=mongodb://localhost:27017/adoptme
```

4. **Iniciar MongoDB**

```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

5. **Iniciar servidor**

```bash
npm start
```

6. **Acceder a la aplicación**

```
API: http://localhost:8080
Swagger: http://localhost:8080/apidocs
```

---

## 🐳 Uso con Docker

### Opción 1: Solo la aplicación

```bash
# Build
docker build -t adoptme-backend .

# Run (necesitas MongoDB corriendo)
docker run -p 8080:8080 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/adoptme \
  adoptme-backend
```

### Opción 2: Con Docker Compose (incluye MongoDB)

```bash
docker-compose up
```

Esto levantará:

- Aplicación en `http://localhost:8080`
- MongoDB en `localhost:27017`

### Opción 3: Desde DockerHub

```bash
# Descargar y ejecutar
docker pull delfinacaradonna/adoptme-backend:latest

docker run -p 8080:8080 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/adoptme \
  delfinacaradonna/adoptme-backend:latest
```

---

## 🧪 Testing

### Ejecutar todos los tests

```bash
npm test
```

### Ver coverage

```bash
npm run test:coverage
```

### Tests incluidos

- ✅ 10 tests funcionales para Adoptions
- ✅ Casos de éxito y error
- ✅ Validaciones de datos
- ✅ Tests de integración

---

## 📚 Documentación Swagger

La documentación interactiva de la API está disponible en:

```
http://localhost:8080/apidocs
```

### Características:

- Documentación completa del módulo Users
- Schemas de datos
- Request/Response bodies
- Ejemplos de uso
- "Try it out" para probar endpoints

---

## 📁 Estructura del Proyecto

```
adoptme-backend/
├── src/
│   ├── controllers/
│   │   ├── users.controller.js
│   │   ├── pets.controller.js
│   │   └── adoptions.controller.js
│   ├── dao/
│   │   ├── Users.dao.js
│   │   ├── Pets.dao.js
│   │   └── Adoption.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Pet.js
│   │   └── Adoption.js
│   ├── routes/
│   │   ├── users.router.js
│   │   ├── pets.router.js
│   │   ├── adoption.router.js
│   │   └── mocks.router.js
│   ├── services/
│   ├── utils/
│   │   └── mockingModule.js
│   ├── docs/
│   │   └── Users/
│   │       └── Users.yaml
│   └── app.js
├── test/
│   └── adoptions.test.js
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
└── README.md
```

---

## 🔐 Variables de Entorno

```env
# Servidor
PORT=8080
NODE_ENV=production

# Base de datos
MONGO_URI=mongodb://localhost:27017/adoptme

# JWT (si aplica)
JWT_SECRET=your-secret-key
```

---

## 🎓 Aprendizajes de la Entrega Final

Durante esta entrega final se implementaron y aprendieron:

1. **Documentación de APIs** con Swagger/OpenAPI
2. **Testing funcional** con Mocha, Chai y Supertest
3. **Dockerización** de aplicaciones Node.js
4. **Multi-stage builds** para optimización
5. **Docker Compose** para orquestación
6. **DockerHub** para distribución de imágenes
7. **Health checks** en contenedores
8. **Seguridad** en Docker (usuarios no-root)

---

## ✅ Criterios de Evaluación Cumplidos

### Desarrollo de Tests Funcionales ✅

- [x] Tests desarrollados para todos los endpoints de `adoption.router.js`
- [x] Todos los endpoints cubiertos
- [x] Tests verifican funcionamiento efectivo
- [x] Incluye casos de éxito y error

### Creación del Dockerfile ✅

- [x] Dockerfile creado correctamente
- [x] Configurado para construir la imagen adecuadamente
- [x] Imagen reproducible
- [x] Incluye todos los pasos necesarios (dependencias, archivos, entorno)

### Subida a DockerHub ✅

- [x] Imagen subida a DockerHub
- [x] Imagen disponible públicamente
- [x] Link incluido en README

### Documentación en README ✅

- [x] README contiene información detallada
- [x] Link a imagen de DockerHub incluido
- [x] Instrucciones claras para ejecutar con Docker
- [x] Detalles de construcción, ejecución y uso

---

## 📞 Contacto

**Alumna:** Delfina Caradonna  
**Curso:** Backend III - CoderHouse  
**GitHub:** [github.com/DelfinaCaradonna](https://github.com/DelfinaCaradonna)  
**DockerHub:** [hub.docker.com/r/delfinacaradonna](https://hub.docker.com/r/delfinacaradonna)

---

## 📄 Licencia

Este proyecto fue desarrollado como parte del curso de Backend de CoderHouse.

---

## 🎉 Estado del Proyecto

✅ **Entrega Final completada y funcional**

Todos los requisitos de la entrega final han sido implementados exitosamente:

- ✅ Documentación con Swagger
- ✅ Tests funcionales completos
- ✅ Dockerización
- ✅ Imagen en DockerHub

---

**Desarrollado con ❤️ por Delfina Caradonna**
