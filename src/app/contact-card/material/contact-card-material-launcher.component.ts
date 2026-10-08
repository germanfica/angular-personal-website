import { Component } from '@angular/core';
import { ContactCardMaterialDialogService } from './contact-card-material-dialog.service';

@Component({
  selector: 'app-contact-dialog',
  standalone: false,
  template: ``
})
export class ContactCardMaterialLauncherComponent {
  constructor(public dialog: ContactCardMaterialDialogService) {}
}
