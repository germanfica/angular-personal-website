import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoundedButtonComponent } from './components/rounded-button/rounded-button.component';
import { SocialMediaComponent } from './components/social-media/social-media.component';



@NgModule({
  declarations: [
    NavbarComponent,
    RoundedButtonComponent,
    SocialMediaComponent
  ],
  exports: [
    NavbarComponent,
    RoundedButtonComponent,
    SocialMediaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
