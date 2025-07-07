# mi_proyecto_aws

Este proyecto es una API RESTful de productos desarrollada con **Laravel** (backend) y preparada para despliegue en **AWS** (API Gateway + Lambda). Incluye documentación automática con Swagger (l5-swagger) y sigue buenas prácticas de arquitectura y seguridad.

---

## Características

- **API REST de productos**: CRUD completo (crear, leer, actualizar, eliminar).
- **Laravel**: Framework PHP robusto y moderno.
- **Swagger/OpenAPI**: Documentación interactiva generada automáticamente.
- **Repository Pattern**: Separación de lógica de acceso a datos.
- **Despliegue en AWS**: Preparado para funcionar con API Gateway y Lambda.
- **Validación de datos**: Uso de validaciones de Laravel en los endpoints.
- **Autenticación JWT** (opcional): Seguridad para los endpoints (puedes activar/desactivar).
- **Estructura limpia y escalable**.

---

---

## Instalación y Uso

### 1. Clonar el repositorio

```sh
git clone https://github.com/iCharss/mi_proyecto_aws.git
cd mi_proyecto_aws/backend-laravel
```

### 2. Instalar dependencias

```sh
composer install
```

### 3. Configurar variables de entorno

Copia `.env.example` a `.env` y configura tu base de datos y credenciales AWS si es necesario.

```sh
cp .env.example .env
php artisan key:generate
```

### 4. Migrar la base de datos

```sh
php artisan migrate
```

### 5. Generar documentación Swagger

```sh
php artisan l5-swagger:generate
```

### 6. Levantar el servidor de desarrollo

```sh
php artisan serve
```

---

## Endpoints principales

- `GET /api/products` — Listar productos
- `POST /api/products` — Crear producto
- `PUT /api/products/{id}` — Actualizar producto
- `DELETE /api/products/{id}` — Eliminar producto

Consulta la documentación Swagger para detalles de cada endpoint.

---

## Despliegue en AWS

El proyecto está preparado para ser desplegado en AWS Lambda y API Gateway.  
Asegúrate de configurar correctamente los recursos y las rutas en API Gateway para que apunten a tu backend.

---

## Licencia

MIT

---

## Autor

- [Carlos Rodriguez.](https://github.com/iCharss)