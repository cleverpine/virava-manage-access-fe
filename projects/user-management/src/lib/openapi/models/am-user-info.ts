/* tslint:disable */
/* eslint-disable */
import { AmPermission } from './am-permission';
import { AmResourcePermissions } from './am-resource-permissions';
import { AmUser } from './am-user';
export type AmUserInfo = AmUser & {
'permissions'?: Array<AmPermission>;
'resourcePermissions'?: AmResourcePermissions;
};
