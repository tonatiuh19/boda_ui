import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerComponent } from './planner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingMaskModule } from '../../shared/components/loading-mask/loading-mask.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [PlannerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingMaskModule,
    FontAwesomeModule,
  ],
  exports: [PlannerComponent],
})
export class PlannerModule {}
