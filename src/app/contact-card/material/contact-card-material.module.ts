import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ContactCardSharedModule } from '../contact-card.shared.module';
import { CONTACT_CARD_DIALOG } from '../services/contact-card-dialog.port';
import { ContactCardDialogManagerService } from '../services/contact-card-dialog-manager.service';
import { ContactCardMaterialDialogService } from './contact-card-material-dialog.service';
import { ContactCardMaterialLauncherComponent } from './contact-card-material-launcher.component';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@NgModule({
  declarations: [ContactCardMaterialLauncherComponent, ConfirmationDialogComponent],
  imports: [ContactCardSharedModule, MatDialogModule, MatButtonModule],
  exports: [ContactCardSharedModule, ContactCardMaterialLauncherComponent],
  providers: [
    ContactCardMaterialDialogService,
    ContactCardDialogManagerService,
    { provide: CONTACT_CARD_DIALOG, useExisting: ContactCardMaterialDialogService }
  ]
})
export class ContactCardMaterialModule {}
