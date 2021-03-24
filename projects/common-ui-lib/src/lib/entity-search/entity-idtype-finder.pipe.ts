import { Pipe, PipeTransform } from '@angular/core';
import { DropdownItem } from '../dropdowns/dropdowns.module';

@Pipe({
  name: 'idtypefinder',
})
export class IdTypeFinderPipe implements PipeTransform {
  transform(id: string, entityTypeList: Array<DropdownItem>): string {
    const value = entityTypeList.find((type) => type.key === id);
    return value ? value.text : '';
  }
}
