import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-logout',
  template: `<p>Cerrando sesión...</p>`, // Opcional: Mensaje para el usuario
  styles: ``
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("HOLA?1")
    // Llamar al servidor para cerrar sesión
    this.authService.logout().subscribe({
      next: () => {
        console.log("HOLA?")
        // Limpia el almacenamiento local
        // localStorage.removeItem('authToken');
        // Redirige al usuario a la página de inicio de sesión
        this.router.navigate(['/auth/signin']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
        // Opcional: Redirige aunque haya un error
        this.router.navigate(['/auth/signin']);
      }
    });
  }
}
