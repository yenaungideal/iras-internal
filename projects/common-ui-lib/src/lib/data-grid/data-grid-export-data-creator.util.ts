import * as moment from 'moment';
import { cloneArray } from '../../helpers';
import { getThousandSeparatedAmount } from '../input/amount-input/amount-input.util';
import { DataGridState } from './data-grid-state.model';

export function findColumnConfig({ columnKey, gridState }: { columnKey: string; gridState: DataGridState }) {
  return gridState.columnsConfig.find((d) => d.columnKey === columnKey);
}
export class ExportDataCreator {
  static create({ gridState }: { gridState: DataGridState }) {
    const exportSettings = {
      columns: [],
      rows: [{ type: 'header', cells: [] }],
      freezePane: {
        rowSplit: 1,
        colSplit: 1,
      },
      filter: null,
    };

    if (gridState.columnGroupingOptions) {
      const groupings = cloneArray({
        arr: gridState.columnGroupingOptions,
      });
      for (const [headerIndex, headerColumn] of Object.entries(groupings)) {
        if ('columnKey' in headerColumn) {
          const colConfig = findColumnConfig({
            columnKey: headerColumn.columnKey,
            gridState,
          });

          if (colConfig.canExportToExcel) {
            groupings[headerIndex] = colConfig;
            // Add columns
            exportSettings.columns.push({
              autoSize: true,
              width: colConfig.columnWidth,
            });
            exportSettings.rows[0].cells.push({
              background: '#7a7a7a',
              color: '#fff',
              value: colConfig.columnTitle,
              colSpan: 1,
              firstCell: exportSettings.rows[0].cells.length === 0,
              rowSpan: 2,
            });
          }
        } else {
          exportSettings.freezePane = {
            rowSplit: 2,
            colSplit: headerColumn.groups.length,
          };
          // groups info
          exportSettings.rows[0].cells.push({
            background: '#7a7a7a',
            color: '#fff',
            value: headerColumn.mainHeader,
            colSpan: 2,
            firstCell: exportSettings.rows[0].cells.length === 0,
            rowSpan: 1,
          });
          for (const [subHeaderIndex, subHeaderColumn] of Object.entries(headerColumn.groups)) {
            const colConfig = findColumnConfig({
              columnKey: (subHeaderColumn as any).columnKey,
              gridState,
            });
            if (colConfig.canExportToExcel) {
              groupings[headerIndex].groups[subHeaderIndex] = colConfig;

              // Add columns
              exportSettings.columns.push({
                autoSize: true,
                width: colConfig.columnWidth,
              });

              if (!exportSettings.rows[1]) {
                exportSettings.rows[1] = { type: 'header', cells: [] };
              }

              exportSettings.rows[1].cells.push({
                background: '#7a7a7a',
                color: '#fff',
                value: colConfig.columnTitle,
                colSpan: 1,
                firstCell: false,
                rowSpan: 1,
              });
            }
          }
        }
      }
    } else {
      for (const colConfig of gridState.columnsConfig) {
        if (colConfig.canExportToExcel) {
          exportSettings.columns.push({
            autoSize: true,
            width: colConfig.columnWidth,
          });

          exportSettings.rows[0].cells.push({
            background: '#7a7a7a',
            color: '#fff',
            value: colConfig.columnTitle,
            colSpan: 1,
            firstCell: exportSettings.rows[0].cells.length === 0,
            rowSpan: 1,
          });
        }
      }
    }

    // Get Exportable Keys in a sequence of its appearance in state

    let exportableKeys = gridState.columnsConfig.filter((c) => c.canExportToExcel).map((c) => c.columnKey);

    if (gridState.columnGroupingOptions) {
      const columnKeys = [];
      for (const colGroupOption of gridState.columnGroupingOptions) {
        if ('columnKey' in colGroupOption) {
          const colConfig = findColumnConfig({ columnKey: colGroupOption.columnKey, gridState });
          if (colConfig.canExportToExcel) {
            columnKeys.push(colGroupOption.columnKey);
          }
        } else {
          for (const col of colGroupOption.groups) {
            const colConfig = findColumnConfig({ columnKey: col.columnKey, gridState });
            if (colConfig.canExportToExcel) {
              columnKeys.push(col.columnKey);
            }
          }
        }
      }
      exportableKeys = columnKeys;
    }
    const dataProp = gridState.data.map((d) => {
      return {
        cells: exportableKeys.map((k) => {
          const cell = { wrap: true } as { value: string; textAlign: 'left' | 'right'; wrap: boolean };
          const cellContentFormatting = findColumnConfig({ columnKey: k, gridState }).cellContentFormatting;
          let value = d[k];
          switch (cellContentFormatting) {
            case 'amount': {
              value = value ? getThousandSeparatedAmount(value) : '';
              cell.textAlign = 'right';
              break;
            }
            case 'date': {
              const momentDate = moment(value, 'YYYY-MM-DD');
              if (momentDate.isValid()) {
                value = momentDate.format('DD/MM/YYYY');
              }
              break;
            }
          }
          cell.value = value;
          return cell;
        }),
        level: null,
        type: 'data',
      };
    });

    exportSettings.rows.push(...dataProp);
    return exportSettings;
  }
}
