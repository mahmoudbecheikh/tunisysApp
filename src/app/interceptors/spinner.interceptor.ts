import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  totalRequests = 0;
  requestsCompleted = 0;

  constructor(private spinner: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    this.spinner.show();
    this.totalRequests++;

    return next.handle(request).pipe(
      finalize(() => {

        this.requestsCompleted++;

        console.log(this.requestsCompleted, this.totalRequests);

        if (this.requestsCompleted === this.totalRequests) {
          this.spinner.hide();
          this.totalRequests = 0; 
          this.requestsCompleted = 0;
        }
      })
    );
  }
}
