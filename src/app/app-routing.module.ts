import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { CheckoutComponent } from './containers/checkout/checkout.component';
import { ErrorPageComponent } from './containers/error-page/error-page.component';

const routes: Routes = [
  //abc.com
  { path: '', component: TestComponent },
  //abc.com/products
  { path: 'products', component: ProductListComponent },
  //abc.com/checkout
  { path: 'checkout', component: CheckoutComponent },
  //404 page ---this should always be the last one to be declared
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [
    //component, directive, pipe, module can be exported
    RouterModule,
  ],
})
export class AppRoutingModule {}
