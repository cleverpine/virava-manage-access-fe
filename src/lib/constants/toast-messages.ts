import { ToastModel } from '@syncfusion/ej2-angular-notifications';

export enum ToastTypes {
  Success = 'e-toast-success',
  Info = 'e-toast-info',
  Warning = 'e-toast-warning',
  Danger = 'e-toast-danger',
}

export interface IAppToastConfig {
  readonly containerSelector: string;
  readonly defaultModel: ToastModel;
}
