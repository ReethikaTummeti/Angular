import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversion',
})
export class ConversionPipe implements PipeTransform {
  transform(value: number, code: string = 'INR') {
    if (isNaN(value)) return null;
    else {
      console.log(code);
      // switch (code) {
      //   case 'USD':
      //     return (value *= 0.012);
      //   case 'EUR':
      //     return (value *= 0.011);
      //   case 'GBP':
      //     return (value *= 0.0096);
      //   default:
      //     return value;
      // }

      const rates = JSON.parse(
        localStorage.getItem('currencyValues') as string
      );
      return rates[code] * value;
    }
  }
}
