import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { PageSettingsModel } from '@syncfusion/ej2-grids';

import { AmUser } from '../../openapi/models/am-user';
import { AmUserInfo } from '../../openapi/models';
import { AmUserService } from '../../openapi/services';

import { PAGER_OPTIONS } from '../../constants/constants';

import { TableConfig, ColumnType } from '../../models/data-grid-models';
import { DataGridColumn } from '../../models/data-grid-models';

import { DialogComponent } from '../dialog/dialog.component';

import { NotificationService } from '../../services/notifications.service';
import { UserManagementServiceLib } from '../../services/user-management-lib.service';

@Component({
  selector: 'users-listing',
  templateUrl: './users-listing.component.html',
})
export class UsersListingComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  users: AmUser[] = [];
  loggedUserId!: number;
  pageOptions: PageSettingsModel = {
    pageSizes: PAGER_OPTIONS,
  };
  columns: DataGridColumn[] = [
    {
      field: 'username',
      headerText: 'U Number',
      allowSorting: true,
      allowFiltering: true,
    },
  ];
  USERS_LISTING_TABLE_CONFIG: TableConfig = {
    allowSelection: false,
    showColumnChooser: true,
    allowFiltering: true,
    allowSorting: true,
    allowMultiSorting: true,
    allowHeaderTooltip: true,
    toolbarTextHeader: 'Overview Roles',
    clientSide: true,
    allowExcelExport: {
      showExcelExportButton: true,
      fileName: `${
        this.userManagementServiceLib.libConfig.excelFileNamePrefix
      }${new Date().toLocaleDateString()}`,
    },
  };

  constructor(
    private usersService: AmUserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private userManagementServiceLib: UserManagementServiceLib
  ) {}

  ngOnInit(): void {
    this.addColumns();
    this.users = this.route.snapshot.data?.['resolveData'].data.users;

    this.loggedUserId = this.getLoggedUserId();
  }

  addColumns(): void {
    const columnsOrder =
      this.route.snapshot.data?.['resolveData'].data.usersTableOrder;
    for (const name of columnsOrder) {
      this.columns.push({
        field: `data.${name}`,
        headerText: name,
        allowSorting: true,
        allowFiltering: true,
      });
    }
    this.addActionColumn();
  }

  private getLoggedUserId() {
    return (
      this.users.find(
        (user) =>
          user.username?.toLowerCase() ===
          this.userManagementServiceLib.libConfig.loggedUserInfo?.username?.toLowerCase()
      )?.id || 0
    );
  }

  addActionColumn(): void {
    this.columns.push({
      field: 'actions',
      headerText: 'Actions',
      type: ColumnType.Actions,
      width: 100,
      className: 'users-actions-column',
      allowFiltering: false,
      allowSorting: false,
      actionsConfig: [
        {
          tooltip: 'Delete',
          icon: 'delete',
          action: (user: AmUserInfo) => this.onDelete(user),
          loggedUserId: this.getLoggedUserId(),
        },
      ],
    });
  }

  handleRowClick(data: { navigationRoute: string; rowItemData: AmUser }): void {
    const isCurrentUser = this.loggedUserId == data.rowItemData.id;

    if (isCurrentUser && !this.isAdminUser(this.loggedUserId)) {
      return;
    }

    this.router.navigate([`users-management/users/${data.rowItemData.id}`]);
  }

  private isAdminUser(loggedUserId: number | undefined): boolean {
    if (!loggedUserId) {
      return false;
    }

    const currentUser = this.users.find((user) => user.id === loggedUserId);
    const roles = currentUser?.data?.['Roles'];

    if (!roles) {
      return false;
    }

    const roleArray = roles.split(', ');

    return roleArray.includes('admin') || roleArray.includes('ALL');
  }

  onDelete(user: AmUser): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      content: 'Are you sure you want to delete this user?',
      hasCloseButton: true,
      hasOkButton: true,
      okTitle: 'Delete',
      closeTitle: 'No',
      isOkButtonRed: true,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.deleteUser({ id: user.id as number }).subscribe({
          next: () => {
            this.users = this.users.filter((u) => u.id !== user.id);
            this.notificationService.dispatchSuccess(
              'successMessages.successfullyDeleted'
            );
          },
          error: (err: any) => {
            this.notificationService.dispatchError(err);
          },
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
