// DataGrid Models
export enum TextWrapSettingsProps {
  CONTENT = 'Content',
  HEADER = 'Header',
  BOTH = 'Both',
}

export interface TableConfig {
  readonly allowSelection?: boolean;
  readonly allowResizing?: boolean;
  readonly showColumnChooser?: boolean;
  readonly showColumnMenu?: boolean;
  readonly showAddNewButton?: boolean;
  readonly detailsRoute?: string;
  readonly allowSorting?: boolean;
  readonly allowMultiSorting?: boolean;
  readonly allowPaging?: boolean;
  readonly enableHover?: boolean;
  readonly allowFiltering?: boolean;
  readonly allowColumnReordering?: boolean;
  readonly allowRowReordering?: boolean;
  readonly allowTextWrap?: boolean;
  readonly gridLines?: string;
  readonly textWrapSettings?: TextWrapSettingsProps;
  toolbarTextHeader?: string;
  readonly allowHeaderTooltip?: boolean;
  readonly pageSize?: number;
  readonly clientSide?: boolean;
  readonly allowExcelExport?: {
    showExcelExportButton: boolean;
    fileName?: string;
  };
}

export interface PagerData {
  page: number;
  pageSize: number;
  sortValues: string[];
  filterValues: string[];
}

export enum ColumnType {
  Text = 'text',
  Date = 'date',
  Status = 'status',
  Timeline = 'timeline',
  Actions = 'actions',
  NestedValue = 'nestedValue',
}

interface ActionsConfigProps {
  readonly tooltip: string;
  readonly icon: string;
  readonly action: (item?: any) => void;
}

export interface DataGridColumn {
  readonly field: string;
  readonly headerText: string;
  readonly type?: ColumnType;
  readonly width?: number;
  readonly minWidth?: number;
  readonly allowSorting?: boolean;
  readonly allowFiltering?: boolean;
  readonly actionsConfig?: ActionsConfigProps[];
  readonly visible?: boolean;
  readonly checkboxFilter?: Record<string, boolean>;
  readonly className?: string;
}
