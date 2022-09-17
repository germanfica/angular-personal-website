import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoundedButtonComponent } from './components/rounded-button/rounded-button.component';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { github, linkedin, youtube } from 'ngx-bootstrap-icons';
import { PreviewCardComponent } from './components/preview-card/preview-card.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { TextareaFieldComponent } from './components/textarea-field/textarea-field.component';
// Select some icons (use an object, not an array)
const icons = {
  github,
  linkedin,
  youtube
};



@NgModule({
  declarations: [
    NavbarComponent,
    RoundedButtonComponent,
    SocialMediaComponent,
    PreviewCardComponent,
    ContactFormComponent,
    ContactCardComponent,
    InputFieldComponent,
    TextareaFieldComponent
  ],
  exports: [
    NavbarComponent,
    RoundedButtonComponent,
    SocialMediaComponent,
    PreviewCardComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    NgxBootstrapIconsModule.pick(icons),
    ReactiveFormsModule
  ]
})
export class SharedModule { }
