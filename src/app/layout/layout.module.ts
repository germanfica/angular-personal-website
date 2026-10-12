import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { list } from 'ngx-bootstrap-icons';
import { ContactCardModule } from '@app/contact-card/contact-card.module';
// Select some icons (use an object, not an array)
const icons = {
  list
};


@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxBootstrapIconsModule.pick(icons),
    ContactCardModule,
  ]
})
export class LayoutModule { }
