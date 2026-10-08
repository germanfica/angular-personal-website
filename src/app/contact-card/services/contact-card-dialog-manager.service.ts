import { Inject, Injectable } from '@angular/core';
import { CONTACT_CARD_DIALOG, ContactCardDialogPort } from './contact-card-dialog.port';

// Mantiene intacta la API que consume ContactCardComponent.
// Se proporciona en el NgModule seleccionado, no en root.
@Injectable()
export class ContactCardDialogManagerService {
  constructor(@Inject(CONTACT_CARD_DIALOG) private dialog: ContactCardDialogPort) {}

  open(): void { this.dialog.open(); }
  close(): void { this.dialog.close(); }
  setHasUnsavedChanges(value: boolean): void {
    this.dialog.setHasUnsavedChanges(value);
  }
}
