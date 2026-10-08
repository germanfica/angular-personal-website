import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContactCardDialogPort } from '../services/contact-card-dialog.port';

@Injectable()
export class ContactCardNativeDialogService implements ContactCardDialogPort {
  private readonly visibleSubject = new BehaviorSubject<boolean>(false);
  readonly visible$: Observable<boolean> = this.visibleSubject.asObservable();

  get isOpen(): boolean { return this.visibleSubject.value; }
  private hasUnsavedChanges = false;

  open(): void {
    this.visibleSubject.next(true);
  }

  close(): void {
    if (this.hasUnsavedChanges) {
      // El cierre proviene de eventos de usuario en el navegador.
      if (typeof window === 'undefined' || !window.confirm('Tenés cambios sin guardar. ¿Querés salir?')) {
        return;
      }
    }
    this.hasUnsavedChanges = false;
    this.visibleSubject.next(false);
  }

  setHasUnsavedChanges(value: boolean): void {
    this.hasUnsavedChanges = value;
  }
}
