
## **Descripción**

- **Módulos**: Countries y TravelPlans
- **Propósito**: API para almacenar y consultar países (cache local) y gestionar planes de viaje asociados a países (crear, listar, consultar y validar relaciones antes de borrar).

## **Instalación y ejecución**

- **Instalar dependencias**:
npm install
- **Correr en modo desarrollo**:
npm run start:dev
npm install


## **Endpoints**

- **GET /countries**: devuelve todos los países guardados en la base de datos. Si la colección está vacía, la aplicación consulta el API y almacena (seed) los países localmete.
  - Ejemplo: `GET http://localhost:3000/countries`

- **GET /countries/:code**: busca un país por su código alpha-3 (ej. COL). Primero revisa la caché local; si no existe, consulta el proveedor externo, lo guarda y lo devuelve.
  - Ejemplo: `GET http://localhost:3000/countries/COL`

- **POST /travel-plans**: crea un plan de viaje. Body JSN esperado:
  - title (string), countryCode (alpha-3), startDat (ISO8601), endDate (ISO8601), notes (opcional).
  - La API valida fechas y que el país exista; si no existe lo obtiene del proveedor externo y lo guarda.


- **POST /travel-plans**: crea un plan de viaje. Body JSON esperado:
  - `title` (string), `countryCode` (alpha-3), `startDate` (ISO8601), `endDate` (ISO8601), `notes` (opcional).
  - La API valida fechas (start <= end) y que el país exista; si no existe lo obtiene del proveedor externo y lo guarda.
  - Ejemplo body:

- **GET /travel-plans**: lista todos los planes de viaje.
- **GET /travel-plans/:id**: obtiene un plan por su id.

## **Proveedor externo (RestCountries)**

- **Qué hace**: la aplicación usa un provider (`RestCountriesProvider`) para consultar `https://restcountries.com` cuando un país no está en la caché local.
- **Cómo se consulta**:
  - Para buscar por código alpha-3 se llama a `https://restcountries.com/v3.1/alpha/{code}?fields=cca3,name,region,subregion,capital,population,flags`.
  - Para obtener la lista completa (sed) se llama a `https://restcountries.com/v3.1/all?fields=cca3,name,region,subregion,capital,population,flags`.
- **Campos guardados**: `code` (cca3), `name` (name.common), `region`, `subregion`, `capital` (primer elemento si es array), `population`, `flag` (png o svg).
- **Comportamiento en la app**:
  - `CountriesService.findByCode(code)` primero consulta la BD; si no existe, llama al provider (`getByAlpha3`) y crea el registro localmente.
  - `CountriesService.findAll()` si detecta colección vacía, hace la llamada `all` y almacena los países (seed automático en modo desarrollo).

## **Cambios Parcial**

- **DELETE /countries/:code**: elimina un país en caché por código (ej. `COL`). Requisitos:
  - Debe incluir el header `x-api-key` con la clave válida (por defecto `12345`).
  - La eliminación está bloqueada si existen `TravelPlans` que referencien el `countryCode (se develve 400 con mensaje explicativo).
  - Ejemplo (Postman): Header `x-api-key: 12345`, `DELETE http://localhost:3000/countries/COL`

## **Seguridad para borrado**

- El endpoint `DELETE /countries/:code` está protegido por un guard que exige el header `x-api-key`.
- Valor por defecto para desarrollo: `12345`.

## **Middleware**
- El middelware se creo en la carpeta /common/middleware donde se registra y guarda la información de las peticiones. Finalmente se ejecuta en el app.module.ts


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
$ npm install uuid
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
# BD
Se uso Mongo DB y Moongoose

