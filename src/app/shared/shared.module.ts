import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { github, linkedin, youtube } from 'ngx-bootstrap-icons';
import { PreviewCardComponent } from './components/preview-card/preview-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule } from '@app/form-field/form-field.module';
import { ContentChildrenComp, Pane, Tab } from './components/tab-pane-example/tab-pane-example.component';
import { ButtonModule } from '@app/button/button.module';
// Select some icons (use an object, not an array)
const icons = {
  github,
  linkedin,
  youtube
};



@NgModule({
  declarations: [
    SocialMediaComponent,
    PreviewCardComponent,
    Pane,
    Tab,
    ContentChildrenComp,
  ],
  exports: [
    SocialMediaComponent,
    PreviewCardComponent,
    Pane,
    Tab,
    ContentChildrenComp,
  ],
  imports: [
    CommonModule,
    NgxBootstrapIconsModule.pick(icons),
    ReactiveFormsModule,
    FormsModule,
    FormFieldModule,
    ButtonModule
  ]
})
export class SharedModule { }
