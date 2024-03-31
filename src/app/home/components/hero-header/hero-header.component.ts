import { ViewportScroller } from '@angular/common';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss'],
  host: { ngSkipHydration: 'true' },
})
export class HeroHeaderComponent implements OnInit {

  constructor(private scroller: ViewportScroller, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Carga particlesJS solo en el lado del cliente
      particlesJS("particles-js", environment.particlesJSConfig);
    }
  }

  goLatestWorks() {
    this.scroller.scrollToAnchor("latest-works");
  }

}
