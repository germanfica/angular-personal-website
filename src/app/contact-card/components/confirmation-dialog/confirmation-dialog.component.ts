import { Component } from '@angular/core';
import { ConfirmationDialogService } from '@app/contact-card/services/confirmation-dialog.service';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>¿Estás seguro?</h1>
    <div mat-dialog-content>Tienes cambios sin guardar. ¿Seguro que quieres salir?</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No, quiero seguir escribiendo...</button>
      <button mat-button cdkFocusInitial (mousedown)="onYesClick($event)">Sí</button>
    </div>
  `,
})
export class ConfirmationDialogComponent {
  constructor(private dialog: ConfirmationDialogService) { }

  onNoClick(): void {
    this.dialog.closeDialog();
  }

  onYesClick(event: MouseEvent): void {
    event.preventDefault();
    // Aquí puedes implementar la lógica para el botón de confirmación que se mantiene presionado durante 2 segundos.
    this.dialog.setHasConfirmed(true);
    console.log(`setHasConfirmed: ${true}`);
  }
}
