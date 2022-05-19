import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoundedButtonComponent } from './components/rounded-button/rounded-button.component';



@NgModule({
  declarations: [
    NavbarComponent,
    RoundedButtonComponent
  ],
  exports: [
    NavbarComponent,
    RoundedButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
