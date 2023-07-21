import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AmPermission, AmUserInfo } from '../../openapi/models';
import {
  AmPermissionService,
  AmResourceService,
  AmUserService,
} from '../../openapi/services';

import { isNotNullOrUndefined } from '../../helpers/not-null-or-undefined';

import { NotificationService } from '../../services/notifications.service';
import { UserManagementServiceLib } from '../../services/user-management-lib.service';

import { ResourcePermissionCondition } from '../../models/user-management-lib-config';
import { ResourcePermissionFull } from '../../models/resource-permission-full';
import { UpdateUserParams } from '../../models/update-user-params';

import { constructRpForRequest } from '../../helpers/construct-rp-for-request';

@Component({
  selector: 'users-update',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users-update.component.scss'],
})
export class UsersUpdateComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  user: AmUserInfo = {};
  roles!: AmPermission[];
  resourcePermissions!: ResourcePermissionFull[];
  resourcePermissionCondition!: ResourcePermissionCondition | undefined;
  userUpdateForm!: FormGroup;

  toggleAllOptionsState: boolean = false;
  showConditionPermission: boolean = false;

  rolesControl!: AbstractControl;
  workshopsControl!: AbstractControl;
  locationsControl!: AbstractControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resourceService: AmResourceService,
    private formBuilder: FormBuilder,
    private permissionService: AmPermissionService,
    private userService: AmUserService,
    private notificationService: NotificationService,
    private userManagementServiceLib: UserManagementServiceLib
  ) {}

  ngOnInit(): void {
    this.userUpdateForm = this.formBuilder.group({
      roles: [[], [Validators.required]],
    });
    this.rolesControl = this.userUpdateForm.get('roles')!;

    this.resourcePermissionCondition =
      this.userManagementServiceLib.libConfig.resourcePermissionCondition;

    this.user = this.route.snapshot.data?.['resolveData'].data;

    this.getResourcePermissions();
    this.getRoles();

    // Check if any show condition is set and add validators
    this.rolesControl?.valueChanges.subscribe((roles) => {
      this.showConditionPermission = roles.some((role: AmPermission) =>
        this.resourcePermissionCondition?.roles.includes(role.name as string)
      );

      this.assignResourcePermissionValidators();
    });
  }

  // Check if any resource permission condition is set
  showResourcePermissions(resourcePermission: AmPermission) {
    if (this.resourcePermissionCondition?.name !== resourcePermission.name) {
      return true;
    }

    return (
      this.resourcePermissionCondition?.name === resourcePermission.name &&
      this.showConditionPermission
    );
  }

  assignResourcePermissionValidators() {
    if (!this.resourcePermissionCondition) {
      return;
    }

    const updateForm = this.userUpdateForm.get(
      this.resourcePermissionCondition.name
    );

    if (this.showConditionPermission) {
      updateForm?.setValidators([Validators.required]);
    } else {
      updateForm?.setValue([]);
      updateForm?.setValidators([]);
    }

    updateForm?.updateValueAndValidity();
  }

  getRoles() {
    this.permissionService
      .getPermissions()
      .pipe(takeUntil(this.unsubscribe$), isNotNullOrUndefined())
      .subscribe({
        next: (res) => {
          this.roles = res.data;
          this.assignRoles();
        },
        error: (err) => {
          this.notificationService.dispatchError(err);
        },
      });
  }

  getResourcePermissions() {
    this.resourceService
      .getAllResources()
      .pipe(takeUntil(this.unsubscribe$), isNotNullOrUndefined())
      .subscribe({
        next: (res) => {
          // Sort the resource permissions so that LOCATION is always first
          this.resourcePermissions = res.data.sort(
            (permissionA: AmPermission, permissionB: AmPermission) => {
              if (permissionA.name === 'LOCATION') {
                return -1;
              } else if (permissionB.name === 'LOCATION') {
                return 1;
              }
              return 0;
            }
          );

          // Add the values of every provided resource permission
          for (const resourcePermission of this.resourcePermissions) {
            this.getResourcePermissionValues(resourcePermission.name as string);
            this.userUpdateForm.addControl(
              resourcePermission.name as string,
              this.formBuilder.control([])
            );
          }
        },
        error: (err) => {
          this.notificationService.dispatchError(err);
        },
      });
  }

  private getResourcePermissionValues(resourcePermission: string) {
    const params = {
      resourceName: resourcePermission,
    };

    return this.resourceService
      .getUserResourcesByName(params)
      .pipe(takeUntil(this.unsubscribe$), isNotNullOrUndefined())
      .subscribe({
        next: (res) => {
          let currentResourcePermission = this.resourcePermissions.find(
            (resource) => resource.name === resourcePermission
          );

          if (!currentResourcePermission) {
            return;
          }

          currentResourcePermission.values = res.data;

          // Taking the current USER resource permissions
          const userResourcePermissionMap =
            this.user.resourcePermissions?.resourcePermissionMap;
          const userResourcePermissionValueIds =
            userResourcePermissionMap?.[resourcePermission]?.ids || [];

          if (userResourcePermissionValueIds.length === 0) {
            return;
          }

          const currentResources = currentResourcePermission.values.filter(
            (resource) =>
              resource.id
                ? userResourcePermissionValueIds.includes(
                    resource.id.toString()
                  )
                : false
          );

          // Assigning the current USER resource permissions to form
          this.userUpdateForm
            .get(resourcePermission)
            ?.setValue(currentResources);
        },
        error: (err) => {
          this.notificationService.dispatchError(err);
        },
      });
  }

  // Assigning the current roles to form
  private assignRoles() {
    const userRoles = this.user.permissions;

    if (userRoles) {
      const existingRoles = userRoles
        .map((userRole) => this.roles.find((role) => userRole.id === role.id))
        .filter((role) => role !== undefined);

      this.rolesControl?.setValue(existingRoles as AmPermission[]);
    }
  }

  // Select / Deselect all resource permissions
  toggleAllOptions(resourceName?: string) {
    if (!resourceName) {
      return;
    }

    this.toggleAllOptionsState = !this.toggleAllOptionsState;

    const allResourceValues =
      resourceName === 'roles'
        ? this.roles
        : this.resourcePermissions.find(
            (resource) => resource.name === resourceName
          )?.values;

    if (this.toggleAllOptionsState && allResourceValues?.length) {
      this.userUpdateForm.get(resourceName)?.setValue([...allResourceValues]);
    } else {
      this.userUpdateForm.get(resourceName)?.setValue([]);
    }
  }

  updateUser(): void {
    if (!this.user.id) {
      return;
    }

    // Constructing params for request
    let params: UpdateUserParams = {
      id: this.user.id,
      body: {
        id: this.user.id,
        username: this.user.username,
        permissions: [...this.userUpdateForm.get('roles')?.value],
        resourcePermissions: {
          resourcePermissionMap: constructRpForRequest(
            this.resourcePermissions,
            this.userUpdateForm
          ),
        },
        data: {
          ...this.user.data,
          location: this.locationsControl?.value.location,
        },
      },
    };

    this.userService
      .updateUser(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.notificationService.dispatchSuccess(
            'successMessages.successfullyUpdated'
          );
          this.router.navigate([`users-management/users`]);
        },
        error: (err) => {
          this.notificationService.dispatchError(err);
        },
      });
  }

  onChipRemoved<T extends { id: number }>(control: AbstractControl, item: T) {
    const items: T[] = control.value;
    control.setValue(items.filter((chip: T) => chip.id !== item.id));
    control.markAsDirty();
  }

  onBackButtonClick(): void {
    this.router.navigate([`users-management/users`]);
  }

  capitalizeFirstLetter(str: string | undefined) {
    if (!str) {
      return;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
