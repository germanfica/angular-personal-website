import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { ContactCardComponent } from '@app/contact-card/components/contact-card/contact-card.component';

@Injectable({
  providedIn: 'root'
})
export class ContactCardDialogService implements OnDestroy {
  private dialogRef: MatDialogRef<ContactCardComponent> | null = null;
  private destroy$ = new Subject<void>();
  private _hasUnsavedChanges = new BehaviorSubject<boolean>(false);
  private _clickedOutside = new BehaviorSubject<boolean>(false);
  private _pressedEscape = new BehaviorSubject<boolean>(false);

  constructor(private dialog: MatDialog) { }

  // Getter para hasUnsavedChanges
  get hasUnsavedChanges(): Observable<boolean> {
    return this._hasUnsavedChanges.asObservable(); // Si se utiliza este no olvidar de desuscribirse
    //return this._hasUnsavedChanges.asObservable().pipe(first());
  }

  get clickedOutside(): Observable<boolean> {
    return this._clickedOutside.asObservable();
  }

  get pressedEscape(): Observable<boolean> {
    return this._pressedEscape.asObservable();
  }

  // Setter para hasUnsavedChanges
  setHasUnsavedChanges(value: boolean) {
    this._hasUnsavedChanges.next(value);
  }

  openDialog(data?: any): MatDialogRef<ContactCardComponent> {
    this.dialogRef = this.dialog.open(ContactCardComponent, {
      data: data,
      height: '100%',
      width: '654px',
      disableClose: true,  // Esto evitará que se cierre al presionar 'Escape' o al hacer clic fuera
    });

    this.dialogRef.backdropClick().pipe(takeUntil(this.destroy$)).subscribe(() => {
      console.log('Clicked outside of the dialog');
      this._clickedOutside.next(true);
      //this.closeDialog();
    });

    this.dialogRef.keydownEvents().pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (event.key === "Escape") {
        console.log('Escape key pressed');
        this._pressedEscape.next(true);
        //this.closeDialog();
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
    if (this._hasUnsavedChanges.getValue()) {
      // don't close (prevent close)
      console.log(`hasUnsavedChanges: ${this._hasUnsavedChanges.getValue()}`);
    } else {
      // close
      console.log(`hasUnsavedChanges: ${this._hasUnsavedChanges.getValue()}`);
      this.reset();
      this.dialogRef?.close();
      this.dialogRef = null;
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ensure to reset to default values when closing the dialog
  private reset(): void {
    this.setHasUnsavedChanges(false); // reset to default
    //this._clickedOutside.next(false); // reset to default, don't use it (recursive overflow, maximum call stack size exceeded)
    //this._pressedEscape.next(false); // reset to default, don't use it (recursive overflow, maximum call stack size exceeded)
  }
}
