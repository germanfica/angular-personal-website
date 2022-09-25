import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule } from '@app/form-field/form-field.module';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ButtonModule } from '@app/button/button.module';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { api } from 'src/environments/environment.api';


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
    ButtonModule,
    /* Form module */
    // FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: api.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ]
})
export class ContactCardModule { }
