import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerClockComponent } from './timer-clock.component';

@NgModule({
  declarations: [TimerClockComponent],
  imports: [CommonModule],
  exports: [TimerClockComponent],
})
export class TimerClockModule {}
