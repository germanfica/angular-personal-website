import { NgModule } from '@angular/core';
import {
  NgxBootstrapIconsModule,
  github,
  linkedin,
  youtube,
  list
} from 'ngx-bootstrap-icons';

const icons = { github, linkedin, youtube, list };

@NgModule({
  imports: [NgxBootstrapIconsModule.pick(icons)],
  exports: [NgxBootstrapIconsModule]
})
export class SocialIconsModule {}