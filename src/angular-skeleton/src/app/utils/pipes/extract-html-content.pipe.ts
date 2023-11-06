import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractHTMLContent',
  standalone: true,
  pure: true,
})
export class ExtractHTMLContentPipe implements PipeTransform {
  transform(html: string): any {
    const span = document.createElement('span');
    span.innerHTML = html;
    const text = span.textContent || span.innerText;
    span.remove();
    return text;
  }
}
