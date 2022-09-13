import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '@core/services/contact.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  //navClass: string = "modal-visible";
  isVisible: boolean = false;
  form: FormGroup = {} as FormGroup;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  open() { this.isVisible = !this.isVisible ? true : false; }

  close() { this.isVisible = !this.isVisible ? true : false; }

  save(event: Event) {
    event.preventDefault();
    if (this.form.invalid) return;

    this.contactService.sendContact(
      {
        name: this.form.value['name'],
        email: this.form.value['email'],
        subject: this.form.value['subject'],
        message: this.form.value['message']
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

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }
}
