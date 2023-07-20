import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  errorHandler: (message: string) => void = (message: string) => {};
  successHandler: (message: string) => void = (message: string) => {};

  setErrorHandler(handler: (message: string) => void) {
    this.errorHandler = handler;
  }

  setSuccessHandler(handler: (message: string) => void) {
    this.successHandler = handler;
  }

  dispatchError(message: string) {
    this.errorHandler(message);
  }

  dispatchSuccess(message: string) {
    this.successHandler(message);
  }
}
