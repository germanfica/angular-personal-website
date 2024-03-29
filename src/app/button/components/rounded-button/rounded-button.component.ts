import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rounded-button',
  templateUrl: './rounded-button.component.html',
  styleUrls: ['./rounded-button.component.scss']
})
export class RoundedButtonComponent implements OnInit {
  @Input() color: String;
  @Input() text: String;
  @Input() disabled: boolean = false;

  constructor() {
    this.color = "basic";
    this.text = "button";
  }

  ngOnInit(): void {
  }

  getColor(): string {
    if(this.disabled) return 'btn-disabled';
    switch (this.color) {
      case 'basic':
        return 'btn-solid';
      case 'primary':
        return 'btn-solid';
      case 'secondary':
        return 'btn-solid-secondary';
      default:
        return 'btn-solid';
    }
  }

}
