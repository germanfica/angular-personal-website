import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss']
})
export class PreviewCardComponent implements OnInit {

  @Input() alignImage: string;

  constructor() {
    this.alignImage = "right";
  }

  ngOnInit(): void {
  }

  getAlignImageLeft(): string {
    return this.alignImage == "left" ? 'show' : 'hide';
  }

  getAlignImageRight(): string {
    return this.alignImage == "right" ? 'show' : 'hide';
  }
}
