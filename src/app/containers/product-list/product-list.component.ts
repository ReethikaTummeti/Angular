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
import { PaginationService } from 'src/app/services/pagination.service';

import { ProductType } from 'src/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductService],
}) //implements OnInit, OnDestroy
export class ProductListComponent {
  // pager object
  pager: any = {};
  // paged items
  pagedItems!: any[];
  // code!: string;
  pList: ProductType[] = [];
  // currency$!: Subscription; //1st method
  // destroyRef = inject(DestroyRef); //2nd method
  curr$!: Observable<string>;
  product$!: Observable<ProductType[]>;
  query = '';
  SortByValue = 'productName';
  constructor(
    private productService: ProductService,
    private currencyService: CurrencyService,
    private paginationService: PaginationService,
    private router: Router
  ) {
    this.curr$ = this.currencyService.currencyObservable;
    this.product$ = this.productService.getProducts();
    console.log('----------------product$:', this.product$);
    // initialize to page 1
    this.setPage(1);
  }
  // sortProductByPrice(option) {
  //   if (option.value == 'l2h') {
  //     this.product$.sort((a, b) => Number(a.price) - Number(b.price));
  //   } else if (option.value == 'h2l') {
  //     this.product$.sort((a, b) => Number(b.price) - Number(a.price));
  //   }
  // }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.paginationService.getPager(this.pList.length, page);

    // get current page of items
    this.pagedItems = this.pList.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
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
    console.log('in getData Function:');
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
    this.router.navigateByUrl('/cart');
  }
  updatePrice() {
    const product = this.pList[0];
    product.productSalePrice = 800;
    this.pList = [{ ...product }, this.pList[1]];
  }
  detectChangeDetection() {
    console.log('product list change detected');
    console.log('sortByvalue: ', this.SortByValue);
  }
}
