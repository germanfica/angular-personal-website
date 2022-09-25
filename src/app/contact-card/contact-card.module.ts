import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule } from '@app/form-field/form-field.module';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ButtonModule } from '@app/button/button.module';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { api } from 'src/environments/environment.api';
import { MatDialogModule } from '@angular/material/dialog';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { LoadingMessageComponent } from './components/loading-message/loading-message.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ContactCardComponent,
    SuccessMessageComponent,
    LoadingMessageComponent
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
    MatDialogModule,
    MatProgressSpinnerModule,
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
