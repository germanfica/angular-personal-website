import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isSticky: boolean = false;  // Open/Closed Principle

  constructor() { }

  ngOnInit(): void {
  }
}
