import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  //navClass: string = "modal-visible";
  isVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  open() { this.isVisible = !this.isVisible ? true : false; }
  
  close() { this.isVisible = !this.isVisible ? true : false; }
}
