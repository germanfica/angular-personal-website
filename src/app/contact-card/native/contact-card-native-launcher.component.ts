import { Component, HostListener } from '@angular/core';
import { ContactCardNativeDialogService } from './contact-card-native-dialog.service';

@Component({
  selector: 'app-contact-dialog',
  standalone: false,
  template: `
    <div *ngIf="dialog.visible$ | async" class="contact-backdrop" (click)="dialog.close()">
      <section class="contact-panel" role="dialog" aria-modal="true"
        aria-label="Formulario de contacto" (click)="$event.stopPropagation()">
        <app-contact-card></app-contact-card>
      </section>
    </div>
  `,
  styleUrls: ['./contact-card-native-launcher.component.scss']
})
export class ContactCardNativeLauncherComponent {
  constructor(public dialog: ContactCardNativeDialogService) {}

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.dialog.isOpen) this.dialog.close();
  }
}
