import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductType } from 'src/types';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductService],
})
export class ProductListComponent implements OnInit {
  @Input({ required: true }) code!: string;
  pList: ProductType[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getData();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  // }

  getData() {
    this.productService.getProducts().subscribe(
      (data) => {
        console.log('success', data);
        this.pList = data;
      },
      (err) => {
        console.log('error', err);
      }
    );
  }

  addItem(data: any) {
    console.log('item added to the cart', data);
  }
  updatePrice() {
    const product = this.pList[0];
    product.productSalePrice = 800;
    this.pList = [{ ...product }, this.pList[1]];
  }
  detectChangeDetection() {
    console.log('product list change detected');
  }
}
