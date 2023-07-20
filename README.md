# User Management

User Management Library is a robust tool that provides UI functionality to manage users - their roles, sub-roles, and locations. It encapsulates two primary screens:

- **User Table**: A comprehensive table displaying all user information.
- **User Details**: An individual user screen where user data can be modified.

## Library Dependencies

Before using the User Management library, make sure you have the following dependencies installed in your project:

- **@angular/core**: Version 14.2.0 or higher
- **@syncfusion/ej2-angular-grids**: Version 20.2.43
- **@syncfusion/ej2-angular-inputs**: Version 20.2.45
- **@syncfusion/ej2-angular-notifications**: Version 20.2.43
- **@angular/common**: Version 14.2.0 or higher
- **@angular/compiler**: Version 14.2.0 or higher
- **@angular/forms**: Version 14.2.0 or higher
- **@angular/material**: Version 14.2.6 or higher
- **@angular/router**: Version 14.2.0 or higher
- **rxjs**: Version 7.8.0

Make sure to include these dependencies in your project's package.json file

# Getting started with User Management

This guide explains how to set up your project to use the User Management Library. It covers prerequisites, installation steps, and configuration details.

## Prerequisites

Ensure you have the latest version of npm installed in your project. The User Management library is available through npm.

## Installation

Install the User Management library using the npm command:

        npm install user-management

> This command adds the project dependencies to your package.json file.

## Usage

To use the User Management library, follow these steps:

### 1. **Add the User Management module to your app module and provide the config file**

<br/>
The only required parameter is the excelFileNamePrefix. Add the following to your @NgModule imports:

```js
.....imports

import { UserManagementModuleLib } from 'user-management-lib';

@NgModule({
  declarations: [
    UsersManagementComponent,
    ........
  ],
  imports: [
    .....
    UserManagementModuleLib.forRoot({
      excelFileNamePrefix: EXCEL_NAME_PREFIX,
      resourcePermissionCondition: USERS_RESOURCE_PERMISSION_CONDITION,
    }),
  ],
})
export class UsersManagementModule {}
```

The configuration file models are defined as follows:

```ts
interface ResourcePermissionCondition {
  readonly name: string;
  readonly roles: string[];
}

interface UserManagementModuleConfig {
  readonly excelFileNamePrefix: string;
  readonly resourcePermissionCondition?: ResourcePermissionCondition;
}
```

Use **ResourcePermissionCondition** to add a custom condition to a resource permission if needed. It accepts the Resource Permission name and a list of roles that are allowed to see the resource:

```js
const resourcePermissionCondition = {
  name: "WORKSHOP",
  roles: [
    "TOP_responsible_Housing_and_Facilities",
    "TOP_responsible_Personnel",
    "TOP_responsible_Material",
    "TOP_responsible_technical",
    "TOP_responsible_Tooling_and_Equipment",
    "TOP_responsible_Work_Safety_and_Environmental_Aspects",
  ],
};
```

---

### 2. Add the User Management module to the routing module

<br/>
The library handles the routing itself. Include it in the application's routing module like so:

```js
...others imports


import { UserManagementModuleLib } from 'user-management-lib';


const routes: Routes = [
  ...OtherRoutes,

  {
    // EXAMPLE PATH
    path: 'users-management',
    loadChildren: () => UserManagementModuleLib,
    data: { breadcrumb: { title: 'common.home', link: ROUTES.home }, permissions: ROUTE_PERMISSIONS.usersManagement },
    canLoad: [PermissionGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

For example, with the above setup:

- The User Listing Component will be loaded on '**/users-management/users**'

- The User Update Component will be loaded on '**/users-management/users/:userId**'

---

### 3. Configure the notification service in your app component

<br/>
Add the library's notification service to your app component and configure it with your toast service:

```javascript
import { NotificationService } from 'user-management';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private toastService: ToastService,
    private notificationService: NotificationService,
  ) {
    this.notificationService.setErrorHandler((error) => {
      this.toastService.showDanger(error);
    });

    this.notificationService.setSuccessHandler((message) => {
      this.toastService.showSuccess(message);
    });
  }

}
```

## 3. Start using User Management

To start using User Management after it's been configured, you simply need to navigate to the path you set in the routing module.

## 4. Test your application

You can test your application using Angular's built-in server:

> ng serve
