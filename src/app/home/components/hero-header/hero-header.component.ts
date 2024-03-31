import { ViewportScroller, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss']
})
export class HeroHeaderComponent implements OnInit {
  isServer: boolean;

  constructor(private scroller: ViewportScroller, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isServer = isPlatformServer(this.platformId);
  }

  ngOnInit(): void {
  }

  goLatestWorks() {
    this.scroller.scrollToAnchor("latest-works");
  }

}
