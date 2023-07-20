import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GridAllModule, GridModule } from '@syncfusion/ej2-angular-grids';

import { MaterialModule } from './material/material.module';

import { LibRoutingModule } from './user-management-lib-routing.module';

import { UsersUpdateComponent } from './components/users-update/users-update.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { UsersListingComponent } from './components/users-listing/users-listing.component';
import { DataGridComponent } from './components/data-grid/data-grid.component';

import { UserManagementServiceLib } from './services/user-management-lib.service';

import { UserManagementModuleConfig } from './models/user-management-lib-config';

@NgModule({
  declarations: [
    UsersListingComponent,
    DataGridComponent,
    UsersUpdateComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    GridAllModule,
    LibRoutingModule,
    GridModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [UsersListingComponent],
})
export class UserManagementModuleLib {
  static forRoot(
    config: UserManagementModuleConfig
  ): ModuleWithProviders<UserManagementModuleLib> {
    return {
      ngModule: UserManagementModuleLib,
      providers: [
        UserManagementServiceLib,
        { provide: 'config', useValue: config },
      ],
    };
  }
}
