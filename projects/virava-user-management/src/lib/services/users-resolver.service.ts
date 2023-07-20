import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { AmUserListResponse } from '../openapi/models';
import { AmUserService } from '../openapi/services/am-user.service';

@Injectable({
  providedIn: 'root',
})
export class UsersResolverService implements Resolve<AmUserListResponse> {
  constructor(private usersService: AmUserService) {}

  resolve(): Observable<AmUserListResponse> {
    return this.usersService.getAllUsers();
  }
}
