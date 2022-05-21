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

  isAlignImageLeft(): boolean {
    return this.alignImage == "left" ? true : false;
  }

  isAlignImageRight(): boolean {
    return this.alignImage == "right" ? true : false;
  }
}
