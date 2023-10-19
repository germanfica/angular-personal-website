import { Injectable } from '@angular/core';
import { ContactCardDialogService } from './contact-card-dialog.service';
import { ConfirmationDialogService } from './confirmation-dialog.service';
import { Subscription, skip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactCardDialogManagerService {
  private hasConfirmedSubscription?: Subscription;
  private hasUnsavedChangesSubscription?: Subscription;
  private contactCardClickedOutsideSubscription?: Subscription;
  private contactCardPressedEscapeSubscription?: Subscription;
  private hasConfirmed: boolean = false;
  private hasUnsavedChanges: boolean = false;

  constructor(private contactCardDialog: ContactCardDialogService, private confirmationDialog: ConfirmationDialogService) {
    //console.log("INICIALIZANDO SERVICIO ContactCardDialogManagerService...")
    // Suscripción a hasUnsavedChangesSubscription
    this.hasUnsavedChangesSubscription = this.contactCardDialog.hasUnsavedChanges.pipe(skip(1)).subscribe(res => {
      this.hasUnsavedChanges = res;
      console.log(`hasUnsavedChanges: ${res}`);
    });
    // Suscripción a hasConfirmedSubscription
    this.hasConfirmedSubscription = this.confirmationDialog.hasConfirmed.pipe(skip(1)).subscribe(res => {
      this.hasConfirmed = res;
      console.log("Settt en cormmmmm!!!!!");
      this.closeConfirmation(); // only here
    });
    // Suscripción a contactCardClickedOutside
    this.contactCardClickedOutsideSubscription = this.contactCardDialog.clickedOutside.pipe(skip(1)).subscribe(res => {
      console.log(`Clicked outside: ${res}`);
      if (res && this.hasUnsavedChanges) {
        this.openConfirmationDialog();
      } else {
        this.contactCardDialog.closeDialog();
        console.log("CERRANDO 2");
      }
    });
    // Suscripción a contactCardPressedEscape
    this.contactCardPressedEscapeSubscription = this.contactCardDialog.pressedEscape.pipe(skip(1)).subscribe(res => {
      console.log(`Escape key pressed: ${res}`);
      if (res && this.hasUnsavedChanges) {
        this.openConfirmationDialog();
      } else {
        this.contactCardDialog.closeDialog();
        console.log("CERRANDO 2");
      }
    });
  }

  open(): void {
    this.contactCardDialog.openDialog();
  }

  close(): void {
    //this.unsubscribe();
    this.openConfirmationDialog();
    this.contactCardDialog.closeDialog();
  }

  setHasUnsavedChanges(value: boolean) {
    this.contactCardDialog.setHasUnsavedChanges(value);
  }

  private openConfirmationDialog() {
    console.log(`_hasUnsavedChanges: ${this.hasUnsavedChanges}`);
    if (this.hasUnsavedChanges) {
      console.log("ABRIENDO DIALOG!!!");
      this.confirmationDialog.openDialog();
    }
  }

  private closeConfirmation(): void {
    console.log("HOLAAA!!!!!!!!!!!!!!");
    console.log(`_hasConfirmed: ${this.hasConfirmed}`);
    if (this.hasConfirmed) {
      console.log("CERRANDO TODOS LOS DIALOGOS!!!");
      //this.unsubscribe(); // don't use it here
      this.setHasUnsavedChanges(false);
      this.confirmationDialog.closeDialog();
      this.contactCardDialog.closeDialog();
    }
  }

  // Este servicio no tiene un "alcance limitado" por lo que no es necesario
  private unsubscribe(): void {
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
    if (this.contactCardClickedOutsideSubscription) {
      this.contactCardClickedOutsideSubscription.unsubscribe();
    }
    if (this.contactCardPressedEscapeSubscription) {
      this.contactCardPressedEscapeSubscription.unsubscribe();
    }
  }
}
