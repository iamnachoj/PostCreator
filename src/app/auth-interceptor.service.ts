import {HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {tap} from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = request.clone({headers: request.headers.append('Auth', 'XWZ')});
    return (next.handle(modifiedRequest).pipe(tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log('Response arrived. Body data:');
          console.log(event.body);
        }
      }
    )));
  }
}
