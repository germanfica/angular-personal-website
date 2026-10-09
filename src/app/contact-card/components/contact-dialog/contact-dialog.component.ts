import { Component, HostListener } from '@angular/core';
import { ContactCardDialogService } from '../../services/contact-card-dialog.service';

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
  styles: [`
    :host {
      .contact-backdrop {
        position: fixed;
        inset: 0;
        z-index: 1100;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.6);
        overflow-y: auto;
      }

      .contact-panel {
        width: min(654px, 100vw);
        max-height: 100dvh;
        overflow-y: auto;
      }
    }
  `]
})
export class ContactCardDialogComponent {
  constructor(public dialog: ContactCardDialogService) {}

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.dialog.isOpen) this.dialog.close();
  }
}
