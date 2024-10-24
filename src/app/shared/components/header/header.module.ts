import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    ReactiveFormsModule,
    MessagesModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
