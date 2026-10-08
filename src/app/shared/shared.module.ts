import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocialIconsModule } from '@shared/social-icons.module';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { PreviewCardComponent } from './components/preview-card/preview-card.component';
import { ContentChildrenComp, Pane, Tab } from './components/tab-pane-example/tab-pane-example.component';

import { FormFieldModule } from '@app/form-field/form-field.module';
import { ButtonModule } from '@app/button/button.module';

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
    SocialIconsModule,
    ReactiveFormsModule,
    FormsModule,
    FormFieldModule,
    ButtonModule
  ]
})
export class SharedModule { }
