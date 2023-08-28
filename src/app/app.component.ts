import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  count: number | string = '6';
  currencyCode!: string;
  getCode(code: string) {
    this.currencyCode = code;
    // console.log(currencyCode);
  }
}
