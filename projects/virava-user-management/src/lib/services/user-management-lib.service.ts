import { Injectable, Inject } from '@angular/core';

import { UserManagementModuleConfig } from '../models/user-management-lib-config';

@Injectable()
export class UserManagementServiceLib {
  constructor(@Inject('config') private config: UserManagementModuleConfig) {}

  get libConfig() {
    console.log(this.config);

    return this.config;
  }
}
