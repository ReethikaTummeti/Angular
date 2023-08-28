import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductType } from 'src/types';
// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts() {
    const url =
      'https://raw.githubusercontent.com/mdmoin7/Random-Products-Json-Generator/master/products.json';
    return this.http.get<ProductType[]>(url);
  }
}
