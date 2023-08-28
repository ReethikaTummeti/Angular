import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ProductType } from 'src/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  code = 'USD';
  @Input({ required: true }) data!: ProductType;
  @Input({ required: true }) currencycode!: string;
  @Output() btnClick = new EventEmitter();
  notifyParent(event: any) {
    console.log(event);
    this.btnClick.emit({
      id: this.data.productId,
      name: this.data.productName,
    });
  }
  detectChangeDetection() {
    console.log('detected change in product');
  }
}
