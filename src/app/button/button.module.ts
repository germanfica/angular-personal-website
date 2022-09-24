import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundedButtonComponent } from './components/rounded-button/rounded-button.component';



@NgModule({
  declarations: [
    RoundedButtonComponent
  ],
  exports: [
    RoundedButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ButtonModule { }
