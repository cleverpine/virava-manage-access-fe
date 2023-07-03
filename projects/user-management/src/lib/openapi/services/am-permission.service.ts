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

import { AmCreatePermissionRequest } from '../models/am-create-permission-request';
import { AmPermissionListResponse } from '../models/am-permission-list-response';
import { AmPermissionResponse } from '../models/am-permission-response';


/**
 * All permission related methods
 */
@Injectable({
  providedIn: 'root',
})
export class AmPermissionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPermissions
   */
  static readonly GetPermissionsPath = '/api/access-management/permissions';

  /**
   * Get all permissions.
   *
   * This is a method for retrieving all permissions
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPermissions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPermissions$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AmPermissionListResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AmPermissionService.GetPermissionsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AmPermissionListResponse>;
      })
    );
  }

  /**
   * Get all permissions.
   *
   * This is a method for retrieving all permissions
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPermissions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPermissions(params?: {
  },
  context?: HttpContext

): Observable<AmPermissionListResponse> {

    return this.getPermissions$Response(params,context).pipe(
      map((r: StrictHttpResponse<AmPermissionListResponse>) => r.body as AmPermissionListResponse)
    );
  }

  /**
   * Path part for operation createPermission
   */
  static readonly CreatePermissionPath = '/api/access-management/permissions';

  /**
   * Create permission.
   *
   * This is a method for creating a permission
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPermission()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPermission$Response(params: {

    /**
     * Request body for creating a permission
     */
    body: AmCreatePermissionRequest
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AmPermissionResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AmPermissionService.CreatePermissionPath, 'post');
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
        return r as StrictHttpResponse<AmPermissionResponse>;
      })
    );
  }

  /**
   * Create permission.
   *
   * This is a method for creating a permission
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createPermission$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPermission(params: {

    /**
     * Request body for creating a permission
     */
    body: AmCreatePermissionRequest
  },
  context?: HttpContext

): Observable<AmPermissionResponse> {

    return this.createPermission$Response(params,context).pipe(
      map((r: StrictHttpResponse<AmPermissionResponse>) => r.body as AmPermissionResponse)
    );
  }

}
