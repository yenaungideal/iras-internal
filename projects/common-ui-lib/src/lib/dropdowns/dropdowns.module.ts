import { BlockScrollStrategy, Overlay, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MAT_SELECT_SCROLL_STRATEGY } from '@angular/material/select';
import { IrasAutocompleteDropdownComponent } from './iras-autocomplete-dropdown/iras-autocomplete-dropdown.component';
import { IrasMultiSelectDropdownComponent } from './iras-multi-select-dropdown/iras-multi-select-dropdown.component';
import { IrasMultiSelectNestedDropdownComponent } from './iras-multi-select-nested-dropdown/iras-multi-select-nested-dropdown.component';
import { DropdownCdkPortalComponent } from './dropdown-cdkportal.component';
import { IrasDropdownComponent } from './iras-dropdown/iras-dropdown.component';

@NgModule({
  declarations: [
    IrasDropdownComponent,
    IrasAutocompleteDropdownComponent,
    IrasMultiSelectDropdownComponent,
    IrasMultiSelectNestedDropdownComponent,
    DropdownCdkPortalComponent,
  ],
  imports: [
    PortalModule,
    OverlayModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatOptionModule,
  ],
  exports: [
    PortalModule,
    OverlayModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatOptionModule,
    IrasDropdownComponent,
    IrasAutocompleteDropdownComponent,
    IrasMultiSelectDropdownComponent,
    IrasMultiSelectNestedDropdownComponent,
  ],
  providers: [{ provide: MAT_SELECT_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] }],
})
export class IrasDropdownsModule {}
export function scrollFactory(overlay: Overlay): () => BlockScrollStrategy {
  const scrollFun = () => overlay.scrollStrategies.block();
  return scrollFun;
}

export * from './iras-dropdown/dropdown-item.model';
export * from './models/dropdown-model.component';
