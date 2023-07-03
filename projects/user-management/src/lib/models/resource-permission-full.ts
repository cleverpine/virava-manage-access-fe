import { AmResource } from '../openapi/models';

export interface ResourcePermissionFull extends AmResource {
  values: AmResource[];
}
