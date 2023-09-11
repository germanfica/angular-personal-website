import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactService } from '@core/services/contact.service';
import { Subscription, catchError } from 'rxjs';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription(); // Mantener un registro de las suscripciones
  form: FormGroup = {} as FormGroup;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  success: boolean = false;
  error: boolean = false;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService, public dialogRef: MatDialogRef<ContactCardComponent>) {
    dialogRef.backdropClick().subscribe(() => {
      console.log('Haz clickeado fuera del dialogo');
      // Aquí puedes hacer algo si el usuario hace clic fuera del diálogo
      sessionStorage.setItem("contactForm", JSON.stringify(this.form.value));
    });

    dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        console.log('Presionaste la tecla Escape');
        // Aquí puedes hacer algo si el usuario presiona la tecla Escape
        sessionStorage.setItem("contactForm", JSON.stringify(this.form.value));
      }
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.populateFormFromSession();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();  // Desuscribe todas las suscripciones
  }

  close(): void {
    sessionStorage.setItem("contactForm", JSON.stringify(this.form.value));
    console.table(this.form.value);
    //this.onClose.emit();
    console.log("CLOSE.");
  }

  save(event: Event) {
    console.log("Hi");
    console.log(this.form.value['name']);
    event.preventDefault();
    if (this.form.invalid) return;
    this.loading = true;
    this.error = false;

    sessionStorage.setItem("contactForm", JSON.stringify(this.form.value));

    const contactSubscription = this.contactService.sendContact(
      {
        name: this.form.value['name'],
        email: this.form.value['email'],
        subject: this.form.value['subject'],
        message: this.form.value['message'],
        "g-recaptcha-response": this.form.value['recaptcha']
      }
    )
      //Let's use a pipe to catch the error.
      .pipe(
        catchError((err, caught) => {
          this.loading = false; //Let's remove the loading in error case
          this.error = true;
          throw err;
          return caught; // loop -> don't use it
        })
      )
      .subscribe(contact => {
        console.log(contact);
        console.log("Contact sended!");
        this.loading = false; //Let's remove the loading in success case
        this.success = true;
      });
    console.log("Hii!!");
    this.subscription.add(contactSubscription);  // Agrega esta suscripción para desuscribirse luego

  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get subject() { return this.form.get('subject'); }
  get message() { return this.form.get('message'); }

  isNameRequired(): boolean {
    return this.name?.errors ? this.name?.errors?.['required'] : false;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
      recaptcha: ['', [Validators.required]],
    });
  }

  private populateFormFromSession() {
    const sessionData = JSON.parse(sessionStorage.getItem("contactForm") || "{}");
    console.table(sessionData);
    if (sessionData) {
      this.form.setValue(sessionData);
    }
  }
}
