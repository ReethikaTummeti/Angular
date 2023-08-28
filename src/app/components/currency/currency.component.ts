import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
})
export class CurrencyComponent implements OnInit {
  codes = ['INR', 'EUR', 'USD', 'GBP'];
  // @Output() selectedCurrency = new EventEmitter();
  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    if (localStorage.getItem('currencyCodes')) {
      this.codes = JSON.parse(localStorage.getItem('currencyCodes') as string);
    } else this.getData();
  }
  getData() {
    this.currencyService.getForexData().subscribe(
      (data) => {
        console.log('success', data);
        this.codes = data.codes;
        localStorage.setItem('currencyCodes', JSON.stringify(this.codes));
        localStorage.setItem('currencyValues', JSON.stringify(data.rates));
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
  getSelectedCode(event: Event) {
    const ele = event.target as HTMLSelectElement;
    this.currencyService.updateCurrency(ele.value);
    // this.selectedCurrency.emit(ele.value);
    console.log(this.currencyService.getForexData());
  }
}
