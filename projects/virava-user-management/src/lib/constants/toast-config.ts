import { ToastModel } from '@syncfusion/ej2-notifications';

export const TOAST_CONFIG = {
  containerSelector: 'div.toast-container',
  defaultModel: {
    showCloseButton: true,
    position: {
      X: 'Right',
      Y: 'Top',
    },
    animation: {
      show: { effect: 'ZoomIn', duration: 500, easing: 'ease' },
      hide: { effect: 'ZoomOut', duration: 500, easing: 'ease' },
    },
    showProgressBar: false,
    timeOut: 4000,
    extendedTimeout: 0,
  } as ToastModel,
};
