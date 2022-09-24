import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  //navClass: string = "modal-visible";
  isVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  open() { this.isVisible = !this.isVisible ? true : false; }

  close() { this.isVisible = !this.isVisible ? true : false; }
}
