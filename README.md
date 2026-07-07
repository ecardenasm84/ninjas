# API Ninjas Ejercicios - Angular

Proyecto Angular para la **Actividad individual - Opción 2: Consumo de una API REST protegida mediante HttpHeaders**.

La aplicación permite buscar ejercicios según el músculo que desea trabajar el usuario usando API Ninjas.

## Requisitos cubiertos

- Servicio `ExerciseService`.
- Consumo de API con `HttpClient`.
- Configuración de `HttpHeaders`.
- Header requerido: `X-Api-Key`.
- Búsqueda por músculo: `chest`, `legs`, `biceps`, `back`, etc.
- Visualización de:
  - Nombre del ejercicio.
  - Tipo.
  - Músculo.
  - Dificultad.
  - Instrucciones.

## Cómo ejecutar

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
ng serve -o
```

Abrir:

```text
http://localhost:4200
```

## Dónde colocar la API Key

Archivo:

```text
src/app/services/exercise.service.ts
```

Busca esta línea:

```ts
private readonly apiKey = 'TU_API_KEY';
```

Reemplaza `TU_API_KEY` por tu clave de API Ninjas.

Ejemplo:

```ts
private readonly apiKey = 'abc123...';
```

> No subas tu API Key real a GitHub.

## Archivo principal del servicio

```ts
private getHeaders(): HttpHeaders {
  return new HttpHeaders({
    'X-Api-Key': this.apiKey
  });
}

searchByMuscle(muscle: string): Observable<Exercise[]> {
  return this.http.get<Exercise[]>(
    `${this.apiUrl}?muscle=${muscle}`,
    { headers: this.getHeaders() }
  );
}
```

## Cómo verificar en Network

1. Abre la aplicación.
2. Presiona `F12`.
3. Entra a la pestaña **Network**.
4. Busca un músculo, por ejemplo `biceps`.
5. Abre la solicitud `exercises?muscle=biceps`.
6. En **Request Headers**, verifica que aparezca:

```text
X-Api-Key: TU_CLAVE
```

## Guion corto para exponer

Buenos días, profesor y compañeros.

En esta actividad desarrollé una aplicación Angular que consume una API REST protegida mediante cabeceras HTTP.

La API utilizada es API Ninjas, específicamente el endpoint de ejercicios:

```text
https://api.api-ninjas.com/v1/exercises?muscle=biceps
```

El objetivo es buscar ejercicios según el músculo ingresado por el usuario, por ejemplo `biceps`, `chest`, `legs` o `back`.

Para conectarme con la API creé un servicio llamado `ExerciseService`. En este servicio uso `HttpClient` para realizar la petición GET y `HttpHeaders` para enviar la autenticación.

La cabecera principal es:

```text
X-Api-Key: TU_API_KEY
```

Esto permite que la API valide la solicitud y devuelva la información.

Cuando el usuario escribe un músculo y presiona el botón Buscar, Angular llama al servicio, recibe una lista de ejercicios y los muestra en tarjetas. Cada tarjeta presenta el nombre del ejercicio, tipo, músculo, dificultad, equipo e instrucciones.

Finalmente, para comprobar que la autenticación funciona, se puede abrir la pestaña Network del navegador y verificar que la solicitud incluya el encabezado `X-Api-Key`.
