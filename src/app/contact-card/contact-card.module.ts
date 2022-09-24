import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule } from '@app/form-field/form-field.module';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { SharedModule } from '@shared/shared.module';
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
    FormsModule,
    FormFieldModule,
    ButtonModule
  ]
})
export class ContactCardModule { }
