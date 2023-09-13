import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(value: any, propName: string): any {
    console.log('propname', propName);
    return value.sort((a: any, b: any) => {
      if (a[propName] > b[propName]) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}
