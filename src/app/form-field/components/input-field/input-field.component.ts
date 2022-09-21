import { Component, ContentChildren, ElementRef, forwardRef, Input, OnInit, QueryList, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { HintDirective } from '@app/form-field/directives/hint.directive';

/** Possible types for the input field. */
export declare type InputFieldType = 'input' | 'textarea';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent implements OnInit, ControlValueAccessor {
  value: string = ''; // value for
  onChange: any = () => { };
  onTouched: any = () => { };
  onDisabled: any = () => { };
  disable: boolean = false;
  @Input() type: InputFieldType = 'input';
  @Input() label: string = 'Default Label';
  @ContentChildren(HintDirective, { descendants: true }) private arbitraryNestedHintDirectives!: QueryList<HintDirective>;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) { }
  writeValue(value: any): void {
    switch (this.type) {
      case 'input': {
        this.value = value;
        break;
      }
      case 'textarea': {
        this.value = value;
        break;
      }
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  registerOnDisabledChange(fn: any): void {
    this.onDisabled = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log(isDisabled);
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    // disable other components here
    this.disable = isDisabled
  }

  ngOnInit(): void {
  }

  change(value: any): void {
    this.onChange(value);
  }

  get serializedNestedTextContent(): string {
    return this.arbitraryNestedHintDirectives ? this.arbitraryNestedHintDirectives.map(p => p.textContent).join(', ') : '';
  }
}
