import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { GridComponent, PageSettingsModel, parentsUntil } from '@syncfusion/ej2-angular-grids';
import { ColumnMenuClickEventArgs } from '@syncfusion/ej2-grids';
import { Tooltip } from '@syncfusion/ej2-popups';

import { TableConfig, DataGridColumn } from '../../models/data-grid-models';
import { ColumnType } from '../../models/data-grid-models';

import { DEFAULT_COLUMN_GRID_WIDTH, DEFAULT_ROW_GRID_HEIGHT, DEFAULT_PAGE_SIZE } from '../../constants/constants';

import { UserManagementServiceLib } from '../../services/user-management-lib.service';

@Component({
  selector: 'data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  @Input() columns: DataGridColumn[] = [];
  @Input() data: any[] = [];
  @Input() pageOptions: PageSettingsModel = {};

  @Input() set config(value: TableConfig) {
    this.setConfig(value);
  }

  @Output() handleClickEvent = new EventEmitter();
  @Output() actionCompleteEvent = new EventEmitter();

  constructor(private userManagementLib: UserManagementServiceLib) {}

  readonly DEFAULT_COLUMN_GRID_WIDTH = DEFAULT_COLUMN_GRID_WIDTH;
  readonly DEFAULT_ROW_GRID_HEIGHT = DEFAULT_ROW_GRID_HEIGHT;

  toolbarOptions: any[] | null = [];
  pageSettings: PageSettingsModel = {};
  columnType = ColumnType;

  configObj: TableConfig = {
    allowSelection: true,
    allowResizing: true,
    showColumnChooser: true,
    showColumnMenu: true,
    showAddNewButton: false,
    allowSorting: true,
    allowMultiSorting: true,
    allowFiltering: false,
    allowPaging: true,
    enableHover: true,
    allowExcelExport: {
      showExcelExportButton: false,
    },
    allowColumnReordering: true,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  onDataBound() {
    if (this.data && this.data.length > 0) {
      this.pageSettings = this.pageOptions;
    }
    this.addExportExcelTooltip();
  }

  toolbarButtonsHandler(args: ColumnMenuClickEventArgs): void {
    if (args.item.id === this.userManagementLib.libConfig.excelFileNamePrefix) {
      const column = this.grid.getColumnByField('actions');
      column.visible = false;

      this.grid.excelExport({
        fileName: `${this.configObj.allowExcelExport?.fileName}.xlsx`,
      });
    }
  }

  handleNestedColumnValue(item: number, field: string) {
    if (!this.data) {
      return;
    }

    const fields = field.split('.');
    let currentObject = this.data[+item];

    for (let field of fields) {
      currentObject = currentObject[field];
      if (!currentObject) {
        return null;
      }
    }

    return currentObject;
  }

  handleClick(e: MouseEvent): any {
    const ifTargetClassListContains =
      (e.target as Element).classList.contains('e-rowcell') || (e.target as Element).classList.contains('status');

    if (e && e.target && ifTargetClassListContains) {
      const rowObj = this.grid.getRowObjectFromUID(
        parentsUntil(e.target as Element, 'e-row').getAttribute('data-uid') as string,
      );

      const rowItem = rowObj.data;

      this.handleClickEvent.emit({
        navigationRoute: this.configObj.detailsRoute,
        rowItemData: rowItem,
      });
    }
  }

  private setConfig(value: TableConfig): void {
    this.configObj = this.updateConfig(value);
    if (this.configObj.toolbarTextHeader) {
      this.toolbarOptions?.push({ text: this.configObj.toolbarTextHeader, cssClass: 'toolbar-header-text' });
    }

    if (this.configObj.allowExcelExport?.showExcelExportButton) {
      this.toolbarOptions?.push({
        id: this.userManagementLib.libConfig.excelFileNamePrefix,
        align: 'right',
        cssClass: 'export-icon',
      });
    }
  }

  private updateConfig(config: TableConfig): TableConfig {
    return { ...this.configObj, ...config };
  }

  headerCellInfo(args: any) {
    const toolcontent = args.cell.column.headerText;
    const tooltip: Tooltip = new Tooltip({
      content: toolcontent,
    });
    tooltip.appendTo(args.node);
  }

  addExportExcelTooltip() {
    const tooltip: Tooltip = new Tooltip({
      content: 'Export to Excel',
    });

    const toolbarElement = document.getElementById(this.userManagementLib.libConfig.excelFileNamePrefix);
    tooltip.appendTo(toolbarElement as HTMLElement);
  }
}
