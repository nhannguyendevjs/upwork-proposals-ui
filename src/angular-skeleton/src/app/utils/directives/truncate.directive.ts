import { AfterViewInit, Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

export type DIRECTION = 'vertical' | 'horizontal';

/**
 * @see https://brianflove.com/2019-09-26/ellipsis-directive/
 */
@Directive({
  selector: '[truncate]',
  standalone: true,
  exportAs: 'truncate',
})
export class TruncateDirective implements AfterViewInit {
  #elementRef = inject(ElementRef) as ElementRef<HTMLElement>;

  @Input() suffix: string = '…';
  @Input() direction: DIRECTION = 'horizontal';

  get element() {
    return this.#elementRef.nativeElement;
  }

  innerText: string;
  arrText: string[];

  repairTruncate() {
    { // Update variables
      if (this.innerText === undefined)
        this.innerText = this.element.innerText.trim();
      this.element.innerText = this.innerText;
      this.arrText = this.innerText.split(' ');
    }

    // Update element CSS
    switch (this.direction) {
      case 'vertical':
        this.updateCssVertical();
        break;
      case 'horizontal':
        this.updateCssHorizontal();
        break;
      default:
        this.updateCssHorizontal();
        break;
    }
  }

  updateCssVertical() {
    this.element.style.whiteSpace = 'pre-wrap';
    this.element.style.overflow = 'hidden';
  }

  updateCssHorizontal() {
    this.element.style.whiteSpace = 'nowrap';
    this.element.style.overflow = 'hidden';
  }

  truncate() {
    if (this.element) {
      // Repair
      this.repairTruncate();

      // Truncate
      switch (this.direction) {
        case 'vertical':
          this.truncateVertical();
          break;
        case 'horizontal':
          this.truncateHorizontal();
          break;
        default:
          this.truncateHorizontal();
          break;
      }
    }
  }

  truncateVertical() {
    while (this.arrText.length > 0 && this.element.scrollHeight > this.element.clientHeight) {
      this.arrText.pop();
      this.element.innerText = `${this.arrText.join(' ')}${this.suffix}`;
    }
  }

  truncateHorizontal() {
    while (this.arrText.length > 0 && this.element.scrollWidth > this.element.clientWidth) {
      this.arrText.pop();
      this.element.innerText = `${this.arrText.join(' ')}…`;
    }
  }

  ngAfterViewInit() {
    this.truncate();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.truncate();
  }
}
