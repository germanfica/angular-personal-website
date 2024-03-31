import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss']
})
export class HeroHeaderComponent implements OnInit {

  constructor(private scroller: ViewportScroller) {
  }

  ngOnInit(): void {
  }

  goLatestWorks() {
    this.scroller.scrollToAnchor("latest-works");
  }

}
