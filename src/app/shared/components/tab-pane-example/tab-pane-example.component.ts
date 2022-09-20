import { Component, ContentChildren, Directive, ElementRef, HostListener, Input, OnInit, QueryList } from '@angular/core';

@Directive({ selector: 'pane' })
export class Pane implements OnInit {
  @Input() id!: string;
  textContent: string = '';

  constructor(private el: ElementRef) {
    // this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  ngOnInit(): void {
    // console.table(this.el.nativeElement);
    // console.table(this.el.nativeElement.firstChild);
    // console.table(this.el.nativeElement.innerText);
    // console.table(this.el.nativeElement.outerText);
    // console.table(this.el.nativeElement.textContent);
    // console.table(this.el.nativeElement.outerHTML);
    console.log(this.el.nativeElement.textContent); // Return the text content of an element:
    this.textContent = this.el.nativeElement.textContent;
  }
}

@Component({
  selector: 'tab',
  template: `
    <div class="top-level">Top level panes: {{serializedPanes}}</div>
    <div class="nested">Arbitrary nested panes: {{serializedNestedPanes}}</div>
    <div>{{serializedNestedTextContent}}</div>
  `
})
export class Tab {
  @ContentChildren(Pane) topLevelPanes!: QueryList<Pane>;
  @ContentChildren(Pane, { descendants: true }) arbitraryNestedPanes!: QueryList<Pane>;

  get serializedPanes(): string {
    return this.topLevelPanes ? this.topLevelPanes.map(p => p.id).join(', ') : '';
  }
  get serializedNestedPanes(): string {
    return this.arbitraryNestedPanes ? this.arbitraryNestedPanes.map(p => p.id).join(', ') : '';
  }
  get serializedNestedTextContent(): string {
    return this.arbitraryNestedPanes ? this.arbitraryNestedPanes.map(p => p.textContent).join(', ') : '';
  }
}

@Component({
  selector: 'example-app',
  template: `
  <pane id="16565">asd que onda jugares</pane>
    <tab>
      <pane id="16565">asd que onda jugares</pane>
      <pane id="2">asd</pane>
      <pane id="3" *ngIf="shouldShow">
        <tab>
          <pane id="3_1">asd</pane>
          <pane id="3_2">asd</pane>
        </tab>
      </pane>
    </tab>

    <button (click)="show()">Show 3</button>
  `,
})
export class ContentChildrenComp {
  shouldShow = false;

  show() {
    this.shouldShow = true;
  }
}