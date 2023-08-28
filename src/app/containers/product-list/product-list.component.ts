import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductType } from 'src/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductService],
}) //implements OnInit, OnDestroy
export class ProductListComponent {
  // code!: string;
  pList: ProductType[] = [];
  // currency$!: Subscription; //1st method
  // destroyRef = inject(DestroyRef); //2nd method
  curr$!: Observable<string>;
  product$!: Observable<ProductType[]>;
  constructor(
    private productService: ProductService,
    private currencyService: CurrencyService
  ) {
    this.curr$ = this.currencyService.currencyObservable;
    this.product$ = this.productService.getProducts();
  }

  ngOnInit(): void {
    this.getData();
    // this.currencyService.currencyObservable
    //   .pipe(takeUntilDestroyed(this.destroyRef)) //second method
    //   .subscribe((code) => (this.code = code));
  }

  // ngOnDestroy(): void {
  //   //1st method
  //   this.currency$.unsubscribe();
  //}

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
