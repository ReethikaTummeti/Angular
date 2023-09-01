import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('request intercepted:', request.url);
    this.loaderService.showLoader();
    return next
      .handle(request)
      .pipe(finalize(() => this.loaderService.hideLoader()));
  }
}
