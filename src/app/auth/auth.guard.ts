import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId); // Verifica si está en el navegador

  // Obtiene el token solo si está en el navegador
  const token = isBrowser ? authService.getAccessToken() : null;

  // Si no hay token, redirige al usuario a la página de inicio de sesión
  if (!token) {
    return router.createUrlTree(['/auth/signin'], { queryParams: { returnUrl: state.url } });
  }

  return true; // Permite el acceso si el token es válido
};
