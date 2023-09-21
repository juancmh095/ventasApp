
import {Injectable} from '@angular/core';
import {HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import { UtilsService } from 'src/services/utils.service';



@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(public _utils:UtilsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
          this._utils.stopSpinner()
          this._utils.toast(error.error.message,'danger');
        } else {
          // backend error

          this._utils.stopSpinner()
          this._utils.toast(error.message,'danger');
        }

        // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.

        return throwError(errorMessage);
      })
    );
  }
}
