import { GRID_TEST_DATA_1 } from '../../../../common-ui-lib-showcase/src/app/components/data-grid-showcase/data-grid-test-data-for-spec-file';
import { ExportDataCreator } from './data-grid-export-data-creator.util';
describe('data-grid-export-data-creator.util', () => {
  it('should create export settings for column grouping', () => {
    const data = ExportDataCreator.create({ gridState: GRID_TEST_DATA_1 });
    expect(data).toBeTruthy();
  });

  it('should create export settings when no columnGrouping present', () => {
    const data = ExportDataCreator.create({ gridState: { ...GRID_TEST_DATA_1, columnGroupingOptions: null } });
    expect(data).toBeTruthy();
  });

  it('column should not be exported', () => {
    const gridState = { ...GRID_TEST_DATA_1, columnGroupingOptions: null };
    const firstColumnThatCanExportToExcel = gridState.columnsConfig.find((c) => c.canExportToExcel);
    firstColumnThatCanExportToExcel.canExportToExcel = false;

    const data = ExportDataCreator.create({ gridState });
    const matchingColumn = data.rows[0].cells.find((d) => d.value === firstColumnThatCanExportToExcel.columnTitle);
    expect(matchingColumn).toBeFalsy();
  });

  it('column should be exported', () => {
    const gridState = { ...GRID_TEST_DATA_1 };
    const firstColumnThatCanExportToExcel = gridState.columnsConfig.find((c) => c.canExportToExcel);

    const data = ExportDataCreator.create({ gridState });
    const matchingColumn = data.rows[0].cells.find((d) => d.value === firstColumnThatCanExportToExcel.columnTitle);
    expect(matchingColumn).toBeTruthy();
  });

  it('grouped column should be exported', () => {
    const gridState = { ...GRID_TEST_DATA_1 };

    const firstGroupedColumn = (gridState.columnGroupingOptions.find((c) => !!(c as any).groups) as any).groups[0];
    const colConfig = gridState.columnsConfig.find(
      (c) => c.columnKey === firstGroupedColumn.columnKey && c.canExportToExcel
    );

    const data = ExportDataCreator.create({ gridState });
    const matchingColumn = data.rows[1].cells.find((d) => d.value === colConfig.columnTitle);
    expect(matchingColumn).toBeTruthy();
  });
});
