import { Injectable, Injector } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter, take, takeUntil } from 'rxjs';
import { ContactCardComponent } from '../components/contact-card/contact-card.component';
import { ContactCardDialogPort } from '../services/contact-card-dialog.port';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable()
export class ContactCardMaterialDialogService implements ContactCardDialogPort {
  private dialogRef: MatDialogRef<ContactCardComponent> | null = null;
  private confirmationRef: MatDialogRef<ConfirmationDialogComponent> | null = null;
  private hasUnsavedChanges = false;

  constructor(private matDialog: MatDialog, private injector: Injector) {}

  open(): void {
    if (this.dialogRef) return;

    const ref = this.matDialog.open(ContactCardComponent, {
      injector: this.injector,
      height: '100%',
      width: '654px',
      maxWidth: '100vw',
      disableClose: true
    });
    this.dialogRef = ref;

    ref.backdropClick().pipe(takeUntil(ref.afterClosed())).subscribe(() => this.close());
    ref.keydownEvents().pipe(
      filter(event => event.key === 'Escape'),
      takeUntil(ref.afterClosed())
    ).subscribe(() => this.close());

    ref.afterClosed().pipe(take(1)).subscribe(() => {
      if (this.dialogRef === ref) {
        this.dialogRef = null;
        this.hasUnsavedChanges = false;
      }
    });
  }

  close(): void {
    if (!this.dialogRef || this.confirmationRef) return;
    if (!this.hasUnsavedChanges) {
      this.closeWithoutConfirmation();
      return;
    }

    const confirmation = this.matDialog.open(ConfirmationDialogComponent, {
      injector: this.injector,
      disableClose: true
    });
    this.confirmationRef = confirmation;
    confirmation.afterClosed().pipe(take(1)).subscribe(confirmed => {
      this.confirmationRef = null;
      if (confirmed === true) this.closeWithoutConfirmation();
    });
  }

  setHasUnsavedChanges(value: boolean): void {
    this.hasUnsavedChanges = value;
  }

  private closeWithoutConfirmation(): void {
    this.hasUnsavedChanges = false;
    this.dialogRef?.close();
    this.dialogRef = null;
  }
}
