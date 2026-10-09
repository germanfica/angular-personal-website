import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactCardDialogService {
  private readonly visibleSubject = new BehaviorSubject<boolean>(false);
  readonly visible$: Observable<boolean> = this.visibleSubject.asObservable();

  get isOpen(): boolean { return this.visibleSubject.value; }
  private hasUnsavedChanges = false;

  open(): void {
    if (this.isOpen) return;
    this.hasUnsavedChanges = false;
    this.visibleSubject.next(true);
  }

  close(): void {
    if (!this.isOpen) return;
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
