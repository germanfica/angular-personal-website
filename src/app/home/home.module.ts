import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { HeroHeaderComponent } from './components/hero-header/hero-header.component';
import { LatestWorksComponent } from './components/latest-works/latest-works.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { DialogModule } from '@app/dialog/dialog.module';
import { ButtonModule } from '@app/button/button.module';


@NgModule({
  declarations: [
    HomeComponent,
    HeroHeaderComponent,
    LatestWorksComponent,
    ProjectsComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    DialogModule,
    ButtonModule
  ]
})
export class HomeModule { }
