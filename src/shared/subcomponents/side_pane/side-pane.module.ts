import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidePaneComponent } from './side-pane.component';

@NgModule({
   imports: [ CommonModule, RouterModule ],
   exports: [ SidePaneComponent ],
   declarations: [ SidePaneComponent ],
   providers: [],
})
export class SidePaneModule { }