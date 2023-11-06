import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export function handleError(err: HttpErrorResponse): Observable<never> {
  const errorMessage = `An error occurred: ${err.error.message}`;
  console.error(err);
  return throwError(() => errorMessage);
}
