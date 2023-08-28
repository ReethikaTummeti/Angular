import { Directive, HostListener } from '@angular/core';

@Directive({
  //generice selector--the behaviour is applied to all the img elements by default

  selector: 'img',
})
export class ImgFallbackDirective {
  constructor() {}
  @HostListener('error', ['$event'])
  switchToFallback(event: Event) {
    const imgTag = event.target as HTMLImageElement;
    imgTag.src =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&usqp=CAU';
  }
}
