/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AmUserInfo } from '../models/am-user-info';
import { AmUserInfoResponse } from '../models/am-user-info-response';
import { AmUserListResponse } from '../models/am-user-list-response';


/**
 * All user related methods
 */
@Injectable({
  providedIn: 'root',
})
export class AmUserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllUsers
   */
  static readonly GetAllUsersPath = '/api/access-management/users';

  /**
   * Get all users.
   *
   * This is a method for retrieving all users
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AmUserListResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AmUserService.GetAllUsersPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AmUserListResponse>;
      })
    );
  }

  /**
   * Get all users.
   *
   * This is a method for retrieving all users
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params?: {
  },
  context?: HttpContext

): Observable<AmUserListResponse> {

    return this.getAllUsers$Response(params,context).pipe(
      map((r: StrictHttpResponse<AmUserListResponse>) => r.body as AmUserListResponse)
    );
  }

  /**
   * Path part for operation createUser
   */
  static readonly CreateUserPath = '/api/access-management/users';

  /**
   * Create user.
   *
   * This is a method for creating a user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser$Response(params: {

    /**
     * This is the object for creating a User
     */
    body: AmUserInfo
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AmUserInfoResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AmUserService.CreateUserPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AmUserInfoResponse>;
      })
    );
  }

  /**
   * Create user.
   *
   * This is a method for creating a user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser(params: {

    /**
     * This is the object for creating a User
     */
    body: AmUserInfo
  },
  context?: HttpContext

): Observable<AmUserInfoResponse> {

    return this.createUser$Response(params,context).pipe(
      map((r: StrictHttpResponse<AmUserInfoResponse>) => r.body as AmUserInfoResponse)
    );
  }

  /**
   * Path part for operation getUser
   */
  static readonly GetUserPath = '/api/access-management/users/{id}';

  /**
   * Get user.
   *
   * This is a method for retrieving information about the user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUser$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AmUserInfoResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AmUserService.GetUserPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AmUserInfoResponse>;
      })
    );
  }

  /**
   * Get user.
   *
   * This is a method for retrieving information about the user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUser(params: {
    id: number;
  },
  context?: HttpContext

): Observable<AmUserInfoResponse> {

    return this.getUser$Response(params,context).pipe(
      map((r: StrictHttpResponse<AmUserInfoResponse>) => r.body as AmUserInfoResponse)
    );
  }

  /**
   * Path part for operation updateUser
   */
  static readonly UpdateUserPath = '/api/access-management/users/{id}';

  /**
   * Update user.
   *
   * This is a method for updating a user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: {
    id: number;

    /**
     * This is the object for updating a user
     */
    body: AmUserInfo
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AmUserInfoResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AmUserService.UpdateUserPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AmUserInfoResponse>;
      })
    );
  }

  /**
   * Update user.
   *
   * This is a method for updating a user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser(params: {
    id: number;

    /**
     * This is the object for updating a user
     */
    body: AmUserInfo
  },
  context?: HttpContext

): Observable<AmUserInfoResponse> {

    return this.updateUser$Response(params,context).pipe(
      map((r: StrictHttpResponse<AmUserInfoResponse>) => r.body as AmUserInfoResponse)
    );
  }

  /**
   * Path part for operation deleteUser
   */
  static readonly DeleteUserPath = '/api/access-management/users/{id}';

  /**
   * Delete user.
   *
   * This is a method for deleting a user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AmUserService.DeleteUserPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete user.
   *
   * This is a method for deleting a user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: {
    id: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.deleteUser$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
