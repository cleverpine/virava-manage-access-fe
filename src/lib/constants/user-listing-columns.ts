import { ColumnType, DataGridColumn } from '../models/data-grid-models';

export const USERS_TABLE_COLUMNS: DataGridColumn[] = [
  //TODO: Add headerText when BE is returning the displayName
  { field: 'username', headerText: 'U Number', allowSorting: true, allowFiltering: true },
  {
    field: 'data.personName',
    headerText: 'Name',
    allowSorting: true,
    allowFiltering: true,
    type: ColumnType.NestedValue,
  },
  {
    field: 'data.LOCATION',
    headerText: 'Location',
    allowSorting: true,
    allowFiltering: true,
    type: ColumnType.NestedValue,
  },
  {
    field: 'data.permissions',
    headerText: 'Roles',
    allowSorting: true,
    allowFiltering: true,
    type: ColumnType.NestedValue,
  },
  {
    field: 'data.WORKSHOP',
    headerText: 'Workshop Responsibilities',
    allowSorting: true,
    allowFiltering: true,
    type: ColumnType.NestedValue,
  },
];
