import { AmResourcePermission } from '../openapi/models';

export interface ResourcePermissionsForRequest {
  [key: string]: AmResourcePermission;
}
