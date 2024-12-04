import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyecta el AuthService
  const router = inject(Router);          // Inyecta el Router

  const token = authService.getAccessToken(); // Verifica si existe un token
  if (token) {
    router.navigate(['/']); // Redirige al usuario logueado
    return false; // Previene el acceso a la página de login
  }

  return true; // Permite el acceso si no está logueado
};
