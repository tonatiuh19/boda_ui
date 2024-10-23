import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
