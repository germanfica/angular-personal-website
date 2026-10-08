import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactCardSharedModule } from '../contact-card.shared.module';
import { CONTACT_CARD_DIALOG } from '../services/contact-card-dialog.port';
import { ContactCardDialogManagerService } from '../services/contact-card-dialog-manager.service';
import { ContactCardNativeDialogService } from './contact-card-native-dialog.service';
import { ContactCardNativeLauncherComponent } from './contact-card-native-launcher.component';

@NgModule({
  declarations: [ContactCardNativeLauncherComponent],
  imports: [CommonModule, ContactCardSharedModule],
  exports: [ContactCardSharedModule, ContactCardNativeLauncherComponent],
  providers: [
    ContactCardNativeDialogService,
    ContactCardDialogManagerService,
    { provide: CONTACT_CARD_DIALOG, useExisting: ContactCardNativeDialogService }
  ]
})
export class ContactCardNativeModule {}
