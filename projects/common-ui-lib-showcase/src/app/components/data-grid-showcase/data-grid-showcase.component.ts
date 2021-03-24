import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  DataGridBooleanColumnSelectAllStateChangeEvent,
  DataGridRowCreateEvent,
  DataGridRowDeleteEvent,
  DataGridRowEditEvent,
  DataGridSelectionChangeEvent,
  DataGridState,
} from '../../../../../common-ui-lib/src/lib/data-grid/data-grid-state.model';
import { MOCK_GRID_STATE_1 } from './data-grid-type1.mock';
import { MOCK_GRID_STATE_2 } from './data-grid-type2.mock';
import { MOCK_GRID_STATE_3 } from './data-grid-type3.mock';
import { MOCK_GRID_STATE_4 } from './data-grid-type4.mock';
import { MOCK_GRID_STATE_5 } from './data-grid-type5.mock';
type TGridType = 'type1' | 'type2' | 'type3' | 'type4' | 'type5';
@Component({
  selector: 'app-data-grid-showcase',
  templateUrl: './data-grid-showcase.component.html',
  styles: [``],
})
export class DataGridShowcaseComponent implements OnInit {
  type1GridStateStream = new BehaviorSubject(MOCK_GRID_STATE_1);
  // type1GridStateStream = new BehaviorSubject(GRID_TEST_DATA_1);
  type2GridStateStream = new BehaviorSubject(MOCK_GRID_STATE_2);
  type3GridStateStream = new BehaviorSubject(MOCK_GRID_STATE_3);
  type4GridStateStream = new BehaviorSubject(MOCK_GRID_STATE_4);
  type5GridStateStream: BehaviorSubject<DataGridState>;
  activeGridType: TGridType = 'type1';
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // finding last column which is buttons columns

    const buttons =
      MOCK_GRID_STATE_5.columnsConfig[MOCK_GRID_STATE_5.columnsConfig.length - 1].buttonsTypeColumnConfig.buttons;
    MOCK_GRID_STATE_5.columnsConfig[MOCK_GRID_STATE_5.columnsConfig.length - 1].buttonsTypeColumnConfig.buttons = [
      {
        getButtonText: (arg) => (arg.dataItem.editable === true ? 'Save' : 'Edit'),
        onClick: (arg) => {
          arg.dataItem.editable = !arg.dataItem.editable;
          this.type5GridStateStream.next(arg.currentGridState);
        },
      },
      buttons[buttons.length - 1],
    ];
    this.type5GridStateStream = new BehaviorSubject({ ...MOCK_GRID_STATE_5 });
  }

  onRowEdited(event: DataGridRowEditEvent) {
    console.log('edit event', { event });
  }
  onRowDeleted(event: DataGridRowDeleteEvent) {
    console.log('delete event', { event });
  }
  onRowCreated(event: DataGridRowCreateEvent) {
    console.log('create event', { event });
  }

  toggleGridView({ gridType }: { gridType: TGridType }) {
    this.activeGridType = gridType;
  }

  onSelectionChange(event: DataGridSelectionChangeEvent) {
    console.log('selection change event: ', event);
  }

  onBooleanColumnSelectAllStateChanged(event: DataGridBooleanColumnSelectAllStateChangeEvent) {
    console.log('onBooleanColumnSelectAllStateChanged: ', event);
  }
}
