# 📦 Proyecto AdoptMe - Sistema de Mocking

## 👤 Información del Proyecto

**Alumna:** Delfina Caradonna  
**Curso:** Backend III - CoderHouse  
**Entrega:** Primera Entrega - Sistema de Mocking con Faker.js  
**Fecha:** Febrero 2026

---

## 📋 Descripción del Proyecto

Implementación de un sistema completo de **mocking de datos** para la aplicación AdoptMe, utilizando **Faker.js** para generar datos aleatorios de usuarios y mascotas. El sistema permite crear datos de prueba de manera rápida y eficiente para testing y desarrollo.

---

## 🎯 Objetivos Cumplidos

### ✅ Requisitos Implementados

1. **Router de Mocking** (`/api/mocks`)
   - Creado router `mocks.router.js` que funciona bajo la ruta base `/api/mocks`

2. **Módulo de Generación** (`mockingModule.js`)
   - Genera usuarios con las siguientes características:
     - Contraseña "coder123" **encriptada** con bcrypt
     - Role aleatorio entre "user" y "admin"
     - Campo "pets" como array vacío

3. **Endpoint GET /mockingusers**
   - Genera 50 usuarios mock con formato compatible con MongoDB
   - Solo genera datos (no los inserta en BD)

4. **Endpoint POST /generateData**
   - Recibe parámetros numéricos `users` y `pets`
   - Genera e inserta usuarios y mascotas en la base de datos
   - Establece relación bidireccional: User ↔ Pets

5. **Verificación de Datos**
   - Los registros pueden verificarse mediante los servicios GET de users y pets
   - Endpoints adicionales para visualización optimizada

---

## 🚀 Endpoints Implementados

### 1. GET `/api/mocks/mockingusers`
Genera 50 usuarios mock sin guardarlos en la base de datos.

**Request:**
```bash
GET http://localhost:8080/api/mocks/mockingusers
```

**Response:**
```json
{
  "status": "success",
  "payload": [
    {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "password": "$2b$10$XYZ...",
      "role": "user",
      "pets": []
    }
    // ... 49 usuarios más
  ]
}
```

---

### 2. POST `/api/mocks/generateData`
Genera e inserta usuarios con mascotas en la base de datos.

**Request:**
```bash
POST http://localhost:8080/api/mocks/generateData
Content-Type: application/json

{
  "users": 5,
  "pets": 3
}
```

**Parámetros:**
- `users`: Cantidad de usuarios a crear
- `pets`: Cantidad de mascotas **por usuario**

**Response:**
```json
{
  "status": "success",
  "message": "Se generaron 5 usuarios, cada uno con 3 mascotas",
  "payload": {
    "usersInserted": 5,
    "petsInserted": 15,
    "petsPerUser": 3
  }
}
```

**Resultado:**
- Se crean 5 usuarios en la colección `users`
- Se crean 15 mascotas en la colección `pets` (5 × 3)
- Cada mascota tiene su `owner` asignado
- Cada usuario tiene su array `pets` con las referencias

---

### 3. GET `/api/mocks/users`
Obtiene todos los usuarios con sus mascotas pobladas.

**Request:**
```bash
GET http://localhost:8080/api/mocks/users
```

**Response:**
```json
{
  "status": "success",
  "count": 5,
  "payload": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "role": "user",
      "pets": [
        {
          "_id": "507f1f77bcf86cd799439012",
          "name": "Max",
          "specie": "dog",
          "adopted": true,
          "owner": "507f1f77bcf86cd799439011"
        }
        // ... más mascotas
      ]
    }
    // ... más usuarios
  ]
}
```

---

### 4. GET `/api/mocks/pets`
Obtiene todas las mascotas con resumen de adoptadas/disponibles.

**Request:**
```bash
GET http://localhost:8080/api/mocks/pets
```

**Response:**
```json
{
  "status": "success",
  "count": 15,
  "summary": {
    "total": 15,
    "adopted": 15,
    "available": 0
  },
  "payload": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Max",
      "specie": "dog",
      "birthDate": "2020-05-15T00:00:00.000Z",
      "adopted": true,
      "owner": "507f1f77bcf86cd799439011"
    }
    // ... más mascotas
  ]
}
```

---

## 📁 Estructura de Archivos

```
src/
├── routes/
│   └── mocks.router.js          ← Router principal de mocking
├── utils/
│   └── mockingModule.js         ← Módulo de generación con Faker.js
├── dao/
│   ├── Users.dao.js             ← DAO de usuarios (existente)
│   └── Pets.dao.js              ← DAO de mascotas (existente)
└── models/
    ├── User.js                  ← Modelo de usuario (existente)
    └── Pet.js                   ← Modelo de mascota (existente)
```

---

## 🔧 Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **@faker-js/faker** - Generación de datos aleatorios
- **bcrypt** - Encriptación de contraseñas

---

## 📦 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd adoptme-backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivo `.env` en la raíz:
```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/adoptme
```

### 4. Iniciar MongoDB
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 5. Iniciar el servidor
```bash
npm start
```

---

## 🧪 Ejemplos de Uso

### Ejemplo 1: Generar datos de prueba
```bash
# Crear 10 usuarios, cada uno con 5 mascotas
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users": 10, "pets": 5}'
```

