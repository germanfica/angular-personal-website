import { Component, OnInit } from '@angular/core';
import { NavbarService } from '@app/layout/services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.updateNavbarState({ isSticky: false, navbarStyle: 'transparent' });
  }

}
