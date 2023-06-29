import { AbstractControl } from '@angular/forms';

import { ResourcePermissionFull } from '../models/resource-permission-full';
import { ResourcePermissionsForRequest } from '../models/resource-permissions-update-request';

import { AmResource } from '../openapi/models';

export const constructRpForRequest = (
  resourcePermissions: ResourcePermissionFull[],
  userUpdateForm: AbstractControl,
): ResourcePermissionsForRequest => {
  const resourcePermissionMap = resourcePermissions.reduce((acc: ResourcePermissionsForRequest, curr) => {
    const control = userUpdateForm.get(curr.name as string);

    if (curr.name && control) {
      acc[curr.name] = {
        all: false,
        ids: control.value.map((value: AmResource) => value.id),
      };
    }

    return acc;
  }, {});

  return resourcePermissionMap;
};
