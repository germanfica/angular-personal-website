import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { HintDirective } from './directives/hint.directive';
import { ErrorDirective } from './directives/error.directive';

@NgModule({
  declarations: [
    InputFieldComponent,
    HintDirective,
    ErrorDirective,
  ],
  exports: [
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class FormFieldModule { }
