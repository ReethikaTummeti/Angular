import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { CheckoutComponent } from './containers/checkout/checkout.component';
import { ErrorPageComponent } from './containers/error-page/error-page.component';
import { ProductDetailComponent } from './containers/product-detail/product-detail.component';
import { GithubSearchComponent } from './containers/github-search/github-search.component';
import { authGuard } from './services/auth.guard';
import { UiModule } from './ui/ui.module';

const routes: Routes = [
  //abc.com
  { path: '', component: TestComponent },
  //abc.com/detail
  { path: 'detail/:pid', component: ProductDetailComponent },
  //abc.com/github
  { path: 'github', component: GithubSearchComponent },
  //abc.com/products
  { path: 'products', component: ProductListComponent },
  //abc.com/checkout
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  //abc.com/user
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },

  //abc.com/orders
  {
    path: 'orders',
    loadChildren: () =>
      import('./user/orders/orders.module').then((m) => m.OrdersModule),
  },
  //404 page ---this should always be the last one to be declared
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [
    //component, directive, pipe, module can be exported
    RouterModule,
    UiModule,
  ],
})
export class AppRoutingModule {}
