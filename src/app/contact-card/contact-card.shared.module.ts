import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule } from '@app/form-field/form-field.module';
import { ButtonModule } from '@app/button/button.module';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { api } from 'src/environments/environment.api';

import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { LoadingMessageComponent } from './components/loading-message/loading-message.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

@NgModule({
  declarations: [
    ContactCardComponent,
    SuccessMessageComponent,
    LoadingMessageComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    ButtonModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  exports: [ContactCardComponent],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: api.recaptcha.siteKey } as RecaptchaSettings
    }
  ]
})
export class ContactCardSharedModule {}
