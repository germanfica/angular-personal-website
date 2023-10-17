// Import HostListener to listen for DOM events
import { ViewportScroller } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ContactCardDialogManagerService } from '@app/contact-card/services/contact-card-dialog-manager.service';
import { ContactCardDialogService } from '@app/contact-card/services/contact-card-dialog.service';
import { NavbarService } from '@app/layout/services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isSticky: boolean = true;
  navbarStyle: 'transparent' | 'colored-pos-abs' | 'colored' = 'transparent';
  menuActive: boolean = false;

  private sub!: Subscription;

  constructor(private navbarService: NavbarService, private scroller: ViewportScroller, private contactCardDialog: ContactCardDialogManagerService) { }

  ngOnInit(): void {
    this.sub = this.navbarService.navbarState$.subscribe(state => {
      this.isSticky = state.isSticky;
      this.navbarStyle = state.navbarStyle;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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

  goLatestWorks() {
    this.scroller.scrollToAnchor("latest-works");
  }
  goAbout() {
    this.scroller.scrollToAnchor("about");
  }

  goFooter() {
    this.scroller.scrollToAnchor("footer");
  }

  openDialog() {
    this.contactCardDialog.open();
  }
}
