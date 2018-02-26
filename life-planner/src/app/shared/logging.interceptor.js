import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercepted request ... ");

    // add a custom header
    const customReq = req.clone({
      headers: req.headers.set('app-language', 'it')
    });


    return next.handle(customReq).do(
      (ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          console.log('processing response', ev);
        }
      }).catch(response => {
      if (response instanceof HttpErrorResponse) {
        console.log('Processing http error', response);
      }

      return Observable.throw(response);
    });
  }
}
