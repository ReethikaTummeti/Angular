import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from 'src/types';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], q: string) {
    console.log('value', value);
    if (!value) return null;
    if (!q) return value;
    console.log('query', q);
    return value.filter((item: ProductType) => item['productName'].includes(q));
  }
}
