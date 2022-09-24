import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule } from '@app/form-field/form-field.module';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ButtonModule } from '@app/button/button.module';



@NgModule({
  declarations: [
    ContactCardComponent
  ],
  exports: [
    ContactCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    ButtonModule
  ]
})
export class ContactCardModule { }