**Resultado:** 10 usuarios y 50 mascotas en la BD

---

### Ejemplo 2: Ver usuarios generados
```bash
curl http://localhost:8080/api/mocks/users
```

---

### Ejemplo 3: Verificar mascotas
```bash
curl http://localhost:8080/api/mocks/pets
```

---

### Ejemplo 4: Usar endpoints originales
```bash
# También funcionan los endpoints principales del proyecto
curl http://localhost:8080/api/users
curl http://localhost:8080/api/pets
```

---

## 🎨 Características del Sistema de Mocking

### Datos Generados - Usuarios

Cada usuario generado incluye:
- ✅ `first_name`: Nombre aleatorio realista
- ✅ `last_name`: Apellido aleatorio realista
- ✅ `email`: Email único y válido
- ✅ `password`: Hash bcrypt de "coder123"
- ✅ `role`: Aleatorio entre "user" y "admin"
- ✅ `pets`: Array con referencias a sus mascotas

**Ejemplo de contraseña encriptada:**
```
Texto plano: "coder123"
Hash: "$2b$10$XQ8Z9J6YW.Yp8F9vK2X8.eR5nH3mP9oL7kJ4fD8sA9pQ2wE6rT7yK"
```

---

### Datos Generados - Mascotas

Cada mascota generada incluye:
- ✅ `name`: Nombre aleatorio
- ✅ `specie`: dog, cat, bird, fish, hamster, rabbit o turtle
- ✅ `birthDate`: Fecha aleatoria en los últimos 10 años
- ✅ `adopted`: true (si tiene owner) / false (si no tiene)
- ✅ `owner`: ObjectId del usuario dueño o null

---

## 🔐 Seguridad

### Encriptación de Contraseñas
Todas las contraseñas se encriptan usando **bcrypt** con salt rounds de 10:

```javascript
import bcrypt from 'bcrypt';
const hashedPassword = bcrypt.hashSync('coder123', 10);
```

### Verificación de Contraseña
Para verificar que la contraseña "coder123" es correcta:

```javascript
const isMatch = bcrypt.compareSync('coder123', usuario.password);
// Retorna: true
```

---

## 📊 Relación de Datos

### Estructura de Relación User-Pet

```
┌─────────────────┐
│     User        │
├─────────────────┤
│ _id: ObjectId   │◄──┐
│ first_name      │   │
│ last_name       │   │
│ email           │   │
│ password        │   │
│ role            │   │
│ pets: [         │   │
│   {_id: ...}    │───┤
│   {_id: ...}    │───┤
│ ]               │   │
└─────────────────┘   │
                      │
                      │
┌─────────────────┐   │
│      Pet        │   │
├─────────────────┤   │
│ _id: ObjectId   │◄──┘
│ name            │
│ specie          │
│ birthDate       │
│ adopted: true   │
│ owner: ObjectId │───┐
└─────────────────┘   │
         △____________┘
         Relación bidireccional
```

---

## ✅ Verificación de Requisitos

| Requisito | Estado | Descripción |
|-----------|--------|-------------|
| Router `/api/mocks` | ✅ | Implementado en `mocks.router.js` |
| Módulo de Mocking | ✅ | `mockingModule.js` con Faker.js |
| Contraseña encriptada | ✅ | Hash bcrypt de "coder123" |
| Role aleatorio | ✅ | "user" o "admin" |
| Pets array vacío | ✅ | En endpoint `/mockingusers` |
| GET `/mockingusers` | ✅ | Genera 50 usuarios |
| POST `/generateData` | ✅ | Recibe users y pets |
| Inserción en BD | ✅ | Guarda en MongoDB |
| Verificación GET | ✅ | Endpoints de verificación |
| Formato Mongo | ✅ | Compatible con Mongoose |

---

## 🎓 Aprendizajes del Proyecto

Durante este proyecto se implementaron y aprendieron los siguientes conceptos:

1. **Generación de datos mock** con Faker.js
2. **Encriptación de contraseñas** con bcrypt
3. **Relaciones en MongoDB** (User-Pets bidireccional)
4. **Manejo de DAOs** y modelos en Mongoose
5. **Diseño de APIs RESTful** con Express
6. **Validación de datos** en endpoints
7. **Manejo de errores** y respuestas HTTP

---

## 📝 Notas Adicionales

### Formato de Respuestas
Todos los endpoints siguen un formato consistente:
```json
{
  "status": "success" | "error",
  "message": "...",
  "payload": { ... }
}
```

### Compatibilidad
El sistema es totalmente compatible con:
- Los modelos existentes de User y Pet
- Los DAOs que usan método `save()`
- Los endpoints originales del proyecto

### Testing
Los datos generados son ideales para:
- Desarrollo local
- Testing de funcionalidades
- Demostración del proyecto
- Pruebas de carga

---

## 📞 Contacto

**Alumna:** Delfina Caradonna  
**Curso:** Backend III - CoderHouse  
**Proyecto:** AdoptMe - Sistema de Mocking

---

## 📄 Licencia

Este proyecto fue desarrollado como parte del curso de Backend de CoderHouse.

---

## 🎉 Estado del Proyecto

✅ **Proyecto completado y funcional**

Todos los requisitos de la primera entrega han sido implementados exitosamente.

---

**Desarrollado con ❤️ por Delfina Caradonna**  