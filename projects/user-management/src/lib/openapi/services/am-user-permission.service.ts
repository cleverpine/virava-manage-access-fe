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

import { AmResourcePermission } from '../models/am-resource-permission';


/**
 * All user permission related methods
 */
@Injectable({
  providedIn: 'root',
})
export class AmUserPermissionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation assignPermission
   */
  static readonly AssignPermissionPath = '/api/access-management/users/{userId}/permission/{permissionId}';

  /**
   * Assign permission to user.
   *
   * This is a method for assigning a permission to a user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `assignPermission()` instead.
   *
   * This method doesn't expect any request body.
   */
  assignPermission$Response(params: {
    userId: number;
    permissionId: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AmUserPermissionService.AssignPermissionPath, 'post');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.path('permissionId', params.permissionId, {});
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
   * Assign permission to user.
   *
   * This is a method for assigning a permission to a user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `assignPermission$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  assignPermission(params: {
    userId: number;
    permissionId: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.assignPermission$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation assignResourcePermission
   */
  static readonly AssignResourcePermissionPath = '/api/access-management/users/{userId}/resource/{resourceName}';

  /**
   * Assign resource permission to user.
   *
   * This is a method for assigning a resource permission to a user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `assignResourcePermission()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  assignResourcePermission$Response(params: {
    userId: number;
    resourceName: string;

    /**
     * This is the request body for assigning a resource permission to a user
     */
    body?: AmResourcePermission
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AmUserPermissionService.AssignResourcePermissionPath, 'post');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.path('resourceName', params.resourceName, {});
      rb.body(params.body, 'application/json');
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
   * Assign resource permission to user.
   *
   * This is a method for assigning a resource permission to a user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `assignResourcePermission$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  assignResourcePermission(params: {
    userId: number;
    resourceName: string;

    /**
     * This is the request body for assigning a resource permission to a user
     */
    body?: AmResourcePermission
  },
  context?: HttpContext

): Observable<void> {

    return this.assignResourcePermission$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
