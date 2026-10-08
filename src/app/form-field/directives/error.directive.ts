import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appError]',
  standalone: false
})
export class ErrorDirective implements OnInit {
  textContent: string = '';

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.textContent = this.el.nativeElement.textContent;
  }
}
