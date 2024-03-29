import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactCardDialogManagerService } from '@app/contact-card/services/contact-card-dialog-manager.service';
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
  loading: boolean = false;
  success: boolean = false;
  error: boolean = false;
  showRecaptcha: boolean = false;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private contactCardDialog: ContactCardDialogManagerService) { }

  ngOnInit(): void {
    this.buildForm();

    // Suscribirse a los cambios del formulario
    this.form.valueChanges.subscribe(() => {
      // Si el formulario ha cambiado y tiene algún valor, establecer hasUnsavedChanges a true
      // Si no tiene valores, establecer hasUnsavedChanges a false
      if (Object.values(this.form.value).some(field => field !== '')) {
        this.contactCardDialog.setHasUnsavedChanges(true);
      } else {
        this.contactCardDialog.setHasUnsavedChanges(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();  // Desuscribe todas las suscripciones
  }

  save(event: Event) {
    this.enableRecaptcha(); // Enable recaptcha
    console.log("Hi");
    console.log(this.form.value['name']);
    event.preventDefault();
    if (this.form.invalid) return;
    this.loading = true;
    this.error = false;

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
        // Establecer hasUnsavedChanges a false ya que los cambios se han guardado
        this.contactCardDialog.setHasUnsavedChanges(false);
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

  close(): void {
    this.contactCardDialog.close();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
      //recaptcha: ['', [Validators.required]], // Not required since the recaptcha control is added dynamically in enableRecaptcha()
    });
  }

  private enableRecaptcha() {
    this.showRecaptcha = true;
    if (this.form.contains('recaptcha')) console.log("El control 'recaptcha' YA EXISTE!!!");
    // Verificar si el control 'recaptcha' ya existe
    if (!this.form.contains('recaptcha')) {
      console.log("El control 'recaptcha', no existe, se procede a agregarlo.");
      this.form.addControl('recaptcha', new FormControl('', Validators.required));
    }
  }

  private formIsIncomplete(): boolean {
    // Determinar si el formulario está incompleto
    return this.name?.valid || this.email?.valid || this.subject?.valid || this.message?.valid || false;
  }
}
