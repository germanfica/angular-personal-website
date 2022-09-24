import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '@core/services/contact.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  form: FormGroup = {} as FormGroup;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  close(): void {
    this.onClose.emit();
    console.log("CLOSE.");
  }

  save(event: Event) {
    console.log("Hi");
    console.log(this.form.value['name']);
    event.preventDefault();
    if (this.form.invalid) return;

    this.contactService.sendContact(
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
          throw err;
          return caught; // loop -> don't use it
        })
      )
      .subscribe(contact => {
        console.log(contact);
        console.log("Contact sended!");
      });
    console.log("Hii!!");
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
}
