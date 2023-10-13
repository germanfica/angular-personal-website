import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContactCardComponent } from '@app/contact-card/components/contact-card/contact-card.component';

@Injectable({
  providedIn: 'root'
})
export class ContactCardDialogService implements OnDestroy {
  private dialogRef: MatDialogRef<ContactCardComponent> | null = null;
  private destroy$ = new Subject<void>();

  constructor(private dialog: MatDialog) { }

  openDialog(data?: any): MatDialogRef<ContactCardComponent> {
    this.dialogRef = this.dialog.open(ContactCardComponent, {
      data: data,
      height: '100%',
      width: '654px',
    });

    this.dialogRef.backdropClick().pipe(takeUntil(this.destroy$)).subscribe(() => {
      console.log('Clicked outside of the dialog');
      this.closeDialog();
    });

    this.dialogRef.keydownEvents().pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (event.key === "Escape") {
        console.log('Escape key pressed');
        this.closeDialog();
      }
    });

    this.dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      console.log('Dialog closed.');
      this.closeDialog();
    });

    return this.dialogRef;
  }

  closeDialog(): void {
    console.log("Clicked in the closeDialog() method.");
    this.dialogRef?.close();
    this.dialogRef = null;
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
