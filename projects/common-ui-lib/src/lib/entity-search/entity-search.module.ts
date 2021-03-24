import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IrasDropdownsModule } from '../dropdowns/dropdowns.module';
import { IrasInputModule } from '../input/input.module';
import { IdTypeFinderPipe } from './entity-idtype-finder.pipe';
import { EntitySearchComponent } from './entity-search.component';

@NgModule({
  declarations: [EntitySearchComponent, IdTypeFinderPipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, IrasInputModule, IrasDropdownsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    EntitySearchComponent,
    IrasInputModule,
    IrasDropdownsModule,
    IdTypeFinderPipe,
  ],
  providers: [],
})
export class IrasEntitySearchModule {}
