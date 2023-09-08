import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss']
})
export class PreviewCardComponent implements OnInit {

  @Input() alignImage: string = 'right';
  @Input() title: string = '';
  @Input() content: string = '';
  @Output() buttonClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  isAlignImageLeft(): boolean {
    return this.alignImage === 'left';
  }

  isAlignImageRight(): boolean {
    return this.alignImage === 'right';
  }

  onButtonClick(): void {
    this.buttonClicked.emit();
  }
}
