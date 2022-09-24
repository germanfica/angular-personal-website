import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { ContactCardModule } from '@app/contact-card/contact-card.module';



@NgModule({
  declarations: [
    DialogComponent
  ],
  exports: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContactCardModule
  ]
})
export class DialogModule { }
