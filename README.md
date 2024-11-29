
# Proyecto de Gestión de Usuarios con Geolocalización

Este proyecto es una API desarrollada en Node.js con Express que permite gestionar usuarios y obtener sus coordenadas geográficas basadas en su dirección utilizando la API de Google Maps.

## **Requisitos Previos**

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu máquina:

1. **Node.js** (v16 o superior recomendado) y **npm**.
2. **MySQL** (o una base de datos compatible con `mysql2`).
3. **Google Maps API Key** para geocodificación.
4. (Opcional) **Postman** o alguna herramienta para probar APIs.

---

## **Configuración**

### **1. Clonar el Repositorio**

Clona el repositorio desde GitHub:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

---

### **2. Instalar Dependencias**

Ejecuta el siguiente comando para instalar las dependencias necesarias, se instalará la CLI de knex para las migraciones de la base de datos:

```bash
npm install && npm install knex -g
```

---

### **3. Configurar Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
2. Edita el archivo `.env` y llena los datos correspondientes (como base de datos, API keys, etc.).
```

Añade las siguientes variables al archivo `.env` (reemplaza los valores con tu configuración):

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_tu_base_de_datos
GOOGLE_API_KEY=tu_clave_de_api_de_google
```

---

### **4. Configurar y Crear la Base de Datos**

1. Crea la base de datos en tu instancia de MySQL:

```sql
CREATE DATABASE nombre_de_tu_base_de_datos;
```

2. Ejecuta las migraciones para crear las tablas necesarias:

```bash
knex migrate:latest
```

Esto creará las tablas necesarias, como `users`.

---

## **Ejecución**

### **Start**

Para levantar el servidor:

```bash
node index.js
```

Se levantara en https://localhost:3000

---

## **Rutas Disponibles**

### **Usuarios**

| Método | Endpoint     | Descripción                                     |
|--------|--------------|-------------------------------------------------|
| `POST` | `/api/users` | Crea un nuevo usuario.                         |
| `GET`  | `/api/users`    | Obtiene todos los usuarios.                    |
| `GET`  | `/api/users/:id` | Obtiene un usuario por su ID.                  |
| `PUT`  | `/api/users/:id` | Actualiza un usuario.                          |
| `DELETE` | `/api/users/:id` | Elimina un usuario por su ID.                  |

#### **Ejemplos de Uso**

1. **Crear Usuario**
    - **Endpoint**: `POST /api/users`
    - **Body**:
      ```json
      {
        "name": "Juan Pérez",
        "address": "Calle 123, Ciudad"
      }
      ```

2. **Obtener Todos los Usuarios**
    - **Endpoint**: `GET /api/users`

3. **Obtener un Usuario por ID**
    - **Endpoint**: `GET /api/users/:id`

4. **Actualizar Usuario**
    - **Endpoint**: `PUT /api/users/:id`
    - **Body**:
      ```json
      {
        "name": "Juan Pérez Actualizado",
        "address": "Nueva Calle 456, Ciudad"
      }
      ```

5. **Eliminar Usuario**
    - **Endpoint**: `DELETE /api/users/:id`

---

## **Estructura del Proyecto**

```plaintext
├── migrations/           # Migraciones de la base de datos (Knex.js)
│── controllers/       # Lógica de negocio para las rutas
│── services/          # Servicios externos (e.g., geolocalización)
│── routes/            # Definición de las rutas de la API
│── db/                # Configuración de Knex.js
│── index.js           # Entrada principal del servidor
│── lambda.js           # Entrada principal del servidor para lambda function
├── .env                   # Variables de entorno
├── knexfile.js            # Configuración de Knex.js
├── package.json           # Dependencias del proyecto
```

---

## **Pruebas**

Usa herramientas como Postman para probar los endpoints. También puedes escribir pruebas automáticas si lo deseas.

---

## **Resolución de Problemas**

1. **Error de conexión a la base de datos**:
    - Asegúrate de que MySQL esté corriendo y que las credenciales en el archivo `.env` sean correctas.

2. **Error con la API de Google Maps**:
    - Revisa que tu clave de API sea válida y tenga permisos para la geocodificación.

---

## **Comandos Útiles**

1. **Ejecutar migraciones**:
   ```bash
   knex migrate:latest
   ```

2. **Revertir migraciones**:
   ```bash
   knex migrate:rollback
   ```

---

## **Licencia**

Este proyecto está bajo la Licencia MIT. Siéntete libre de usarlo y modificarlo.
