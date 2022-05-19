import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss']
})
export class HeroHeaderComponent implements OnInit {

  constructor(private scroller: ViewportScroller) { }

  ngAfterViewInit() {
    particlesJS("particles-js", environment.particlesJSConfig);
  }

  ngOnInit(): void {
  }

  goLatestWorks() {
    this.scroller.scrollToAnchor("latest-works");
  }

}
