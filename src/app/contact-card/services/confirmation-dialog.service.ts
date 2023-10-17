import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '@app/contact-card/components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService implements OnDestroy {
  private dialogRef: MatDialogRef<ConfirmationDialogComponent> | null = null;
  private destroy$ = new Subject<void>();
  private _hasConfirmed = new BehaviorSubject<boolean>(false);

  constructor(private dialog: MatDialog) { }

  // Getter para hasConfirmed
  get hasConfirmed(): Observable<boolean> {
    // return this._hasConfirmed.asObservable(); // Si se utiliza este no olvidar de desuscribirse
    return this._hasConfirmed.asObservable().pipe(first());
  }

  // Setter para hasConfirmed
  setHasConfirmed(value: boolean) {
    this._hasConfirmed.next(value);
  }

  openDialog(data?: any): MatDialogRef<ConfirmationDialogComponent> {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: data,
      //height: '100%',
      //width: '654px',
      disableClose: true,  // Esto evitará que se cierre al presionar 'Escape' o al hacer clic fuera
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

    // this.dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
    //   console.log('Dialog closed.');
    //   this.closeDialog();
    // });

    return this.dialogRef;
  }

  closeDialog(): void {
    console.log("Clicked in the closeDialog() method.");
    this.reset();
    this.dialogRef?.close();
    this.dialogRef = null;
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ensure to reset to default values when closing the dialog
  private reset(): void {
    this.setHasConfirmed(false); // reset to default
  }
}
