import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: false,
  template: `
    <h2 mat-dialog-title>¿Querés salir?</h2>
    <mat-dialog-content>Tenés cambios sin guardar.</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Seguir escribiendo</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Salir</button>
    </mat-dialog-actions>
  `
})
export class ConfirmationDialogComponent {}
