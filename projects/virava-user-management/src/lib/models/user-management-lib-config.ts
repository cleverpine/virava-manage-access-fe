export interface ResourcePermissionCondition {
  readonly name: string;
  readonly roles: string[];
}

interface UserInfo {
  readonly fullName?: string;
  readonly location?: Location;
  readonly username?: string;
}

export interface UserManagementModuleConfig {
  readonly excelFileNamePrefix: string;
  readonly resourcePermissionCondition?: ResourcePermissionCondition;
  readonly loggedUserInfo?: UserInfo;
}
