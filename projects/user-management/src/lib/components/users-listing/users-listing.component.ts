import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { PageSettingsModel } from '@syncfusion/ej2-grids';

import { AmUser } from '../../openapi/models/am-user';
import { AmUserInfo } from '../../openapi/models';
import { AmUserService } from '../../openapi/services';

import { EXCEL_NAME_PREFIX, PAGER_OPTIONS } from '../../constants/constants';
import { USERS_TABLE_COLUMNS } from '../../constants/user-listing-columns';

import { TableConfig, ColumnType } from '../../models/data-grid-models';

import { isNotNullOrUndefined } from '../../helpers/not-null-or-undefined';

import { DialogComponent } from '../dialog/dialog.component';

import { NotificationService } from '../../services/error.service';
import { UserManagementServiceLib } from '../../services/user-management-lib.service';

@Component({
  selector: 'users-listing',
  templateUrl: './users-listing.component.html',
})
export class UsersListingComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  users: AmUser[] = [];
  pageOptions: PageSettingsModel = {
    pageSizes: PAGER_OPTIONS,
  };
  columns = [...USERS_TABLE_COLUMNS];
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
      fileName: `${this.userManagementServiceLib.libConfig.excelFileNamePrefix}${new Date().toLocaleDateString()}`,
    },
  };

  constructor(
    private usersService: AmUserService,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private userManagementServiceLib: UserManagementServiceLib,
  ) {}

  ngOnInit(): void {
    this.columns.push({
      field: 'actions',
      headerText: 'Actions',
      type: ColumnType.Actions,
      width: 90,
      className: 'users-actions-column',
      allowFiltering: false,
      allowSorting: false,
      actionsConfig: [
        {
          tooltip: 'Delete',
          icon: 'delete',
          action: (user: AmUserInfo) => this.onDelete(user),
        },
      ],
    });

    this.getData();
  }

  getData(): void {
    this.usersService
      .getAllUsers()
      .pipe(takeUntil(this.unsubscribe$), isNotNullOrUndefined())
      .subscribe({
        next: (response: any) => {
          const { data } = response;
          this.users = data;
        },
        error: (err: any) => {
          this.notificationService.dispatchError(err);
        },
      });
  }

  handleRowClick(data: { navigationRoute: string; rowItemData: AmUser }): void {
    this.router.navigate([`users-management/users/${data.rowItemData.id}`]);
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
            this.getData();
            this.notificationService.dispatchSuccess('successMessages.successfullyDeleted');
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
