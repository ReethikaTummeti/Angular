import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  //value|discount:arg1:arg2
  transform(value: number, val2: number) {
    console.log('pipe invoked');
    console.log(value, val2);
    return ((value - val2) / value) * 100 + '%Off';
  }
}
