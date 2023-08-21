export interface ResourcePermissionCondition {
  readonly name: string;
  readonly roles: string[];
}

export interface UserManagementModuleConfig {
  readonly excelFileNamePrefix: string;
  readonly resourcePermissionCondition?: ResourcePermissionCondition;
  readonly loggedUserId?: number;
}
