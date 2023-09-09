import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactCardComponent } from '@app/contact-card/components/contact-card/contact-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription(); // Mantener un registro de las suscripciones para evitar efectos secundarios

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();  // Desuscribe todas las suscripciones
  }

  openDialog() {
    const dialogRef = this.dialog.open(ContactCardComponent, {
      height: '100%',
      width: '654px',
    });

    const dialogRefSub = dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this.subscription.add(dialogRefSub);  // Agrega esta suscripción para desuscribirse luego
  }
}
