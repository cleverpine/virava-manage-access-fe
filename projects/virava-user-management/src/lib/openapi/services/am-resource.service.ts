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

import { AmCreateResourceRequest } from '../models/am-create-resource-request';
import { AmResourceListResponse } from '../models/am-resource-list-response';
import { AmResourceResponse } from '../models/am-resource-response';


/**
 * All resource permissions related methods
 */
@Injectable({
  providedIn: 'root',
})
export class AmResourceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getUserResourcesByName
   */
  static readonly GetUserResourcesByNamePath = '/api/access-management/user/resource/{resourceName}';

  /**
   * Get user's resources by name.
   *
   * This is a method for retrieving all resources by name for a specific user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserResourcesByName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserResourcesByName$Response(params: {

    /**
     * The name of the resource
     */
    resourceName: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AmResourceListResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AmResourceService.GetUserResourcesByNamePath, 'get');
    if (params) {
      rb.path('resourceName', params.resourceName, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AmResourceListResponse>;
      })
    );
  }

  /**
   * Get user's resources by name.
   *
   * This is a method for retrieving all resources by name for a specific user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserResourcesByName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserResourcesByName(params: {

    /**
     * The name of the resource
     */
    resourceName: string;
  },
  context?: HttpContext

): Observable<AmResourceListResponse> {

    return this.getUserResourcesByName$Response(params,context).pipe(
      map((r: StrictHttpResponse<AmResourceListResponse>) => r.body as AmResourceListResponse)
    );
  }

  /**
   * Path part for operation getAllResources
   */
  static readonly GetAllResourcesPath = '/api/access-management/resources';

  /**
   * Get all resources.
   *
   * This is a method for retrieving all resources
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllResources()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllResources$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AmResourceListResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AmResourceService.GetAllResourcesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AmResourceListResponse>;
      })
    );
  }

  /**
   * Get all resources.
   *
   * This is a method for retrieving all resources
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllResources$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllResources(params?: {
  },
  context?: HttpContext

): Observable<AmResourceListResponse> {

    return this.getAllResources$Response(params,context).pipe(
      map((r: StrictHttpResponse<AmResourceListResponse>) => r.body as AmResourceListResponse)
    );
  }

  /**
   * Path part for operation createResource
   */
  static readonly CreateResourcePath = '/api/access-management/resources';

  /**
   * Create resource.
   *
   * This is a method for creating a resource
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createResource$Response(params: {

    /**
     * This is the object for creating a resource
     */
    body: AmCreateResourceRequest
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AmResourceResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AmResourceService.CreateResourcePath, 'post');
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
        return r as StrictHttpResponse<AmResourceResponse>;
      })
    );
  }

  /**
   * Create resource.
   *
   * This is a method for creating a resource
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createResource(params: {

    /**
     * This is the object for creating a resource
     */
    body: AmCreateResourceRequest
  },
  context?: HttpContext

): Observable<AmResourceResponse> {

    return this.createResource$Response(params,context).pipe(
      map((r: StrictHttpResponse<AmResourceResponse>) => r.body as AmResourceResponse)
    );
  }

  /**
   * Path part for operation deleteResource
   */
  static readonly DeleteResourcePath = '/api/access-management/resources/{id}';

  /**
   * Delete resource.
   *
   * This is a method for deleting a resource
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteResource$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AmResourceService.DeleteResourcePath, 'delete');
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
   * Delete resource.
   *
   * This is a method for deleting a resource
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteResource(params: {
    id: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.deleteResource$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
