import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '@app/layout/services/navbar.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router, private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.updateNavbarState({ isSticky: false, navbarStyle: 'colored-pos-abs' });
  }

  back(): void {
    this.router.navigate(['/']);
  }
}
