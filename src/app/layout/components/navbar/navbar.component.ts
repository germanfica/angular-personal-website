// Import HostListener to listen for DOM events
import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isSticky: boolean = true;

  menuActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  // Lock scrolling when the menu is open
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event: any) {
    if (this.menuActive) {
      window.scrollTo(0, 0);
    }
  }

  toggleMenu(): void {
    console.log("toggleMenu!");
    this.menuActive = !this.menuActive;

    if (this.menuActive) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = 'auto';
    }
  }
}
