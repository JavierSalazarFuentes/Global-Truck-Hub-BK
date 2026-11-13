import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Buscamos el token alterado o sano en el sessionStorage
  const token = sessionStorage.getItem('token');

  if (token) {
    // Clonamos la petición y le inyectamos el token en los Headers
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
