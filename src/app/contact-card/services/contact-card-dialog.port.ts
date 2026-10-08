import { InjectionToken } from '@angular/core';

/** Contrato compartido por las variantes nativa y Angular Material. */
export interface ContactCardDialogPort {
  open(): void;
  close(): void;
  setHasUnsavedChanges(value: boolean): void;
}

export const CONTACT_CARD_DIALOG = new InjectionToken<ContactCardDialogPort>('CONTACT_CARD_DIALOG');
