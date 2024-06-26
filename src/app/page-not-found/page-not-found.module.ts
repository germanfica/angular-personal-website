import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ButtonModule } from '@app/button/button.module';
import { LayoutModule } from '@app/layout/layout.module';


@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule,
    ButtonModule,
    LayoutModule
  ]
})
export class PageNotFoundModule { }
