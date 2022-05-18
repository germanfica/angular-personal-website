import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { HeroHeaderComponent } from './components/hero-header/hero-header.component';
import { LatestWorksComponent } from './components/latest-works/latest-works.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeroHeaderComponent,
    LatestWorksComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
