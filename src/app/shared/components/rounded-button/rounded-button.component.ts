import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rounded-button',
  templateUrl: './rounded-button.component.html',
  styleUrls: ['./rounded-button.component.scss']
})
export class RoundedButtonComponent implements OnInit {
  @Input() color: String;
  @Input() text: String;

  constructor() {
    this.color = "basic";
    this.text = "button";
  }

  ngOnInit(): void {
  }

}
