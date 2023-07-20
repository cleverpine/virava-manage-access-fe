import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { AmUserInfoResponse } from '../openapi/models';
import { AmUserService } from '../openapi/services/am-user.service';

@Injectable({
  providedIn: 'root',
})
export class SingleUserResolverService implements Resolve<AmUserInfoResponse> {
  constructor(private usersService: AmUserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<AmUserInfoResponse> {
    const userId = +route.params['userId'];
    const params = {
      id: userId,
    };

    return this.usersService.getUser(params);
  }
}
