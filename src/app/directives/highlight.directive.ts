import { Directive,ElementRef, HostListener, } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseover') onMouseOver() {
    this.el.nativeElement.style.backgroundColor = 'green';
    this.el.nativeElement.style.color = 'white';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
    this.el.nativeElement.style.color = 'green';
  }

}
