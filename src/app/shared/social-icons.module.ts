import { NgModule } from '@angular/core';
import {
  NgxBootstrapIconsModule,
  github,
  linkedin,
  youtube
} from 'ngx-bootstrap-icons';

const icons = { github, linkedin, youtube };

@NgModule({
  imports: [NgxBootstrapIconsModule.pick(icons)],
  exports: [NgxBootstrapIconsModule]
})
export class SocialIconsModule {}