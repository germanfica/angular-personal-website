import { Injectable } from '@angular/core';
import { ContactCardDialogService } from './contact-card-dialog.service';
import { ConfirmationDialogService } from './confirmation-dialog.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactCardDialogManagerService {
  private hasConfirmedSubscription?: Subscription;
  private hasUnsavedChangesSubscription?: Subscription;

  constructor(private contactCardDialog: ContactCardDialogService, private confirmationDialog: ConfirmationDialogService) { }

  open(): void {
    // Cancelar la suscripción anterior si existe
    // si bien no es necesario si se está utilizando el pipe first(),
    // sigue siendo una buena práctica desuscribirse para evitar
    // "efectos secundarios"
    if (this.hasUnsavedChangesSubscription) {
      this.hasUnsavedChangesSubscription.unsubscribe();
    }
    if (this.hasConfirmedSubscription) {
      this.hasConfirmedSubscription.unsubscribe();
    }

    this.contactCardDialog.openDialog();
    //this.confirmationDialog.openDialog();
    //this.setHasUnsavedChanges(true);

    this.contactCardDialog.setHasUnsavedChanges(false);

    this.hasUnsavedChangesSubscription = this.contactCardDialog.hasUnsavedChanges.subscribe(res => {
      console.log(`_hasUnsavedChanges: ${res}`);
    });
  }

  // Asegúrate de desuscribirte cuando el servicio ya no se necesite
  ngOnDestroy(): void {
    if (this.hasUnsavedChangesSubscription) {
      this.hasUnsavedChangesSubscription.unsubscribe();
    }
  }

  close(): void {
    this.contactCardDialog.closeDialog();
  }
}
