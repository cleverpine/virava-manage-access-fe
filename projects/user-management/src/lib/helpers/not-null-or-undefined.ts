import { filter, Observable } from 'rxjs';

import { ErrorData } from '../openapi/models/error-data';

export const inputIsNotNullOrUndefined = <T>(input: {
  data?: T;
  error?: ErrorData;
}): input is NonNullable<{ data?: T; error?: ErrorData }> => {
  return input.data !== null && input.data !== undefined;
};

export const isNotNullOrUndefined = <T>(): ((
  source$: Observable<{ data?: T; error?: ErrorData }>,
) => Observable<NonNullable<{ data?: any; error?: ErrorData }>>) => {
  return (source$: Observable<{ data?: T; error?: ErrorData }>) => source$.pipe(filter(inputIsNotNullOrUndefined));
};
