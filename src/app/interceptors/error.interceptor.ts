import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {

      let message = 'Ocurrió un error inesperado al consultar el servicio.';

      if (error.status === 0) {
        message = 'No se pudo conectar con la API. Revisa tu conexión a internet.';
      }
      else if (error.status === 401 || error.status === 403) {
        message = 'No autorizado: verifica que tu API Key de API Ninjas sea correcta.';
      }
      else if (
        error.status === 400 &&
        request.headers.has('X-Api-Key')
      ) {
        message = 'No autorizado: verifica que tu API Key de API Ninjas sea correcta.';
      }
      else if (error.status === 400) {
        message = 'Solicitud incorrecta: revisa el músculo ingresado o los datos enviados.';
      }
      else if (error.status === 404) {
        message = 'Recurso no encontrado: revisa que la URL del endpoint sea correcta.';
      }
      else if (error.status === 500) {
        message = 'Error interno del servidor: la API presentó un problema temporal.';
      }

      return throwError(() => new Error(message));
    })
  );
};