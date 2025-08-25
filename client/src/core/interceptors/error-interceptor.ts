import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject as angularInject, inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notify = inject(NotificationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modelStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors.hasOwnProperty(key)) {
                  modelStateErrors.push(error.error.errors[key]);
                }
              }
              throw modelStateErrors.flat();
            } else {
              notify.show('error', error.status, error.error);
            }
            break;
          case 401:
            notify.show('error', error.status, error.error);
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = {
              state: { error: error.error },
            };
            router.navigateByUrl('/server-error', navigationExtras);
            console.log(navigationExtras);
            break;
          default:
            notify.show('error', 'Something went wrong', 'Unknown error');
            break;
        }
      }
      return throwError(() => error);
    })
  );
};
