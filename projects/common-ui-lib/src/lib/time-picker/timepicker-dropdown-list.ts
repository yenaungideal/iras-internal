import { DropdownItem } from '../dropdowns/iras-dropdown/dropdown-item.model';
export const timePicker1MinuteIntervalList: Array<DropdownItem> = [
  { key: 'MM', text: 'MM' },
  ...new Array(60).fill(0).map((_, index) => {
    const val = index.toLocaleString(undefined, { minimumIntegerDigits: 2, useGrouping: false });
    return {
      key: val,
      text: val,
    };
  }),
];

export const timePicker5MinuteIntervalList: Array<DropdownItem> = [
  timePicker1MinuteIntervalList[0],
  ...timePicker1MinuteIntervalList.slice(1).filter((item) => +item.key % 5 === 0),
];

export const timePicker15MinuteIntervalList: Array<DropdownItem> = [
  timePicker1MinuteIntervalList[0],
  ...timePicker1MinuteIntervalList.slice(1).filter((item) => +item.key % 15 === 0),
];

export const timePicker30MinuteIntervalList: Array<DropdownItem> = [
  timePicker1MinuteIntervalList[0],
  ...timePicker1MinuteIntervalList.slice(1).filter((item) => +item.key % 30 === 0),
];

export const timePicker1HourIntervalList: Array<DropdownItem> = [
  { key: 'HH', text: 'HH' },
  ...timePicker1MinuteIntervalList.slice(1, 25),
];
