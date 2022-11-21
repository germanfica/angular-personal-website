import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { HeroHeaderComponent } from './components/hero-header/hero-header.component';
import { LatestProjectsComponent } from './components/latest-projects/latest-projects.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { DialogModule } from '@app/dialog/dialog.module';
import { ButtonModule } from '@app/button/button.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    HomeComponent,
    HeroHeaderComponent,
    LatestProjectsComponent,
    ProjectsComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    DialogModule,
    ButtonModule,
    MatDialogModule
  ]
})
export class HomeModule { }
