/* tslint:disable */
/* eslint-disable */
import { ErrorData } from './error-data';

/**
 * This is the response object in case of errors, compliant with RFC7807
 */
export interface ErrorResponse {
  error?: ErrorData;
}
